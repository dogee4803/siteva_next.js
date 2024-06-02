import { Header } from "../../../../components/Header/Header"
import React from "react";
import { ProfileInfo } from "../../../../components/ProfileInfo/ProfileInfo";

export default function Home(): JSX.Element {

  return (
    <div className="body">
      <Header />
      <ProfileInfo
          name="Чёрный Плащ"
          email="darkwing@duck.com"
          registrationDate="29 февраля 2023"
          height="154 см"
          age="32 лет"
        />
    </div>
  );
}