// class 转成 function
let babel = require('babel-core');
let t=require('babel-types');
let source=`
    class Person {
        constructor(name) {
            this.name=name;
        }
        getName() {
            return this.name;
        }
    }
`;
let ClassPlugin={
    visitor: {
        ClassDeclaration(path) {
            let node=path.node;
            let id=node.id;
            let constructorFunction = t.functionDeclaration(id,[],t.blockStatement([]),false,false);
            let methods=node.body.body;
            let functions = [];
            methods.forEach(method => {
                if (method.kind == 'constructor') {
                    constructorFunction = t.functionDeclaration(id,method.params,method.body,false,false);
                    functions.push(constructorFunction);
                } else {
                    let memberObj=t.memberExpression(t.memberExpression(id,t.identifier('prototype')),method.key);
                    let memberFunction = t.functionExpression(id,method.params,method.body,false,false);
                    let assignment = t.assignmentExpression('=',memberObj,memberFunction);
                    functions.push(assignment);
                }
            });
            if (functions.length ==1) {
                path.replaceWith(functions[0]);
            } else {
                path.replaceWithMultiple(functions);
            }
        }
    }
}


const result = babel.transform(source,{
    plugins:[
        ClassPlugin
    ]
});
console.log(result.code);
