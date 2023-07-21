import totoalActionType from "../actiontypes";
import products from "../products_list";

const {FORTUNE_FINISHED,BUY_SELL,ADD_TO_BASKET,DELETE_TO_BASKET} = totoalActionType.total;


const totalreducer = (state=products,action) =>{
    switch (action.type) {
        case BUY_SELL:
          return {
           ...state,
           shoppingBasket : {...state.shoppingBasket, [action.payload.id]:{...state.shoppingBasket[action.payload.id], taken: action.payload.taken}},
           currentTotalBalance : action.payload.currentTotalBalance,
           persentOfFortune : action.payload.persentOfFortune,
           isUserStartShopping:true,
           isFortuneFinish:false
          };
        case FORTUNE_FINISHED:
          return {
            ...state,
            isFortuneFinish: true
          }
        case ADD_TO_BASKET:
          return {
            ...state,
            shoppingBasket : {...state.shoppingBasket, [action.basketElement.id]:{...action.basketElement}},
            isUserStartShopping:true,
            currentTotalBalance: action.basketElement.currentTotalBalance,
            persentOfFortune: action.basketElement.persentOfFortune
          }
        case DELETE_TO_BASKET:
          const newShoppingBasket = {...state.shoppingBasket};
          delete newShoppingBasket[action.deletedBasketElement.id]
          return {
            ...state,
            shoppingBasket: newShoppingBasket
          };
        default:
          {
            return state;
          }
          
      }
}

export default totalreducer;