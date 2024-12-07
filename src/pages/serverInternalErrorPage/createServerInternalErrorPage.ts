const serverInternalErrorTemplate = `<div class="app">
  <div class="util-container ">
  <h1 class="util-title">500</h1>
  <h3 class="util-text">мы уже фиксим</h3>
   {{> Link href="/chat" text="назад к чатам" className="util-link"}}
  </div>
</div>`;
export { serverInternalErrorTemplate as ServerErrorPage };
