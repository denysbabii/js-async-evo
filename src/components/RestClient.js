export default class RestClient {

    static fetchJson(path) {
        return fetch(path)
            .then(response => {
                return (response.ok) ?
                    Promise.resolve(response) :
                    Promise.reject(new Error(`Path [${path}] is ${response.statusText}`)); //throw new Error() is the same
            }).then(response => response.json());
    }
}