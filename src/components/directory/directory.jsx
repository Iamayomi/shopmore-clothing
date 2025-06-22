import SECTIONS_DATA from "../../data/section";
import "./directory-menu.style.scss";

import MenuItem from "../menu/menu-item";

const Directory = () => {
  return (
    <div className="directory-menu">
      {SECTIONS_DATA.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

export default Directory;
