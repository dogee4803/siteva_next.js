import { Header } from "@/components/Header/Header";
import AllUserCards from "@/components/AllUserCards/AllUserCards";
import React from "react";
import { auth } from "../../../../auth";

const page = async () => {

  const session = await auth();

  return (
    <div className="body">
      <Header />
      <AllUserCards />
    </div>
  );
};

export default page;
