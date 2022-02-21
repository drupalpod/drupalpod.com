<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl" v-text="config.site.name" />
    </div>

    <!-- @TODO - Add github icon and link -->
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <a
          :href="config.social.github"
          class="btn btn-ghost btn-circle"
          target="_blank"
        >
          <IconGithub class="h-8" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { DruxtBlocksRegionMixin } from 'druxt-blocks'
import DrupalPodConfig from '~/mixins/config'

export default {
  mixins: [DrupalPodConfig, DruxtBlocksRegionMixin]
}
</script>
