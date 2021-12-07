import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from 'react-bootstrap';

const Cart = () => {
  const cartData = useSelector((state) => state);
  const dispatch = useDispatch();
  const [increasedCartCount, setIncreasedCartCount] = React.useState(1)
  const [decreasedCartCount, setDecreasedCartCount] = React.useState()
  const [increseCountByName, setIncreseCountByName] = React.useState(" ")
  const [decreasedCountByName, setDecreseCountByName] = React.useState(" ")

  const [modal, setModal] = React.useState(false);
  const togglePopup = () => setModal(false);
  const [message, setMessage] = React.useState("")

  let data = []
  //return object to array of object
  if (cartData) {
    const propertyNames = Object.entries(cartData);
    for (let i = 0; i < propertyNames[0][1].length; i++) {
      data.push(propertyNames[0][1][i])
    }
  }

  //increase selected robot quantity by one 
  //if selected value is more than stock value then show warning
  const handleIncreaseCaunt = (cartItem) => {
    setIncreasedCartCount(increasedCartCount + 1)
    if (cartItem.stock < increasedCartCount) {
      setModal(true);
      setIncreasedCartCount(1)
      setMessage(`${cartItem.name} is out of stock`)

    }
    else {
      setIncreseCountByName(previousState => ({
        name: cartItem.name
      }))

      if (increseCountByName.name === cartItem.name) {
        cartItem.quantity = increasedCartCount

      }
      else {
        setIncreasedCartCount(cartItem.quantity)
      }
      dispatch({ type: "CHANGE-COUNT", payload: cartItem })

    }
  }
  //decrease selected robot quantity by one 
  const handleDecreaseCount = (cartItem) => {
    if (cartItem.quantity > 1) {
      setDecreasedCartCount(cartItem.quantity - 1)
      setDecreseCountByName(previousState => ({
        name: cartItem.name
      }))
      if (decreasedCountByName.name === cartItem.name) {
        cartItem.quantity = decreasedCartCount
      }
      else {
        setDecreasedCartCount(cartItem.quantity)
      }

      dispatch({ type: "CHANGE-COUNT", payload: cartItem })
    }
  }

//Calculate total amount of cart item
  const addition = (acc, currentvalue) => {
    return acc + currentvalue.price * currentvalue.quantity;
  };
  const total = data.reduce(addition, 0);

  return (
    <>
      <div className="cartcontainer">

        <nav className="navbar navbar-light bg-light justify-content-between fixed-top">
          <div className="navbar-brand ">
            <Link to="/">
              <TiArrowBack />
            </Link>
          </div>
          <div className="form-inline">
            {total > 0 &&
              <h2 className="navbar-brand" >
                Total Amount : ฿{(total / 2.23).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </h2>}
          </div>
        </nav>

        {cartData ?
          <>
            <div className="products">
              {data.map((item, index) => {
                return (
                  <div className="product" key={index}>

                    <Modal show={modal} >
                      <Modal.Header >Message</Modal.Header>
                      <Modal.Body>
                        {message}
                      </Modal.Body>
                      <Modal.Footer>
                        <button className="btn btn-outline-primary" onClick={(e) => togglePopup()}>Close</button>
                      </Modal.Footer>
                    </Modal>
                    <div>
                      <img className="border" src={item.image} alt="cart" />
                      <h5>{item.name}</h5>
                      <p>Price ฿{item.price}</p>
                      <p>Material - {item.material}</p>
                      <p>Stock - {item.stock}</p>
                    </div>
                    <div>
                      <button type="button"
                        className="btn btn-default btn-sm p4" onClick={() => handleIncreaseCaunt(item)}>
                        <span className="glyphicon glyphicon-shopping-cart">
                        </span>
                        <b> + </b>
                      </button>
                      <p className="d-inline p-2 ">{item.quantity}</p>

                      <button type="button"
                        className="btn btn-default btn-sm p4" onClick={() => handleDecreaseCount(item)}>
                        <span className="glyphicon glyphicon-shopping-cart">
                        </span>
                        <b> - </b>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </>
          : <h2 className="margin">Cart is Empty</h2>}
      </div>
    </>
  );
};

export default Cart;
