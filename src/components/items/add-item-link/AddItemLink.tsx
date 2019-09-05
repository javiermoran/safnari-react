import React, { Dispatch } from 'react';
import { Modal } from '@material-ui/core';
import ItemForm from '../form/ItemForm';
import { connect } from 'react-redux';
import { ICollection } from '../../../models/ICollection';

interface IAddItemLinkProps {
  collection: ICollection  
}

class AddItemLink extends React.Component<IAddItemLinkProps> {
  state = {
    itemModalOpen: false
  }
  openModal = () => {
    this.setState({ itemModalOpen: true });
  }
  handleClose = () => {
    this.setState({ itemModalOpen: false });
  }
  render() {
    return (
      <div className="CollectionDetails__add-item">
        <a
          tabIndex={1}
          onClick={this.openModal}
          className="CollectionDetails__add-item__link"
        >
          Add Item
        </a>
        <Modal
          open={this.state.itemModalOpen}
          onClose={this.handleClose}
        >
          <div className="flex-modal">
            <div className="flex-modal__content">
              <ItemForm 
                collection={this.props.collection} 
                onCancel={this.handleClose}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  collections: state.collections
});

export default connect(mapStateToProps)(AddItemLink);
