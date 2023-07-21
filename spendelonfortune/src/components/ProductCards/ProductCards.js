import React from 'react'
import selectors from '../../redux/selectors'
import { useSelector,useDispatch } from 'react-redux'
import style from "./ProductCards.module.css"
import helpers from '../helper'
import Actions from '../../redux/actions'

const {
    helperFunctions: {formatNumberWithComma}
} = helpers
  
const {
    productSelectors: { selectcurrentTotalBalance,
        selectFortuneStatus,
        selectProductList,
        selectShoppingBasket,
        selectTotalFortune
    }
} = selectors

const {
    totalActions: {buyAndSell,
        addToBasket,
        FortuneFinish,
        deleteFromShoppingBasket
    }
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
        return shoppingBasket.find(item => item.id === product.id);
    }

    const getNewPersentOfFortune = (possibleTotalBalance) => {
        return ((totalFortune - possibleTotalBalance)/totalFortune) * 100;;
    }
    
    const sell = (product) => {
        const possibleTotalBalance = currentTotalBalance + product.unitPrice;
        if (possibleTotalBalance <= totalFortune)
        {
                const shoppingBasketElement = checkIsBasketElement(product);
                const newPersentOfFortune = getNewPersentOfFortune(possibleTotalBalance);
                const newTaken = shoppingBasketElement.taken - 1;
                updateShoppingBasketElementValues(newTaken,product.id,newPersentOfFortune,possibleTotalBalance);
                if (newTaken === 0){
                    dispatch(deleteFromShoppingBasket(shoppingBasketElement));
                }
        }
    }
  
    const buy = (product) => {
        const possibleTotalBalance = currentTotalBalance - product.unitPrice;
        if (possibleTotalBalance > 0){
            const shoppingBasketElement = checkIsBasketElement(product);
            const newPersentOfFortune = getNewPersentOfFortune(possibleTotalBalance);
            if (shoppingBasketElement){ 
                const newTaken = shoppingBasketElement.taken + 1;   
                updateShoppingBasketElementValues(newTaken,product.id,newPersentOfFortune,possibleTotalBalance)
            }
            else{
                dispatch(addToBasket({
                    ...product, 
                    taken: 1, 
                    currentTotalBalance: possibleTotalBalance, 
                    persentOfFortune:newPersentOfFortune
                }));
            }
        }
        else{
            dispatch(FortuneFinish());
        }
    }

    return (
        <div className={style.products}>
            {productsList.map((products,index) => (
                <div key={index} className={`card ${style.card}`}>
                    <img  className={style.img} src={products.imgSrc} alt="productimage"/>
                    <div className={`card-body ${style.cardb}`}>
                        <p className={style.p}>{products.name}</p>
                        <span className={style.sp}> USD {formatNumberWithComma(products.unitPrice)}</span>
                    </div>
                      <div className={style.cardbuttonsdiv}>
                       <button className={`btn btn-primary btn-md ${style.buttonSell}`} disabled={getTakenQuantity(products) === 0} onClick={() => sell(products)}>Sell</button>
                        <p className={style.buttonsp}>{getTakenQuantity(products)}</p>
                        <button className={`btn btn-primary btn-md ${style.buttonBuy}`} disabled={isFortuneFinish} onClick={() => buy(products)}>Buy</button>
                    </div>
                </div>  
            ))} 
        </div>
    )
    }
