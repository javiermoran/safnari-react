import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import typesActions from '../../../actions/types.actions';
import itemActions from '../../../actions/items.actions';
import { IType } from '../../../models/IType';
import { Dispatch } from 'redux';
import { TextField, Button, Select, MenuItem, FormControl, Typography, InputLabel, FormGroup } from '@material-ui/core';
import { ICollection } from '../../../models/ICollection';
import { IItem } from '../../../models/IItem';
import './ItemForm.scss';
// @ts-ignore no types form FileBase64
import FileBase64 from 'react-file-base64';

interface IItemFormProps {
  collection: ICollection
  types: IType[];
  dispatch: Dispatch<any>;
  onCancel: any;
  item?: IItem;
}

class ItemForm extends React.Component<IItemFormProps> {
  state = {
    title: '',
    type: '',
    publisher: '',
    number: 0,
    artist: '',
    picture: '',
    typeDisabled: false,
    imgName: ''
  }
  componentDidMount() {
    if (!this.props.types.length) {
      this.props.dispatch(typesActions.getTypes());
    }
    if (this.props.collection._id) {
      const type = this.props.collection.type as IType;
      this.setState({ type: type._id, typeDisabled: true });
    }
    if (this.props.item) {
      const { title, publisher, number, artist, picture } = this.props.item;
      const imgName = `${this.props.item._id}`;
      const type = this.props.item.type as IType;
      this.setState({ title, publisher, number, artist, picture, imgName, type: type._id });
    }
  }
  handleFormChange(property: string, event: ChangeEvent<any>) {
    this.setState({ ...this.state, [property]: event.target.value });
  }
  handleSaveClick() {
    const { typeDisabled, ...newItem } = this.state;
    const item: IItem = { ...newItem, coll: this.props.collection._id as string };

    if (this.props.item) {
      const { _id } = this.props.item as IItem;
      this.props.dispatch(itemActions.updateItem(_id as string, item));
    } else {
      this.props.dispatch(itemActions.saveItem(item));
    }

    this.props.onCancel();
  }
  setImg(file: any) {
    this.setState({ picture: file.base64, imgName: file.name });
  }
  pictureClick() {
    const div = document.getElementById('pictureDiv') as HTMLElement;
    const inputs = div.getElementsByTagName('input');
    inputs[0].click();
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
            <Typography variant="h4">
              { this.props.item ? 'Edit' : 'Add' } Item
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
            <FormControl className="ItemForm__form-control">
              { this.state.picture && (<img alt="" className="ItemForm__picture" src={this.state.picture} />) }
              <TextField
                value={this.state.imgName}
                onClick={this.pictureClick.bind(this)}
                onFocus={() => { !this.state.picture && this.pictureClick() }}
                label="Picture"
                type="text"
              />
              <div id="pictureDiv">
                <FileBase64 onDone={this.setImg.bind(this)} />
              </div>
            </FormControl>
          </FormGroup>
          <div className="ItemForm__buttons">
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
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  types: state.types
});

export default connect(mapStateToProps)(ItemForm);
