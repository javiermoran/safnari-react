import React from 'react';
import { Modal } from '@material-ui/core';
import CollectionForm from '../form/CollectionForm';
import { ICollection } from '../../../models/ICollection';

interface IAddCollectionProps {
  className?: string;
  parent?: ICollection;
}

class AddCollection extends React.Component<IAddCollectionProps> {
  state = {
    open: false
  }
  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }
  render() {
    return (
      <div className={this.props.className}>
        <div onClick={this.openModal.bind(this)}>
          {this.props.children}
        </div>
        <Modal 
          open={this.state.open}
          onClose={this.closeModal.bind(this)}
        >
          <div className="flex-modal">
            <div className="flex-modal__content">
              <CollectionForm 
                parent={this.props.parent}
                onCancel={this.closeModal.bind(this)} 
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddCollection;
