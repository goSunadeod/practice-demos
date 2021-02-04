const net = require('net');
const HttpParser = require('./http-parser');
const HtmlParser = require('htmlparser2');
const css = require('css');

// 自己实现一个http协议
class HTTPRequest {
  constructor(options = {}) {
    this.host = options.host;
    this.method = options.method || 'GET';
    this.path = options.path || '/';
    this.port = options.port || 80;
    this.headers = options.headers;
  }
  send() {
    return new Promise((resolve, reject) => {
      // 构建http请求
      const rows = [];
      rows.push(`${this.method} ${this.path} HTTP/1.1`); // 模拟浏览器的请求航

      Object.keys(this.headers).forEach((key) => {
        rows.push(`${key}: ${this.headers[key]}`);
      });

      let data = rows.join('\r\n') + '\r\n\r\n';

      let socket = net.createConnection(
        {
          // 创建tcp链接 传输http数据
          host: this.host,
          port: this.port,
        },
        () => {
          socket.write(data);
        }
      );
      const parser = new HttpParser();

      // 一段一段的传输
      // 事件会触发多次
      socket.on('data', function (chunk) {
        console.log('chunk', chunk);
        parser.parse(chunk);
        if (parser.result) {
          resolve(parser.result);
        }
      });
    });
  }
}

function parserCss(styleText) {
  const ast = css.parse(styleText);
  console.log('css', ast.stylesheet);
}

async function request() {
  const request = new HTTPRequest({
    host: '127.0.0.1',
    method: 'GET',
    port: 3000,
    path: '/',
    headers: {
      name: 'zhufeng',
      age: 12,
    },
  });
  let { responseLine, headers, body } = await request.send();
  console.log('body', body);

  // 浏览器会根据响应类型来解析文件 Content-Type:'text/html';

  // html => html-parser => dom tree 词法分析 分析html

  // 解析后需要生成tree ， 典型的栈型结构
  let stack = [{ type: 'document', children: [] }]; // 数据结构
  // document -> html
  // 内部也是通过状态机
  const parser = new HtmlParser.Parser({
    // 开始标签
    onopentag(name, attributes) {
      let parent = stack[stack.length - 1];
      let element = {
        type: 'element',
        tagName: name,
        attributes,
        children: [],
        parent,
      };
      parent.children.push(element);

      // 把自己也推进栈中
      stack.push(element);
      // console.log('start',name,attributes)
    },
    // 文本
    ontext(text) {
      let parent = stack[stack.length - 1];
      let textNode = {
        type: 'text',
        text,
      };
      parent.children.push(textNode);
    },
    // 关闭标签
    onclosetag(name) {
      let parent = stack[stack.length - 1];
      //  解析内联样式，这里只是说处理 <style></style> 并不是说边解析dom边解析css
      if (name === 'style') {
        parserCss(parent.children[0].text);
      }
      // 把最后一项pop出去
      stack.pop();
    },
  });

  parser.end(body); // 有了DOMTree
  //   console.dir(stack, { depth: null });
}
request();
