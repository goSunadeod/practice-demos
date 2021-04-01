const { parse } = require('@babel/parser')
const { default: traverse } = require('@babel/traverse')
const { default: generate } = require('@babel/generator')
const t = require('@babel/types')

/**
 * 将模块的默认引入改为整体加载
 *    import $api from '@/api'
 *    import * as $api from '@/api'
 */

 const code = `import $api from '@/api'`

 const ast = parse(code, {
  sourceType: 'module'
})

traverse(ast, {
  // 传入 ImportDefaultSpecifier 函数: 只对 ImportDefaultSpecifier 类型的节点做修改
  ImportDefaultSpecifier(importPath) {
    // 过滤非 $api 的节点
    if (
      importPath.get('local.name').node !== '$api' ||
      importPath.parentPath.get('source.value').node !== '@/api'
    ) {
      return
    }
    // 修改 $api 节点
    importPath.parentPath.replaceWith(
      t.importDeclaration(
        [t.importNamespaceSpecifier(t.identifier('$api'))],
        // t.stringLiteral('@/api')
        importPath.parentPath.get('source').node
      )
    )
  }
})

console.log(generate(ast).code)