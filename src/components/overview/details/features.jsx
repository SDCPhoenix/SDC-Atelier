import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Ratings from './ratings.jsx'

function Features({ items, itemsInfo, styles}) {
  return (
    <div className="descriptionWrapper">
      <div className="description">
        <div className="slogantext">{itemsInfo.slogan}</div>
        <div className="descriptiontext">{itemsInfo.description} </div>
      </div>
      <div className="wrapperdivider"></div>
      <div className="wrapperfeatures">
        {itemsInfo.features.map(feature => {
          if (feature.value === null) {
            return <div className="features"><img src="https://img.icons8.com/material-outlined/24/null/checkmark--v1.png"/> {`${feature.feature}`}</div>
          }
          if (feature.feature === null) {
            return <div className="features"><img src="https://img.icons8.com/material-outlined/24/null/checkmark--v1.png"/> {`${feature.feature}`}</div>
          }
          return <div className="features"><img src="https://img.icons8.com/material-outlined/24/null/checkmark--v1.png"/> {`${feature.value} ${feature.feature}`}</div>
        })}
      </div>
    </div>
  );
}

export default Features;
