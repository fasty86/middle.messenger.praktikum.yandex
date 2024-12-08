import './styles/main.pcss';
// import App from './App.ts';
import { isAnchorElement } from './types/typeguards.ts';
import { router, navigateTo } from './router/router.ts';

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (isAnchorElement(e.target)) {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        navigateTo(e.target.href);
      }
    }
  });
  router();
});
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new App();
//   app.render();
// });
