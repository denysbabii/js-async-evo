import * as React from "react";

export default class LanguageRow extends React.Component {
    render() {
        return (<tr>
          <td>{this.props.language.name}</td>
          <td>{this.props.language.rating}</td>
          <td className={this.props.language.change > 0 ? "plus" : "minus"}>{this.props.language.change}</td>
        </tr>);
    }
}