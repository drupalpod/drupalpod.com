<template>
  <div class="container flex flex-col h-full items-center justify-center mx-auto">
    <div
      class="form-control w-full"
      :class="{ 'input-group': model.project.id }"
    >
      <div class="flex my-2">
        <!-- Project name -->
        <div class="w-full">
          <ProjectSearch :placeholder="placeholder">
            <template #default="{ meta }">
              <a v-text="meta.title" @click="setProject(meta)" />
            </template>
          </ProjectSearch>
        </div>

        <!-- Project version -->
        <select
          v-if="model.project.id && versions[model.project.id]"
          class="select select-bordered select-lg"
          v-model="model.version"
        >
          <option
            v-for="version of versions[model.project.id]"
            :key="[model.project.id, version].join('--')"
            :value="version"
            v-text="version"
          />
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
import Vue from 'vue'

export default {
  data: () => ({
    loading: false,
    repo: 'https://github.com/shaal/drupalpod',
    model: {
      project: {},
      version: undefined,
    },
    versions: {}
  }),
  computed: {
    href: ({ repo, variables }) => `https://gitpod.io/#${variables}/${repo}`,

    placeholder: ({ model }) => model.project.title || 'Drupal project name',

    variables: ({ model }) => Object.entries({
      DP_CORE_VERSION: undefined,
      DP_ISSUE_BRANCH: undefined,
      DP_ISSUE_FORK: undefined,
      DP_INSTALL_PROFILE: undefined,
      DP_MODULE_VERSION: model.version,
      DP_PATCH_FILE: undefined,
      DP_PROJECT_NAME: model.project.id,
      DP_PROJECT_TYPE: undefined
    }).filter(([k, v]) => v).map(([k, v]) => `${k}=${v}`).join(','),
  },

  methods: {
    setProject(meta) {
      Vue.set(this.model, 'version', undefined)
      Vue.set(this.model, 'project', meta)
    },

    setVersion(version) {
      Vue.set(this.model, 'version', version)
    }
  },

  watch: {
    async 'model.project'() {
      this.loading = true
      const versions = await this.$drupalorg.getVersions(this.model.project.nid)
      Vue.set(this.versions, this.model.project.id, versions)

      this.model.version = this.versions[this.model.project.id][0]
      this.loading = false
    }
  }
}
</script>
