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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useChannel } from "@/hooks/useChannel";
import "./index.scss";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { createArticleAPI } from "@/apis/article";
import { getArticleById, updateArticleAPI } from "../../apis/article";

const Publish = () => {
  //Form实例
  const [form] = Form.useForm();

  //解构Select
  const { Option } = Select;

  const navigate = useNavigate();

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
  const { channelList } = useChannel();

  //获取路由查询参数id
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");

  //根据文章ID获取文章信息（回填）
  useEffect(() => {
    if (articleId) {
      async function getArticleDetails() {
        const res = await getArticleById(articleId);
        form.setFieldsValue({
          ...res.data,
          type: res.data.cover.type,
        });
        setImageType(res.data.cover.type);
        setImageList(
          res.data.cover.images.map((url) => {
            return { url };
          })
        );
      }
      getArticleDetails();
    }
  }, [articleId, form]);

  //提交表单
  const onFinish = async (formValue) => {
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
    if (articleId) {
      updateArticleAPI({ ...reqData, id: articleId });
      navigate("/Article");
      message.success("文章编辑成功！");
    } else {
      await createArticleAPI(reqData);
      navigate("/Article");
      message.success("文章发布成功！");
    }
  };
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: articleId ? "编辑文章" : "发布文章" },
            ]}
          />
        }
      >
        <Form
          form={form}
          initialValues={{ type: 1 }}
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
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} id={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
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
