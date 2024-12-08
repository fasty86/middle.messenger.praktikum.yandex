export default `<div class="util_nav">
    {{> Link href="/login" text="логин" className=""}}
    {{> Link href="/registration" text="регистрация" className=""}}
    {{> Link href="/chat" text='чат' className=""}}
    {{> Link href="/profile" text='профиль' className=""}}
    {{> Link href="/profile/edit/data" text='изменение данных профиля' className=""}}
    {{> Link href="/profile/edit/password" text='изменение пароля' className=""}}
    {{> Link href="/notFound" text="404" className=""}}
    {{> Link href="/serverError" text="500" className=""}}
</div>`;
