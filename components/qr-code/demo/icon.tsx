import React from 'react';
import { QRCode } from 'antd';

const App: React.FC = () => (
  <QRCode errorLevel="H" value="https://ant.design/" icon="https://i.imgur.com/TJ3wOgH.png" />
);

export default App;
