export function getLatestTag(callback: (version: string) => void) {
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
