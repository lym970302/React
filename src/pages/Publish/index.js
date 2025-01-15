import { Breadcrumb, Card, Form, Input } from "antd";
import { Link } from "react-router-dom";

const Publish = () => {
  const [form] = Form.useForm();
  const onFinish = () => {};
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          form={form}
          initialValues={{ type: 0 }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
