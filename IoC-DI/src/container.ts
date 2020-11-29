// export class Container {
//   bindMap = new Map()
//   // 实例的注册
//   bind(identifier: string, clazz: any, constructorArgs: Array<any>) {
//     this.bindMap.set(identifier, {
//       clazz,
//       constructorArgs
//     });
//   }

//   // 实例的获取
//   get(identifier: string): any {
//     const target = this.bindMap.get(identifier);
//     const { clazz, constructorArgs } = target;
//     const inst = Reflect.construct(clazz, constructorArgs);
//     return inst
//   }
// }

// const container = new Container()
// export { container }



import { PROPS_KEY } from './inject';

export class Container {
  bindMap = new Map();

  bind(identifier: string, clazz: any, constructorArgs?: Array<any>) {
    this.bindMap.set(identifier, {
      clazz,
      constructorArgs: constructorArgs || []
    });
  }

  get<T>(identifier: string): T {
    const target = this.bindMap.get(identifier);

    const { clazz, constructorArgs } = target;

    const props = Reflect.getMetadata(PROPS_KEY, clazz);
    const inst = Reflect.construct(clazz, constructorArgs);

    for (let prop in props) {
      const identifier = props[prop].value;
      // 递归获取注入的对象
      inst[prop] = this.get(identifier);
    }
    return inst;
  }
}