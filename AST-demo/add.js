let babel = require('babel-core');
let t=require('babel-types');
let preCalculator = {
    visitor: {
        BinaryExpression(path) {
            let node = path.node;
            let left = node.left;
            let operator = node.operator;
            let right = node.right;
            if (!isNaN(left.value) && !isNaN(right.value)) {
                let result=eval(left.value + operator + right.value);
                path.replaceWith(t.numericLiteral(result));
                if (path.parent && path.parent.type === 'BinaryExpression') { // 递归执行 如果没有这一行结果为 3+3+4  从右到左计算
                    preCalculator.visitor.BinaryExpression.call(null,path.parentPath);
                }
            }
        }
    }
}


const result = babel.transform('const sum = 1+2+3+4',{
    plugins:[
        preCalculator
    ]
});
console.log(result.code); // const sum = 10;
