import { DefaultObject } from "../framework/types";

enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
export type Options = {
  ignoreCache?: boolean;
  headers?: { [key: string]: string };
  tries?: number;
  timeout?: number;
  method: METHODS;
  data?: DefaultObject;
};
export type RequestResult = {
  ok: boolean;
  status: number;
  statusText: string;
  data: string;
  json: <T>() => T;
  headers: string;
};
type XHRMethod = (url: string, options: Options) => Promise<RequestResult>;
type XHRMethodInstance = (url: string, options?: Partial<Options>) => Promise<RequestResult>;

function parseXHRResult(xhr: XMLHttpRequest): RequestResult {
  return {
    ok: xhr.status >= 200 && xhr.status < 300,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: xhr.responseText,
    json: <T>() => JSON.parse(xhr.responseText) as T,
  };
}
function errorResponse(xhr: XMLHttpRequest, message: string | null = null): RequestResult {
  return {
    ok: false,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: message || xhr.statusText,
    json: <T>() => JSON.parse(message || xhr.statusText) as T,
  };
}
export function fetchWithRetry(url: string, options: Options): Promise<RequestResult> {
  const limit = options.tries ? options.tries : 1;
  let tries = 1;
  const method = options.method;
  const req = async (url: string, options: Options): Promise<RequestResult> =>
    HTTPTransport[method](url, options).catch((e) => {
      if (tries <= limit) {
        tries++;
        return req(url, { ...options, tries });
      } else return errorResponse(e, "Превышение максимального числа попыток");
    });
  return req(url, options);
}

function queryStringify<T extends DefaultObject>(data: T): string {
  return Object.keys(data).reduce((acc: string, current: keyof T): string => {
    acc = acc === "" ? "?" : `${acc}&`;
    const value = data[current];
    return `${acc}${String(current)}=${value !== null && value !== undefined ? encodeURIComponent(value.toString()) : ""}`;
  }, "");
}

export class HTTPTransport {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  get: XHRMethodInstance = (url, options) => {
    if (!options || !options.method) {
      options = { ...options, method: METHODS.GET };
    }
    const fullUrl = this.baseUrl + url;
    return HTTPTransport.GET(fullUrl, options as Options);
  };
  post: XHRMethodInstance = (url, options) => {
    if (!options || !options.method) {
      options = { ...options, method: METHODS.POST };
    }
    const fullUrl = this.baseUrl + url;
    return HTTPTransport.POST(fullUrl, options as Options);
  };
  put: XHRMethodInstance = (url, options) => {
    if (!options || !options.method) {
      options = { ...options, method: METHODS.PUT };
    }
    const fullUrl = this.baseUrl + url;
    return HTTPTransport.PUT(fullUrl, options as Options);
  };
  delete: XHRMethodInstance = (url, options) => {
    if (!options || !options.method) {
      options = { ...options, method: METHODS.DELETE };
    }
    const fullUrl = this.baseUrl + url;
    return HTTPTransport.DELETE(fullUrl, options as Options);
  };
  static GET: XHRMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  static POST: XHRMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  static PUT: XHRMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  static DELETE: XHRMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  static request: XHRMethod = (url, options) => {
    const { headers = {}, method, data, ignoreCache } = options;

    return new Promise<RequestResult>(function (resolve, reject) {
      if (!method) {
        reject("Не задан метод");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      if (ignoreCache) {
        xhr.setRequestHeader("Cache-Control", "no-cache");
      }

      xhr.onload = function () {
        resolve(parseXHRResult(xhr));
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = options.timeout || 5000;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export const testHttp = () => {
  fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", {
    ignoreCache: true,
    headers: { "Content-Type": "application/json" },
    tries: 3,
    timeout: 10000,
    method: METHODS.GET,
  }).then((response) => {
    console.log(response);
    console.log(response.json());
  });
};
export const testHttpQueryParams = () => {
  fetchWithRetry("https://jsonplaceholder.typicode.com/posts", {
    ignoreCache: true,
    headers: { "Content-Type": "application/json" },
    tries: 3,
    timeout: 10000,
    method: METHODS.GET,
    data: {
      userId: "1",
    },
  }).then((response) => {
    console.log(response);
    console.log(response.json());
  });
};
