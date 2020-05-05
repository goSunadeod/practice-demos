// const sum = (a,b)=> a+b;
// 转换成=>
// var sum = function sum(a, b) {
//     return a + b;
// };


let babel = require('babel-core'); // babel核心库 用来实现核心的转换引擎  解析（parse），转换（transform），生成（generate）
let t = require('babel-types'); // 操作ast，可以实现类型类似，生成ast
const code = `const sum = (a,b)=> a+b`;
// path.node  父节点
// path.parentPath 父路径
let transformArrowFunctions = {
    visitor: {
        VariableDeclaration: (path) => {
            let node = path.node;
            if(node.kind === 'const') { // 如果kind为const，则转换为var
                let expression = t.variableDeclaration('var', node.declarations)
                path.replaceWith(expression);
            }
        },
        ArrowFunctionExpression: (path) => { // ArrowFunctionExpression 来自  https://www.babeljs.cn/docs/6.26.3/babel-types
            let node = path.node;
            let id = path.parent.id;
            let params = node.params;
            let body= t.blockStatement([
                t.returnStatement(node.body)
            ]);
            let functionExpression = t.functionExpression(id, params, body, false, false);
            // replaceWith为替换节点的方法
            path.replaceWith(functionExpression);
        }
    }
}
const result = babel.transform(code, {
    plugins: [transformArrowFunctions]
});
console.log(result.code);
