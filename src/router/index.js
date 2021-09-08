import Vue from "vue";
import Router from "vue-router";

import DatasetsList from "../components/DatasetsList";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      alias: "/datasets",
      name: "datasets",
      component: DatasetsList
    },
    {
      path: "/add",
      name: "add",
      component: () => import("../components/AddDataset.vue")
    }
  ]
})