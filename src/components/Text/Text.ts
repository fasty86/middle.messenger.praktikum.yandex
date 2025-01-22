import "./text.pcss";
import Block from "../../framework/Block";
import { STATUS } from "../../framework/store/types";
import { PropsType } from "../../framework/types";
import { connect } from "../../utils/connect";

export default class Text extends Block<textPropsType> {
  render() {
    return `<div><{{{Tag}}} class="{{className}}">{{{text}}}</{{{Tag}}}></div>`;
  }
}

type textPropsType = PropsType & {
  rootData?: {
    text: string;
  };

  attributes?: {
    Tag: string;
    className: string;
  };
};

export const withUserName = connect<textPropsType>((state) => {
  const storedState = state.user || {};
  const component = {
    rootData: {
      text: state.user?.display_name ?? state.user?.first_name ?? "Guest",
    },
  };
  return { storedState, component };
});
export const withAvatarStatus = connect<textPropsType>((state) => {
  const storedState = { ...state.statuses };
  const status = state.statuses.avatarLoading;
  let text = "Загрузите файл";
  let className = "modal__title";
  switch (status) {
    case STATUS.LOADING:
      text = "Загрузка...";
      className = "modal__title loading";
      break;
    case STATUS.SUCCESS:
      text = "Файл загружен";
      className = "modal__title success";
      break;
    case STATUS.ERROR:
      text = "Ошибка, попробуйте еще раз";
      className = "modal__title error";
      break;
    default:
      break;
  }
  const component = {
    rootData: {
      text,
    },
    attributes: {
      className,
      Tag: "h3",
    },
  };
  return { storedState, component };
});
export const withUserDeleteloadStatus = connect<textPropsType>((state) => {
  const storedState = state.statuses;
  const status = state.statuses.userAdding;
  let text = "Введите логин пользователя";
  let className = "modal__title";
  switch (status) {
    case STATUS.LOADING:
      text = "Обработка...";
      className = "modal__title loading";
      break;
    case STATUS.SUCCESS:
      text = "Пользователь удален из чата";
      className = "modal__title success";
      break;
    case STATUS.ERROR:
      text = "Ошибка, попробуйте еще раз";
      className = "modal__title error";
      break;
    default:
      break;
  }
  const component = {
    rootData: {
      text,
    },
    attributes: {
      className,
      Tag: "h3",
    },
  };
  return { storedState, component };
});
export const withUserAddloadStatus = connect<textPropsType>((state) => {
  const storedState = state.statuses;
  const status = state.statuses.userAdding;
  let text = "Введите логин пользователя";
  let className = "modal__title";
  switch (status) {
    case STATUS.LOADING:
      text = "Обработка...";
      className = "modal__title loading";
      break;
    case STATUS.SUCCESS:
      text = "Пользователь добавлен в чат";
      className = "modal__title success";
      break;
    case STATUS.ERROR:
      text = "Ошибка, попробуйте еще раз";
      className = "modal__title error";
      break;
    default:
      break;
  }
  const component = {
    rootData: {
      text,
    },
    attributes: {
      className,
      Tag: "h3",
    },
  };
  return { storedState, component };
});
export const withFileUploadStatus = connect<textPropsType>((state) => {
  const storedState = state.statuses;
  const status = state.statuses.fileLoading;
  console.log("Обновление статуса загрузки файла:", state.statuses.fileLoading);

  let text = "Загрузите файл";
  let className = "modal__title";
  switch (status) {
    case STATUS.LOADING:
      text = "Загрузка...";
      className = "modal__title loading";
      break;
    case STATUS.SUCCESS:
      text = "Файл загружен";
      className = "modal__title success";
      break;
    case STATUS.ERROR:
      text = "Ошибка, попробуйте еще раз";
      className = "modal__title error";
      break;
    case STATUS.PENDING:
      text = "Загрузите файл";
      className = "modal__title";
      break;
    default:
      text = "Загрузите файл";
      className = "modal__title";
      break;
  }
  const component = {
    rootData: {
      text,
    },
    attributes: {
      className,
      Tag: "h3",
    },
  };
  return { storedState, component };
});
export const userName = withUserName(Text);
export const modalAvatarTitle = withAvatarStatus(Text);
export const modalFileUploadTitle = withFileUploadStatus(Text);
export const modalUserAddTitle = withUserAddloadStatus(Text);
export const modalUserDeleteTitle = withUserDeleteloadStatus(Text);
