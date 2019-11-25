import React, { useState, useEffect } from "react";
import api from "../../../safnari.api";
import { TextField, Button } from "@material-ui/core";
import "./TagSelect.scss";

const TagSelect = ({ item, onTagAdded }) => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState({} as any);
  const [tags, setTags] = useState([] as any);
  const [filtered, setFiltered] = useState([] as any);
  const [opened, setOpened] = useState(false);
  const [inputShown, setInputShown] = useState(false);
  useEffect(() => {
    api.tags.get().then(res => {
      setTags(res.data.data);
      setFiltered(res.data.data);
    });
  }, []);
  function renderDropdown() {
    return (
      <div>
        <div className="TagSelect__dropdown">
          {filtered.map(tag => (
            <div
              className="TagSelect__dropdown__item"
              key={tag._id}
              onClick={() => {
                selectValue(tag);
              }}
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
  function selectValue(tag) {
    setSelected(tag);
    setValue(tag.name);
    setOpened(false);
  }
  function changed(e) {
    setValue(e.target.value);
    const filteredTags = tags.filter(tag => {
      const t = tag as any;
      return t.name.indexOf(e.target.value) !== -1;
    });
    setFiltered(filteredTags);
  }
  function addTag() {
    api.items.addTag(item._id, selected._id).then(result => {
      setTags(result.data.tags);
      onTagAdded(result.data.tags);
      clear();
    });
    setInputShown(false);
  }
  function clear() {
    setOpened(false);
    setInputShown(false);
    setValue("");
    setSelected({});
  }
  return (
    <div className="TagSelect mb-5">
      <div className="TagSelect__content">
        {!inputShown && (
          <button
            className="btn btn-primary"
            onClick={() => { setInputShown(true); }}
          >
            <i className="fas fa-plus mr-1"></i> Tag
          </button>
        )}
        {inputShown && (
          <div>
            <input
              className="TagSelect__input"
              type="text"
              placeholder="Tag"
              value={value}
              onChange={changed}
              onFocus={() => {
                setOpened(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setOpened(false);
                }, 200);
              }}
            />
            <button
              className="TagSelect__button TagSelect__button--transparent"
              onClick={clear}
            >
              <i className="fas fa-times"></i>
            </button>
            <button
              className="TagSelect__button btn btn-primary"
              disabled={!value}
              onClick={addTag}
            >
              Add
            </button>
          </div>
        )}
        {opened && renderDropdown()}
      </div>
    </div>
  );
};

export default TagSelect;
