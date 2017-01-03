const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile("College-Report-by-State-2015.xls");
const sheet = workbook.Sheets[workbook.SheetNames[0]];

var data = {};
for (var row = 5; row < 56; row++) { // Rows 5-55 contain data
    var state = sheet["A" + row].v; // State name (located in col A)
    var info = {};
    info["colleges_receiving"] = {
        "data": sheet["C" + row].v,
        "description": "Total # of colleges in state receiving AP scores"
    };
    info["sent_to_colleges"] = {
        "data": sheet["E" + row].v,
        "description": "Total # of exams sent to colleges in state"
    };
    info["to_in_state"] = {
        "data": sheet["G" + row].v,
        "description": "Total # of students going to colleges in state"
    };
    info["in_state"] = {
        "data": {
            "num": sheet["H" + row].v,
            "perc": sheet["I" + row].v
        },
        "description": "Students remaining in state for college"
    };
    info["entering"] = {
        "data": sheet["J" + row].v,
        "description": "# of students entering state for college"
    };
    info["leaving"] = {
        "data": {
            "num": sheet["K" + row].v,
            "perc": sheet["L" + row].v
        },
        "description": "Students leaving state for college"
    };
    info["net"] = {
        "data": sheet["M" + row].v,
        "description": "# of students entering compared to leaving"
    };

    data[state] = info;
}
var contents = "var state_data = " + JSON.stringify(data) + ";";
fs.writeFile("state_data.js", contents, function(err) {
    if (!err) {
        console.log("Written to file.");
    } else {
        console.log(err);
    }
});
