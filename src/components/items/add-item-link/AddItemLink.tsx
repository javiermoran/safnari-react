import React from 'react';
import { Modal } from '@material-ui/core';
import ItemForm from '../form/ItemForm';
import { connect } from 'react-redux';

class AddItemLink extends React.Component<any> {
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
      <div className={this.props.className}>
        <div onClick={this.openModal}>
          {this.props.children}
        </div>
        <Modal
          open={this.state.itemModalOpen}
          onClose={this.handleClose}
        >
          <div className={`flex-modal ${this.props.user.darkMode && 'flex-modal--dark-mode'}`}>
            <div className="flex-modal__content">
              <ItemForm
                item={this.props.item}
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
  collections: state.collections,
  user: state.user
});

export default connect(mapStateToProps)(AddItemLink);
