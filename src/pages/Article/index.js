import {
  Breadcrumb,
  Card,
  Form,
  Radio,
  Select,
  DatePicker,
  Button,
  Tag,
  Table,
  Space,
  Popconfirm,
} from "antd";
import { useChannel } from "@/hooks/useChannel";
import img404 from "@/assets/error.png";
import { getAriticleListAPI, delArticleAPI } from "@/apis/article";
import { Link, useNavigate } from "react-router-dom";
import locale from "antd/es/date-picker/locale/zh_CN";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const Article = () => {
  //解构对象
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  //获取频道列表
  const { channelList } = useChannel();

  //路由
  const navigate = useNavigate();

  //枚举
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>,
  };

  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  //请求参数
  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 6,
  });

  //获取所有文章
  useEffect(() => {
    async function getList() {
      const res = await getAriticleListAPI(reqData);
      setList(res.data.results);
      setCount(res.data.total_count);
    }
    getList();
  }, [reqData]);

  //提交表单
  const onFinish = () => {};
  //确认删除
  const onConfirm = async (data) => {
    console.log(data);
    await delArticleAPI(data.id);
    setReqData({ ...reqData });
  };

  const onPageChange = (page) => {
    setReqData({ ...reqData, page });
  };
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (data) => {
        return (
          <img src={data.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    { title: "标题", dataIndex: "title", width: 120 },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => status[data],
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                navigate(`/publish?id=${data.id}`);
              }}
            ></Button>

            <Popconfirm
              title="删除文章"
              description="确定要删除此文章吗?"
              onConfirm={() => onConfirm(data)}
              okText="删除"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      {/* 查询部分 */}
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
              style={{ width: 250 }}
              allowClear
            >
              {channelList.map((item) => (
                <Option key={item.id} id={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格部分 */}
      <Card title={`根据筛选条件共查询到${count}条结果`}>
        <Table
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: reqData.per_page,
            onChange: onPageChange,
          }}
        ></Table>
      </Card>
    </div>
  );
};

export default Article;
