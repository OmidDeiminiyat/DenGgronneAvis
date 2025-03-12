import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import mail from './../../assets/icone/icons8-important-mail-30.png';
import info from './../../assets/icone/icons8-info-squared-30.png';
import test from './../../assets/icone/icons8-test-account-30.png';
import { CategorySelect } from "../CategorySelect";
import style from './Nav.module.scss';
import Button from '@mui/material/Button';


export function Navbar() {
  return (
    <nav className={style.nav}>
        <div className={style.navElements}>
        <Link to="/">
                <div className={style.logo}>
                    <span><h3>Den Grønne</h3></span>
                    <span><h3>Avis</h3></span>
                </div>
            </Link>

            <div className={style.secondElement} >
                <CategorySelect />
                <Link to="/pages/annonce">
                <Button className={style.contained} variant="contained" disableElevation>  Opret annonce </Button> </Link>
                <ul>
                    <li><Link to="/pages/login"><img src={mail} alt="" /> </Link></li>
                    <li><img src={info} alt="" /></li>
                    <li><Link to="/pages/Profile"><img src={test} alt="" /></Link></li>
                </ul>
            </div>
        </div>
    </nav>
  );
}
