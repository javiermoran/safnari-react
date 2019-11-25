import React from 'react';
import './ImgSplash.scss';

const ImgSplash = ({ open = false, picture = '', onClose = () => {} }) => {
  return (
    <div className={`ImgSplash ${!open ? 'ImgSplash--hidden' : ''}`}>
      <div className="ImgSplash__overlay">
        <i 
          className="fas fa-times ImgSplash__close"
          onClick={onClose}
        ></i>
        <img src={picture}></img>
      </div>
    </div>
  );
}

export default ImgSplash;
