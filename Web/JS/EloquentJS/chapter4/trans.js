const journal = require("./journal.js");

// * 计算不同事件之间的关联, phi系数 phi coefficient
function phi(table){
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) * (table[0] + table[1]) * (table[1] + table[3]) * (table[0] + table[2]))
}

// * 判断事件是否存在于记录中
function isEvent(event, entry){
  return entry.events.indexOf(event) !== -1
}

// * 计算记录中, 不同事件和变身发生的次数
function tableFor(event, journal){
  let table = [0, 0, 0, 0]
  // * array loop (for let index of array)
  for(let entry of journal){
    let index = 0
    if(isEvent(event, entry)) index += 1
    if(entry.squirrel) index += 2
    table[index]++
  }
  return table
}

console.log(tableFor("pizza", JOURNAL));

function journalEvents(journal){
  let events = {}
  for(let entry of journal){
    for(let event of entry.events){
      let getPhi = phi(tableFor(event, journal))
      if(Math.abs(getPhi) > .1)
        events[event] = getPhi
    }
  }
  return events
}

  for(let entry of journal){
    if(isEvent("peanuts", entry) && !(isEvent("brushed teeth", entry))){
      entry.events.push("peanuts teeth")
    }
  }

  console.log(phi(tableFor("peanuts teeth", journal)))

console.log(journalEvents(journal))