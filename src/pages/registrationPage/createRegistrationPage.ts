const registartionPageTemplate = `<div class="app">
{{> Navigation}}
<div class="form">
  <h1>Регистрация</h1>
    {{> Form  formGroup=data button=button link=link}}
  </div>

</div>`;
export { registartionPageTemplate as RegistrationPage };
