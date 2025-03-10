import style from './Banner.module.scss';

export const Banner = () => {

    return(
        <>
        <hr />
        <section className={style.banner} >            
            <article className={style.article} >
                <h3>Den Grønne Avis</h3>
                <p>Vi går forest i kampen om klimaet ved at give 2 kr. til klima-venlige formål, hver gang du handler brugt på Den Grønne Avis</p>
            </article>
        </section>
            
        
        </>
    )
}