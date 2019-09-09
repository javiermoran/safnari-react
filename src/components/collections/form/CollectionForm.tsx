import React, { ChangeEvent, Dispatch } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Typography, FormControl, TextField, Select, InputLabel, MenuItem, Button } from '@material-ui/core';
import { ICollection } from '../../../models/ICollection';
import { IType } from '../../../models/IType';
import typesActions from '../../../actions/types.actions';
import collectionActions from '../../../actions/collections.actions';
import './CollectionForm.scss';

interface ICollectionFormProps {
  parent?: ICollection;
  collection?: ICollection;
  types: IType[];
  dispatch: Dispatch<any>;
  onCancel: any;
}

class CollectionForm extends React.Component<ICollectionFormProps> {
  state = {
    name: '',
    type: '',
    parentName: ''
  }
  componentDidMount() {
    if (!this.props.types.length) {
      this.props.dispatch(typesActions.getTypes());
    }
    if (this.props.parent) {
      const type = (this.props.parent.type as IType)._id;
      this.setState({ parentName: this.props.parent.name, type });
    }
  }
  handleFormChange(property: string, event: ChangeEvent<any>) {
    this.setState({ ...this.state, [property]: event.target.value });
  }
  renderTypeOptions(): JSX.Element[] {
    return this.props.types.map((type: IType) => (
      <MenuItem 
        key={type._id as string}
        value={type._id as string}>
        {type.description}
      </MenuItem>
    ));
  }
  handleSave() {
    const { name, type } = this.state;
    const newCollection: ICollection = { name, type };
    if (this.props.parent) {
      newCollection.parent = this.props.parent._id;
    }
    this.props.dispatch(collectionActions.saveCollection(newCollection));
    this.props.onCancel();
  }
  renderParentInput(): JSX.Element {
    return (
      <FormControl>
        <TextField disabled={true} label="Parent" value={this.state.parentName} />
      </FormControl>
    );
  }
  render(): JSX.Element {
    return (
      <div className="CollectionForm">
        <form>
          <FormGroup>
            <Typography variant="h4">
              { this.props.collection ? 'Edit' : 'Add' } Collection
            </Typography>
            <FormControl className="CollectionForm__form-control">
              <TextField
                id="name"
                label="Name"
                value={this.state.name}
                onChange={(event) => this.handleFormChange('name', event)}
              />
            </FormControl>
            <FormControl className="CollectionForm__form-control">
              <InputLabel htmlFor="type">
                Type
              </InputLabel>
              <Select
                id="type"
                disabled={!!this.state.parentName}
                value={this.state.type}
                onChange={(event) => this.handleFormChange('type', event)}
              >
              {this.renderTypeOptions()}
              </Select>
            </FormControl>
            { this.state.parentName && this.renderParentInput()}
          </FormGroup>
          <div className="CollectionForm__buttons">
            <Button
              onClick={this.handleSave.bind(this)}
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

export default connect(mapStateToProps)(CollectionForm);
