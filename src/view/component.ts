export class Component<S extends Record<string, any>> {
  private prevState: S | undefined;

  public state: S;

  setState(newState: Partial<S>) {
    this.prevState = this.state;
    this.state = { ...this.state, ...newState };
    this.render();
  }

  constructor(state: S) {
    this.state = state;
  }

  isStateEntryChanged(path: string): boolean {
    if (typeof this.state === 'undefined') {
      return false;
    }
    if (typeof this.prevState === 'undefined') {
      return true;
    }

    const extractValue = (state: S, pathStr: string) =>
      pathStr.split('.').reduce((result, key) => result[key], state);
    return (
      extractValue(this.state, path) !== extractValue(this.prevState, path)
    );
  }

  isStateEntriesChanged(paths: string[] = []) {
    return paths.reduce(
      (result, path) => result || this.isStateEntryChanged(path),
      false
    );
  }

  effect(callback: () => void, statePaths: string[], enabled = true) {
    if (!enabled) {
      return;
    }
    if (this.isStateEntriesChanged(statePaths)) {
      callback();
    }
  }

  render() {}
}
