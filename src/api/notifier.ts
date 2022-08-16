export default class Notifier {
    private _callbacks: Set<Function> = new Set();

    addCallback(callback: Function): Function {
        this._callbacks.add(callback);

        return () => {
            this._callbacks.delete(callback);
        };
    }

    executeCallbacks() {
        this._callbacks.forEach(callback => callback());
    }
}
