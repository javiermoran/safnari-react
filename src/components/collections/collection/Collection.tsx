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

class Collection extends React.Component<ICollectionProps> {
  goToDetails = () => {
    const { history } = this.props;
    const id = (this.props.data as ICollection)._id;
    history.push(`/collections/${id}`);
  }
  render(): JSX.Element {
    return (
      <div className="Collection" onClick={this.goToDetails}>
        <i className={`fas ${(this.props.data.type as IType).icon} Collection__icon`}></i>
        <span>{this.props.data.name}</span>
      </div>
    )
  }
}

export default withRouter(Collection);
