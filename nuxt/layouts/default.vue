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
export default {
  computed: {
    theme: () => 'stark'
  }
}
</script>
