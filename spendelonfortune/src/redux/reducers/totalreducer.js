import totoalActionType from "../actiontypes";
import products from "../products_list";

const {INCREASE_DECREASE, ADD_TO_TOTAL, PERSENT} = totoalActionType.total;


const totalreducer = (state=products,action) =>{
    switch (action.type) {
        case INCREASE_DECREASE:
          return {
           ...state,
           productslist: state.productslist.map((product) => action.payload.name === product.name ? {...product,alınan:action.payload.alınan}  : product ),
          };
        case ADD_TO_TOTAL:
          return {
           ...state,
           totalprice: action.payload
          };
        case PERSENT :
          return {
            ...state,
            persent : action.payload
          };
        default:
          {
            console.log("burda");
            return state;
          }
          
      }
}

export default totalreducer;