import React from 'react'
import style from './Card.module.css'
import selectors from '../../redux/selectors'
import { useSelector } from 'react-redux'
import helpers from '../../helper'

const {productSelectors: {selectFortuneStatus}} = selectors
const {
    helperFunctions: {formatNumberWithComma}
} = helpers
  

export default function Card(props) {

    const {index, products,getTakenQuantity,buy,sell} = props
    const isFortuneFinish = useSelector(selectFortuneStatus);
  
    return (
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
  )
}
