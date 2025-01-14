import Block from "../framework/Block";
import { StateType } from "../framework/store/Store";
import store from "../framework/store/Store";
import { PropsType, DefaultObject, StoreEvents } from "../framework/types";
interface Constructor<T, K> {
  new (props: T): K;
}
export default function connect<T extends PropsType = PropsType>(mapStateToProps: (state: StateType) => DefaultObject) {
  return function <K extends Block<T>>(Component: Constructor<T, K>) {
    return class extends Component {
      constructor(props: T) {
        super({ ...props, ...mapStateToProps(store.getState()) });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // вызываем обновление компонента, передав данные из хранилища
          // this.setProps({ ...mapStateToProps(store.getState()) });
          console.log({ ...mapStateToProps(store.getState()) });
        });
      }
    };
  };
}
