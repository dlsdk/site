import style from "./Products.module.css"
import Actions from "../redux/actions";
import { useDispatch, useSelector } from "react-redux"

const Products = () =>{

    const dispatch = useDispatch();
    const { totalprice, persent, productslist } = useSelector(state => state.totalreducer);


    const sell = (product) => {
        const payload = {
            name : product.name,
            alınan: product.alınan-1,
        }
        dispatch(Actions.totalActions.DECREASE_PRICE(payload));
        const lasttotal = totalprice + product.birimfiyat;
        if (lasttotal > 217000000000)
            return;
        dispatch(Actions.totalActions.ADD_TO_TOTAL(lasttotal));
    }

    const buy = (product) => {
        const payload = {
            name : product.name,
            alınan: product.alınan+1,
        }
        dispatch(Actions.totalActions.INCREASE_PRICE(payload));
        const lasttotalprice = totalprice - product.birimfiyat;
        dispatch(Actions.totalActions.ADD_TO_TOTAL(lasttotalprice));
    }

    return (
        <>
        
       <nav className="row">
            <div style={{textAlign:'center'}} className="col-md-6 col-6 d-flex align-items-center justify-content-center align-content-center">
                <p style={{margin:'0' , fontSize:'1.6rem'}}>Remaining: {totalprice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}  USD</p>
            </div>
            <div style={{textAlign:'center'}} className="col-md-6 col-6 d-flex align-items-center justify-content-center align-content-cejter">
                <p style={{margin:'0', fontSize:'1.6rem'}}>You only spent {persent.toFixed()} % of the total!</p>
            </div>
        </nav>

        <div className={`${style.products}`}>
            
            {productslist.map((products,index) => (
                <><div key={index} className={`card ${style.card}`}>
                    <img  className={style.img} src={products.imagesrc}/>
                    <div className={`card-body ${style.cardb}`}>
                             <p className={` ${style.p}`}>{products.name}</p>
                             <p className={` ${style.p}`}> USD {products.birimfiyat}</p>
                             <div className="d-flex justify-content-between align-items-center align-content-center">
                                <button disabled={products.alınan === 0}  onClick={() => sell(products)} className="btn btn-primary btn-danger">Sell</button>
                                <p>{products.alınan}</p>
                                <button onClick={() => buy(products)} className="btn btn-primary btn-success">Buy</button>

                             </div>
                        </div>
                   </div>
                </>
            ))} 
             
        </div>
        
        </>


    );


}


export default Products;