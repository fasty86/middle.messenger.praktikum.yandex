let effectCallback: (() => void) | null = null;
export class Signal<T = unknown> {
  private _value: T;
  private _listeners: Subscriber[] = [];
  constructor(value: T) {
    this._value = value;
    this._listeners = [];
  }

  getValue(): T {
    if (effectCallback) this.subscribe(effectCallback);
    return this._value;
  }
  setValue(value: T): void {
    this._value = value;
    this._emit();
  }
  private _emit() {
    this._listeners.forEach((listener) => listener());
  }

  subscribe(listener: Subscriber): void {
    this._listeners.push(listener);
  }
}
type Subscriber = () => void;

export function createSignal<T>(initialValue: T) {
  const signal = new Signal<T>(initialValue);

  return [
    function value() {
      if (effectCallback) signal.subscribe(effectCallback);
      return signal.getValue();
    },
    function setValue(newValue: T) {
      signal.setValue(newValue);
    },
  ] as const;
}

export function createEffect(effect: () => void): void {
  effectCallback = effect;
  effect();
  effectCallback = null;
}
