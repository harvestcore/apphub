export function getData(callback: (version: any) => void) {
    fetch('/data/data.json', {
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
