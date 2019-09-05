import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import typesActions from '../../../actions/types.actions';
import { IType } from '../../../models/IType';
import { Dispatch } from 'redux';
import { TextField, Button, Select, MenuItem, FormControl, Typography, InputLabel } from '@material-ui/core';
import { ICollection } from '../../../models/ICollection';
import './ItemForm.scss';

interface IItemFormProps {
  collection: ICollection
  types: IType[];
  dispatch: Dispatch<any>;
  onCancel: any;
}

class ItemForm extends React.Component<IItemFormProps> {
  state = {
    title: '',
    type: '',
    typeDisabled: false
  }
  componentDidMount() {
    if (!this.props.types.length) {
      this.props.dispatch(typesActions.getTypes());
    }
    if (this.props.collection._id) {
      const type = this.props.collection.type as IType;
      this.setState({ type: type._id, typeDisabled: true });
    }
  }
  handleFormChange(property: string, event: ChangeEvent<any>) {
    this.setState({ ...this.state, [property]: event.target.value });
  }
  renderTypeOptions() {
    return this.props.types.map((type: IType) => (
      <MenuItem 
        key={type._id as string}
        value={type._id as string}>
        {type.description}
      </MenuItem>
    ));
  }
  render() {
    return (
      <div className="ItemForm">
        <form>
          <Typography variant="h6">
            Add Item
          </Typography>
          <FormControl>
            <TextField
              id="title"
              label="Title"
              value={this.state.title}
              onChange={(event) => this.handleFormChange('title', event)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="type">
              Type
            </InputLabel>
            <Select
              id="type"
              disabled={this.state.typeDisabled}
              value={this.state.type}
              onChange={(event) => this.handleFormChange('type', event)}
            >
            {this.renderTypeOptions()}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary">
            Save
          </Button>
          <Button
            variant="contained" 
            color="default"
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  types: state.types
});

export default connect(mapStateToProps)(ItemForm);
