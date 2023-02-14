import React, { useState, useEffect } from 'react';
import SampleData2 from './SampleData2.jsx';
import SampleDataMeta from './SampleDataMeta.jsx';
import './ratings.css';
import axios from 'axios';
import starsMap from './starMap.jsx';

  var progFilArray = [];

function RatingsCard({onClickProgressBars, productID}) {

  // console.log('PRODUCTID FROM RATINGS CARD', productID);

  const [getData, setGetData] = useState(true);
  const [ratingAvg, setRatingAvg] = useState(0);
  const [reviewDistribution, setReviewDistribution] = useState({})
  const [recAvg, setRecAvg] = useState('')
  const [metadataRatings, setMetadataRatings] = useState('');
  const [metadataRecommended, setMetadataRecommended] = useState('');
  const [metadataChars, setMetadataChars] = useState('');


  var data;
  var metaData = SampleDataMeta();
  var metaDataChars = SampleDataMeta().characteristics;


  useEffect(() => {
    // console.log('product id useffect', productID, typeof productID)
    axios.get('/metadata', { params: {
      productID: productID
    }})
    .then(response => {
      // console.log('successful metadata get', response.data);
      metaData.ratings = response.data.ratings;
      setMetadataRatings(response.data.ratings);
      metaData.recommended = response.data.recommended;
      setMetadataRecommended(response.data.recommended);
        var ratingsSum = 0;
        var ratingsCount = 0;
        for (var key in metaData.ratings) {
          ratingsSum += metaData.ratings[key] * (key)
          ratingsCount += metaData.ratings[key] * 1;
        }
          //calc rating avg and review count & average
        var avg = (ratingsSum / ratingsCount).toFixed(1);
        setRatingAvg(avg);
        //calc rev recommend %
        var recTotal = (metaData.recommended.false * 1 + metaData.recommended.true * 1)
        let recAverage = ((metaData.recommended.true / recTotal) * 100).toFixed();
        setRecAvg(recAverage);
        // console.log('metadata ratings', metaData.ratings, recAverage);
        setMetadataChars(response.data.characteristics);

    }).catch(err => {
      console.log('err getting metadata son', err);
    })

  }, [productID]);


  //render stars
  var starsArray = starsMap(ratingAvg);


  // //progress bars to rep review % by stars
  // var distributionMap = [];
  // //find max loop
  // var max = 0;
  // for (var key in metaData.ratings) {
  //   if (metaData.ratings[key] * 1 > max) {
  //     max = metaData.ratings[key] * 1;
  //   }
  // }
  // for (var i = 5; i >= 1; i--) {
  //   var num = i;
  //   distributionMap.push(
  //     <div>
  //     <label for={i}>{i} Stars</label>
  //     <progress id={i} className="reviewBar" value={metaData.ratings[i] || 0} max={max} onClick={(i) => {progBarFilters(i.target.id)}}></progress>
  //     <label for={i}>{metaData.ratings[i] || 0}</label></div>
  //   )
  // }

  //progress bars to rep review % by stars
  var distributionMap = [];
  //find max loop
  var max = 0;
  for (var key in metadataRatings) {
    if (metadataRatings[key] * 1 > max) {
      max = metadataRatings[key] * 1;
    }
  }
  for (var i = 5; i >= 1; i--) {
    var num = i;
    distributionMap.push(
      <div>
      <label for={i}>{i} Stars</label>
      <progress id={i} className="reviewBar" value={metadataRatings[i] || 0} max={max} onClick={(i) => {progBarFilters(i.target.id)}}></progress>
      <label for={i}>{metadataRatings[i] || 0}</label></div>
    )
  }




  //calc rev recommend %
  // var recTotal = (metaData.recommended.false * 1 + metaData.recommended.true * 1)
  // var recAverage = ((metaData.recommended.true / recTotal) * 100).toFixed();

  const [progressBarFiltersArray, setProgressBarFiltersArray] = useState([]);

  const progBarFilters = (numToToggle) => {
    var sliced = progFilArray.slice()
    var index = sliced.indexOf(numToToggle)

    if (index !== -1) {
      var newArr = sliced.splice(index, 1);
      setProgressBarFiltersArray(newArr);
      progFilArray = sliced;
    } else {
      setProgressBarFiltersArray(...progressBarFiltersArray, numToToggle);
      progFilArray.push(numToToggle);
    }
    onClickProgressBars(progFilArray)
  };


  var slidersArray = [];
  for (var key in metadataChars) {
    var value = (metadataChars[key].value)
    var sliderText;
    if (key === 'Width') {
      // sliderText = 'A size too small  Perfect A  size too wide'
      sliderText = <div className='flexDiv'><span className='left' >Too small</span> <span className='middle' >Perfect</span>
      <span className='right'> Too wide</span>
      </div>
    }
    if (key === 'Size') {
      // sliderText = 'Too narrow  Perfect Too wide'
      sliderText = <div className='flexDiv'><span className='left' >Too narrow </span> <span className='middle' >Perfect</span>
      <span className='right'> Too wide </span>
      </div>
    }

    if (key === 'Comfort') {
      sliderText = <div className='flexDiv'><span className='left' >Uncomfortable </span> <span className='middle' >Ok</span>
      <span className='right'> Perfect </span>
      </div>
    }
    if (key === 'Quality') {
      sliderText = <div className='flexDiv'><span className='left' >Poor </span> <span className='middle' > Expected </span>
      <span className='right'> Perfect </span>
      </div>
    }
    if (key === 'Length') {
      sliderText = <div className='flexDiv'><span className='left' >Runs short </span> <span className='middle' >Perfect </span>
      <span className='right'> Runs long </span>
      </div>
    }
    if (key === 'Fit') {
      sliderText = <div className='flexDiv'><span className='left' >Runs tight </span> <span className='middle' >Perfect </span>
       <span className='right'> Runs long </span>
       </div>
    }

    slidersArray.push(<div className='sliderBox'>
     {key}<br></br>
      <input className='slider' type="range" value={value} max='5' name={key} disabled></input><br></br>
      {/* <div className='sliderText' for={key}>{sliderText}  <span> </span></div> */}
      <div for={key}>{sliderText}  <span> </span></div>

    </div>)
  }


return (
  <div className='ratingsBox'>
    <div className='ratingsCard'>{ratingAvg}<div className='starContainer'>{starsArray}

    </div>
  </div>
  <div className='recAvg'>{recAvg}% of reviews recommend this product</div>
  <div className='progressBars'>{distributionMap}</div>
  <div className='slidersArray'>{slidersArray}</div>
</div>

)

}




export default RatingsCard;


//INPUTS: stars, distribution of ratings, slider ratings,
//header will be a number, to the right filled in stars
//paragraph body when i render the bars,
  //each bar will re render review list
//paragraph body to render the sliders
