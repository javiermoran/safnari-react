import React from 'react';
import { connect } from 'react-redux';
import { Modal } from '@material-ui/core';
import CollectionForm from '../form/CollectionForm';

class AddCollection extends React.Component<any> {
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
          <div className={`flex-modal ${this.props.user.darkMode && 'flex-modal--dark-mode'}`}>
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
const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(AddCollection);
