import React from 'react'
import style from "./Receipt.module.css"
import { useSelector } from "react-redux"
import selectors from "../../redux/selectors";
import helpers from "../helper";

const {
    productSelectors: { selectcurrentTotalBalance,
        selectShoppingBasket,
        selectUserShoppingStatus,
        selectTotalFortune
    }
} = selectors

const {
    helperFunctions: {formatNumberWithComma}
} = helpers

export default function Receipt() {
    const currentTotalBalance = useSelector(selectcurrentTotalBalance);
    const shoppingBasket = useSelector(selectShoppingBasket);
    const totalFortune = useSelector(selectTotalFortune)
    const isUserStartShopping = useSelector(selectUserShoppingStatus)
    
    const print = () => {
        const divToPrint = document.getElementById("printablediv");
        const iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        const ifr = iframe.contentWindow.document;
        ifr.open();
        ifr.write(divToPrint.innerHTML);
        ifr.close();
        iframe.contentWindow.print();
        iframe.contentWindow.onafterprint = () => {
            document.body.removeChild(iframe);
        }
    }
    
  return (
    <> 
        <div id="printablediv" className="text-center">
            <h3 className={style.receiptHeader}>RECEIPT</h3>
            {shoppingBasket.map((element,index) => (
                <p key={index} className={style.info}>{element.name} X <strong>{element.taken}</strong> ..............$ {formatNumberWithComma(element.taken * element.unitPrice)}</p>
            ))}
         { isUserStartShopping===true &&  
            <p className={style.totalInfo}>Total is: $ {formatNumberWithComma(totalFortune-currentTotalBalance)}</p>
            }  
        </div>
        <div className="text-center">
            <button  className={`btn btn-lg ${style.printbutton}`} disabled={!shoppingBasket} onClick={() => print()}>Print Receipt</button>
        </div>
    </>
  )
}
