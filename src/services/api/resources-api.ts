import { HTTPTransport } from "../XHR";
import { BaseAPI } from "./base-api";

const resourceApiInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2/resources");

export class ResourceAPI extends BaseAPI {
  static async file_upload(file: FormData) {
    return resourceApiInstance.post("", {
      data: file,
      credentials: true,
    });
  }
}
