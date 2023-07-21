import React from 'react'
import selectors from '../../redux/selectors'
import { useSelector } from 'react-redux'
import style from "./InfoBar.module.css"
import helpers from '../../helper'
  
const {
    productSelectors: { selectpersentOfFortune, selectcurrentTotalBalance, selectFortuneStatus,selectUserShoppingStatus }
} = selectors

const {
    helperFunctions: { formatNumberWithComma,toFixedVal }
} = helpers

export default function InfoBar() {

  const isFortuneFinish = useSelector(selectFortuneStatus);
  const currentTotalBalance = useSelector(selectcurrentTotalBalance);
  const isUserStartShopping = useSelector(selectUserShoppingStatus);
  const persentOfFortune = useSelector(selectpersentOfFortune);

  const getPersentOfFortuneText = () => {
    if (isUserStartShopping){
        return `You only spent ${toFixedVal(persentOfFortune)}  % of the total!`;
    }
    else {
         return  "You haven't spent a single dollar! start buying!"
    }
}
  return (
    <nav className="row">
        <div className={style.navdiv}>
            {isFortuneFinish ?
                <>
                    <p className={style.navp}>Can't afford that!</p>
                    <p className={style.navpe}>Sell something!</p>
                </> :
                <>
                    <p className={style.navp}>Remaining: ${formatNumberWithComma(currentTotalBalance)}  USD</p>
                    <p className={style.navpe}>{getPersentOfFortuneText()}</p>
                </>
            }
        </div>
    </nav>
  )
}
