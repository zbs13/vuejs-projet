import Vue from "vue";
import VueRouter from "vue-router";
import homeRouter from "../routes/homeRouter";
import loginRouter from "../routes/loginRouter";
import signupRouter from "../routes/signupRouter";
import NotFound from "../pages/NotFound";

Vue.use(VueRouter);

const routes = [
  ...homeRouter,
  ...loginRouter,
  ...signupRouter,
  {
    path: "/*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// router.beforeEach((to, from, next) => {
//   const auth = {
//     isLoggued: false,
//   };
//   if (to.matched.some((route) => route.meta.private) && auth.isLoggued) {
//     next({
//       path: "/",
//       params: {
//         id: "redirect",
//       },
//     });
//     notificationCenter.notify({
//       msg: "Vous devez être loggué",
//       severity: "error",
//     });
//   }
//   next();
// });

export default router;