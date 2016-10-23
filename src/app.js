import './app.css'
import RestClient from './RestClient';

class App {
    constructor(container) {
        this._container = container;
    }
    list(path) {
        let errorHandler = (error) => {
            console.error(error);
        };

        RestClient.fetchJson(path, (langs) => {
            let langsInfo = [];
            langs.forEach(l => RestClient.fetchJson(`${path}/${l.toLowerCase()}`, (lang) => {
                langsInfo.push(lang);
            }, errorHandler));

            setTimeout(() => {
                // Awiat requests end
                let sortedLangs = this._sortByRating(langsInfo);
                this._render(sortedLangs.map(l => this._builtRow(l)));
            }, 5000);
        }, errorHandler);
    }

    _sortByRating(langs) {
        return langs.sort((a, b) => b.rating - a.rating);
    }

    _builtRow(lang) {
        let cellChange = this._createElementWithContent('td', lang.change);
        cellChange.className = (lang.change > 0) ? 'plus' : 'minus';

        let row = this._createElement('tr');
        row.appendChild(this._createElementWithContent('td', lang.name));
        row.appendChild(this._createElementWithContent('td', lang.rating));
        row.appendChild(cellChange);
        return row;
    }

    _createElement(tagName) {
        return document.createElement(tagName);
    }

    _createElementWithContent(tagName, text) {
        let el = this._createElement(tagName);
        el.textContent = text;
        return el;
    }

    _render(rows) {
        let table = this._createElement('table');
        table.appendChild(this._builtHeader());
        let body = this._createElement('tbody');
        rows.forEach((r) => body.appendChild(r));
        table.appendChild(body);
        this._container.appendChild(table);
    }

    _builtHeader() {
        let row = this._createElement('tr');
        row.appendChild(this._createElementWithContent('th', 'Name'));
        row.appendChild(this._createElementWithContent('th', 'Rating'));
        row.appendChild(this._createElementWithContent('th', 'Change'));

        let head = this._createElement('thead');
        head.appendChild(row);
        return head;
    }
}

let container = document.getElementById('root');
let app = new App(container);
app.list('http://localhost:8989/api/languages');
app.list('http://localhost:8989/api/languages/hz');