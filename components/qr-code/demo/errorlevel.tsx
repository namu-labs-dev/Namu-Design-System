import React, { useState } from 'react';
import type { QRCodeProps } from 'antd';
import { Segmented, QRCode } from 'antd';

const App: React.FC = () => {
  const [level, setLevel] = useState<string | number>('L');
  return (
    <>
      <QRCode
        style={{ marginBottom: 16 }}
        errorLevel={level as QRCodeProps['errorLevel']}
        value="https://i.imgur.com/TJ3wOgH.png"
      />
      <Segmented options={['L', 'M', 'Q', 'H']} value={level} onChange={setLevel} />
    </>
  );
};

export default App;
