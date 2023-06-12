import style from "./Products.module.css"
import Actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";

const Products = () =>{

    const dispatch = useDispatch();
    const { totalprice, persent, productslist } = useSelector(state => state.totalreducer);
    const { PERSENT, ADD_TO_TOTAL, INCREASE_DECREASE} = Actions.totalActions;
    const [pageLoad,setPageLoad] = useState(0);
    const [done,setDone] = useState(0);
    const persentcontent = pageLoad ? `You only spent ${persent.toFixed(6)}  % of the total!` : "You haven't spent a single dollar! start buying!";
    const firsttotal = 217000000000;

   
    const same_steps = (product,lasttotal, bool) => {
        
        setPageLoad(true);
        
        const payload = {
            name: product.name,
            alınan: bool ? product.alınan+1 : product.alınan-1,
        }   
        dispatch(INCREASE_DECREASE(payload));
        dispatch(ADD_TO_TOTAL(lasttotal));
        const per = ((firsttotal - lasttotal)/firsttotal) * 100;
        dispatch(PERSENT(per));
    }

    const sell = (product) => {
        if (done)
            setDone(false);
        const lasttotal = totalprice + product.birimfiyat;
        if (lasttotal > firsttotal)
            return;      
        same_steps(product,lasttotal,false);

    }
    const buy = (product) => {
      
        const lasttotal = totalprice - product.birimfiyat;
        if (lasttotal <= 0)
        {
            setDone(true);
             return;
        }  
        same_steps(product,lasttotal,true);
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
                <div style={{textAlign:'center'}} className="d-flex align-items-center justify-content-center">
                    {done ?
                        <>
                            <p className={style.navp}>Can't afford that!</p>
                            <p className={style.navp} style={{marginLeft:"3rem" }}>Sell something!</p>
                        </> :
                        <>
                            <p className={style.navp}>Remaining: ${totalprice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}  USD</p>
                            <p className={style.navp} style={{marginLeft:"3rem" }}>{persentcontent}</p>
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
                            <div className={`d-flex justify-content-between align-items-center ${style.cardbuttonsdiv}`}>
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
                    {productslist.filter(el => el.alınan > 0).map((element,index) => (
                        <p style={{fontSize:"1.2rem"}}>{element.name} X <strong>{element.alınan}</strong> ..............$ {(element.alınan * element.birimfiyat).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>
                    ))}
                     {pageLoad===true &&  <p style={{textDecoration:"underline" , fontSize:"1.2rem", textDecorationThickness:"2px"}}>Total is: $ {(firsttotal-totalprice).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>}  
            </div>
            <div className="text-center">
               <button  className={`btn btn-lg ${style.printbutton}`} disabled={productslist.filter(el => el.alınan > 0).length === 0} onClick={() => print()}>Print Receipt</button>
            </div>
                
        </>
    );


}


export default Products;