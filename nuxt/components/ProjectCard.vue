<template>
  <div
    v-if="!$fetchState.pending"
    class="card card-bordered bg-base-100 shadow-xl w-full my-2"
  >
    <div class="card-body">
      <h2 class="card-title" v-text="project.title" />

      <div v-html="project.body.summary || ellipsize(project.body.value, 320)" />

      <div class="justify-end card-actions">
        <a :href="project.url" class="btn btn-primary" target="_blank">Project page</a>
      </div>
    </div>
  </div>
</template>

<script>
import ellipsize from 'ellipsize'

export default {
  props: {
    nid: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    project: undefined,
  }),

  async fetch() {
    this.project = await this.$drupalorg.getProject(this.nid)
  },

  methods: {
    ellipsize(string, length) {
      return ellipsize(string, length)
    }
  },

  watch: {
    nid() {
      this.$fetch()
    }
  }
}
</script>
