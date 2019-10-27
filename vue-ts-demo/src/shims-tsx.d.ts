import Vue, { VNode } from 'vue';
// 允许你以 .tsx结尾的文件，在 Vue项目中编写 jsx代码
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
