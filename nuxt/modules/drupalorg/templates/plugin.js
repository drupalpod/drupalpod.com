import axios from 'axios'

const baseUrl = '<%= options.baseUrl %>'

export default (context, inject) => {
  inject('drupalorg', {
    getProject: async (nid) => {
      const url = `${baseUrl}/node.json?type=project_module&nid=${nid}`

      const { data } = await axios.get(url)
      return data.list[0]
    },

    getVersions: async (nid) => {
      const url = `${baseUrl}/node.json?type=project_release&field_release_project=${nid}`

      const { data } = await axios.get(url)
      return data.list.map((o) => o.field_release_version)
    },
  })
}
