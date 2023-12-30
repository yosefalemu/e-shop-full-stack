import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import LoginForm from "./LoginForm";

const LogIn = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrapper>
        <LoginForm currentUser={currentUser} />
      </FormWrapper>
    </Container>
  );
};

export default LogIn;
