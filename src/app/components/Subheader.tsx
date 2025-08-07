import { PlusOutlined } from '@ant-design/icons';
import '../Scss/Subheader.scss';
import { Menu, Button } from 'antd';
export default function SubHeader() {
  const ConsoleItems = [
    {
      label: 'Manual',
      key: 'Manual',
    },
    {
      label: 'Testing',
      key: 'Testing',
    },
    {
      label: 'Production',
      key: 'Production',
    },
    {
      label: 'Kessel Run',
      key: 'Kessel Run',
    },
    {
      label: 'Manual',
      key: 'Manual',
    },
  ];
  return (
    <>
      <div className="subheader-wrapper">
        <div className="left-section">
          <Menu items={ConsoleItems} mode="horizontal"></Menu>
          <Button>Add Console</Button>
        </div>
        <div className="right-section">
            <Button icon={<PlusOutlined/>}>Add Console</Button>
        </div>
      </div>
    </>
  );
}
