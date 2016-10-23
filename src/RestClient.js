export default class RestClient {

    static fetchJson(path, resolveHandler, rejectHandler) {
        let request = new XMLHttpRequest();
        request.open('GET', path, false);
        request.onreadystatechange = () => {
            if (request.readyState == XMLHttpRequest.DONE) {
                if (request.status !== 200) {
                    rejectHandler(Error(`Failed to load [${path}] with response code ${request.status}`));
                    return;
                }
                resolveHandler(JSON.parse(request.responseText));
            }
        }
        request.send();
    }
}