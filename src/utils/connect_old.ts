export function connect2<T extends PropsType = PropsType>(mapStateToProps: (state: StateType) => DefaultObject) {
  return function <K extends Block>(Component: Constructor<T, K>) {
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
