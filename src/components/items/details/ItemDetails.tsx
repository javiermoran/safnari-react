import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import api from "../../../safnari.api";
import { IItem } from '../../../models/IItem';
import { ICollection } from '../../../models/ICollection';
import { NavLink } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import ItemImageForm from '../item-image-form/ItemImageForm';
import './ItemDetails.scss';

const ItemDetails = (props: any) => {
  const startState: IItem = { 
    title: '',
    picture: '',
    coll: {} as ICollection,
    pictures: []
  };
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(startState);
  const [images, setImages] = useState([] as JSX.Element[]);
  useEffect(() => {
    if (!item.title) {
      getItemDetails();
    } else if (item) {
      let pics: string[] = [];
      pics = item.pictures ? item.pictures.map((pic: string) => pic) : [];
      pics.unshift(item.picture as string);
       setImages(parseItems(pics));
    }
  }, [item.title]);
  async function getItemDetails() {
    const id = props.match.params.itemId;
    const response = await api.items.get(id);
    const item = response.data;
    item.pictures = item.pictures ? item.pictures : [];
    setItem(response.data);
    setLoading(false);
  }
  function parseItems(pictures: string[]): JSX.Element[] {
    return pictures.map((image: string, index: number) => (
      <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div
          className="ItemDetails__image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
    ));
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
              <Typography variant="h6">Images:</Typography>
            </div>
          </div>
          <div className="row">
            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
              <div className="ItemDetails__add">
                <ItemImageForm itemId={props.match.params.itemId} />
              </div>
            </div>
            {images}
          </div>
        </div>
      </div>
    )
  }
  return (
    loading ? <Loading /> : renderItemDetails()
  );
};

export default ItemDetails;
