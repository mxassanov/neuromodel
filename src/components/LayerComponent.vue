<template>
  <div
      class="w-36 h-28 rounded-2xl overflow-hidden shadow-lg"
      :style="{'background-color': data.color}"
      v-draggable
  >
    <button
        @click.prevent="$emit('removeLayer')"
        class="text-gray-700 hover:text-white cursor-pointer transform hover:scale-125 float-right pt-2 pr-3"
        :disabled="disableRemoveBtn"
    >
      <i class="fas fa-times-circle" title="Удалить"></i>
    </button>
    <div class="px-2 py-4">
      <div
          class="font-bold text-md mb-2 text-left focus:bg-white focus:outline-none pt-2"
          contenteditable="true"
          @focusout="$emit('focusoutLayer', editData)"
          ref="layer"
      >
        {{ data.title }}
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'layer-component',
  props: ['data', 'index'],
  computed: {
    ...mapGetters('network', ['LAYERS']),
    editData() {
      return {
        'elem': this.$refs.layer,
        'color': this.data.color,
      }
    },
    disableRemoveBtn() {
      return this.LAYERS.length > 1 && this.index === 0
    }
  }
}
</script>