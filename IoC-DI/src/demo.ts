import 'reflect-metadata';
import { Provider } from './provider';

// Reflect.metadata 当作 Decorator 使用，当修饰类时，在类上添加元数据，当修饰类属性时，在类原型的属性上添加元数据，
const CLASS_KEY = 'ioc:key';
const METHOD_KEY = 'ioc:key';

@Reflect.metadata(CLASS_KEY, 'A')
class Test {
  @Reflect.metadata(METHOD_KEY, 'B')
  public hello(): string {
    return 'hello world';
  }
}

console.log(Reflect.getMetadata(CLASS_KEY, Test)); // 'A'
console.log(Reflect.getMetadata(METHOD_KEY, new Test(), 'hello')); // 'B'




@Provider('b', [10])
export class B {
  p: number;
  constructor(p: number) {
    this.p = p;
  }
}
console.log(new B(1))
console.log(Reflect.getMetadata('ioc:tagged_class', B))