import React from 'react';
import { Avatar, List } from 'antd';

const data = [
  {
    title: 'Namu Design Title 1',
  },
  {
    title: 'Namu Design Title 2',
  },
  {
    title: 'Namu Design Title 3',
  },
  {
    title: 'Namu Design Title 4',
  },
];

const App: React.FC = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Namu Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />
);

export default App;
