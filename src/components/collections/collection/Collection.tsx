import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { History } from 'history';
import { ICollection } from '../../../models/ICollection';
import { IType } from '../../../models/IType';
import './Collection.scss';

interface ICollectionProps extends RouteComponentProps {
  history: History;
  data: ICollection;
}

const Collection = (props :ICollectionProps) => {
  const goToDetails = () => {
    const { history } = props;
    const id = (props.data as ICollection)._id;
    history.push(`/collections/${id}`);
  };
  return (
    <div className="Collection" onClick={goToDetails}>
      <i className={`fas ${(props.data.type as IType).icon} Collection__icon`}></i>
      <span>{props.data.name}</span>
    </div>
  );
}

export default withRouter(Collection);
