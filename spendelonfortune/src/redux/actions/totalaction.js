import ActionTypes from "../actiontypes"

const {
    total: {ADD_TO_BASKET,PERSENT_OF_FORTUNE,BUY_SELL,FORTUNE_FINISHED,DELETE_TO_BASKET},
} = ActionTypes

const buyAndSell=(payload) => {
    return {
        type:BUY_SELL,
        payload
    }
}

const FortuneFinish = () => {
    return {
        type:FORTUNE_FINISHED
    }
}

const addToBasket = (basketElement) => {
    return {
        type:ADD_TO_BASKET,
        basketElement
    }
} 


const updatepersentOfFortune=(persentOfFortune) => {
    return {
        type:PERSENT_OF_FORTUNE,
        persentOfFortune
    }
}

const deleteFromShoppingBasket=(deletedBasketElement) => {
    return {
        type:DELETE_TO_BASKET,
        deletedBasketElement
    }
}

const totalActions = {buyAndSell,updatepersentOfFortune,addToBasket,FortuneFinish,deleteFromShoppingBasket};
export default totalActions;
