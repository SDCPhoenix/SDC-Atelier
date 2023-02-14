import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Selector({ itemStyles, handleStyleSelect, styles, selectedStyle, productID }) {
  const [currentThumbnail, setCurrentThumbnail] = useState(0);
  const temp = selectedStyle || itemStyles.results[0].style_id

  useEffect(() => {
    setCurrentThumbnail(0);
  }, [productID])

  if (styles.photos[0].thumbnail_url === null) {
    return <div className="cats">SOLD OUT</div>;
  }

  for (let i = 0; i < itemStyles.results.length; i++) {
    if (itemStyles.results[i].photos.thumbnail_url === undefined) {
      itemStyles.results[i].photos.thumbnail_url="https://www.pngitem.com/pimgs/m/370-3708742_memes-cat-sunglasses-cat-meme-hd-png-download.png";
    }
  }

  return (
    <div className="styles">
      <div className="styletext">STYLE &#5171; {styles.name}</div>
      <p className="selectorGrid">
        {itemStyles.results?.map((itemStyle, index) => {
          if(itemStyle && itemStyle.photos[index]) {
            return <button className={itemStyle.photos[currentThumbnail].thumbnail_url === itemStyle.photos[index].thumbnail_url ? 'selecStyleon' : 'selecStyleoff '} onClick={() => setCurrentThumbnail(itemStyle.photos.indexOf(itemStyle.photos[index]))} onClick={(e) => handleStyleSelect(e)}
              type="submit" value={itemStyle.style_id} key={index}>
              <div className='layover'>
                {itemStyle.style_id === temp && <img className="checkedBox" src="https://img.icons8.com/material-outlined/512/checked--v1.png" />}
              </div>
              <img className="thumbnail"
                src={itemStyle.photos[currentThumbnail].thumbnail_url}
              />
            </button>;
          }
        })}
      </p>
    </div>
  );
}

export default Selector;
