import { HTTPTransport } from "./XHR";

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
});
