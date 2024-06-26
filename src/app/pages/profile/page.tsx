import { Header } from "@/components/Header/Header";
import { ProfileInfo } from "@/components/ProfileInfo/ProfileInfo";
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
        createdAt={session?.user!.createdAt!}
        height="154 см"
        age="32 лет"
        image={session?.user!.image!}
      />
    </div>
  );
};

export default page;
