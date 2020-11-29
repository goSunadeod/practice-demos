import * as fs from 'fs';
import { CLASS_KEY } from './provider';

export function load(container: any) { // container 为全局的 IoC 容器
  const list = fs.readdirSync('./');

  for (const file of list) {
    if (/\.ts$/.test(file)) { // 扫描 ts 文件
      const exports = require(`./${file}`);
      for (const m in exports) {
        const module = exports[m];
        if (typeof module === 'function') {
          const metadata = Reflect.getMetadata(CLASS_KEY, module);
          // 注册实例
          if (metadata) {
            container.bind(metadata.id, module, metadata.args)
          }
        }
      }
    }
  }
}