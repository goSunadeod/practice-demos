const { parse } = require('@babel/parser')
const { default: traverse } = require('@babel/traverse')
const { default: generate } = require('@babel/generator')
const t = require('@babel/types')

/**
 * 将模块默认导出的对象改为单个的具名导出
 *    export default {
 *      api1: axios.get('api1'),
 *      api2: axios.post('api2')
 *    };
 *
 *    export const api1 = axios.get('api1');
 *    export const api2 = axios.post('api2');
 */

const code = `export default {
  api1: axios.get('api1'),
  api2: axios.post('api2')
};
`

const ast = parse(code, {
  sourceType: 'module'
})

// console.log('ast', ast)

traverse(ast, {
  // 传入 ExportDefaultDeclaration 函数: 只对 ExportDefaultDeclaration 类型的节点做修改
  ExportDefaultDeclaration(exportPath) {
    const properties = exportPath.get('declaration.properties')
    if (exportPath.get('declaration.properties').length === 0) {
      return
    }

    // 遍历 declaration 节点的 properties 属性拿到导出对象里面的 key 和 value
    properties.forEach((prop) => {
      // 生成 export 节点
      const exportNamed = t.exportNamedDeclaration(
        // 生成 const 变量声明节点
        t.variableDeclaration('const', [
          t.variableDeclarator(
            t.identifier(prop.get('key.name').node),
            prop.get('value').node
          )
        ])
      )
      // 插入 export 节点
      exportPath.insertBefore(exportNamed)
    })
    exportPath.remove()
  }
})

console.log(generate(ast).code)