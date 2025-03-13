import { useState } from "react";
import { AnnonceForm } from "../components/minAnnoncer/MinAnnoncer";
import { ProfileForm } from "../components/minProfile/MinProfile";
import style from './Profile.module.scss';


export function MinSide() {
  const [activeForm, setActiveForm] = useState("ProfileForm");

  return (
    <main className={style.PrifolePage} >
        <hr />
      <div className={style.buts}>
        <button
          onClick={() => setActiveForm("ProfileForm")}
          className={`${style.singleButt} ${activeForm === "ProfileForm" ? style.ProfileForm : style.secondBut}`}
        >
          Min Profil
        </button>
        <button
          onClick={() => setActiveForm("AnnonceForm")}
          className={`${style.singleButt} ${activeForm === "AnnonceForm" ? style.ProfileForm : style.secondBut}`}
        >
          Mine Annoncer
        </button>
      </div>

      {activeForm === "ProfileForm" && <ProfileForm />}
      {activeForm === "AnnonceForm" && <AnnonceForm />}
    </main>
  );
}
