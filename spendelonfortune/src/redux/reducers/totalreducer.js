import totoalActionType from "../actiontypes";
import products from "../products_list";

const {INCREASE_DECREASE, ADD_TO_TOTAL, PERSENT} = totoalActionType.total;


const totalreducer = (state=products,action) =>{
    switch (action.type) {
        case INCREASE_DECREASE:
          return {
           ...state,
           productsList: state.productsList.map((product) => action.payload.name === product.name ? {...product,taken:action.payload.taken}  : product ),
          };
        case ADD_TO_TOTAL:
          return {
           ...state,
           totalPrice: action.payload
          };
        case PERSENT :
          return {
            ...state,
            persent : action.payload
          };
        default:
          {
            return state;
          }
          
      }
}

export default totalreducer;