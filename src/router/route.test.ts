import Block from "../framework/Block";
import abstractView from "../views/abstractView";
import { Route } from "./route";
import { Constructable, viewClassTypes } from "./types";

describe("Route", () => {
  class MockView extends abstractView {
    protected buildComponents(): Block {
      return new Block({});
    }
  }
  it("не должен вызывать рендер метод если путь не совадает", () => {
    const pathname = "/test";
    const view = MockView;
    const props = { rootQuery: "#root" };
    const route = new Route(pathname, view as unknown as Constructable<viewClassTypes>, props);
    const renderSpy = jest.spyOn(route, "render");

    route.navigate("/different-path");

    expect(renderSpy).not.toHaveBeenCalled();
    expect(route["_pathname"]).toBe(pathname);
  });

  it("должен создать инстанс View во время первого рендера", () => {
    const mockRender = jest.fn();
    const MockView = jest.fn().mockImplementation(() => ({
      render: mockRender,
    }));
    const route = new Route("/home", MockView, { rootQuery: "#app" });
    document.body.innerHTML = '<div id="app"></div>';

    route.render();

    expect(MockView).toHaveBeenCalledWith(expect.any(HTMLElement));
    expect(mockRender).toHaveBeenCalled();
  });
  it("не должен создавать инстанс View если он уже создан", () => {
    const mockRender = jest.fn();
    const MockView = jest.fn().mockImplementation(() => ({
      render: mockRender,
    }));
    const route = new Route("/home", MockView, { rootQuery: "#app" });
    document.body.innerHTML = '<div id="app"></div>';

    route.render();
    route.render();

    expect(MockView).toHaveBeenCalledTimes(1);
  });
});
