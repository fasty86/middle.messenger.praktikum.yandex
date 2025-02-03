import { Route } from "./route";
import { Router } from "./router";

jest.mock("./route", () => {
  return {
    Route: jest.fn().mockImplementation((pathname, block) => {
      return {
        pathname,
        block,
        render: jest.fn(),
      };
    }),
  };
});

jest.mock("./router", () => {
  return {
    Router: jest.fn().mockImplementation(() => {
      return {
        _rootQuery: "/",
        back: jest.fn(() => {
          window.history.back();
        }),
        forward: jest.fn(() => {
          window.history.forward();
        }),
        use: jest.fn().mockReturnThis(),
        routes: [] as Route[],
      };
    }),
  };
});

describe("Router", () => {
  let router: Router;

  beforeEach(() => {
    router = new Router("#app");
  });
  it("должен корретно отрабатывать навигацию вперед-назад используя history api", () => {
    const historyBackSpy = jest.spyOn(window.history, "back");
    const historyForwardSpy = jest.spyOn(window.history, "forward");

    router.back();
    router.forward();

    expect(historyBackSpy).toHaveBeenCalled();
    expect(historyForwardSpy).toHaveBeenCalled();
  });

  it("метод use должен возвращать текущий инстанс роутера", () => {
    const pathname = "/test";
    const block = jest.fn();

    const result = router.use(pathname, block);

    expect(result).toBe(router);
  });
});
