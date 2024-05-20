import { Header } from "../../components/Header/Header"
import { TabsNavBar } from "../../components/TabsNavBar/TabsNavBar";
import React from "react";

export default function Home(): JSX.Element {

  return (
    <div className="body">
      <Header />
      <nav aria-label="Tabs Navigation">
        <TabsNavBar />
      </nav>
    </div>
  );
}