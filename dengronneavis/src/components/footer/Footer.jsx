import { BasicTextFields } from '../singleInput/emailInput';
import style from './Footer.module.scss';

export const Footer = () => {
    return(
        <>
            <footer className={style.footer}>
                <section>
                    <div>
                        <h3>Nyhedsbrev</h3>
                        <p>Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev og få de seneste klima opdateringer direkte i din indbakke</p>
                        <BasicTextFields />
                    </div>
                    <div>
                        <h3>Kontakt</h3>
                        <p>Redningen 32 </p>
                        <p>ww10 Viterby Østre</p>
                        <p>+45 88229422</p>
                        <p>dga@info.dk</p>
                    </div>
                    <div><h3>FN's Verdensmål</h3>
                    <p>Vi støtter på organisatorisk plan op om FN´s verdensmål og har derfor besluttet at en del af overskuddet går direkte til verdensmål nr. 13; Klimahandling</p>
                    <a href="">Læs mere om verdensmålene her</a>
                    </div>
                </section>
            </footer>
        </>
    )
}