import React from 'react';
import { ICollection } from '../../models/ICollection';
import { NavLink } from 'react-router-dom';
import './Breadcrumbs.scss';

interface IBreadcrumbsProps {
  data: ICollection[]
}

class Breadcrumbs extends React.Component<IBreadcrumbsProps> {
  renderLinks(): JSX.Element[] {
    return this.props.data.map((collection: ICollection) => (
      <NavLink 
        className="Breadcrumbs__link"
        key={collection._id}
        to={`/collections/${collection._id}`}
      >
        <span className="Breadcrumbs__link__content">
          {collection.name}
        </span>
      </NavLink>
    ));
  }
  render(): JSX.Element {
    return (
      <div className="Breadcrumbs">
        <NavLink className="Breadcrumbs__link" to="/collections">
          <span className="Breadcrumbs__link__content">Collections</span>
        </NavLink>
        {this.renderLinks()}
      </div>
    )
  }
}

export default Breadcrumbs;
