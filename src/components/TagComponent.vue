<template>
  <button
      @click.prevent="$emit('filterByTag', tagName)"
      class="bg-gray-600 hover:text-gray-100 hover:bg-gray-500 text-gray-300 font-bold
      py-1 px-3 border border-gray-300 rounded m-2">
    {{ tagName }}
  </button>
</template>

<script>
export default {
  name: 'tag-component',
  props: ['tagName'],
};
</script>
