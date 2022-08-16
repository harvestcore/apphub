import { v4 as UUID } from 'uuid';

export default class Notifier {
    private _callbacks: Map<string, Function> = new Map();

    addCallback(callback: Function): Function {
        const id = UUID();
        this._callbacks.set(id, callback);

        return () => {
            this._callbacks.delete(id);
        };
    }

    executeCallbacks() {
        this._callbacks.forEach(callback => callback());
    }
}
