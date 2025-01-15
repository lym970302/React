import { Button, Card, Form, Input, message } from "antd";
import "./index.scss";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { fetchLogin } from "@/store/modules/user";

const Login = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    //登录
    // await dispatch(fetchLogin(values));
    //登陆跳转
    navigate("/");
    message.success("登陆成功");
  };
  return (
    <div className="login">
      <Card className="login-container">
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: "请输入手机号" },
              { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" },
            ]}
          >
            <Input size="large" placeholder="请输入手机号"></Input>
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input size="large" placeholder="请输入验证码"></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
