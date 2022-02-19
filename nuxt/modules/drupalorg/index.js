import axios from 'axios'
import { resolve } from 'path'

export default function (moduleOptions) {
  const self = this
  this.nuxt.hook('build:before', async (nuxt, buildOptions) => {
    // Get Modules data.
    const url = 'https://www.drupal.org/api-d7/node.json?type=project_module'
    const { data } = await axios.get(url)

    // @TODO - Add support for pagination.

    const modules = Object.fromEntries(data.list.map((o) => [
      o.field_project_machine_name,
      {
        nid: o.nid,
        title: o.title,
      }
    ]))

    // Build plugin.
    self.addPlugin({
      src: resolve(__dirname, './templates/plugin.js'),
      fileName: 'drupalorg.js',
      options: {
        modules
      }
    })
  })
}
