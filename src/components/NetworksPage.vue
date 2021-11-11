<template>
  <div class="h-screen">
    <div class="p-3 flex justify-evenly">
      <button-component
          class="p-3"
          :state="IS_INPUT"
          @buttonComponentClick="inputLayer"
      >
        Входной слой
      </button-component>
      <button-component
          class="p-3"
          :state="!layersLimit"
          @buttonComponentClick="betweenLayers"
      >
        Промежуточный слой
      </button-component>
      <button-component
          class="p-3"
          :state="IS_OUTPUT"
          @buttonComponentClick="outputLayer"
      >
        Выходной слой
      </button-component>
      <button-component
          class="p-3"
          :state="null"
          @buttonComponentClick="REMOVE_ALL_LAYERS"
      >
        Удалить все слои
      </button-component>
    </div>
    <div ref="draggable" class="h-5/6">
      <layer-component
          v-for="(layer, i) in LAYERS"
          :key="layer.id"
          :index="i"
          :draggable-container="$refs.draggable"
          :data="layer"
          @focusoutLayer="editLayer($event, layer.id)"
          @removeLayer="REMOVE_LAYER(layer.id)"
          @changePos="editLayer($event, layer.id)"
          class="focus:outline-none cursor-pointer focus:bg-white"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'networks-page',
  mounted() {
    this.GET_LAYERS();
  },
  data: () => ({
    inputLayerColor: 'rgb(239,154,154)',
    outputLayerColor: 'rgb(129,212,250)',
    betweenLayersColor: 'rgb(174,213,129)',
    layersLimitMax: 9,
    layersLimitMin: 2,
  }),
  computed: {
    ...mapGetters(
      'networks', ['IS_INPUT', 'LAYERS', 'IS_OUTPUT'],
    ),
    layersLimit() {
      return this.LAYERS.length < this.layersLimitMax;
    },
  },
  methods: {
    ...mapActions('networks', [
      'GET_LAYERS',
      'REMOVE_ALL_LAYERS',
      'ADD_LAYER',
      'EDIT_LAYER',
      'REMOVE_LAYER',
    ]),
    ...mapMutations('networks', [
      'ADD_LAYERS',
      'CHANGE_IS_OUTPUT',
      'CHANGE_IS_INPUT',
    ]),
    createLayerData(color, title = 'введите текст..', id = this.LAYERS.length + 1, coordsLayer = { left: null, top: null }) {
      return {
        title,
        color,
        id,
        coordsLayer,
      };
    },
    inputLayer() {
      if (!this.IS_INPUT) {
        const layerData = this.createLayerData(this.inputLayerColor, 'входной слой', 1);
        this.ADD_LAYER(layerData);
        this.CHANGE_IS_INPUT(true);
      }
    },
    outputLayer() {
      if (!this.IS_OUTPUT && this.IS_INPUT) {
        const layerData = this.createLayerData(this.outputLayerColor, 'конечный слой', 2);
        this.ADD_LAYER(layerData);
        this.CHANGE_IS_OUTPUT(true);
      }
    },
    betweenLayers() {
      if (this.layersLimit && this.IS_OUTPUT && this.IS_INPUT) {
        let lastId = null;
        this.LAYERS.forEach((layer, i) => {
          if (i === this.LAYERS.length - 1) {
            lastId = layer.id;
          }
        });
        const layerData = this.createLayerData(this.betweenLayersColor, undefined, lastId + 1);
        this.ADD_LAYER(layerData);
      }
    },
    editLayer(data, id) {
      const text = data.elem.textContent.trim();
      const layerData = this.createLayerData(data.color, text, id, data.coords);
      const payload = {
        id, layerData,
      };
      this.EDIT_LAYER(payload);
    },
  },
};
</script>
