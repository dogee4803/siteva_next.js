import { Grid, Container } from '@mui/material';
import UserCard from "@/components/UserCard/UserCard";
import { getAllUsers } from "@/lib/user";

const AllUserCards = async () => {
  const users = await getAllUsers();
  console.log(users);

  return (
    <div className="body">
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          {users.map((user) => (
            <Grid item xs={3} key={user.name}>
              <UserCard
                name={user.name!}
                email={user.email!}
                createdAt={user.createdAt.toLocaleString()}
                image={user.image!}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AllUserCards;
