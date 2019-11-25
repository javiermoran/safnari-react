import React, { useState } from 'react';
import { Button, FormControl, TextField } from '@material-ui/core';
import api from '../../../safnari.api';

const AddTag = (props: any) => {
  const [tag, setTag] = useState('');
  function saveTag() {
    api.tags.create({name: tag})
      .then((data) => {
        props.onAdd(data.data);
        setTag('');
      });
  }
  return (
    <div>
      <FormControl className="ItemForm__form-control">
        <TextField
          id="tag"
          label="Tag"
          type="text"
          value={tag}
          onChange={(event) => { setTag(event.target.value); }}
        />
      </FormControl>
      <Button 
        color="primary"
        variant="contained"
        onClick={saveTag}
        disabled={!tag}
      >
        Add
      </Button>
    </div>
  );
}

export default AddTag;
