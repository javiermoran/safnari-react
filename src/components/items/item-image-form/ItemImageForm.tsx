import React, { useState } from 'react';
import api from '../../../safnari.api';
import { Modal, Button } from '@material-ui/core';
// @ts-ignore no types form FileBase64
import FileBase64 from 'react-file-base64';
import './ItemImageForm.scss';

const ItemImageForm = (props: any) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  function onFileDone(files: any) {
    console.log(files);
    setFiles(files);
  }
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setFiles([]);
    setOpen(false);
  }
  function savePictures() {
    const id = props.itemId;
    const pictures = files.map((file: any) => file.base64);
    console.info(pictures);
    api.items.addPictures(id, pictures)
      .then((item) => {
        console.log(item);
      }).catch((error) => {
        console.error(error);
      })
  }
  function renderFiles() {
    return files.map((file: any, index: number) => (
      <div 
        key={index}
        className="ItemImageForm__modal__picture"
        style={{ backgroundImage: `url(${file.base64})` }}
      >
      </div>
    ));
  }
  return (
    <div className="ItemImageForm">
      <i className="fas fa-plus" onClick={openModal}></i>
      <Modal
        className="ItemImageForm__modal"
        open={open}
        onClose={closeModal}
      >
        <div className="flex-modal">
          <div className="flex-modal__content">
            <FileBase64 multiple={true} onDone={onFileDone} />
            <div className="ItemImageForm__modal__images">
              {renderFiles()}
            </div>
            <div className="ItemForm__buttons">
              <Button
                onClick={savePictures}
                variant="contained"
                color="primary"
                className="mr-3"
              >
                Save
              </Button>
              <Button
                variant="contained" 
                color="default"
                onClick={closeModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ItemImageForm;
