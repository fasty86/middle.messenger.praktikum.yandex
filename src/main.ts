import "./styles/main.pcss";
import { isAnchorElement } from "./types/typeguards.ts";

import { router as newRouter } from "./router/router.ts";

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (isAnchorElement(e.target)) {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
      }
    }
  });
  newRouter.go(window.location.pathname);
});
