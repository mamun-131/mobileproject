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
function getData() {
console.log('ok');
    var worksheet = workbook.getWorksheet('Sheet1');

    for (i = 2; i <= worksheet.rowCount; i++) {
        MaterialRowData.push(new MaterialData(worksheet.getRow(i).getCell(1).value,
                                            worksheet.getRow(i).getCell(2).value, 
                                            worksheet.getRow(i).getCell(3).value, 
                                            worksheet.getRow(i).getCell(4).value));}
}
//to make array empty
//MaterialRowData = [];

getData();

apps.get('/', (req,res) =>{

    const json = JSON.stringify(MaterialRowData);
    console.log(json); 
    res.json(json);

    });

//apps.listen(3000,()=> {console.log("Listinging at port 3000.....");});
const PORT = process.env.PORT || 3000;
apps.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
