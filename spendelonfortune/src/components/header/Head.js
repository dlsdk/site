import style from "./Head.module.css"

const Head = () => {

    return (
        <div className="container p-0">
            <div className="d-flex justify-content-center align-items-center" >
                 <img style={{display:"block", width:"18rem", margin:"2rem 0"}} src="https://i.imgur.com/sroyZau.jpg"/>
            </div>
            <div className={style.info}>
            <h1>Spend Elon Musk's Fortune!</h1>
            <p>If Elon cashed out all of his stocks & assets today he would have approximately <strong>$217,000,000,000 (US Dollars)</strong> in his bank account.
            <p>¿What would you <strong>spend it</strong> on?</p></p>
            <p>¡Have your receipt at the end!</p>
            </div>
        </div>
    );
    
}

export default Head;