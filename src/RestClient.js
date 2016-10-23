export default class RestClient {

    static fetchJson(path) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', path);
            request.onreadystatechange = () => {
                if (request.readyState == XMLHttpRequest.DONE) {
                    if (request.status !== 200) {
                        reject(Error(`Failed to load [${path}] with response code ${request.status}`));
                        return;
                    }
                    resolve(JSON.parse(request.responseText));
                }
            }
            request.send();
        });
    }
}