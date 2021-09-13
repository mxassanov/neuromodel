<template>
  <div class="h-screen flex flex-col">
    <div class="p-3">
      <button-component
          class="p-3"
          :state="IS_INPUT"
          @buttonComponentClick="inputLayer"
      >
        Добавить входной слой
      </button-component>
      <button-component
          class="p-3"
          :state="!layersLimit"
          @buttonComponentClick="betweenLayers"
      >
        Добавить промежуточный слой
      </button-component>
      <button-component
          class="p-3"
          :state="IS_OUTPUT"
          @buttonComponentClick="outputLayer"
      >
        Добавить выходной слой
      </button-component>
    </div>
    <div class="h-full flex items-center justify-between">
      <layer-component
          v-for="(layer, i) in LAYERS"
          :key="i"
          :data="layer"
      />
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Networks",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('network', ['LAYERS', 'IS_INPUT', 'IS_OUTPUT']),
    layersLimit() {
      return this.LAYERS.length < 8
    }
  },
  methods: {
    ...mapMutations(
        'network', ['ADD_LAYER', 'ADD_BETWEEN_LAYERS', 'CHANGE_IS_INPUT', 'CHANGE_IS_OUTPUT']
    ),
    inputLayer() {
      const layerData = {desc: ''};
      if (!this.IS_INPUT) {
        layerData.title = 'Вход';
        layerData.color = 'orange';
        this.ADD_LAYER(layerData);
        this.CHANGE_IS_INPUT();
      }
    },
    outputLayer() {
      const layerData = {desc: ''};
      if (!this.IS_OUTPUT && this.IS_INPUT) {
        layerData.title = 'Выход';
        layerData.color = 'darkgreen';
        this.ADD_LAYER(layerData);
        this.CHANGE_IS_OUTPUT();
      }
    },
    betweenLayers() {
      const layerData = {desc: '', title: ''};
      if (this.layersLimit && this.IS_OUTPUT && this.IS_INPUT) {
        layerData.color = 'darkcyan';
        this.ADD_BETWEEN_LAYERS(layerData);
      }
    }
  }
}
</script>