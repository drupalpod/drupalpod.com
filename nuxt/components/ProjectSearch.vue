<template>
  <div ref="lunr" class="lunr-search w-full">
    <input
      :id="`lunr-search${elementId}`"
      v-model="searchText"
      type="text"
      class="input input-bordered input-lg w-full"
      :placeholder="placeholderText"
      aria-label="Search"
      aria-haspopup="true"
      :aria-expanded="showResults"
      autocomplete="off"
      spellcheck="false"
      @keyup.enter="keyEnter"
      @keyup.up="keyUp"
      @keyup.down="keyDown"
    >

    <ul
      v-show="showResults"
      ref="results"
      class="absolute bg-base-100 text-base-content card card-bordered menu w-full text-secondary-content p-2 rounded-box -my-1 border-t-0 rounded-tl-none rounded-tr-none z-50"
      tabIndex="-1"
      :aria-labelledby="`lunr-search${elementId}`"
      @keyup.enter="keyEnter"
      @keydown.up.stop.prevent
      @keydown.down.stop.prevent
      @keyup.up.stop.prevent="keyUp"
      @keyup.down.stop.prevent="keyDown"
    >
      <li
        v-if="statusMsg"
        class="lunr-status"
      >
        {{ statusMsg }}
      </li>
      <li
        v-for="(result, index) in searchResults.slice(0, 10)"
        :key="`search${elementId}-${result.ref}`"
        class="lunr-result"
        :tabIndex="100 + index"
        @click.prevent="closeResults"
      >
        <slot
          :result="result"
          :index="index"
          :max-score="maxScore"
          :meta="getResultMeta(result)"
        >
          <nuxt-link :to="result.ref" role="menuitem">
            {{ result.ref }}
            <span class="text-right">{{ result.score }}</span>
          </nuxt-link>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
import LunrSearch from 'lunr-module/search'

export default {
  extends: LunrSearch,
  methods: {
    async search (txt) {
      if (!this.searchIndex) {
        const indexLoaded = await this.loadIndex()

        if (!indexLoaded) {
          return
        }
      }

      this.setStatus('searching')

      txt = txt + '* ' + txt
      this.searchResults = this.searchIndex.search(txt)

      if (!this.searchResults || !this.searchResults.length) {
        this.setStatus('noresults')
      } else {
        this.clearStatus()
      }

      this.openResults()
    },
  }
}
</script>
