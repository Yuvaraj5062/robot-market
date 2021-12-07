const Reducer = (cart = [], action) => {
  if (action.type === "ADD") {

   if (cart.length === 0) {
     return [...cart, action.payload];
   } else {
     return cart;
   }
 }
 
  if (action.type === "CHANGE-COUNT") {
    let existingItemIndex = (cart, action.payload);
    cart[existingItemIndex] += action.payload;
    return {...cart,};
  }

};
export default Reducer;
