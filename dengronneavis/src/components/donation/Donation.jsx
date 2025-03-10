import style from './Donation.module.scss';
export const Donations = () => {

    return(
        <>
            <hr />
            <section className={style.donation} >
                <div>
                    <h3>Donation til Dato</h3>
                    <p className={style.firstP}>Sammen med dig har vi siden starten indsamlet:</p>
                    <h2>432.231,50 Kr</h2>
                    <p className={style.lastP}>Tak fordi du handler brugt, med omtanke for klimaet</p>
                </div>
                <div>
                    <h3>Donation til år</h3>
                    <p className={style.firstP} >Sammen med dig har vi i år indsamlet:</p>
                    <h2>112.452,7 Kr</h2>
                    <p className={style.lastP}>Tak fordi du handler brugt, med omtanke for jorden</p>
                </div>
            </section>
        </>
    )
}