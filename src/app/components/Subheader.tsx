import { PlusOutlined } from '@ant-design/icons';
import '../Scss/Subheader.scss';
import { Menu, Button, MenuProps } from 'antd';
import { Pool } from '@/app/types';

interface SubHeaderProps {
  pools: Pool[];
  onPoolSelect: (poolIndex: number) => void;
}

export default function SubHeader({ pools, onPoolSelect }: SubHeaderProps) {
  const poolMenuItems: MenuProps['items'] = pools.map((pool, index) => ({
    label: pool.id,
    key: pool.id,
    onClick: () => onPoolSelect(index)
  }));

  return (
    <div className="subheader-wrapper">
      <div className="left-section">
        <Menu items={poolMenuItems} mode="horizontal" />
        <Button>Add Pool</Button>
      </div>
      <div className="right-section">
        <Button icon={<PlusOutlined />}>Add Pool</Button>
      </div>
    </div>
  );
}
