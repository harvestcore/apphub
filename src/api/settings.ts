/**
 * Fetches the settings.
 * @param callback A callback executed when the data is obtained.
 */
export function getSettings(callback: (version: any) => void) {
    fetch('/data/settings.json', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(json => {
            callback(json);
        })
        .catch(_ => {
            callback({});
        });
}
