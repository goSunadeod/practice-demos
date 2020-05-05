// var babel = require("@babel/core");
// let { transform } = require("@babel/core");
// 实现类似以上 按需打包的 功能

// 其实就是 将
// import { flatten,concat } from "lodash"
// 转成
// import flatten from "lodash/flatten";
// import concat from "lodash/flatten";



let babel = require('babel-core');
let types = require('babel-types');
const visitor = {
    // 对import转码
    ImportDeclaration:{
        enter(path,state={ opts }){
            const specifiers = path.node.specifiers;
            const source = path.node.source;
            if(state.opts.library === source.value && !types.isImportDefaultSpecifier(specifiers[0])){
                const declarations = specifiers.map((specifier,index) => {
                    return types.ImportDeclaration(
                      [types.importDefaultSpecifier(specifier.local)],
                      types.stringLiteral(`${source.value}/${specifier.local.name}`)
                    )
                });
                path.replaceWithMultiple(declarations);
            }
        }
    }
}
module.exports = function(){
    return {
        visitor
    }
}
