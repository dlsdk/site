import totoalActionType from "../actiontypes";
import products from "../products_list";

const {INCREASE, ADD_TO_TOTAL, PERSENT,DECREASE} = totoalActionType.total;


const totalreducer = (state=products,action) =>{
    switch (action.type) {
        case INCREASE:
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
        case DECREASE:
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