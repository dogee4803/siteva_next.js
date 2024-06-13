import { Header } from "../../../components/Header/Header"
import React from "react";
import { ProfileInfo } from "../../../components/ProfileInfo/ProfileInfo";
import { auth } from "../../../../auth";

const page = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div className="body">
      <Header />
      <ProfileInfo
          name={session?.user!.name!}
          email={session?.user!.email!}
          registrationDate={session?.user!.registrationdate!}
          height="154 см"
          age="32 лет"
          image={session?.user?.image!}
        />
    </div>
  );
}

export default page
