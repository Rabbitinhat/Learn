/**
 * 判断节点中是否存在给定的string
 * @param {DOM node} node 
 * @param {string} string 
 */
function talksAbout(node, string){
  if(node.nodeType === Node.TEXT_NODE){
    if(node.nodeValue.indexOf(string) !== -1){
      return true
    }
  }else if(node.nodeType === Node.ELEMENT_NODE){
    for(let i=0; i<node.childNodes.length; i++){
      if(talksAbout(node.childNodes[i])) return true
    }
    return false
  }
}

function getText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.nodeValue;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    var result = "";
    for (let i = 0; i < node.childNodes.length; i++) {
      result += getText(node.childNodes[i]);
    }
    return result;
  }
  throw new Error("Not a valid Node");
}

function talksAbout(node, string){
    return getText(node).indexOf(string) > -1
}

let link = document.getElementsByTagName("a")[0]


/**
 * 深度复制node
 * @param {node} node
 * @param {boolean} deep
 * @return {node}
 */
function cloneNode(node, deep = false) {
  if (node.nodeType === Node.TEXT_NODE) {
    return document.createTextNode(node.nodeValue);
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    let new_node = document.createElement(node.tagName);
    var attrNames = node.getAttributeName();
    // new_node.nodeValue = node.nodeValue
    for (let attr in attrNames) {
      // Object.hasProperty(attr)
      new_node.setAttribute(attrName, node.getAttribute(attrName));
    }
    for (let i = 0; i < node.childNodes.length; i++) {
      new_node.appendChild(cloneNode(node.childNode[i]));
    }
    return new_node;
  }
}

Array.prototype.slice2 = function(start = 0, end = this.length) {
  let result = [];
  for (let i = start; i < end; i++) {
    result.push(this[i]);
  }
  return result;
};

function elt(type, ...children) {
  let newNode = document.createElement(type);
  for (let i = 0; i < chileren.length; i++) {
    if (typeof children[i] === "string") {
      var child = document.createElement(children[i]);
      node.appendChild(child);
    } else {
      node.appendChild(children[i]);
    }
  }
  return newNode;
}

function elt(tagName, attrs) {
  let newNode = document.createElement(tagName);
  for (let attr in attrs) {
    if (attr !== "children") {
      newNode.setAttribute(attr, attrs[attr]);
    }
  }
  if (attrs.children) {
    for (var child of attrs.children) {
      if (typeof children[i] === "string") {
        child = document.createElement(child);
      }
      newnode.appendChild(child);
    }
  }
}

function elt(type, ...children){
  let node = document.createElement(type)
  for(let child of children){
    if(typeof child !== "string") node.appendChild(child)
    else node.appendChild(document.createTextNode(child))
  }
  return node
}

// date-foo, date-faz => dateset{foo, faz}

function replaceImage(){
  let images = document.getElementsByTagName("img")
  for(let i=images.length; i>=0; i--){
    let image = images[i]
    if(image.alt){
      let text = document.createTextNode(image.alt)
      image.parentNode.replaceChild(text, image)
    }
  }
}

let paras = document.body.getElementsByTagName("p")
for(let para of Array.from(paras)){
  if(para.getAttribute("data-classified") === "secret"){
    para.remove()
  }
}

// DOMTokenList
function highlightCode(node, keywords){
  var text = node.textContent //=>getContext
  node.textContent = ""

  var match, pos = 0
  while(match = keywords.exec(text)){
    var before = text.slice(pos, match.index)
    node.appendChild(document.createTextNode(before))
    // * <strong> + match[0] + </strong>
    var strong = document.createElement("strong")
    strong.appendChild(document.createTextNode(match[0]))
    node.appendChild(strong)
    pos = keywords.lastIndex
  }
  var after = text.slice(pos)
  node.appendChild(document.createTextNode(after))
}

var languages = {
  javascript: /\b(function|return|var|for|if|while)\b/g,
}

function highlightAllCode(){
  var pres = document.getElementsByTagName("pre")
  for(var i=0; i<pres.length; i++){
    var pre = pres[i]
    var lang = pre.getAttribute("data-language")
    if(languages.hasOwnProperty(lang)){
      highlightCode(pre, languages[lang])
    }
  }
}

function getInnterHTML(node){
  if(node.nodeTpye === Node.TEXT_NODE){
    return node.nodeValue
  }else if(node.nodeType === Node.ELEMENT_NODE){
    var tagName = node.tagName.toLowercase()
    var result = "<" + tagName
    var atterNames = node.getAttributeNames()
    for(var attrName of attrNames){
      result += `${attrName.toLowercase()} = \"${node.getAttribute(attrName)}\" `
    }
    result += "/>"

    for(var i=0; i < node.childNodes.length; i++){
      result += getInnterHTML(node.childNodes(i))
    }
    result += "</" + tagName + ">"
    return result
  }

}