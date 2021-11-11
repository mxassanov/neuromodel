<template>
    <button
        @click.prevent="$emit('buttonComponentClick')"
        class="hover:bg-gray-500 text-gray-200 font-bold px-3 border border-gray-300 rounded mr-6"
        :class="[bcgColor, hoverText]"
    >
      <slot />
    </button>
</template>

<script>
export default {
  name: 'button-component',
  props: ['state'],
  computed: {
    bcgColor() {
      return this.state ? 'bg-gray-500' : 'bg-gray-600';
    },
    hoverText() {
      return this.state ? '' : 'hover:text-white';
    },
  },
};
</script>
