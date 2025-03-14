import { Banner } from "../components/banner/Banner";
import { Donations } from "../components/donation/Donation";
import { RandomCategory } from "../components/randomCategory/RandomCategory";
import { RandomProducts } from "../components/randomProduct/Random"
import style from './Home.module.scss';
export const Home = () => {

    return(
        <>
            <main className={style.HomeMain} >
                <RandomProducts />
                <Banner />
                <RandomCategory />
                <Donations />
                
            </main>
            
        
        </>
    )
}