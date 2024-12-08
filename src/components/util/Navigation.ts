export default `<nav class="util_nav">
<ul>
   <li> {{> Link href="/login" text="логин" className=""}}</li>
    <li>{{> Link href="/registration" text="регистрация" className=""}}</li>
    <li>{{> Link href="/chat" text='чат' className=""}}</li>
    <li>{{> Link href="/profile" text='профиль' className=""}}</li>
    <li>{{> Link href="/profile/edit/data" text='изменение данных профиля' className=""}}</li>
    <li>{{> Link href="/profile/edit/password" text='изменение пароля' className=""}}</li>
    <li>{{> Link href="/notFound" text="404" className=""}}</li>
    <li>{{> Link href="/serverError" text="500" className=""}}</li>
     </ul>
</nav>`;
