import style from "./Products.module.css"
import Actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import selectors from "../../redux/selectors";

const firstTotal = 217000000000;

const {
    productSelectors: {selectProductList,selectPersent,selecttotalPrice}
} = selectors

const {
    totalActions: {PERSENT,ADD_TO_TOTAL,INCREASE_DECREASE}
} = Actions

const Products = () =>{

    const dispatch = useDispatch();
    const totalPrice = useSelector(selecttotalPrice);
    const persent = useSelector(selectPersent);
    const productsList = useSelector(selectProductList);
    const [isPageLoad,setisPageLoad] = useState(0); // sayfa ilk yüklendiğinde sayfada yazan text farklı olduğu için isPageLoad state i oluşturup oan göre texti değiştirdim.
    const persentContent = isPageLoad ? `You only spent ${persent.toFixed(6)}  % of the total!` : "You haven't spent a single dollar! start buying!";
    const [done,setDone] = useState(0);

    // alunan sayısını fromBuyOrSell e göre güncelliyorum.
    const buySellSameSteps = (product, lastTotal, fromBuyOrSell) => {
        setisPageLoad(true);
        const payload = {
            name: product.name,
            taken: fromBuyOrSell ? product.taken+1 : product.taken-1,
        }   
        dispatch(INCREASE_DECREASE(payload));
        dispatch(ADD_TO_TOTAL(lastTotal));
        const per = ((firstTotal - lastTotal)/firstTotal) * 100;
        dispatch(PERSENT(per));
    }

    const sell = (product) => {
        if (done)
            setDone(false);
        const lastTotal = totalPrice + product.unitPrice;
        if (lastTotal > firstTotal)
            return;   
        buySellSameSteps(product,lastTotal,false);
    }
    const buy = (product) => {
        const lastTotal = totalPrice - product.unitPrice;
        if (lastTotal <= 0)
        {
            setDone(true);
             return;
        } 
        buySellSameSteps(product,lastTotal,true); 
    }

    const print = () => {
        console.log("print function");
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
            <nav className="row">
                <div style={{textAlign:'center'}} className="d-flex align-items-center justify-content-center">
                    {done ?
                        <>
                            <p className={style.navp}>Can't afford that!</p>
                            <p className={style.navp} style={{marginLeft:"3rem" }}>Sell something!</p>
                        </> :
                        <>
                            <p className={style.navp}>Remaining: ${totalPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}  USD</p>
                            <p className={style.navp} style={{marginLeft:"3rem" }}>{persentContent}</p>
                        </>
                    }
                </div>
            </nav>

            <div className={`${style.products}`}>
                
                {productsList.map((products,index) => (
                
                    <div key={index} className={`card ${style.card}`}>
                        <img  className={style.img} src={products.imgSrc} alt="productimage"/>
                        <div className={`card-body ${style.cardb}`}>
                            <p className={` ${style.p}`}>{products.name}</p>
                            <span className={` ${style.sp}`}> USD {products.unitPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</span>
                        </div>
                        <div className={`d-flex justify-content-between align-items-center ${style.cardbuttonsdiv}`}>
                            <button className={`btn btn-primary btn-md ${style.buttons}`} style={{ backgroundColor: "rgb(221, 153, 153)", border:"rgb(221, 153, 153)"}} disabled={products.taken === 0}  onClick={() => sell(products)} >Sell</button>
                            <p style={{margin:'0', fontSize:'1.2rem', color:'white'}}>{products.taken}</p>
                            <button className={`btn btn-primary btn-md ${style.buttons}`} style={{ backgroundColor: "rgb(158, 221, 153)", border:"rgb(158, 221, 153)"}} disabled={done} onClick={() => buy(products)} >Buy</button>
                        </div>
                    </div>  
                ))} 
            
            </div>
            <div id="printablediv" className="text-center">
                <h3 style={{fontWeight:"bold", color:"black",marginBottom:"1rem"}}>RECEIPT</h3>
                    {productsList.filter((el) => el.taken > 0).map((element,index) => (
                        <p key={index} style={{fontSize:"1.2rem"}}>{element.name} X <strong>{element.taken}</strong> ..............$ {(element.taken * element.unitPrice).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>
                    ))}
                     {isPageLoad===true &&  <p style={{textDecoration:"underline" , fontSize:"1.2rem", textDecorationThickness:"2px"}}>Total is: $ {(firstTotal-totalPrice).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>}  
            </div>
            <div className="text-center">
               <button  className={`btn btn-lg ${style.printbutton}`} disabled={productsList.filter((el)=> el.taken > 0).length === 0} onClick={() => print()}>Print Receipt</button>
            </div>
                
        </>
    );


}


export default Products;