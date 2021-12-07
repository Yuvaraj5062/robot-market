import React from "react";
import { GiShoppingBag } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';
import Moment from 'moment'
import { Modal } from 'react-bootstrap';

const Products = () => {
  const dispatch = useDispatch();
  const [robot, setRobot] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState();
  const [allRobots, setAllRobots] = React.useState()
  const [modal, setModal] = React.useState(false);
  const togglePopup = () => setModal(false);
  const [message, setMessage] = React.useState("")


  //get robots api call
  React.useEffect(() => {
    axios.get(`http://localhost:8000/api/robots`, {
    })
      .then((response) => {
        setRobot(response.data.data)
        setAllRobots(response.data.data)
      })
  }, []);

  let filteredRobot = []
  let addToCartType = []
  let addToCart = []
  let robotName=[]
  
  //return array of filtered robots
  robot.map((item) => {
    if (item.material === filterValue) {
      filteredRobot.push(item)
    }
    return 0
  })

  //return robots for perticular name
  function applyFilter() {
    if (filteredRobot) {
      setRobot(filteredRobot)
    }
  }

  //clear filter and return all robots
  function clearFilter() {
    setRobot(allRobots)
  }

  //return selected robot name
  function selectRobotNameHandler(e) {
    setFilterValue(e.target.value);
  }

//it will return array of robot names 
  const getRobotNames = () => {
    const nums = []
    for (let i = 0; i < robot.length; i++) {
      nums.push(robot[i].material)
    }
    let newArray = nums.filter(function (elem, pos) {
      return nums.indexOf(elem) === pos;
    });
    robotName = newArray
  }

  if (robot) {
    getRobotNames()
  }
  //return array aaded in cart 
  const handleClick = (item) => {
    let flag = addToCartType.includes(item.name)
    if (!flag) {
      if (addToCartType.length > 4) {
        setMessage("You can't select more then 5 types of robots ")
        setModal(true)
      }
      else {
        addToCartType.push(item.name)
        addToCart.push(item)
      }
    }

  }
  //despatch action to and array ob robots which are added to cart
  function addToCartHandler() {
    dispatch({ type: "ADD", payload: addToCart })
  }
  return (
    <div className="productConatiner">
      <div className="navigation">
        <div className="select-container">

          <select onChange={selectRobotNameHandler}>
            {robotName.map((option) => (
              <option key={Math.random()} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={applyFilter}>Apply Filter</button>
        <button type="button" className="btn btn-primary" onClick={clearFilter}>Clear Filter</button>

        <Link to="/cart" >
          <GiShoppingBag onClick={addToCartHandler} size={40}  />
        </Link>
      </div>
      {robot ?
        <div className="products">
          {robot.map((item, index) => {
            item.quantity = 1;
            return (
              <div className="product   " key={index}>
                <Modal show={modal} >
                  <Modal.Header >Warning</Modal.Header>
                   <Modal.Body>
                     {message}
                   </Modal.Body>
                    <Modal.Footer>
                    <button type="button" className="btn btn-outline-secondary" onClick={(e) => togglePopup()}>Close</button>
                  </Modal.Footer>
                </Modal>
                <img className="border" src={item.image} alt="cart" />
                <h5>{item.name}</h5>
                <p>Price ฿{(item.price/2.23).toFixed(2)}</p>
               
                {/* Price in Rupees
                 <p>Price ฿{item.price}</p>
                 
                 */}
                <p>Stock - {item.stock}</p>
                <p>Material - {item.material}</p>
                <p>Created At -{Moment(item.createdAt).format('DD-MM-YYYY')}</p>
                <button type="button"
                  disabled={!item.stock}
                  className="btn btn-default btn-sm"
                   onClick={() => handleClick(item)}
                   >
                  <span className="glyphicon glyphicon-shopping-cart">
                  </span>
                  <b> Add to Cart </b>
                </button>
              </div>
            );
          })}
        </div>
        : null}
    </div>
  );
};

export default Products;
