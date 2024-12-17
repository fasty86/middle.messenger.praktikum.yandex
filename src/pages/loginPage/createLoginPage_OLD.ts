const loginPageTemplate = `<div class="app">
<div class="form">
  <h1>Вход</h1>
    {{> Form  formGroup=data button=button link=link formClassName=formClassName}}
  </div>
</div>`;
export { loginPageTemplate as LoginPage };
