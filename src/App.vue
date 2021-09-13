<template>
  <div id="app" class="bg-gray-700">
    <div class="navigation bg-gray-700">
      <ul class="flex border-b">
        <li
            @click.prevent="showAllDatasets"
            class="-mb-px mr-1"
        >
          <router-link
              to="/" exact
              class="bg-gray-700 inline-block py-2 px-4 text-gray-300 hover:text-white font-semibold font-mono"
              active-class="border-l border-t border-r rounded-t bg-gray-200">
            Датасеты
          </router-link>
        </li>
        <li class="mr-1">
          <router-link
              to="/networks"
              class="bg-gray-700 inline-block py-2 px-4 text-gray-300 hover:text-white font-semibold font-mono"
              active-class="border-l border-t border-r rounded-t -mb-px bg-gray-200">
            Нейронные сети
          </router-link>
        </li>
      </ul>
    </div>

    <div class="mt-3">
      <router-view/>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: 'App',
  methods: {
    ...mapMutations('dataset', ['SET_TAG_FOR_FILTER']),
    showAllDatasets() {
      this.SET_TAG_FOR_FILTER(null);
    }
  }
}
</script>

<style>
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
