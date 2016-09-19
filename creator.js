#!/usr/bin/env node

"use strict";

var fs = require("fs");
var ws = fs.createWriteStream("report.json");
ws.write('{"activities":[');
for(var i = 0; i < 2000; i++) {
  if(i) {
    ws.write(",");
  }
  var item = {};
  item.id = i;
  item.description = `description ${i}`;
  item.type = (i % 2 === 0 ? "P" : "S");
  item.cts = new Date().getTime();
  item.accountNum = 10000000 + i;
  item.value = Math.random() * 100000000;
  ws.write(JSON.stringify(item));
}
ws.write(']}');
ws.end();

