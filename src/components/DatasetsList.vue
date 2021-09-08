<template>
  <div id="root">
    <div id="tags">
      <div class="text-gray-200 font-bold flex justify-start m-4">Теги</div>
      <div class="flex justify-start flex-wrap m-2">
        <tag-component
            v-for="(tag, i) in uniqueTags"
            :key="i"
            :tag-name="tag"
        />
      </div>
      <hr class="bg-gray-800 my-4 h-1 border-none shadow-2xl w-full">
    </div>

    <div id="cards">
      <div class="flex justify-between">
        <div class="text-gray-200 font-bold justify-start m-4">Выберите датасет</div>
        <button class="bg-gray-500 hover:text-white hover:bg-gray-500 text-gray-200 font-bold px-3 border border-gray-300 rounded mr-6">
          Добавить датасет
        </button>
      </div>
      <div class="flex justify-start flex-wrap m-2">
        <card-component
            v-for="(dataset, i) in DATASETS"
            :key="i"
            :dataset="dataset"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import TagComponent from "./TagComponent";
import CardComponent from "./CardComponent";

export default {
  name: 'datasets-list',
  components: {CardComponent, TagComponent},
  mounted() {
    this.GET_DATASETS();
  },
  computed: {
    ...mapGetters(['DATASETS']),
    uniqueTags() {
      let tagArr = [];
      this.DATASETS.forEach(dataset => {
        tagArr = tagArr.concat(dataset.tags);
      });
      return [...new Set(tagArr)];
    }
  },
  methods: {
    ...mapActions(['GET_DATASETS'])
  },
}
</script>

<style scoped>

</style>