import React from 'react';
import { Space, Typography } from 'antd';

const { Text, Link } = Typography;

const App: React.FC = () => (
  <Space direction="vertical">
    <Text>Namu Design (default)</Text>
    <Text type="secondary">Namu Design (secondary)</Text>
    <Text type="success">Namu Design (success)</Text>
    <Text type="warning">Namu Design (warning)</Text>
    <Text type="danger">Namu Design (danger)</Text>
    <Text disabled>Namu Design (disabled)</Text>
    <Text mark>Namu Design (mark)</Text>
    <Text code>Namu Design (code)</Text>
    <Text keyboard>Namu Design (keyboard)</Text>
    <Text underline>Namu Design (underline)</Text>
    <Text delete>Namu Design (delete)</Text>
    <Text strong>Namu Design (strong)</Text>
    <Text italic>Namu Design (italic)</Text>
    <Link href="https://ant.design" target="_blank">
      Namu Design (Link)
    </Link>
  </Space>
);

export default App;
