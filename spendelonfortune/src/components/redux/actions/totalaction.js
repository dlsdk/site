import totoalActionType from "../actiontypes";

const INCREASE=(val) => {
    console.log("val : " , val);
    return {
        type:totoalActionType.total.INCREASE, payload:val
    }
} 

const DECREASE=(val) => {
    return {
        type:totoalActionType.total.DECREASE, payload:val
    }
} 

const ADD_TO_TOTAL=(val) => {
    return {
        type:totoalActionType.total.ADD_TO_TOTAL, payload:val
    }
} 

const PERSENT=(val) => {
    return {
        type:totoalActionType.total.PERSENT, payload:val
    }
}

const RECEIPT=(val) => {
    return {
        type:totoalActionType.total.RECEIPT, payload:val
    }
}
const UPDATE_RECEIPT=(val) => {
    return {
        type:totoalActionType.total.UPDATE_RECEIPT, payload:val
    }
}
const DELETE_RECEIPT=(val) => {
    return {
        type:totoalActionType.total.DELETE_RECEIPT, payload:val
    }
}

const totalActions = {INCREASE,DECREASE,ADD_TO_TOTAL,PERSENT,RECEIPT,UPDATE_RECEIPT,DELETE_RECEIPT};
export default totalActions;
