import './notFoundPage.pcss';
const notFoundPageTemplate = `<div class="app">
  <div class="util-container">
  <h1 class="util-title">404</h1>
  <h3 class="util-text">Не туда попали</h3>
   {{> Link href="/chat" text="назад к чатам" className="util-link"}}
  </div>
</div>`;
export { notFoundPageTemplate as NotFoundPage };
