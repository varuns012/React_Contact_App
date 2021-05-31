import React, { useEffect, useState } from "react";
import "./ContactTable.css";
import { Table, Popconfirm, message } from "antd";
import { EditOutlined, UserDeleteOutlined } from "@ant-design/icons";

function ContactTable(props) {
  const {
    newContact,
    setIsModalVisible,
    setInputValue,
    setSelectedRow,
  } = props;
  const [tableData, setTableData] = useState([]);

  function cancel(e) {
    message.error("Cancel Deleting");
  }

  const showModal = (record) => {
    setSelectedRow(record.index);
    setIsModalVisible(true);
    setInputValue({
      fName: record.fName,
      lName: record.lName,
      cNumber: record.cNumber,
    });
  };

  const removeContactHandle = (index) => {
    const res = newContact.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(newContact));
    message.success("Deleting your contact....");
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    setTableData(newContact);
  }, [newContact]);

  const columns = [
    {
      title: "Contact name",
      dataIndex: "fName",
      key: "fName",
      render: (text, record) =>
        (record && record.fName) || record.lName ? (
          <span>
            {record.fName} {record.lName}
          </span>
        ) : null,
    },
    {
      title: "Contact number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      render: (text, record) =>
        record && record.cNumber ? <span>{record.cNumber}</span> : null,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <span className="edit_icon">
            {<EditOutlined onClick={() => showModal(record)} />}
          </span>{" "}
          <span>
            <Popconfirm
              title="Are you sure you want to continue?"
              onConfirm={() => removeContactHandle(record.index)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <UserDeleteOutlined />
            </Popconfirm>
          </span>
        </div>
      ),
    },
  ];
  const data =
    tableData && tableData.length
      ? tableData.map((info, index) => {
          return {
            ...info,
            index,
          };
        })
      : [];

  return (
    <>
      <div className="contact_table">
        <Table columns={columns} dataSource={data}></Table>
      </div>
    </>
  );
}

export default ContactTable;
