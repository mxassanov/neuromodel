<template>
  <div ref="layerContainer"
      v-draggable="draggableValue"
      class="w-36 h-28 rounded-2xl overflow-hidden shadow-lg fixed"
       :style="{'background-color': data.color}"
       @click="$emit('changePos', dataLayer)"
       >
    <button
        v-if="removeBtn"
        class="text-gray-700 hover:text-white cursor-pointer transform hover:scale-125
        float-right pt-2 pr-3"
    >
      <i class="fas fa-times-circle" title="Удалить"
         @click.self.stop="$emit('removeLayer')"></i>
    </button>
    <div class="px-2 py-4">
      <div
          class="font-bold text-md mb-2 text-left focus:bg-white focus:outline-none mt-6"
          contenteditable="true"
          ref="layer"
          @blur.stop="$emit('focusoutLayer', dataLayer)"
      >
        {{ data.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { Draggable } from 'draggable-vue-directive';

export default {
  name: 'layer-component',
  props: ['data', 'index', 'draggableContainer'],
  directives: {
    Draggable,
  },
  data() {
    return {
      draggableValue: {
        boundingElement: undefined,
        onDragEnd: undefined,
      },
      dataLayer: {
        elem: null,
        color: this.data.color,
        id: this.data.id,
        coords: {
          left: null,
          top: null,
        },
      },
    };
  },
  mounted() {
    this.$set(this.draggableValue, 'boundingElement', this.draggableContainer);
    this.$set(this.draggableValue, 'onDragEnd', this.onPosChanged);
    this.$refs.layerContainer.style.left = `${this.posLeftDefine}px`;
    this.$refs.layerContainer.style.top = `${this.posTopDefine}px`;
    this.dataLayer.elem = this.$refs.layer;
  },
  computed: {
    ...mapGetters('networks', ['LAYERS']),
    posLeftDefine() {
      return this.data.coordsLayer.left
        ? this.data.coordsLayer.left
        : this.layerPosLeft[this.index];
    },
    posTopDefine() {
      return this.data.coordsLayer.top
        ? this.data.coordsLayer.top
        : this.layerPosTop;
    },
    layerPosLeft() {
      const width = document.documentElement.clientWidth - 150;
      return {
        0: 0,
        1: width,
        2: width / 2,
        3: width / 2 - (width / 2) / 2,
        4: width / 2 + (width / 2) / 2,
        5: width / 2 - ((width / 2) / 2) / 2,
        6: width / 2 + ((width / 2) / 2) / 2,
        7: width - ((width / 2) / 2) / 2,
        8: ((width / 2) / 2) / 2,
      };
    },
    layerPosTop() {
      return document.documentElement.clientHeight / 2;
    },
    removeBtn() {
      return this.index > 1;
    },
  },
  methods: {
    onPosChanged(positionDiff, absolutePosition) {
      const coordsObj = {
        left: absolutePosition.left,
        top: absolutePosition.top,
      };
      this.$set(this.dataLayer, 'coords', coordsObj);
    },
  },
};
</script>
