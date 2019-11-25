import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import AddTag from './add-tag/AddTag';
import EmptyState from '../common/empty-state/EmptyState';
import Tag from './tag/Tag';
import { IItem } from '../../models/IItem';
import Item from '../items/item/Item';
import api from '../../safnari.api';
import './Tags.scss';
import { ICollection } from '../../models/ICollection';


const Tags = () => {
  const [tags, setTags] = useState([] as any[]);
  const [selectedTag, setSelectedTag] = useState({} as any);
  const [items, setItems] = useState([] as IItem[]);
  useEffect(() => {
    getTags();
  }, []);
  useEffect(() => {
    if (selectedTag._id) {
      api.tags.getItems(selectedTag._id)
        .then((response) => {
          setItems(response.data.data);
        });
    }
  }, [selectedTag])
  function getTags() {
    api.tags.get().then((res) => {
      setTags(res.data.data);
    });
  }
  function handleTagAdded(tag: any) {
    setTags([...tags, tag]);
  }
  function tagSelected(id: any) {
    const tag = tags.find(tag => tag._id === id);
    if (tag) {
      setSelectedTag(tag);
    }
  }
  function renderTags() {
    return tags && tags.map((tag, index) => {
      const selected = tag._id === selectedTag._id;
      return (
        <Tag 
          key={index} 
          tag={tag}
          selected={selected}
          onSelected={tagSelected} 
        />
      );
    });
  }
  function renderItems(): JSX.Element[] {
    return items.map(item => (
      <div key={item._id} className="col col-12 col-md-3 mb-2">
        <Item item={item} collection={(item.coll as ICollection)} />
      </div>
    ));
  }
  return (
    <div className="Tags">
      <div className="container">
        <div className="section-header">
          <Typography variant="h2">Tags</Typography>
        </div>
        <div>
          <AddTag onAdd={(event: any) => handleTagAdded(event)} />
        </div>
        <div className="Tags__container">
          {renderTags()}
        </div>
      </div>
      <div className="container">
        {!items.length && selectedTag._id && <EmptyState message="No items found"></EmptyState>}
        {!!items.length && renderItems() }
      </div>
    </div>
  );
};

export default Tags;
