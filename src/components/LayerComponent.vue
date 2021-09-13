<template>
  <div
      class="w-1/12 h-1/6 rounded-2xl overflow-hidden shadow-lg"
      :style="{'background-color': data.color}"
  >
    <div class="px-2 py-4">
      <div class="font-bold text-md mb-2 text-left">
        {{ data.title }}
      </div>
      <p class="text-gray-700 text-md text-left">
        {{ data.desc }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layer-component',
  props: ['data']
}
</script>