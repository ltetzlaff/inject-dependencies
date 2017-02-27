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

// http://stackoverflow.com/a/29680837/3857476
let loadInlineScripts = `<script>
  window.addEventListener("load", () => {
    var arr = document.querySelectorAll("script[type='later']");
    for (var x = 0; x < arr.length; x++) {
      var cln = arr[x].cloneNode(true);
      cln.type = "text/javascript";
      document.querySelectorAll("body")[0].appendChild(cln);
    }
    console.log(new Date() + "| deferred script load");
  });
</script>`;

let injection = "";
stylesheets.forEach(stylesheet => injection += css(server + stylesheet));
        scripts.forEach(script => injection +=  js(server + script));

folders.forEach(folder => {
  fs.readdir(folder, (err, files) => {
    files.filter(file => file.endsWith(".html")).forEach(file => {
      //console.log(file);
      sed("-i", new RegExp(find), find + "\n" + injection, folder + file);
      sed("-i", /<script src="(|\.\.\/)common.js"><\/script>/, "", folder + file);

      // Defer inline scripts
      sed("-i", /<script>/, "<script type='later'>\n", folder + file);
      fs.appendFile(folder + file, loadInlineScripts, "utf8");
    });
  });
});