const express = require('express');
var apps = express();
var morgan = require('morgan');
apps.use(morgan('combined'));


function MaterialData(Material, Plant, Storage_Location, Inventory) {
    this.Material = Material;
    this.Plant = Plant;
    this.Storage_Location = Storage_Location;
    this.Inventory = Inventory;
}; 
var MaterialRowData = [];

var Excel = require('exceljs');
var workbook = new Excel.Workbook();
workbook.xlsx.readFile('data1.xlsx');

apps.get('/', (req,res) =>{
console.log('ok');
var worksheet = workbook.getWorksheet('Sheet1');
//var row = [];
//var col = [];
//worksheet.eachRow((rows, rownumber) =>{
//row.push(rows.values);
//});
for (i = 2; i <= worksheet.rowCount; i++) {
    MaterialRowData.push(new MaterialData(worksheet.getRow(i).getCell(1).value,
                                        worksheet.getRow(i).getCell(2).value, 
                                        worksheet.getRow(i).getCell(3).value, 
                                        worksheet.getRow(i).getCell(4).value));

}
const json = JSON.stringify(MaterialRowData);
console.log(json); 

MaterialRowData = [];

res.json(json);
//res.json({Name: worksheet.getCell(2,1).value, No: worksheet.getCell(2,2).value});

});

//apps.listen(3000,()=> {console.log("Listinging at port 3000.....");});
const PORT = process.env.PORT || 3000;
apps.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
