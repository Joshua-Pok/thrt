import Header from './components/Header/Header';
import SubHeader from './components/Subheader';
import ConsoleCard from './components/Content/ConsoleCard';
import { RightOutlined } from '@ant-design/icons';
import { Button } from 'antd'
import './globals.scss';
import { Layout } from 'antd';
export default function Home() {
  return (
    <>
      <SubHeader></SubHeader>
      <div className="content" style={{position: "relative"}}>
        <Button style={{position: "fixed", right: "20px", zIndex: "1000", bottom: "40vh"}}>
          <RightOutlined></RightOutlined>
          </Button>
        <ConsoleCard></ConsoleCard>
        <ConsoleCard></ConsoleCard>
        <ConsoleCard></ConsoleCard>
      </div>
    </>
  );
}
