import React from 'react';
import { Watermark } from 'antd';

const App: React.FC = () => (
  <Watermark content={['Namu Design', 'Happy Working']}>
    <div style={{ height: 500 }} />
  </Watermark>
);

export default App;
