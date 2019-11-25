import React, { useState, useEffect, useCallback } from 'react';
import { Typography } from '@material-ui/core';
import api from "../../../safnari.api";
import { IItem } from '../../../models/IItem';
import { ICollection } from '../../../models/ICollection';
import { NavLink } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import ItemImageForm from '../item-image-form/ItemImageForm';
import Tag from '../../tags/tag/Tag';
import ImgSplash from '../../common/img-splash/ImgSplash';
import TagSelect from '../../tags/tag-select/TagSelect';
import EmptyState from '../../common/empty-state/EmptyState';
import './ItemDetails.scss';

const ItemDetails = (props: any) => {
  const defaultState: IItem = { 
    title: '',
    picture: '',
    coll: {} as ICollection,
    pictures: []
  };
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(defaultState);
  const [splashOpen, setSplashOpen] = useState(false);
  const [images, setImages] = useState([] as JSX.Element[]);
  const [selectedImage, setSelectedImage] = useState('');
  const getItemDetails = useCallback(async () => {
    const id = props.match.params.itemId;
    const response = await api.items.get(id);
    const parsedItem = response.data;
    parsedItem.pictures = parsedItem.pictures ? parsedItem.pictures : [];
    setItem(parsedItem);
    setLoading(false);
  }, [props]);
  useEffect(() => {
    if (!item.title) {
      getItemDetails();
    } else if (item) {
      let pics: string[] = [];
      pics = item.pictures ? item.pictures.map((pic: string) => pic) : [];
      pics.unshift(item.picture as string);
      setImages(parseItems(pics));
    }
  }, [item, getItemDetails]);
  function parseItems(pictures: string[]): JSX.Element[] {
    return pictures.map((image: string, index: number) => (
      <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2 mt-3 ItemDetails__image">
        <div
          onClick={() => { 
            setSplashOpen(true);
            setSelectedImage(image);
          }}
          className="ItemDetails__image__inner"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
    ));
  }
  function renderTags() {
    if (!item.tags.length) {
      return <EmptyState message="No tags found"></EmptyState>;
    }
    return item.tags.map((tag: any, index: number) => (
      <Tag key={index} tag={tag} />
    ));
  }
  function tagAdded(tags) {
    const modifiedItem = { ...item };
    modifiedItem.tags = tags;
    setItem(modifiedItem);
  }
  function renderItemDetails(): JSX.Element {
    return (
      <div className="ItemDetails">
        <div className="container">
          <div className="row">
            <div className="col mb-2">
              <NavLink to={`/collections/${(item.coll as ICollection)._id}`}>
                { (item.coll as ICollection).name }
              </NavLink>
            </div>
          </div>
          <div className="row">
            <div className="col mb-3">
              <Typography variant="h2">{ item.title }</Typography>
            </div>
          </div>
          <div className="row ItemDetails__info-row">
            <div className="col-6 col-sm-4 col-md-3">
              <Typography variant="body2">
                <b>Publisher:</b>
              </Typography>
              { item.publisher || 'N/A' }
            </div>
            <div className="col-6 col-sm-4 col-md-3">
              <Typography variant="body2">
                <b>Artist:</b>
              </Typography>
              { item.artist || 'N/A' }
            </div>
            <div className="col-6 col-sm-4 col-md-3">
              <Typography variant="body2">
                <b>Format:</b>
              </Typography>
              { item.format || 'N/A' }
            </div>
            <div className="col-6 col-sm-4 col-md-3">
              <Typography variant="body2">
                <b>Number:</b>
              </Typography>
              { item.number || 'N/A' }
            </div>
          </div>
          <div className="row">
            <div className="col mb-3 mt-3">
              <Typography variant="h6">Tags:</Typography>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TagSelect item={item} onTagAdded={tagAdded} />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3 ItemDetails__tags">
              {renderTags()}
            </div>
          </div>
          <div className="row">
            <div className="col mb-3 mt-3">
              <Typography variant="h6">Images:</Typography>
            </div>
          </div>
          <div className="row">
            <div className="col-6 col-sm-4 col-md-3 col-lg-2 mt-3">
              <div className="ItemDetails__add ItemDetails__image">
                <ItemImageForm itemId={props.match.params.itemId} />
              </div>
            </div>
            {images}
          </div>
        </div>
        <ImgSplash 
          picture={selectedImage} 
          open={splashOpen} 
          onClose={() => setSplashOpen(false)} 
        />
      </div>
    )
  }
  return (
    loading ? <Loading /> : renderItemDetails()
  );
};

export default ItemDetails;
