import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    meta: {
      title: "Просмотр документов"
    }, 
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/views/DashboardView.vue"),
  },
  {
    path: "/404",
    name: "pageNotFound",
    meta: {
      title: "Страница не найдена"
    }, 
    component: () =>
      import(
        /* webpackChunkName: "page-not-found" */ "@/views/PageNotFound.vue"
      ),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to: any) => {
  document.title = to.meta.title || "Cism Test Task";
});

export default router;
