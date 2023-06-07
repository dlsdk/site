import totoalActionType from "../actiontypes";
import products from "../products_list";

const {INCREASE_PRICE, ADD_TO_TOTAL, REMOVE_TO_TOTAL,DECREASE_PRICE} = totoalActionType;


const totalreducer = (state=products,action) =>{
    switch (action.type) {
        case INCREASE_PRICE:
          return {
           ...state,
           productslist: state.productslist.map((product) => action.payload === product.name ? {...product,alınan:product.alınan+1}  : product ),
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
            productslist: state.productslist.map((product) => action.payload.name === product.name ? {...product,alınan:product.alınan-1}  : product ),
          }
        default:
          return state;
      }
}

export default totalreducer;