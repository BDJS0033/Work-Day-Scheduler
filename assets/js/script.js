///Header current Date and time with Moment.js
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

//initializing variable
var workDay = []

//for loop creating array for time. 24Hr/12Hr clock. 9AM - 5PM; 8 hour block. 17:00 = 5:00PM
for (time = 9; time <= 17; time++) {
  var x = time - 9
  var workData = ""

//variable for displaying time AM/PM
var displayTime = 0;
var ampm = "";

//if & else/if statement(s) for displaying time before/after 12PM.
if(time === 12) {
  displayTime = 12
  ampm = "pm"
} else if (time > 12) {
  displayTime = time - 12;
  ampm = "pm";
} else if (time < 12) {
  displayTime = time;
  ampm = "am";
}

//creating string to return object(time)
 displayTime = displayTime.toString()

workData = {
  x: x,
  displayTime: displayTime,
  time: time,
  ampm: ampm,
  workData: workData,
}

//appending new elements to array to return data 
workDay.push(workData)

}
//End of array. 

// Start of functions()

//save data to localStorage
function saveworkData() {
  localStorage.setItem("workDay", JSON.stringify(workDay));
}

//Diplay time in time slots
function displayworkData() {
  workData.forEach(function (hour) {
    $(`#${hour.id}`).val(hour.workData)
  })    
}

//Starting function to insert data in the time slots
function insertworkData() {
  var insertData = JSON.parse(localStorage.getItem("workDay"));

  if (insertData) {
    workDay = insertData

  }

  saveworkData()
  displayworkData()

}



// fucntion to 
//assure save button functions appropriately
//$(".saveBtn").on("click", function(event) {
  // event.preventDefault();