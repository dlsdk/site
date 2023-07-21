import React from 'react'
import selectors from '../../redux/selectors'
import { useSelector } from 'react-redux'
import style from "./ProductCards.module.css"
import helpers from '../helper'
import { useDispatch } from 'react-redux'
import Actions from '../../redux/actions'

const {
    helperFunctions: {formatNumberWithComma}
} = helpers
  
const {
    productSelectors: {selectcurrentTotalBalance,selectFortuneStatus,selectProductList,selectShoppingBasket,selectTotalFortune}
} = selectors

const {
    totalActions: {buyAndSell,addToBasket,FortuneFinishStatus,deleteFromShoppingBasket}
} = Actions

export default function ProductCards() {
    const dispatch = useDispatch();
    const isFortuneFinish = useSelector(selectFortuneStatus);
    const productsList = useSelector(selectProductList);
    const currentTotalBalance = useSelector(selectcurrentTotalBalance);
    const shoppingBasket = useSelector(selectShoppingBasket);
    const totalFortune = useSelector(selectTotalFortune);

    const updateShoppingBasketElementValues = (taken,id,newPersentOfFortune,possibleTotalBalance) => {
        const payload = {
            id,
            taken,
            currentTotalBalance : possibleTotalBalance,
            persentOfFortune : newPersentOfFortune
        }
        dispatch(buyAndSell(payload));
    }

    const getTakenQuantity = (product) => {
        const shoppingBasketElement = checkIsBasketElement(product);
        let quatity = 0;
        if (shoppingBasketElement)
            quatity = shoppingBasketElement.taken
        return quatity;
    }
    
    const checkIsBasketElement = (product) => {
        const shoppingBasketElement = Object.values(shoppingBasket).find(item => item.id === product.id);
        return shoppingBasketElement;
    }

    const getNewPersentOfFortune = (possibleTotalBalance) => {
        const newPersentOfFortune = ((totalFortune - possibleTotalBalance)/totalFortune) * 100;
        return newPersentOfFortune;
    }
    
    const sell = (product,amountOfDecrement=-1) => {
        const possibleTotalBalance = currentTotalBalance + product.unitPrice;
        if (possibleTotalBalance <= totalFortune)
        {
                if (isFortuneFinish){
                    dispatch(FortuneFinishStatus(false));
                }
                const shoppingBasketElement = checkIsBasketElement(product);
                const newPersentOfFortune = getNewPersentOfFortune(possibleTotalBalance);
                const newTaken = shoppingBasketElement.taken + amountOfDecrement;
                updateShoppingBasketElementValues(newTaken,product.id,newPersentOfFortune,possibleTotalBalance);
                if (newTaken === 0){
                    dispatch(deleteFromShoppingBasket(shoppingBasketElement));
                }
        }
    }
  
    const buy = (product,amountOfIncrement=+1) => {
        const possibleTotalBalance = currentTotalBalance - product.unitPrice;
        if (possibleTotalBalance > 0){
            const shoppingBasketElement = checkIsBasketElement(product);
            const newPersentOfFortune = getNewPersentOfFortune(possibleTotalBalance);
            let newTaken = 1;
            if (shoppingBasketElement){
                newTaken = shoppingBasketElement.taken + amountOfIncrement;
                updateShoppingBasketElementValues(newTaken,product.id,newPersentOfFortune,possibleTotalBalance)
            }
            else{
                dispatch(addToBasket({
                    ...product, 
                    taken: newTaken, 
                    currentTotalBalance: possibleTotalBalance, 
                    persentOfFortune:newPersentOfFortune
                }));
            }
        }
        else{
            dispatch(FortuneFinishStatus(true));
        }
    }

    return (
        <div className={`${style.products}`}>
            {Object.values(productsList).map((products,index) => (
                <div key={index} className={`card ${style.card}`}>
                    <img  className={style.img} src={products.imgSrc} alt="productimage"/>
                    <div className={`card-body ${style.cardb}`}>
                        <p className={` ${style.p}`}>{products.name}</p>
                        <span className={` ${style.sp}`}> USD {formatNumberWithComma(products.unitPrice)}</span>
                    </div>
                      <div className={`${style.cardbuttonsdiv}`}>
                       <button className={`btn btn-primary btn-md ${style.buttonSell}`} disabled={getTakenQuantity(products) === 0} onClick={() => sell(products)} >Sell</button>
                        <p className={style.buttonsp}>{getTakenQuantity(products)}</p>
                        <button className={`btn btn-primary btn-md ${style.buttonBuy}`} disabled={isFortuneFinish} onClick={() => buy(products)}>Buy</button>
                    </div>
                </div>  
            ))} 
        </div>
    )
    }
