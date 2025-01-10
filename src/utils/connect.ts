import Block from "../framework/Block";
import store, { StateType } from "../framework/store/Store";
import { PropsType, StoreEvents } from "../framework/types";

export function connect(mapStateToProps: (state: StateType) => StateType) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: PropsType) {
        super({ ...props, ...mapStateToProps(store.getState()) });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // вызываем обновление компонента, передав данные из хранилища
          // this.setProps({ ...mapStateToProps(store.getState()) });
        });
      }
    };
  };
}
