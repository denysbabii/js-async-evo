import "./App.css"
import * as React from "react";
import RestClient from "./RestClient";
import LanguageTable from "./LanguageTable";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: []
        };
    }

    async _fetchLanguages(path) {
        try {
            const langs = await RestClient.fetchJson(path);
            const langsInfoPromises = langs.map(async l => {
                return await RestClient.fetchJson(`${path}/${l.toLowerCase()}`);
            });

            let langsInfo = [];
            for (const langInfoPromise of langsInfoPromises) {
                langsInfo.push(await langInfoPromise);
            }
            this.setState({
                languages: this._sortByRating(langsInfo)
            });
        } catch (err) {
            console.error('Failed to render a list of languages', err);
        }
    }

    _sortByRating(langs) {
        return langs.sort((a, b) => b.rating - a.rating);
    }

    componentDidMount() {
        this._fetchLanguages(this.props.path);
    }

    render() {
        return (
            <LanguageTable languages = {this.state.languages} />
        );
    }
}