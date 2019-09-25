const express = require('express');

var apps = express();

const PORT = 8080;
//const PORT = 3000;
const HOST = '0.0.0.0';
//const HOST = '127.0.0.1';


var morgan = require('morgan');
apps.use(morgan('combined'));

var Excel = require('exceljs');
var workbook = new Excel.Workbook();
workbook.xlsx.readFile('data1.xlsx');

apps.get('/', (req,res) =>{
console.log('ok');
var worksheet = workbook.getWorksheet('Sheet1');
var row = [];
var col = [];
worksheet.eachRow((rows, rownumber) =>{
row.push(rows.values);
});
const json = JSON.stringify(row);
console.log(json); 
res.json(json);
//res.json({Name: worksheet.getCell(2,1).value, No: worksheet.getCell(2,2).value});

});

apps.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

