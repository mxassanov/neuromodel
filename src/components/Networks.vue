<template>
  <div class="h-screen flex flex-col">
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
    <div class="h-full flex items-center justify-between">
      <layer-component
          v-for="(layer, i) in LAYERS"
          :key="i"
          :index="i"
          :data="layer"
          @focusoutLayer="editText($event, i)"
          @removeLayer="removeLayer(i)"
          class="focus:outline-none cursor-pointer focus:bg-white"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "Networks",
  mounted() {
    this.GET_LAYERS_FROM_LOCALSTORAGE();
  },
  computed: {
    ...mapGetters('network', ['LAYERS', 'IS_INPUT', 'IS_OUTPUT']),
    layersLimit() {
      return this.LAYERS.length < 8
    }
  },
  methods: {
    ...mapActions('network', [
      'GET_LAYERS_FROM_LOCALSTORAGE',
      'SET_LAYERS_TO_LOCALSTORAGE',
      'DELETE_LAYERS_FROM_LOCALSTORAGE',
      'REMOVE_ALL_LAYERS',
    ]),
    ...mapMutations(
        'network', [
          'ADD_LAYER',
          'ADD_BETWEEN_LAYERS',
          'CHANGE_IS_INPUT',
          'CHANGE_IS_OUTPUT',
          'REPLACE_LAYER_DATA',
          'REMOVE_LAYER',
        ]
    ),
    createLayerData(color, title = 'введите текст..') {
      return {
        title,
        color
      }
    },
    inputLayer() {
      if (!this.IS_INPUT) {
        const layerData = this.createLayerData('orange', 'ВХОД');
        this.ADD_LAYER(layerData);
        this.CHANGE_IS_INPUT(true);
      }
    },
    outputLayer() {
      if (!this.IS_OUTPUT && this.IS_INPUT) {
        const layerData = this.createLayerData('purple', 'ВЫХОД');
        this.ADD_LAYER(layerData);
        this.CHANGE_IS_OUTPUT(true);
      }
    },
    betweenLayers() {
      if (this.layersLimit && this.IS_OUTPUT && this.IS_INPUT) {
        const layerData = this.createLayerData('darkcyan');
        this.ADD_BETWEEN_LAYERS(layerData);
        this.SET_LAYERS_TO_LOCALSTORAGE();
      }
    },
    editText(data, index) {
      const text = data.elem.textContent.trim();
      const layerData = this.createLayerData(data.color, text);
      let payload = {
        index,
        layerData
      }
      this.REPLACE_LAYER_DATA(payload);
      this.SET_LAYERS_TO_LOCALSTORAGE();
    },
    removeLayer(index) {
      if (index === 0) this.CHANGE_IS_INPUT(false);
      if (index === this.LAYERS.length - 1) this.CHANGE_IS_OUTPUT(false);
      this.REMOVE_LAYER(index);
      this.SET_LAYERS_TO_LOCALSTORAGE();
      if (this.LAYERS.length < 2) {
        this.DELETE_LAYERS_FROM_LOCALSTORAGE()
      }
    }
  }
}
</script>