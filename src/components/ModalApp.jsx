import { Button, Form, Input, Modal, Typography, Avatar, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import DataContext from "../context/DataProvider";
import { useForm } from "antd/es/form/Form";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function ModalApp({ onClickPage }) {
  const { assets, SignIn, registeredUser } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [form] = useForm();

  function onClick() {
    setIsModalOpen(true);
  }
  function onRegClick() {
    setIsModalOpen(false);
    setIsRegModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    const user = assets.find((user) => user.name == values.username);
    if (user && user.password == values.password) {
      SignIn(user.name);
      setIsModalOpen(false);
      onClickPage("account");
    }
    form.resetFields();
  };

  const regHandleOk = () => {
    setIsRegModalOpen(false);
  };
  const regHandleCancel = () => {
    setIsRegModalOpen(false);
  };

  return (
    <Flex>
      <button className="modal-btn" onClick={onClick}>
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
          size={50}
        />
      </button>
      <Modal
        title={<Typography.Title>Авторизация</Typography.Title>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 16,
            }}
          >
            <Flex gap={30} style={{ width: 400 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <p>
                Не зарегестрирован?{" "}
                <a href="#" onClick={onRegClick}>
                  Зарегестрируйся!
                </a>
              </p>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={<Typography.Title>Регистрация</Typography.Title>}
        open={isRegModalOpen}
        onOk={regHandleOk}
        onCancel={regHandleCancel}
        footer={null}
      >
        <Form
          form={form}
          wrapperCol={{
            span: 20,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Зарегестрироваться
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
}
