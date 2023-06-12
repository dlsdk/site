import totoalActionType from "../actiontypes";

const INCREASE_DECREASE=(val) => {
    console.log("val : " , val);
    return {
        type:totoalActionType.total.INCREASE_DECREASE, payload:val
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


const totalActions = {INCREASE_DECREASE,ADD_TO_TOTAL,PERSENT};
export default totalActions;
