import { Card, Button, Checkbox } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import '../../Scss/CardStyles.scss';
import ConsolesMenu from '../ConsolesMenu';
export default function PoolCard() {
  return (
    <>
      <div className="card-wrapper">
        <div className="card-header">
          <div className="header-title">
            <p>Manual</p>
            <InfoCircleOutlined></InfoCircleOutlined>
          </div>
          <Button>⋮</Button>
        </div>
        <Card
          title={
            <div className="subheader">
              <p>Consoles</p>
              <Button style={{ background: '#3B82F6' }}>Move</Button>
            </div>
          }
          headStyle={{ background: '#FFFFFF0A' }}
          style={{ width: '100%' }}
        >
          <div className="card-content">
            <div className="console">
              <Checkbox>Console 1</Checkbox>
              <p>Available</p>
            </div>
            <div className="console">
              <Checkbox>Console 1</Checkbox>
              <p>Available</p>
            </div>
            <div className="console">
              <Checkbox>Console 1</Checkbox>
              <p>Available</p>
            </div>
          </div>
        </Card>
        <Card
          title="Vehicles"
          headStyle={{ background: '#FFFFFF0A' }}
          style={{ width: '100%' }}
        >
          <div className="vehicle-list">
            <div className="vehicle">
              <Checkbox>APM0001</Checkbox>
              <p>Online</p>
              <Button>⋮</Button>
            </div>
            <div className="vehicle">
              <Checkbox>APM0001</Checkbox>
              <p>Online</p>
              <Button>⋮</Button>
            </div>
            <div className="vehicle">
              <Checkbox>APM0001</Checkbox>
              <p>Online</p>
              <Button>⋮</Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
