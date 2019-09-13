function getObjSource(obj){
  let objSource = '{'
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      objSource = '"' + key + '" : ' + obj[key].toString() + ',\n'
    }
  } 

  objSource += '}'
  return objSource
}


