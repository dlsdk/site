import style from "./Products.module.css"
import Actions from "../redux/actions";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";

const Products = () =>{

    const dispatch = useDispatch();
    const { totalprice, persent, productslist, forreceipt } = useSelector(state => state.totalreducer);
    const [pageLoad,setPageLoad] = useState(0);
    const [done,setDone] = useState(0);
    const persentcontent = pageLoad ? `You only spent ${persent.toFixed(6)}  % of the total!` : "You haven't spent a single dollar! start buying!";
    const firsttotal = 217000000000;

   
    const sell_forreceipt = (product) => {
        
        const newre = {
            name : product.name,
            alınan: product.alınan-1,
            totalp: (product.alınan-1) * product.birimfiyat,
        }
        if (newre.alınan === 0)
             dispatch(Actions.totalActions.DELETE_RECEIPT(forreceipt.filter((el) => el.name !== product.name)));
        else if (forreceipt.find(element => element.name === product.name))
             dispatch(Actions.totalActions.UPDATE_RECEIPT(newre));
    }
   
    const sell = (product) => {
        if (done)
            setDone(false);
        setPageLoad(true);
        const lasttotal = totalprice + product.birimfiyat;
        if (lasttotal > firsttotal)
            return;      
        const payload = {
            name : product.name,
            alınan: product.alınan-1,
        }
        dispatch(Actions.totalActions.DECREASE(payload));
        dispatch(Actions.totalActions.ADD_TO_TOTAL(lasttotal));
        const per = ((firsttotal-lasttotal)/firsttotal) * 100;
        dispatch(Actions.totalActions.PERSENT(per));
        sell_forreceipt(product);
    }

   const buy_forreceipt = (product) => {

        const newre = {
            name : product.name,
            alınan: product.alınan+1,
            totalp: (product.alınan+1) * product.birimfiyat,
        }
        if (forreceipt.find(element => element.name === product.name))
             dispatch(Actions.totalActions.UPDATE_RECEIPT(newre));
        else
            dispatch(Actions.totalActions.RECEIPT(newre))
   }
   
    const buy = (product) => {
    
        setPageLoad(true);
     
        const lasttotalprice = totalprice - product.birimfiyat;
        if (lasttotalprice <= 0)
        {
            setDone(true);
             return;
        }  
         const payload = {
            name : product.name,
            alınan: product.alınan+1,
        }
        dispatch(Actions.totalActions.INCREASE(payload));
        dispatch(Actions.totalActions.ADD_TO_TOTAL(lasttotalprice));
        const per = ((firsttotal - lasttotalprice)/firsttotal) * 100;
        dispatch(Actions.totalActions.PERSENT(per));
        buy_forreceipt(product);
      
    }

    const print = () => {
        console.log("printe girdi");
        const divToPrint = document.getElementById("printablediv");
        const iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        const ifr = iframe.contentWindow;
        ifr.document.write(divToPrint.innerHTML);
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
    }

    return (
        <>
            <nav className="row">
                <div style={{textAlign:'center'}} className="d-flex align-items-center justify-content-center align-content-center">
                    {done ?
                        <>
                            <p style={{margin:'0' , fontSize:'1.5rem'}}>Can't afford that!</p>
                            <p style={{margin:'0', fontSize:'1.5rem',marginLeft:"3rem" }}>Sell something!</p>
                        </> :
                        <>
                            <p style={{margin:'0' , fontSize:'1.5rem'}}>Remaining: ${totalprice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}  USD</p>
                            <p style={{margin:'0', fontSize:'1.5rem',marginLeft:"3rem" }}>{persentcontent}</p>
                        </>
                    }
                </div>
            </nav>

            <div className={`${style.products}`}>
                
                {productslist.map((products,index) => (
                    <>
                        <div key={index} className={`card ${style.card}`}>
                            <img  className={style.img} src={products.imagesrc} alt="productimage"/>
                            <div className={`card-body ${style.cardb}`}>
                                <p className={` ${style.p}`}>{products.name}</p>
                                <span className={` ${style.sp}`}> USD {products.birimfiyat.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</span>
                            </div>
                            <div className={`d-flex justify-content-between align-items-center align-content-center ${style.cardbuttonsdiv}`}>
                                    <button className={`btn btn-primary btn-md ${style.buttons}`} style={{ backgroundColor: "rgb(221, 153, 153)", border:"rgb(221, 153, 153)"}} disabled={products.alınan === 0}  onClick={() => sell(products)} >Sell</button>
                                    <p style={{margin:'0', fontSize:'1.2rem', color:'white'}}>{products.alınan}</p>
                                    <button className={`btn btn-primary btn-md ${style.buttons}`} style={{ backgroundColor: "rgb(158, 221, 153)", border:"rgb(158, 221, 153)"}} disabled={done} onClick={() => buy(products)} >Buy</button>
                            </div>
                        </div>  
                    </>
                ))} 
            
            </div>
            <div id="printablediv" className="text-center">
                <h3 style={{fontWeight:"bold", color:"black",marginBottom:"1rem"}}>RECEIPT</h3>
                    {forreceipt.map((element,index) => (
                        <p style={{fontSize:"1.2rem"}}>{element.name} X <strong>{element.alınan}</strong> ..............$ {element.totalp.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>
                    ))}
                     {pageLoad===true &&  <p style={{textDecoration:"underline" , fontSize:"1.2rem", textDecorationThickness:"2px"}}>Total is: $ {(firsttotal-totalprice).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>}  
            </div>
            <div className="text-center">
               <button  className={` btn btn-lg ${style.printbutton}`} disabled={forreceipt.length === 0} onClick={() => print()}>Print Receipt</button>
            </div>
                
        </>
    );


}


export default Products;