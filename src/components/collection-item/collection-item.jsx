import React from "react";
import Button from "../ui/button/button";
import { addItems } from "../../redux/cart/cart.slice";

import "./collection-item.style.scss";

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;
  return (
    <>
      <div className="collection-item">
        <div
          className="image"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
        <div className="collection-footer">
          <span className="name">{name}</span>
          <span className="price">${price}</span>
        </div>
        <Button onClick={() => addItems(item)} inverted>
          ADD TO CART
        </Button>
      </div>
    </>
  );
};

export default CollectionItem;
