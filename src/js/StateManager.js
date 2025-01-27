import { BehaviorSubject } from "rxjs";

export default class StateManager {
  constructor(initialState) {
    this.state$ = new BehaviorSubject(initialState);
  }

  getState() {
    return this.state$.getValue();
  }

  setState(updater) {
    const currentValue = this.getState();
    const newState = updater(currentValue);
    this.state$.next(newState);
  }

  subscribe(callback) {
    return this.state$.subscribe(callback);
  }
}
