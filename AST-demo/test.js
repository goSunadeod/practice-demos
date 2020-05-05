//  https://astexplorer.net/
let esprima = require('esprima'); // code -> ast
var estraverse = require('estraverse'); // 便利操作ast
var escodegen = require('escodegen'); // ast -> code
let code = 'function ast(){}';
let ast = esprima.parse(code);
let indent = 0;
function pad() {
    return ' '.repeat(indent);
}
estraverse.traverse(ast,{  // 便利规则为 进出进出
    enter(node) {
        if(node.type === 'Identifier'){
            node.name += '_rename_enter';
        }
        console.log(pad()+node.type);
        indent+=2;
    },
    leave(node) {
        if(node.type === 'Identifier'){
            node.name += '_leave';
        }
        indent-=2;
        console.log(pad()+node.type);
    }
});
let generated = escodegen.generate(ast);
console.log(generated);


// Program
//   FunctionDeclaration
//     Identifier
//     Identifier
//     BlockStatement
//     BlockStatement
//   FunctionDeclaration
// Program
// function ast_rename_enter_leave() {
// }
