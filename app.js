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


var Excel = require('exceljs');
var workbook = new Excel.Workbook();
workbook.xlsx.readFile('data1.xlsx');


apps.get('/inventory', (req,res) =>{
    console.log('ok');
    var worksheet = workbook.getWorksheet('Sheet1');
    var MaterialRowData = [];
    for (i = 2; i <= worksheet.rowCount; i++) {
        MaterialRowData.push(new MaterialData(worksheet.getRow(i).getCell(1).value,
                                            worksheet.getRow(i).getCell(2).value, 
                                            worksheet.getRow(i).getCell(3).value, 
                                            worksheet.getRow(i).getCell(4).value));}
    const json = JSON.stringify(MaterialRowData);
    console.log(json); 
	    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    res.json(MaterialRowData);

    });

    apps.get('/inventory/:id', (req,res) =>{
         console.log(req.params.id);
        var worksheet = workbook.getWorksheet('Sheet1');
        var MaterialRowData = [];
        for (i = 2; i <= worksheet.rowCount; i++) {
            MaterialRowData.push(new MaterialData(worksheet.getRow(i).getCell(1).value,
                                                worksheet.getRow(i).getCell(2).value, 
                                                worksheet.getRow(i).getCell(3).value, 
                                                worksheet.getRow(i).getCell(4).value));}
         
        //  const json = JSON.stringify(MaterialRowData);
        //  console.log(MaterialRowData); 
       var output = MaterialRowData.filter(function(value){ return value.Material== req.params.id;});
         res.json(output); 
    });

//const result = inventory.find( ({ name }) => name === 'cherries' );
//apps.listen(3000,()=> {console.log("Listinging at port 3000.....");});
const PORT = process.env.PORT || 3000;
apps.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
