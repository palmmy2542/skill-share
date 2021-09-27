import "../index.css";
import RegisterForm from "../Components/RegisterForm";

const RegisterContainer = (props: any) => {
  return (
    <div id="register">
      <h1>Sign up</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterContainer;