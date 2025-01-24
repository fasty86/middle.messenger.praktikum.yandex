export class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create() {
    throw new Error("Not implemented");
  }

  request() {
    throw new Error("Not implemented");
  }

  update() {
    throw new Error("Not implemented");
  }

  delete() {
    throw new Error("Not implemented");
  }
}

export enum ApiDestinations {
  BASE = "https://ya-praktikum.tech/api/v2",
  RESOURCES = `${ApiDestinations.BASE}/resources`,
  AUTH = `${ApiDestinations.BASE}/auth`,
  USER = `${ApiDestinations.BASE}/user`,
  CHATS = `${ApiDestinations.BASE}/chats`,
}
