export default class RestClient {

    static fetchJson(path) {
        return fetch(path)
            .then(response => {
                return (response.status >= 200 && response.status < 300) ?
                    Promise.resolve(response) :
                    Promise.reject(new Error(`Path [${path}] is ${response.statusText}`));
            }).then(response => response.json());
    }
}