import { HTTPTransport } from "../XHR";
import { ApiDestinations, BaseAPI } from "./base-api";

const resourceApiInstance = new HTTPTransport(ApiDestinations.RESOURCES);

export class ResourceAPI extends BaseAPI {
  static async file_upload(file: FormData) {
    return resourceApiInstance.post("", {
      data: file,
      credentials: true,
    });
  }
}
