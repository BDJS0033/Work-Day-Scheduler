//initialize variable
var dayPlanner = []

//for loop creating array for time. 24Hr/12Hr clock. 9AM - 5PM; 8 hour block. 17:00 = 5:00PM

for (time = 9; time <= 17; time++) {

  var id = time - 9
  var dataPlanner = ""
   
//variables for displaying time
//if & else/if statement(s) for displaying time before/after 12PM.
   var displayHour = 0;
   var ampm = "";

    if (time === 12) {
        displayHour = 12
        ampm = "pm"
    } else if (time > 12) { 
       displayHour = time - 12;
       ampm = "pm";
   } else if (time < 12) {
       displayHour = time;
       ampm = "am";
   }

   displayHour = displayHour.toString()

   dataPlanner = {
       id: id,
       displayHour: displayHour,
       time: time,
       ampm: ampm,
       dataPlanner: dataPlanner
   }

   dayPlanner.push(dataPlanner)

}

//End of array. 

// Start of functions()

//current day for header 
function getCurrentDate() {
    var currentDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDate);
}

//save data to localStorage
function savePlannerData() {
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner));
}

//Function to save/load data in the time slots
function displayPlannerData() {
    dayPlanner.forEach(function (hour) {
        $("#" + hour.id).val(hour.dataPlanner)
    }) 
}

function loadPlannerData() {
    var dataLoaded = JSON.parse(localStorage.getItem("dayPlanner"));

    if (dataLoaded) {
        dayPlanner = dataLoaded;
    }

    savePlannerData()
    displayPlannerData()
}

//JQuery Attributes used for CSS/HTML elements for design without altering HTML.
dayPlanner.forEach(function(hour) {
    // creates row
    var timeRow = $("<form>")
        .addClass("row");

    $(".container").append(timeRow);

    //creates field for time
    var timeField = $("<div>")
        .addClass("col-md-1 hour")
        .text(hour.displayHour + hour.ampm);

    //Creating Schedule Data by inputting var/function for hour
    var hourInput = $("<div>")
        .addClass("col-lg-10 description p-0")
    var hourData = $("<textarea>");
        hourData.attr("id", hour.id);
   //compare time to current time - color codes
        if (hour.time == moment().format("HH")) {
            hourData.addClass("present")
        } else if (hour.time < moment().format("HH")) {
                hourData.addClass("past")
        } else if (hour.time > moment().format("HH")) {
            hourData.addClass("future")
    }

    hourInput.append(hourData);
    
    // create save button for end of row
    var saveIcon = $("<i class='far fa-save fa-lg'></i>")
    var saveEnd = $("<button>")
        .addClass("col-md-1 saveBtn");

    //append elements to row 
    saveEnd.append(saveIcon);    
    timeRow.append(timeField, hourInput, saveEnd)
})

    //save button functions appropriately
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    //saving the correct information into array
    var saveIndex = $(this).siblings(".description").children().attr("id");
    dayPlanner[saveIndex].dataPlanner = $(this).siblings(".description").children().val();
    savePlannerData();
    displayPlannerData();
})


//get current date on page load
getCurrentDate()
//load data for page load
loadPlannerData()