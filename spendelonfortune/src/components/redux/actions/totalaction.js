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


const totalActions = {INCREASE,DECREASE,ADD_TO_TOTAL,PERSENT};
export default totalActions;
