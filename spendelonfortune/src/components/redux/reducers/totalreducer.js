import totoalActionType from "../actiontypes";
import products from "../products_list";

const {INCREASE, ADD_TO_TOTAL, PERSENT,DECREASE,RECEIPT,UPDATE_RECEIPT,DELETE_RECEIPT} = totoalActionType.total;


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
          case RECEIPT :
          return {
            ...state,
            forreceipt: [
              ...state.forreceipt,
              action.payload
             ]
          };
          case UPDATE_RECEIPT :
            return {
              ...state,
              forreceipt: state.forreceipt.map((element) => action.payload.name === element.name ? {...element,alınan:action.payload.alınan,totalp:action.payload.totalp}  : element ),
            };
            case DELETE_RECEIPT :
              return {
                ...state,
                forreceipt: action.payload
              };
        default:
          {
            console.log("burda");
            return state;
          }
          
      }
}

export default totalreducer;