import { Breadcrumb, Card, Form, Radio, Select } from "antd";
import { Link } from "react-router-dom";

const Article = () => {
  const onFinish = () => {};
  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "文章列表" },
            ]}
            style={{ marginBottom: 20 }}
          />
        }
      >
        <Form
          initialValues={{ status: "", channel_id: "" }}
          onFinish={onFinish}
        >
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 200 }}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
              allowClear
            ></Select>
          </Form.Item>
          <Form.Item label="日期" name="date"></Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Article;
