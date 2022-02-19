import axios from 'axios'

export default (context, inject) => {
  inject('drupalorg', {
    modules: <%= JSON.stringify(options.modules) %>,

    getVersions: async (nid) => {
      const url = `https://www.drupal.org/api-d7/node.json?type=project_release&field_release_project=${nid}`

      const { data } = await axios.get(url)
      // @TODO - Return available versions.
    },
  })
}
