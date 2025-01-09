import "./styles/main.pcss";
import { isAnchorElement } from "./types/typeguards.ts";
import { router, navigateTo } from "./router/router.ts";
import { router as newRouter } from "./router/router2.ts";

window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (isAnchorElement(e.target)) {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        // navigateTo(e.target.href);
        // newRouter.go(e.target.href);
      }
    }
  });
  // router();
  newRouter.go("/");
});
