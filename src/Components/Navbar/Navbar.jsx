import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Modal, Button, Typography, Form, Input } from "antd";
import ContactTable from "../ContactTable/ContactTable";
import { PlusCircleOutlined, UserAddOutlined } from "@ant-design/icons";

const { Title } = Typography;

const getLocalContact = () => {
  let contactList = localStorage.getItem("contacts");

  if (contactList) {
    return JSON.parse(localStorage.getItem("contacts"));
  } else {
    return [];
  }
};

function Navbar() {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [inputValue, setInputValue] = useState({
    fName: "",
    lName: "",
    cNumber: "",
  });

  const [newContact, setNewContact] = useState(getLocalContact);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const inputHandle = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  const saveContactHandle = (e) => {
    if (selectedRow == -1) {
      const newContactAdded = { ...inputValue };
      setNewContact([...newContact, newContactAdded]);
      setIsModalVisible(false);
      setInputValue({ fName: "", lName: "", cNumber: "" });
    } else {
      newContact[selectedRow] = inputValue;
      localStorage.setItem("contacts", JSON.stringify(newContact));
      setIsModalVisible(false);
      setInputValue({ fName: "", lName: "", cNumber: "" });
    }
  };

  // add data to localStorage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(newContact));
  }, [newContact]);

  return (
    <>
      <div className="navbar">
        <div className="navbar_title">
          <Title className="header_title" level={4}>
            Contact App
          </Title>
        </div>
        <div className="navbar_item">
          <Button className="logout" type="link" onClick={showModal}>
            Add contact <PlusCircleOutlined />
          </Button>
        </div>
      </div>
      <Modal
        footer={null}
        title="Contact"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form initialValues={inputValue} onFinish={saveContactHandle}>
          <Form.Item
            label="First name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input
              placeholder="Enter first name"
              value={inputValue.fName}
              name="fName"
              onChange={inputHandle}
              required
            />
          </Form.Item>
          <Form.Item label="Last name">
            <Input
              placeholder="Enter last name"
              name="lName"
              required
              value={inputValue.lName}
              onChange={inputHandle}
            />
          </Form.Item>
          <Form.Item label="Contact number">
            <Input
              placeholder="Enter contact number"
              name="cNumber"
              value={inputValue.cNumber}
              onChange={inputHandle}
              required
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save contact <UserAddOutlined />
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ContactTable
        newContact={newContact}
        setIsModalVisible={setIsModalVisible}
        setInputValue={setInputValue}
        inputValue={inputValue}
        setSelectedRow={setSelectedRow}
      />
    </>
  );
}

export default Navbar;
