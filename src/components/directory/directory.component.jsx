import { Component } from "react";

import SECTIONS_DATA from "../../data/section";
import "./directory-menu.style.scss";

import MenuItem from "../menu/menu-item.component";

class Directory extends Component {
  constructor() {
    super();

    this.state = {
      sections: SECTIONS_DATA,
    };
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </div>
    );
  }
}

export default Directory;
