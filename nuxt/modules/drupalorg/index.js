import axios from 'axios'
import { resolve } from 'path'

export default async function (moduleOptions = {}) {
  const self = this

  // Get Modules data.
  let url = 'https://www.drupal.org/api-d7/node.json?type=project_module'
  let { data } = await axios.get(url)
  let { list } = data
  // @TODO - This is currently limited to 5 pages worth of data.
  //       - Need to implement filtering of queried data.
  let i = 0
  while (data.next && i < 5) {
    i++
    url = data.next
    data = (await axios.get(url)).data
    list = [...list, ...data.list]
  }

  // Add modules to lunr.
  list.forEach((o) => {
    const document = {
      id: Number(o.nid),
      title: o.field_project_machine_name,
      body: o.title
    }
    const meta = {
      id: document.title,
      nid: document.id,
      title: document.body
    }
    this.nuxt.callHook('lunr:document', ({ document, meta }))
  })

  // Build plugin.
  self.addPlugin({
    src: resolve(__dirname, './templates/plugin.js'),
    fileName: 'drupalorg.js',
    options: {}
  })
}
