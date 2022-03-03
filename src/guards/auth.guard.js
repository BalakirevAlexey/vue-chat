import router from "@/router";

export default function authGuard(store) {
  const aythRoutes = ["Login", "ForgotPassword", "SignUp"];

  router.beforeEach((to, from, next) => {
    if (aythRoutes.includes(to.name) && store.state.auth.isLogedIn) {
      return next({ name: "Home" });
    }

    if (!aythRoutes.includes(to.name) && !store.state.auth.isLogedIn) {
      return next({ name: "Login" });
    }

    return next();
  });
}
