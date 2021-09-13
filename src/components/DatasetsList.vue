<template>
  <div id="root">
    <modal
        v-if="isAddMode || isEditMode"
        @closeModal="closeModal"
        :editDatasetId="editDatasetId"
        :isAddMode="isAddMode"
        :isEditMode="isEditMode"
    />
    <div id="tags">
      <div
          v-if="uniqueTags.length"
          class="text-gray-200 font-bold flex justify-start m-4 font-mono"
      >
        <i class="fas fa-tags mr-2"></i>
        Выберите тег:
      </div>
      <div class="flex justify-start flex-wrap m-2">
        <tag-component
            v-for="(tag, i) in uniqueTags"
            :key="i"
            :tag-name="tag.toLowerCase().trim()"
            @filterByTag="SET_TAG_FOR_FILTER($event)"
        />
      </div>
      <hr class="bg-gray-800 my-4 h-1 border-none shadow-2xl w-full">
    </div>

    <div id="cards" class="pb-8">
      <div class="flex justify-between">
        <div
            v-if="DATASETS.length"
            class="text-gray-200 font-bold justify-start m-4 font-mono"
        >
          <i class="fas fa-bars mr-1"></i>
          Выберите датасет
        </div>
        <button-component @buttonComponentClick="isAddMode = true">
          Добавить датасет
        </button-component>
      </div>
      <div class="flex justify-start flex-wrap m-2">
        <card-component
            v-for="(dataset, i) in datasetsValue"
            :key="i"
            :dataset="dataset"
            @editItem="editItem(dataset.id)"
            @removeItem="REMOVE_DATASET(dataset.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: 'datasets-list',
  mounted() {
    this.GET_DATASETS();
  },
  data() {
    return {
      isAddMode: false,
      isEditMode: false,
      editDatasetId: null,
    }
  },
  computed: {
    ...mapGetters('dataset', ['DATASETS', 'TAG_FOR_FILTER']),
    uniqueTags() {
      let tagArr = [];
      this.DATASETS.forEach(dataset => {
        tagArr = tagArr.concat(dataset.tags);
      });
      return [...new Set(tagArr)];
    },
    datasetsValue() {
      return this.TAG_FOR_FILTER ? this.filterDatasetsByTags : this.DATASETS;
    },
    filterDatasetsByTags() {
      return this.DATASETS.filter(dataset => {
        return dataset.tags.find(tag => tag.toLowerCase().trim() === this.TAG_FOR_FILTER)
      })
    }
  },
  methods: {
    ...mapActions('dataset', ['GET_DATASETS', 'REMOVE_DATASET']),
    ...mapMutations('dataset', ['SET_TAG_FOR_FILTER']),
    closeModal() {
      this.isAddMode = false;
      this.isEditMode = false;
    },
    editItem(id) {
      this.isEditMode = true;
      this.editDatasetId = id;
    },
  },
}
</script>