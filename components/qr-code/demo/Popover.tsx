import React from 'react';
import { QRCode, Popover } from 'antd';

const src = 'https://i.imgur.com/TJ3wOgH.png';

const App: React.FC = () => (
  <Popover overlayInnerStyle={{ padding: 0 }} content={<QRCode value={src} bordered={false} />}>
    <img width={100} height={100} src={src} alt="icon" />
  </Popover>
);

export default App;
