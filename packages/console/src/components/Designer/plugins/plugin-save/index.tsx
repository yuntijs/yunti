// import { Button } from 'antd';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';

import { SavePluginContent } from './content';

const pluginName = 'PluginSave';
export const PluginSave = (ctx: IPublicModelPluginContext) => {
  return {
    name: pluginName,
    dep: [],
    // 插件对外暴露的插件和方法
    exports() {
      return {};
    },
    // 插件的初始化函数，在引擎初始化之后会立即调用
    init() {
      const { skeleton } = ctx;
      skeleton.add({
        name: pluginName,
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: <SavePluginContent ctx={ctx} />,
      });
    },
  };
};

PluginSave.pluginName = pluginName;

export default PluginSave;
