import "./image.pcss";
import Block from "../../framework/Block";
import { connect, MapStateReturnType } from "../../utils/connect";
import { ApiDestinations } from "../../services/api/base-api";
export default class Image extends Block<ImagePropsType> {
  constructor(props: ImagePropsType) {
    super(props);
  }

  render() {
    return `<img
                  src="{{src}}"
                  alt="{{alt}}"
                  class="{{className}}"
                />`;
  }
}
export type ImagePropsType = {
  attributes: {
    className?: string;
    src: string;
    alt?: string;
  };
};

export const withUserAvatar = connect<ImagePropsType>((state) => {
  const storedState = { avatar: state.user?.avatar };
  const component = {
    attributes: {
      src: state.user?.avatar ? `${ApiDestinations.RESOURCES}${state.user?.avatar}` : "/avatar_default.png",
    },
  };
  return { storedState, component } as unknown as MapStateReturnType;
});
export const userAvatar = withUserAvatar(Image);
