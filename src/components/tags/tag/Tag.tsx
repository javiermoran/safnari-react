import React from "react";
import "./Tag.scss";

const Tag = (props: any) => {
  function toggleSelected() {
    props.onSelected(props.tag._id);
  }
  return (
    <div className={`Tag ${props.selected ? "Tag--selected" : ""}`} onClick={toggleSelected}>
      <div className="Tag__container" style={{ backgroundColor: props.tag.color }}>
        <span>{props.tag.name}</span>
      </div>
    </div>
  );
};

export default Tag;
