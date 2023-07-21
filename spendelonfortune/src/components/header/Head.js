import style from "./Head.module.css"

const Head = () => {
    return (
        <div className={style.con}>
            <div className="d-flex justify-content-center align-items-center" >
                 <img  className={style.image} src="https://i.imgur.com/sroyZau.jpg" alt="elonimage"/>
            </div>
            <h1>Spend Elon Musk's Fortune!</h1>
            <div className="container d-flex justify-content-center">
            <div className={style.info}>
            
            <p  className={style.pa}>If Elon cashed out all of his stocks & assets today he would have approximately <strong>$217,000,000,000 (US Dollars)</strong> in his bank account.</p>
            <p className={style.pa}>¿What would you <strong>spend it</strong> on?</p>
            <p className={style.pa}>¡Have your receipt at the end!</p>
            </div>
            </div>
        </div>
    );
}

export default Head;