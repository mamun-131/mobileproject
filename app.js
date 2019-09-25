const express = require('express');
var apps = express();
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

//apps.listen(3000,()=> {console.log("Listinging at port 3000.....");});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
