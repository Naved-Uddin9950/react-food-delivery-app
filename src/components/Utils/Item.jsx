import React, { useState } from 'react';

const Item = ({
    name,
    price,
    img
}) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity >= 0 ? newQuantity : 0);
    };

    const totalPrice = quantity * price;

    return (
        <div className="w-full rounded-xl shadow-dark bg-white" id="menuItem">
            <img src={img} alt="image" className="w-full rounded-t-xl" />
            <h3 className="font-bold text-2xl text-center">{name}</h3>
            <div className="flex flex-col justify-center items-start font-semibold m-4">
                <h4>
                    Price: $<span className="price">{price}</span>
                </h4>
                <div className="h-max">
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        min="0"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="border rounded w-20 pl-2 pr-1"
                    />
                </div>
                <h4>
                    Total: $<span className="total">{totalPrice.toFixed(2)}</span>
                </h4>
            </div>
        </div>
    );
};

export default Item;
