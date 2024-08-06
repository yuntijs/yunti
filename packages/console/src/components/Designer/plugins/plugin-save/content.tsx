import { Button } from '@alifd/next';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Badge } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

interface SavePluginContentProps {
  ctx: IPublicModelPluginContext;
}
export const SavePluginContent: React.FC<SavePluginContentProps> = ({ ctx }) => {
  const { event, hotkey, project } = ctx;

  const [isSavePoint, setIsSavePoint] = useState(false);

  const save = useCallback(() => {
    // 抛出一个 save 事件，让业务自己去实现
    event.emit('save');
    // 创建一个保存点，用于检查是否有未保存的更改
    project.getCurrentDocument()?.history.savePoint();
    setIsSavePoint(false);
  }, [event, project]);

  useEffect(() => {
    const checkIsSavePointTimeout = setInterval(
      () => setIsSavePoint(project.getCurrentDocument()?.history.isSavePoint()),
      2000
    );

    return () => {
      clearInterval(checkIsSavePointTimeout);
    };
  }, [project]);

  useEffect(() => {
    hotkey.bind('command+s', e => {
      e.preventDefault();
      save();
    });
  }, [hotkey, save]);

  return (
    <Badge color="orange" dot={isSavePoint} styles={{ indicator: { width: 10, height: 10 } }}>
      <Button
        onClick={e => {
          e.preventDefault();
          save();
        }}
        type="primary"
      >
        保存
      </Button>
    </Badge>
  );
};
