import "../index.css";
import LoginForm from "../Components/LoginForm";
import { Layout } from "antd";
const { Content, Footer } = Layout;

const LoginContainer = (props: any) => {
  return (
    <Layout id="layout">
      <Content>
        <div id="login">
          <h1>Log in</h1>
          <LoginForm />
        </div>
      </Content>
      <Footer>
        Don't have an account? <a href="">Sign up!</a>
      </Footer>
    </Layout>
  );
};

export default LoginContainer;