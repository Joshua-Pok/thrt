import { Select, Avatar } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import '../../Scss/Header.scss'

export default function Header(){
    const options = [
        {value: 'Consoles', label:(
            <div style={{display:"flex"}}>
                <span>Consoles</span>
                <DownOutlined></DownOutlined>
            </div>
        )},


    ]
    return (
        <>
        <div className="header-wrapper">
            <div className="left-section">
                <Select className="select-component" options={options} style={{height: "100%"}}>

                </Select>
            </div>
            <div className="right-section">
                <Avatar icon={<UserOutlined/>} size={32}/>
            </div>
        </div>
        </>
    )
}