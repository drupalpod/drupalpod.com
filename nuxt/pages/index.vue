<template>
  <div class="container flex flex-col h-full items-center justify-center mx-auto">
    <label class="label w-full">
      <span class="label-text">Drupal project</span>
    </label>
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
          v-if="!loading && model.project.id && versions[model.project.id]"
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
        <div
          v-else-if="loading && model.project.id"
          class="btn btn-lg loading"
        >
          Loading
        </div>

      </div>
    </div>

    <!-- Project card -->
    <ProjectCard
      v-if="model.project.id"
      :nid="model.project.nid"
    />

    <!-- Drupal settings -->
    <div class="flex flex-row w-full">
      <label class="label w-1/2">
        <span class="label-text">Install profile</span>
      </label>
      <label class="label w-1/2">
        <span class="label-text">Core version</span>
      </label>
    </div>
    <div class="flex flex-row form-control input-group my-2 w-full">
      <select
        class="select select-bordered select-lg w-1/2"
        v-model="model.profile"
      >
        <option
          v-for="profile of profiles"
          :key="profile"
          :value="profile"
          v-text="profile || '(none)'"
        />
      </select>
      <select
        class="select select-bordered select-lg w-1/2"
        v-model="model.core"
      >
        <option
          v-for="core of cores"
          :key="core"
          :value="core"
          v-text="core"
        />
      </select>
    </div>

    <!-- Start button -->
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
    // @TODO - Get these values from an API?
    // @SEE https://www.drupal.org/api-d7/node.json?type=project_release&field_release_project=3060
    cores: ['9.3.6', '10.0.x', '9.3.x', '9.2.x', '9.1.x', '9.0.x', '8.9.x'],
    loading: false,
    repo: 'https://github.com/shaal/drupalpod',
    model: {
      core: '9.3.6',
      profile: '',
      project: {},
      version: undefined,
    },
    // @TODO - Get these values from an API?
    profiles: ['', 'standard', 'demo_umami', 'minimal'],
    versions: {}
  }),
  computed: {
    href: ({ repo, variables }) => `https://gitpod.io/#${variables}/${repo}`,

    placeholder: ({ model }) => model.project.title || 'Drupal project name',

    variables: ({ model }) => Object.entries({
      DP_CORE_VERSION: model.core,
      DP_ISSUE_BRANCH: undefined,
      DP_ISSUE_FORK: undefined,
      DP_INSTALL_PROFILE: model.profile,
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
