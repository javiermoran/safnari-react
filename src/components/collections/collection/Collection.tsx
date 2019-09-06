import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { ICollection } from '../../../models/ICollection';
import { IType } from '../../../models/IType';
import './Collection.scss';

interface ICollectionProps extends RouteComponentProps {
  history: History,
  data: ICollection
}

class Collection extends React.Component<ICollectionProps> {
  goToDetails = () => {
    const { history } = this.props;
    const id = this.props.data._id;
    history.push(`/collections/${id}`);
  }
  render(): JSX.Element {
    const { icon } = this.props.data.type as IType;
    return (
      <div className="Collection" onClick={this.goToDetails}>
        <i className={`fas ${icon} Collection__icon`}></i>
        <span>{this.props.data.name}</span>
      </div>
    )
  }
}

export default withRouter(Collection);
