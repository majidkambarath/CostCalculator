import React, { useState,useEffect } from "react";
import Logo from "../assets/download.png";
import { AiOutlineAlignLeft } from "react-icons/ai";

export default function Home() {
  const [hide, setHide] = useState(true);
  const initialState = JSON.parse(localStorage.getItem('costCalculator')) || [
    { items: "DUKE", price: 45.5, qty: 0, total: 0 },
  ];
  const [grandTotal, setGrandTotal] = useState(0);
  const [items, setItems] = useState(initialState);
  const handleItemChange = (e, index, property) => {
    const updatedItems = [...items];
    updatedItems[index][property] = e.target.value;
    updatedItems[index].total = updatedItems[index].price * updatedItems[index].qty;
    setItems(updatedItems);
  };
  useEffect(()=>{
    localStorage.setItem('costCalculator',JSON.stringify(items))
   },[items]);

  useEffect(() => {
    // Calculate the grand total by summing up the total of all items
    const calculatedGrandTotal = items.reduce((acc, item) => acc + item.total, 0);
    setGrandTotal(calculatedGrandTotal);
  }, [items]);
  const addItem = ()=>{
    const newItem = {
      items: "New Item",
      price: 0,
      qty: 0,
      total: 0,
    };
    setItems([...items, newItem]);
  }
  const handleRowDelete = (index) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this row?");
  
    if (isConfirmed) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };
  return (
    <>
      <div className="bg-slate-200 w-full h-20 shadow-2xl">
        <div className="flex justify-between">
          <div>
            <img className="h-20 py-3 ml-3" src={Logo} alt="logo_img" />
          </div>
          <div
            onClick={() => setHide(!hide)}
            className="cursor-pointer relative"
          >
            <h1 className="text-3xl mt-5 mr-4">
              <AiOutlineAlignLeft />
            </h1>
          </div>
        </div>
      </div>

      <div>
        <button onClick={addItem} className="bg-cyan-500 rounded-2xl mt-3 w-[90px] h-[30px] ml-[290px]">
          Add
        </button>
      </div>

      <table className="table-auto mt-4">
        <thead className="bg-slate-300">
          <tr>
            <th className="p-2">Items</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr onDoubleClick={() => handleRowDelete(index)} key={index}>
                <td className="p-2">
                  <input
                    className="border-b-2 w-24 border-gray-400 outline-0 p-3 text-sm font-semibold text-gray-500 text-center"
                    type="text"
                    value={item.items}
                    onChange={(e) => handleItemChange(e, index, "items")}
                    placeholder="Items"
                  />
                </td>
                <td className="p-3">
                  <input
                    className="border-b-2 w-20 border-gray-400 outline-0 p-3 text-sm font-semibold text-gray-500 text-center"
                    type="text"
                    value={item.price}
                    onChange={(e) => handleItemChange(e, index, "price")}
                    placeholder="Price"
                  />
                </td>
                <td className="p-4">
                  <input
                    className="border-b-2 w-14 border-gray-400 outline-0 p-3 text-sm font-semibold text-gray-500 text-center"
                    type="text"
                    value={item.qty}
                    onChange={(e) => handleItemChange(e, index, "qty")}
                    placeholder="Qty"
                  />
                </td>
                <td className="p-2">
                  <input
                    className="border-b-2 w-20 border-gray-400 outline-0 p-3 text-sm font-semibold text-gray-500 text-center"
                    type="text"
                    value={item.total}
                    placeholder="Total"
                  />
                </td>
             
              </tr>
            );
          })}
          <tr>
            <td colSpan="3" className="text-right font-serif ">
              Grand Total:
            </td>
            <td className="p-2 font-bold">{grandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
