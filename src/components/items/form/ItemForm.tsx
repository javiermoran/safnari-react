import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import typesActions from '../../../actions/types.actions';
import itemActions from '../../../actions/items.actions';
import { IType } from '../../../models/IType';
import { Dispatch } from 'redux';
import { TextField, Button, Select, MenuItem, FormControl, Typography, InputLabel, FormGroup } from '@material-ui/core';
import { ICollection } from '../../../models/ICollection';
import './ItemForm.scss';
import { IItem } from '../../../models/IItem';

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
    publisher: '',
    number: 0,
    artist: '',
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
  handleSaveClick() {
    const { typeDisabled, ...newItem } = this.state;
    const item: IItem = { ...newItem, coll: this.props.collection._id as string };
    this.props.dispatch(itemActions.saveItem(item));
    this.props.onCancel();
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
          <FormGroup>
            <Typography variant="h6">
              Add Item
            </Typography>
            <FormControl className="ItemForm__form-control">
              <TextField
                id="title"
                label="Title"
                value={this.state.title}
                onChange={(event) => this.handleFormChange('title', event)}
              />
            </FormControl>
            <FormControl className="ItemForm__form-control">
              <TextField
                id="publisher"
                label="Publisher"
                value={this.state.publisher}
                onChange={(event) => this.handleFormChange('publisher', event)}
              />
            </FormControl>
            <FormControl className="ItemForm__form-control">
              <TextField
                id="artist"
                label="Artist"
                value={this.state.artist}
                onChange={(event) => this.handleFormChange('artist', event)}
              />
            </FormControl>
            <FormControl className="ItemForm__form-control">
              <TextField
                id="number"
                label="Number"
                type="number"
                value={this.state.number}
                onChange={(event) => this.handleFormChange('number', event)}
              />
            </FormControl>
            <FormControl className="ItemForm__form-control">
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
          </FormGroup>
          <Button
            onClick={() => { this.handleSaveClick(); }}
            variant="contained"
            color="primary"
          >
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
