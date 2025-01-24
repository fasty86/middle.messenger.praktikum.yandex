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
  RESOURCES = "https://ya-praktikum.tech/api/v2/resources",
  BASE = "https://ya-praktikum.tech/api/v2",
  AUTH = "https://ya-praktikum.tech/api/v2/auth",
  USER = "https://ya-praktikum.tech/api/v2/user",
}
