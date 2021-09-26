import "../index.css";
import LoginForm from "../Components/LoginForm";
import { Footer } from "antd/lib/layout/layout";


const LoginContainer = (props: any) => {
  return (
    <div id="login">
      <h1>Log in</h1>
      <LoginForm />
      <Footer>
        Don't have an account? <a href="">Sign up!</a>
      </Footer>
    </div>
  );
};

export default LoginContainer;