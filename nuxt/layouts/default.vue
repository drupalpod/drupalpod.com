<template>
  <div class="flex flex-col h-screen">
    <DruxtBlockRegion
      class="flex-0 p-4"
      name="header"
      :theme="theme"
    />

    <Nuxt class="flex-grow" />

    <DruxtBlockRegion
      name="footer"
      :theme="theme"
    />
  </div>
</template>

<script>
import DrupalPodConfig from '~/mixins/config'

export default {
  mixins: [DrupalPodConfig],

  head: ({ config }) => ({
    title: config.site.name
  }),

  computed: {
    theme: () => 'stark'
  }
}
</script>
