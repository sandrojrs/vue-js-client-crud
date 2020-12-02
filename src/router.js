import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/atividades",
      name: "atividades",
      component: () => import("./components/AtividadeList")
    },
    {
      path: "/atividades/:id",
      name: "atividade-details",
      component: () => import("./components/Atividade")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddAtividade")
    }
  ]
});