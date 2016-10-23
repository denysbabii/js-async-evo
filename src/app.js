import './app.css'
import RestClient from './RestClient';

class App {
    constructor(container) {
        this._container = container;
    }

    async list(path) {
        try {
            const langs = await RestClient.fetchJson(path);
            const langsInfoPromises = langs.map(async l => {
                return await RestClient.fetchJson(`${path}/${l.toLowerCase()}`);
            });

            let langsInfo = [];
            for (const langInfoPromise of langsInfoPromises) {
                langsInfo.push(await langInfoPromise);
            }

            this._render(this._sortByRating(langsInfo).map(l => this._builtRow(l)));
        } catch (err) {
            console.error('Failed to render a list of languages', err);
        }
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