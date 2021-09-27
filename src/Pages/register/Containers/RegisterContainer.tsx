import "../index.css";
import RegisterForm from "../Components/RegisterForm";
import useUserAuthenticationContext from "../../../Domains/UserAuthentication/useUserAuthentication";
import { useHistory } from "react-router";

const RegisterContainer = (props: any) => {
  const { register } = useUserAuthenticationContext();
  const history = useHistory();

  return (
    <div id="register">
      <h1>Sign up</h1>
      <RegisterForm handleRegister={register} history={history} />
    </div>
  );
};

export default RegisterContainer;