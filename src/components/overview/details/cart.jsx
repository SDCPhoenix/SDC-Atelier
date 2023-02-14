import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart({ styles, tester, handleStyleSelect, productID, selectedStyle}) {
  const [open, setOpen] = useState(false);
  const [sizeSelected, setSizeSelected] = useState(false);
  const [sku, setSku] = useState('');
  const [size, setSize] = useState('');
  const [amount, setAmount] = useState('');
  const [skus, setSkus] = useState('');
  const [empty, setEmpty] = useState(false);
  const [added, setAdded] = useState(false);

  let pic = styles.photos[0].thumbnail_url;

  useEffect(() => {
    setSizeSelected(false);
    setSize('');
    setAmount('');
  }, [handleStyleSelect, productID])

  const infos = Object.keys(styles.skus);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleChangeSize = (e) => {
    e.preventDefault();
    let size = e.target.value;
    setSkus(size);
    setSku(styles.skus[size])
    setSize(styles.skus[size].size)
    setSizeSelected(true);
  };

  const handleSelectQuantity = () => {
    let items = [];
    if (sku.quantity === undefined) {
      return <option value="" disabled selected>Out Of Stock</option>;
    }
    for (let i = 1; i <= sku.quantity; i++) {
      items.push(<option value={i}>{i}</option>);
    }
    return items;
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  }

  // handle submitting to cart here
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!size && !amount) {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false)
      }, 2000)
    } else if (size && amount) {
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 2000)
    }
  };

  return (
    <form className="cart">
        {infos[0] === 'null' && <select id="sizeList" disabled selected><option className="outofstock" disabled selected>OUT OF STOCK</option></select>}
      {infos[0] !== 'null' && <select name="sizeList" id="sizeList" onClick={(e) => handleOpen(e)} onChange={handleChangeSize}>
        {!sizeSelected && <option value="default" disabled selected>SELECT SIZE</option>}
        {infos.map((info) => <option value={info}>{styles.skus[info].size}</option>)}
      </select>}
      {infos[0] === 'null' && <select name="quantityList" id="quantityList" onChange={handleAmount} disabled>
        {(sizeSelected) ? handleSelectQuantity() : <option value="" disabled selected>--</option>}
      </select>}
      {infos[0] !== 'null' && <select name="quantityList" id="quantityList" onChange={handleAmount}>
        {(sizeSelected) ? handleSelectQuantity() : <option value="" disabled selected>--</option>}
      </select>}
      {infos[0] === 'null' && null}
      {infos[0] !== 'null' && <button id="addToBag" type="submit" onClick={((e) => {handleSubmit(e)})}>ADD TO BAG</button>}
      {empty && <div className="emptybag">Please select size and quantity!</div>}
      {added && <div className="added">Added to cart!</div>}
    </form>
  );
}

export default Cart;
