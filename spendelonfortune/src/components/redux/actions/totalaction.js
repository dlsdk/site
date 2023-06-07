import totoalActionType from "../actiontypes";

const INCREASE_PRICE=(val) => {
    return {
        type:totoalActionType.total.INCREASE_PRICE, payload:val
    }
} 

const DECREASE_PRICE=(val) => {
    return {
        type:totoalActionType.total.DECREASE_PRICE, payload:val
    }
} 

const ADD_TO_TOTAL=(val) => {
    return {
        type:totoalActionType.total.ADD_TO_TOTAL, payload:val
    }
} 

const REMOVE_TO_TOTAL=(val) => {
    return {
        type:totoalActionType.total.REMOVE_TO_TOTAL, payload:val
    }
}


const totalActions = {INCREASE_PRICE,DECREASE_PRICE,ADD_TO_TOTAL,REMOVE_TO_TOTAL};
export default totalActions;
