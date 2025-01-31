// import { HTTPTransport } from "./XHR";

// describe("HTTPTransport", () => {
//   // type MockXMLHttpRequest = {
//   //   open: jest.Mock;
//   //   send: jest.Mock;
//   //   setRequestHeader: jest.Mock;
//   //   getAllResponseHeaders: jest.Mock;
//   //   responseText: string;
//   //   status: number;
//   //   statusText: string;
//   //   onload: () => void;
//   //   onerror: () => void;
//   //   onabort: () => void;
//   //   ontimeout: () => void;
//   // };

//   // let mockXHR: MockXMLHttpRequest;

//   // beforeEach(() => {
//   //   mockXHR = {
//   //     open: jest.fn(),
//   //     send: jest.fn(),
//   //     setRequestHeader: jest.fn(),
//   //     getAllResponseHeaders: jest.fn(),
//   //     responseText: JSON.stringify({ data: "test" }),
//   //     status: 200,
//   //     statusText: "OK",
//   //     onload: jest.fn(),
//   //     onerror: jest.fn(),
//   //     onabort: jest.fn(),
//   //     ontimeout: jest.fn(),
//   //   };
//   // });
//   // HTTP methods (GET, POST, PUT, DELETE) correctly send requests with proper method type
//   // it("should send request with correct HTTP method when calling corresponding method", () => {
//   //   const transport = new HTTPTransport("http://test.com");
//   //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   //   global.XMLHttpRequest = jest.fn(() => mockXHR) as any;
//   //   transport.get("/test");
//   //   expect(mockXHR.open).toHaveBeenCalledWith("GET", "http://test.com/test");

//   //   // await transport.post("/test");s
//   //   // expect(mockXHR.open).toHaveBeenCalledWith("POST", "http://test.com/test");

//   //   // await transport.put("/test");
//   //   // expect(mockXHR.open).toHaveBeenCalledWith("PUT", "http://test.com/test");

//   //   // await transport.delete("/test");
//   //   // expect(mockXHR.open).toHaveBeenCalledWith("DELETE", "http://test.com/test");
//   // });

//   // Handle requests with missing or undefined options

//   // Instance methods correctly combine baseUrl with provided url
//   // it('should combine baseUrl with provided url when calling instance methods', () => {
//   //   const baseUrl = 'https://api.example.com';
//   //   const transport = new HTTPTransport(baseUrl);
//   //   const url = '/endpoint';
//   //   const options = { method:"GET" };

//   //   jest.spyOn(HTTPTransport, 'GET').mockImplementation((fullUrl, opts) => {
//   //     expect(fullUrl).toBe(`${baseUrl}${url}`);
//   //     return Promise.resolve({ ok: true, status: 200, statusText: 'OK', data: '', json: () => ({}), headers: '' });
//   //   });

//   //   transport.get(url, options);
//   // });

//   // Request with data properly sends JSON stringified payload
//   // it('should send JSON stringified payload when data is provided', () => {
//   //   const baseUrl = 'https://api.example.com';
//   //   const transport = new HTTPTransport(baseUrl);
//   //   const url = '/endpoint';
//   //   const data = { key: 'value' };
//   //   const options = { method: METHODS.POST, data };

//   //   jest.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation(function (body) {
//   //     expect(body).toBe(JSON.stringify(data));
//   //   });

//   //   transport.post(url, options);
//   // });

//   // FormData is sent directly without stringification
//   // it('should send FormData directly without stringification', () => {
//   //   const baseUrl = 'https://api.example.com';
//   //   const transport = new HTTPTransport(baseUrl);
//   //   const url = '/endpoint';
//   //   const formData = new FormData();
//   //   formData.append('key', 'value');
//   //   const options = { method: METHODS.POST, data: formData };

//   //   jest.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation(function (body) {
//   //     expect(body).toBe(formData);
//   //   });

//   //   transport.post(url, options);
//   // });

//   // GET requests with data append parameters as query string
//   it("should append data as query string in GET requests", () => {
//     // Arrange
//     const baseUrl = "https://api.example.com";
//     const httpTransport = new HTTPTransport(baseUrl);
//     const url = "/endpoint";
//     const data = { param1: "value1", param2: "value2" };
//     const expectedUrl = `${baseUrl}${url}?param1=value1&param2=value2`;

//     jest.spyOn(XMLHttpRequest.prototype, "open").mockImplementation(function (_method, url) {
//       expect(url).toBe(expectedUrl);
//     });

//     // Act
//     httpTransport.get(url, { data });

//     // Assert
//     expect(XMLHttpRequest.prototype.open).toHaveBeenCalledWith("GET", expectedUrl);
//   });

//   // Successful requests return parsed response with correct status and data
//   it('should return parsed response with correct status and data on success', async () => {
//     // Arrange
//     const baseUrl = 'https://api.example.com';
//     const httpTransport = new HTTPTransport(baseUrl);
//     const url = '/endpoint';
//     const mockResponse = {
//       ok: true,
//       status: 200,
//       statusText: 'OK',
//       data: '{"key":"value"}',
//       json: () => ({ key: 'value' }),
//       headers: ''
//     };

//     jest.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation(function() {
//       this.status = 200 ;
//       this.responseText = '{"key":"value"}';
//       this.onload();
//     });

//     // Act
//     const result = await httpTransport.get(url);

//     // Assert
//     expect(result).toEqual(mockResponse);
//   });

//   // Handle requests with empty or malformed URLs
//   // it('should reject request with error when URL is empty or malformed', async () => {
//   //   // Arrange
//   //   const baseUrl = 'https://api.example.com';
//   //   const httpTransport = new HTTPTransport(baseUrl);

//   //   // Act & Assert
//   //   await expect(httpTransport.get('')).rejects.toEqual('Не задан метод');
//   //   await expect(httpTransport.get('invalid-url')).rejects.toEqual('Не задан метод');
//   // });
// });
