/**
 * Basic notifier.
 */
export default class Notifier {
    /**
     * Callbacks associated with this notifier.
     */
    private _callbacks: Set<Function> = new Set();

    /**
     * Adds a callback to the notifier.
     * @param callback The callback to add.
     * @returns A function that can be used to remove the callback.
     */
    public addCallback(callback: Function): Function {
        this._callbacks.add(callback);

        return () => {
            this._callbacks.delete(callback);
        };
    }

    /**
     * Executes all callbacks.
     */
    public executeCallbacks() {
        this._callbacks.forEach(callback => callback());
    }
}
