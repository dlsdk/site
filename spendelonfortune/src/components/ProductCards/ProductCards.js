import React from 'react'
import selectors from '../../redux/selectors'
import { useSelector,useDispatch } from 'react-redux'
import style from "./ProductCards.module.css"
import Actions from '../../redux/actions'
import Card from '../card/Card'

const {
    productSelectors: {selectcurrentTotalBalance,selectProductList,selectShoppingBasket,selectTotalFortune}
} = selectors

const {
    totalActions: { buyAndSell,addToBasket,FortuneFinish,deleteFromShoppingBasket }
} = Actions

export default function ProductCards() {
    const dispatch = useDispatch();
    const productsList = useSelector(selectProductList);
    const currentTotalBalance = useSelector(selectcurrentTotalBalance);
    const shoppingBasket = useSelector(selectShoppingBasket);
    const totalFortune = useSelector(selectTotalFortune);

    const updateShoppingBasketElementValues = (taken,id,newPersentOfFortune,possibleTotalBalance) => {
        dispatch(buyAndSell({
            id,
            taken,
            currentTotalBalance : possibleTotalBalance,
            persentOfFortune : newPersentOfFortune
        }));
    }
      
    const getNewPersentOfFortune = (possibleTotalBalance) => {
        return ((totalFortune - possibleTotalBalance)/totalFortune) * 100;
    }
    
    const checkIsBasketElement = (product) => {
        return shoppingBasket.find(item => item.id === product.id);
    }
    
    const getTakenQuantity = (product) => {
        const shoppingBasketElement = checkIsBasketElement(product);
        let quatity = 0;
        if (shoppingBasketElement)
            quatity = shoppingBasketElement.taken
        return quatity;
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
                    persentOfFortune: newPersentOfFortune
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
               <Card index={index} products={products} getTakenQuantity={getTakenQuantity} buy={buy} sell={sell} />
            ))} 
        </div>
    )
    }
