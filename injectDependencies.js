"use strict";
const fs = require("fs");
require("shelljs/global");

const server = "";
const scripts = [];
const stylesheets = [];
const folders = ["."];
const find = "";

function css(url) {
  return '<link rel="stylesheet" href="' + url + '.css"/>\n'
}
function js(url) {
  return '<script src="' + url + '.js"></script>\n';
}

let injection = "";
stylesheets.forEach(stylesheet => injection += css(server + stylesheet));
        scripts.forEach(script => injection +=  js(server + script));

folders 
fs.readdir(".", (err, files) => {
  files.filter(file => file.endsWith(".html")).forEach(file => {
    sed("-i", new RegExp(find), find + "\n" + injection, file);
  });
});