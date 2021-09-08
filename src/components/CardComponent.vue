<template>
  <div>
    <div class="max-w-xs rounded overflow-hidden shadow-lg bg-gray-600 border border-gray-300 m-2" style="width: 250px">
      <div class="px-6 py-4 flex justify-between">
        <div class="font-bold text-xl mb-2 text-white flex justify-start">{{ dataset.title }}</div>
        <div>
          <i class="fas fa-pen mx-3 text-gray-300 hover:text-gray-100 cursor-pointer" title="Редактировать"></i>
          <i class="fas fa-times -mt-2 -mr-3 text-gray-300 hover:text-gray-100 cursor-pointer" title="Удалить"></i>
        </div>
      </div>
      <hr class="bg-gray-500 h-0.5 border-none shadow-2xl">
      <div class="px-6 pt-6 pb-6" style="height: 150px">
        <span
            v-for="(tag, i) in dataset.tags"
            :key="i"
            class="block flex justify-start text-sm font-semibold text-gray-300 mr-2"># {{ tag }}</span>
      </div>
      <hr class="bg-gray-500 h-0.5 border-none shadow-2xl">
      <div class="px-6 pt-1 pb-2 bg-gray-600">
        <span class="block flex justify-start py-1 text-lg font-bold text-gray-400 mr-2 mb-2">{{ defaultSize }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-component',
  props: ['dataset'],
  computed: {
    defaultSize() {
      return this.dataset.size ? `${this.dataset.size} MB` : 'предустановленный';
    }
  }
}
</script>