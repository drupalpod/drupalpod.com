<template>
  <div class="container mx-auto">
    <div class="flex form-control justify-center items-center h-full">
      <!-- @TODO - Add project select field -->
      <!-- <input
        class="mb-2 input input-bordered input-lg w-full"
        type="text"
        placeholder="Drupal project name"
      /> -->
      <a class="btn w-full" :href="href">Start DrupalPod</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // @TODO - Craft URL based on project browser and advanced settings.
    href: () => 'https://gitpod.io/#github.com/shaal/drupalpod'
  }
}
</script>
