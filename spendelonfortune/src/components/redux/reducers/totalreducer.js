import totoalActionType from "../actiontypes";
import products from "../products_list";

const {INCREASE_PRICE, ADD_TO_TOTAL, REMOVE_TO_TOTAL,DECREASE_PRICE} = totoalActionType.total;


const totalreducer = (state=products,action) =>{
    switch (action.type) {
        case INCREASE_PRICE:
          return {
           ...state,
           productslist: state.productslist.map((product) => action.payload.name === product.name ? {...product,alınan:action.payload.alınan}  : product ),
          };
        case ADD_TO_TOTAL:
          return {
           ...state,
           totalprice: action.payload
          };
        case REMOVE_TO_TOTAL :
          return {
            ...state,
          };
        case DECREASE_PRICE:
          return{
            ...state,
            productslist: state.productslist.map((product) => action.payload.name === product.name ? {...product,alınan:action.payload.alınan}  : product ),
          }
        default:
          {
            console.log("burda");
            return state;
          }
          
      }
}

export default totalreducer;