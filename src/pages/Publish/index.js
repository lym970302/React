import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  message,
  Radio,
  Select,
  Space,
  Upload,
} from "antd";
import { Link } from "react-router-dom";
// import { useChannel } from "@/hooks/useChannel";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import "./index.scss";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { createArticleAPI } from "@/apis/article";

const Publish = () => {
  const [form] = Form.useForm();

  //图片个数类型
  const [imageType, setImageType] = useState(1);
  //图片列表
  const [imageList, setImageList] = useState([]);

  //选择图片类型
  const onTypeChange = (e) => {
    setImageType(e.target.value);
  };

  //上传图片
  const onUploadChange = (value) => {
    setImageList(value.fileList);
  };
  // const { channelList } = useChannel();

  //提交表单
  const onFinish = (formValue) => {
    if (imageList.length !== imageType) {
      return message.warning("封面类型和图片数量不匹配");
    }
    const { title, content, channel_id } = formValue;
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }),
      },
      channel_id,
    };
    createArticleAPI(reqData);
  };
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
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select
              placeholder="请选择文章频道"
              style={{ width: 400 }}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                name="image"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                maxCount={imageType}
                listType="picture-card"
                onChange={onUploadChange}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* <ReactQuill
              placeholder="请输入文章内容"
              theme="snow"
              className="publish-quill"
            /> */}
            <Input placeholder="请输入文章内容" style={{ width: 400 }}></Input>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
