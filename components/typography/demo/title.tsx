import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const App: React.FC = () => (
  <>
    <Title>h1. Namu Design</Title>
    <Title level={2}>h2. Namu Design</Title>
    <Title level={3}>h3. Namu Design</Title>
    <Title level={4}>h4. Namu Design</Title>
    <Title level={5}>h5. Namu Design</Title>
  </>
);

export default App;
