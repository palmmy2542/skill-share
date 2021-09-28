import "../index.css";
import LoginForm from "../Components/LoginForm";
import { Footer } from "antd/lib/layout/layout";
import useUserAuthenticationContext from "../../../Domains/UserAuthentication/useUserAuthentication";
import { useHistory } from "react-router";

const LoginContainer = (props: any) => {
  const { login } = useUserAuthenticationContext();
  const history = useHistory();
  return (
    <div id="login" className="page-layout">
      <h1>Log in</h1>
      <LoginForm handleLogin={login} history={history} />
      <Footer>
        Don't have an account? <a href="/register">Sign up!</a>
      </Footer>
    </div>
  );
};

export default LoginContainer;