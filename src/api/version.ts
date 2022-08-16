/**
 * Fetches the latest AppHub version.
 * @param callback A callback executed when the data is obtained.
 */
export function getLatestVersion(callback: (version: string) => void) {
    fetch('https://api.github.com/repos/harvestcore/apphub/tags', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(json => {
            if (json.length > 0) {
                callback(json[0].name || '');
            }

            callback('');
        })
        .catch(_ => {
            callback('');
        });
}

/**
 * Fetches the current AppHub version.
 * @param callback A callback executed when the data is obtained.
 */
export function getCurrentVersion(callback: (version: any) => void) {
    fetch('/app.json', {
        method: 'GET'
    })
        .then(res => {
            return res.json();
        })
        .then(json => {
            callback(json.version || '');
        })
        .catch(_ => {
            callback('');
        });
}
