import './form.pcss';
export default `<form class="login__form">
        <div class="form__group">
            {{> Input id="name_id" type="text" placeholder="" value=""  className="input form__input"}}
            {{> Label forAttr="username" text="Логин" className="label form__label"}}
        </div>
        <div class="form__group">
            {{> Input id="password_id" name="password" type="password" placeholder="" value="" className="input form__input"}}
            {{> Label forAttr="password" text="Пароль" className="label form__label"}}
        </div>
            {{> Button id="login" text="Авторизоваться" disabled=createButtonEnabled className="button form__button"}}
            {{> Link href="/register" text="Нет аккаунта?" className="link form__link"}}
    </form>`;
