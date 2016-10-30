import * as React from "react";
import LanguageRow from "./LanguageRow";

export default class LanguageTable extends React.Component {
    render() {
        if(!this.props.languages.length) {
            return <div>Loading...</div>;
        }
        return (<table>
        <thead>
        <tr><th>Name</th><th>Rating</th><th>Change</th></tr>
        </thead>
        <tbody>{this.props.languages.map(l => (
           <LanguageRow key={l.name} language={l} />
          ))
        }</tbody>
        </table>);
    }
}