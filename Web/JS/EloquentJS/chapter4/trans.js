const journal = require("./journal.js");
/* compute the measure of correlation between two Boolean variables */
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) / Math.sqrt((table[3] + table[2]) * (table[0] + table[1]) * (table[1] + table[3]) * (table[0] + table[2]));
}

function phiUpdate([n00, n01, n10, n11]){
  return (n11 * n10 - n00 * n01) / Math.sqrt((n11 + n10) * (n00 + n01) * (n01 + n11) * (n10 + n00));
}

/* how many times the event occurs in relation to squirrel transformations */
function tablefor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i];
    let index = 0;
    if (entry.events.includes(event)) index++;
    if (entry.squirrel) index += 2;
    table[index]++;
  }
  return table;
}


function journalEvents(journal) {
  let events = [];
  for (let entry of journal)
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  return events;
}

let result = [];
for (let event of journalEvents(journal)) {

  let correlation = phi(tablefor(event, journal));
  if (correlation > 0.1 || correlation < -0.1) {
    result.push(event + ", " + correlation);
  }
}

for(let entry of journal){
  if(entry.events.includes("peanuts") && !entry.events.includes("brushed teeth")){
    entry.events.push("peanut teeth");
  }
}

console.log(phi(tablefor("peanut teeth", journal)));