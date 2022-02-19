<template>
  <div class="container flex flex-col h-full items-center justify-center mx-auto">
    <!-- Project -->
    <div class="form-control w-full">
      <div class="flex input-group">
        <select
          class="flex-grow mb-2 select select-bordered select-lg"
          v-model="model.DP_PROJECT_NAME"
        >
          <option disabled selected>Select a Drupal project</option>
          <option
            v-for="(value, key) of modules"
            :key="key"
            :value="key"
            v-text="value"
          />
        </select>

        <select
          class="mb-2 select select-bordered select-lg"
          v-if="model.DP_PROJECT_NAME"
          v-model="model.DP_MODULE_VERSION"
        >
        </select>
      </div>
    </div>

    <div class="form-control w-full">
      <a class="btn w-full" :href="href">Start DrupalPod</a>
      <p class="py-4" v-text="href" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    repo: 'https://github.com/shaal/drupalpod',
    model: {
      DP_CORE_VERSION: undefined,
      DP_ISSUE_BRANCH: undefined,
      DP_ISSUE_FORK: undefined,
      DP_INSTALL_PROFILE: '',
      DP_MODULE_VERSION: undefined,
      DP_PATCH_FILE: undefined,
      DP_PROJECT_NAME: undefined,
      DP_PROJECT_TYPE: undefined
    },
    versions: {}
  }),
  computed: {
    href: ({ repo, variables }) => `https://gitpod.io/#${variables}/${repo}`,
    modules: ({ $drupalorg }) => Object.fromEntries(Object.entries($drupalorg.modules).map(([k, v]) => [k, v.title])),
    variables: ({ model }) => Object.entries(model).filter(([k, v]) => v).map(([k, v]) => `${k}=${v}`).join(','),
  },
  watch: {
    async 'model.DP_PROJECT_NAME'() {
      this.loading = true
      this.versions[this.model.DP_PROJECT_NAME] = await this.$drupalorg.getVersions(this.model.DP_PROJECT_NAME)
      this.loading = false
    }
  }
}
</script>
