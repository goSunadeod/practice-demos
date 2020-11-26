export class Container {
  bindMap = new Map()
  // 实例的注册
  bind(identifier: string, clazz: any, constructorArgs: Array<any>) {
    this.bindMap.set(identifier, {
      clazz,
      constructorArgs
    });
  }

  // 实例的获取
  get(identifier: string): any {
    const target = this.bindMap.get(identifier);
    const { clazz, constructorArgs } = target;
    const inst = Reflect.construct(clazz, constructorArgs);
    return inst
  }
}

const container = new Container()
export { container }