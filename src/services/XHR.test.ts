import { HTTPTransport, METHODS } from "./XHR";

describe("HTTPTransport", () => {
  type MockXMLHttpRequest = {
    open: jest.Mock;
    send: jest.Mock;
    setRequestHeader: jest.Mock;
    getAllResponseHeaders: jest.Mock;
    responseText: string;
    status: number;
    statusText: string;
    onload: () => void;
    onerror: () => void;
    onabort: () => void;
    ontimeout: () => void;
  };

  let mockXHR: MockXMLHttpRequest;

  beforeEach(() => {
    mockXHR = {
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      getAllResponseHeaders: jest.fn(),
      responseText: JSON.stringify({ data: "test" }),
      status: 200,
      statusText: "OK",
      onload: jest.fn(),
      onerror: jest.fn(),
      onabort: jest.fn(),
      ontimeout: jest.fn(),
    };
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("должен вызвать метод с переданным url", () => {
    const transport = new HTTPTransport("http://test.com");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.XMLHttpRequest = jest.fn(() => mockXHR) as any;
    transport.get("/test");
    expect(mockXHR.open).toHaveBeenCalledWith("GET", "http://test.com/test");
  });

  it("должен успешно распарсить ответ согласно формату RequestResult ", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      statusText: "OK",
      headers: "Content-Type: application/json",
      data: '{"message":"success"}',
      json: jest.fn().mockReturnValue({ message: "success" }),
    };
    jest.spyOn(HTTPTransport, "request").mockResolvedValue(mockResponse);
    const httpTransport = new HTTPTransport("https://api.example.com");

    const result = await httpTransport.get("/test");

    expect(result).toEqual(mockResponse);
    expect(result.json()).toEqual({ message: "success" });
  });

  it("должен возварщать ошибку при таймауте", async () => {
    const transport = new HTTPTransport("https://api.example.com");
    const mockErrorResponse = {
      ok: false,
      status: 0,
      statusText: "timeout",
      headers: "Content-Type: application/json",
      data: '{"message":"error"}',
      json: jest.fn().mockReturnValue({ message: "timeout" }),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.XMLHttpRequest = jest.fn(() => mockXHR) as any;

    jest.spyOn(HTTPTransport, "request").mockImplementation(() => {
      return new Promise((resolve) => {
        mockXHR.ontimeout = () => resolve(mockErrorResponse);
        setTimeout(() => {
          mockXHR.ontimeout();
        }, 100);
        jest.advanceTimersByTime(100);
      });
    });

    const promise = await transport.get("/test", { timeout: 100 });

    const result = await promise;

    expect(result.ok).toBe(false);
    expect(result.status).toBe(0);
    expect(result.statusText).toBe("timeout");
  });

  it("должен послать POST Запрос с заданным url и данными", async () => {
    const baseUrl = "https://api.example.com";
    const httpTransport = new HTTPTransport(baseUrl);
    const url = "/submit";
    const data = { key: "value" };
    const options = { headers: { "Content-Type": "application/json" }, data };
    jest.spyOn(HTTPTransport, "POST").mockResolvedValue({
      ok: true,
      status: 201,
      statusText: "Created",
      data: "",
      json: jest.fn(),
      headers: "",
    });

    const result = await httpTransport.post(url, options);

    expect(HTTPTransport.POST).toHaveBeenCalledWith(`${baseUrl}${url}`, { ...options, method: METHODS.POST });
    expect(result.ok).toBe(true);
  });
});
