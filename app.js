// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var input1 = d3.select("#datetime");
var input2 = d3.select("#city");
var resetbutton = d3.select("#reset-button");
var columns = ["date", "city", "state", "country", "shape", "duration", "comments"]
//var button = d3.select("#button");
var form = d3.select("#form");

button.on("click", runEnter);
form.on("submit",runEnter);

var loaddata = (inputdata) => {
    inputdata.forEach(sightings => {
		var row = tbody.append("tr");
		columns.forEach(column => row.append("td").text(sightings[column])
		)
	});
}

loaddata(data);
//////////////////////////////////////////

function runEnter() {
	d3.event.preventDefault();
	var dateInput = input1.property("value").trim();
	var cityInput = input2.property("value").toLowerCase().trim();
	var findDate = data.filter(data => data.datetime === dateInput);
	console.log(findDate)
	var findCity = data.filter(data => data.city === cityInput);
	console.log(findCity)
	var findData = data.filter(data => data.datetime === dateInput && data.city === cityInput);
	console.log(findData)

	tbody.html("");

	let response = {
		findData, findCity, findDate
	}

	if (response.findData.length !== 0) {
		loaddata(findData);
	}
		else if (response.findData.length === 0 && ((response.findCity.length !== 0 || response.findDate.length !== 0))){
			loaddata(findCity) || loaddata(findDate);
	
		}
		else {
			tbody.append("tr").append("td").text("No results found"); 
		}
}

resetbutton.on("click", () => {
	tbody.html("");
	loaddata(data)
	console.log("Reset Table")
})