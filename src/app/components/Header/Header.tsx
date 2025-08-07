import { Select, Avatar, SelectProps } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import '../../Scss/Header.scss';

export default function Header() {
  const selectOptions: SelectProps['options'] = [
    {
      value: 'Consoles',
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>Consoles</span>
          <DownOutlined />
        </div>
      )
    }
  ];

  return (
    <div className="header-wrapper">
      <div className="left-section">
        <Select 
          className="select-component" 
          options={selectOptions} 
          style={{ height: "100%" }}
        />
      </div>
      <div className="right-section">
        <Avatar icon={<UserOutlined />} size={32} />
      </div>
    </div>
  );
}