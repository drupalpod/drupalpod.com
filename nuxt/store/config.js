export const state = () => ({
  site: {
    name: 'DrupalPod'
  },
  social: {
    drupal: undefined,
    github: undefined,
    twitter: undefined,
  },
})

export const mutations = {
  set: (state, data) => {
    state.site = data.site
    // state.social = data.social
  },
}

export const actions = {
  init: async ({ commit }, { $druxt }) => {
    const collection = await $druxt.getCollection('config_pages--drupalpod_com')
    const entity = collection.data.shift()
    const data = {
      site: {
        name: entity.attributes.field_site_name
      }
      // social: {
      //   drupal: entity.attributes.field_social_drupal,
      //   github: entity.attributes.field_social_github,
      //   twitter: entity.attributes.field_social_twitter,
      // },
    }
    commit('set', data)
  },
}
