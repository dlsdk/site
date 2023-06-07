import style from "./Products.module.css"
import Actions from "../redux/actions";
import { useDispatch, useSelector, UseSelector } from "react-redux"
import products from "../redux/products_list";

const Products = () =>{

    const dispatch = useDispatch();
    const { totalprice, persent, productslist } = useSelector(state => state.totalreducer);

    return (
        <>
        
       <nav className="navbar row">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
                <p>Remaining: {totalprice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}  USD</p>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
                <p>You only spent {persent.toFixed()} % of the total!</p>
            </div>
        </nav>

        <div className={` ${style.products}`}>
            
            {productslist.map((products) => (
                <><div className={`card ${style.card}`}>
                    <img className="card-img-top" src={products.imagesrc} alt="Card image cap"/>
                    <div className={`card-body ${style.cardb}`}>
                             <p>{products.name}</p>
                        </div>
                   </div>
                </>
            ))} 
             
        </div>
        
        </>


    );


}


export default Products;