//Egg

//解析器
//使用递归, 处理一个字符串, 返回一个对象, 包含字符串起始位置处的表达式与解析表达式后剩余的字符串
//解析子表达式时, 可以再次调用该函数, 返回参数表达式和剩余字符串
function parseExpression(program){
    program = skipSpace(program);
    let match, expr;
    //匹配不包含引号的字符串部分
    if(match = /^"([^"]*)"/.exec(program)){
        expr = {tpye: "value", value: match[1]};
    }else if(match = /^\d+\b/.exec(program)){
        //匹配数值
        expr = {type: "value", value: Number(match[0])};
    }else if(match = /^[^\s(),"]+/.exec(program)){
        //匹配符号
        expr = {type: "word", name: match[0]};
    }else{
        throw new SyntaxError("Unexpected syntax: " + program);
    }
    //删除已匹配部分
    return parseApply(expr, program.slice(match[0].length));
}

//删除头部空白
function skipSpace(string){
    let first = string.search(/\S/);
    if(first == -1) return "";
    return string.slice(first);
}

//检查表达式是否是一个应用 parseApply
function parseApply(expr, program){
    program = skipSpace(pargram);
    if(program[0] != "(") {
        return {expr: expr, rest: program};
    }

    program = skipSpace(program.slice(1));
    expr = {type: "apply", operator: expr, args: []};
    while(program[0] != ")"){
        let arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if(program[0] == ","){
            program = skipSpace(program.slice(1));
        }else if(prgram[0] != ")"){
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    return parseApply(expr, program.slice(1));
}