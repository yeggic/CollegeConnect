function match(){
    
}


require('dotenv').config()
var Airtable = require('airtable');

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});
var base = Airtable.base('app4GCHv7ognTqWSd');

var college = [];
var highSchool = [];
base('MASTER_TABLE').select({
    // Selecting all records
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        // if(!record.get("Last_Name"))
        var typeOfStudent = record.get("Type");
        if(typeOfStudent == "College Student / Recent Grad"){;
            var collegeStudent = {
                name: record.get("First Name") + " " +record.get("Last_Name"),
                school: record.get("College Student's Combined School and Major"),
                major: record.get("Actual_Major"),
                interest: record.get("Interests_College")
            };
            college.push(collegeStudent);
        }
        else{
            var highSchoolStudent = {
                name: record.get("First Name") + record.get(" Last_Name"),
                collegeOne: record.get("College_Interest_1"),
                collegeTwo: record.get("College_Interest_2"),
                collegeThree: record.get("College_Interest_3"),
                majorInterest: record.get("Intended_Major"),
                interests: record.get("Interests_HighSchool")
            };
            highSchool.push(highSchoolStudent);
        }
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
    console.log("college:");
    console.log(college);
    console.log("high school:");
    console.log(highSchool);
});

