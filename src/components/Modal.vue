<template>
  <div class="modal-overlay flex justify-center items-center"
       @click.self="$emit('closeModal')"
  >
    <div class="w-full max-w-sm">
      <form class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 rounded-2xl">
        <div class="mb-7 bg-gray-900 -mx-8 mt-4">
          <p class="text-white font-bold text-left pl-8 text-lg">Параметры датасета</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-300 text-sm font-bold mb-2 flex justify-start" for="datasetName">
            Название датасета:
          </label>
          <input
              v-model.lazy="newDataset.title"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 focus:bg-gray-900"
              id="datasetName" type="text" placeholder="Введите название датасета..." maxlength="50">
        </div>
        <div class="mb-6">
          <label class="block text-gray-300 text-sm font-bold mb-2 flex justify-start" for="tags">
            Теги (через запятую):
          </label>
          <input
              v-model.lazy="tagsStr"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 focus:bg-gray-900"
              id="tags" type="text" placeholder="Введите теги через запятую..." maxlength="100">
        </div>
        <div class="mb-6">
          <label class="block text-gray-300 text-sm font-bold mb-2 flex justify-start" for="size">
            Размер датасета:
          </label>
          <input
              v-model.lazy="newDataset.size"
              class="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline flex justify-start bg-gray-700 focus:bg-gray-900"
              id="size" type="number" placeholder="0">
        </div>
        <button
            class="w-full bg-gray-900 hover:text-white hover:bg-green-800 text-gray-400 font-bold py-2 px-4 border border-gray-300 rounded hover:border-gray-700 mb-8"
            type="button"
            @click.prevent="saveDataset"
        >
          Сформировать
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "modal",
  emits: ['closeModal'],
  props: ['isAddMode', 'isEditMode', 'editDatasetId'],
  watch: {
    tagsStr(value) {
      this.newDataset.tags = value.split(',')
    }
  },
  data() {
    return {
      newDataset: {
        title: '',
        tags: [],
        size: null
      },
      tagsStr: '',
      lastDatasetId: null
    }
  },
  computed: {
    ...mapGetters('dataset', ['DATASETS']),
  },
  methods: {
    ...mapActions('dataset', ['ADD_DATASET', 'EDIT_DATASET']),
    saveDataset() {
      if (this.isAddMode) {
        this.lastDatasetId = this.DATASETS[this.DATASETS.length - 1].id;
        this.$set(this.newDataset, 'id', this.lastDatasetId + 1);
        this.ADD_DATASET(this.newDataset);
      }
      if (this.isEditMode) {
        let payload = {};
        payload.dataset = this.newDataset;
        payload.id = this.editDatasetId;
        this.EDIT_DATASET(payload);
      }
      this.$emit('closeModal');
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>