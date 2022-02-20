import axios from 'axios'

const baseUrl = 'https://www.drupal.org/api-d7'

export default (context, inject) => {
  inject('drupalorg', {
    getVersions: async (nid) => {
      const url = `${baseUrl}/node.json?type=project_release&field_release_project=${nid}`

      const { data } = await axios.get(url)
      return data.list.map((o) => o.field_release_version)
    },
  })
}
