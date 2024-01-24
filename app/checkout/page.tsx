import Container from "../components/Container";
import FormWrapper from "../components/FormWrapper";
import CheckOutClinet from "./CheckOutClient";

const ClientCheckout = () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrapper>
          <CheckOutClinet />
        </FormWrapper>
      </Container>
    </div>
  );
};

export default ClientCheckout;
