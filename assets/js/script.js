$(function ()
{
  // Time slots required in 24hr clock (0-24)
  let startTime = 9; // inclusive
  let endTime = 18; // exclusive

  // Selectors
  let mainContainerEl = $('.container-lg');
  let dateTimeEl = $('#currentDay');

  // Function will return two values - Two digit 24hr time, Preformatted Day, Month Date
  let [currentHour, currentDate] = getDateTimeGroup();

  // Write current date to header
  dateTimeEl.text(currentDate);

  // This loop will create time slots based on startTime and endTime.  This only runs on load/refresh
  for (let i = startTime; i < endTime; i++)
  {
    let hour;
    let meridiem;
    let tense;

    // Using 24hr clock - determine meridiem
    meridiem = (i >= 12) ? "PM" : "AM";
    // Convert 24hr clock to 12 hr - If 0 then return 12
    hour = (i % 12) || 12;

    // Get time tense for highlighting time slots.
    if (i == (currentHour))
    {
      tense = "present";
    } else if (i < (currentHour))
    {
      tense = "past";
    } else
    {
      tense = "future";
    }

    // One long fun command - creates time slot div and supporting children for each hour
    mainContainerEl.append(
      $("<div>", { "id": "hour-" + hour, "class": "row time-block " + tense }).append(
        $("<div>", { "class": "col-2 col-md-1 hour text-center py-3" }).text(hour + meridiem),
        $("<textArea>", { "class": "col-8 col-md-10 description", "rows": "3" }),
        $("<button>", { "class": "btn saveBtn col-2 col-md-1", "aria-label": "save" }).append(
          $("<i>", { "class": "fas fa-save", "aria-hidden": "true" }))));
  }

  // Click listener for the save button
  mainContainerEl.on("click", ".time-block button", function (event)
  {
    // Store input based on div id=hour-? as the key, and user input as the value.
    localStorage.setItem($(this).parent().attr("id"), $(this).parent().children("textArea").val());
    // Then display an acceptance message for a short duration
    mainContainerEl.prepend($("<div>", { "class": "row entry-msg" }).append($("<p>", { "class": "col-12 message text-center text-primary lead py-2" }).text("Appointment saved to localstorage \u2705")));
    setTimeout(function ()
    {
      $('.message').remove();
    }, 2500);
  });

  // For each entry in storage - retrieve and write saved user input to the appropriate div based on the key (hour-?)
  for (let i = 0; i < localStorage.length; i++)
  {
    $("#" + localStorage.key(i)).children("textArea").text(localStorage.getItem(localStorage.key(i)));
  }
});

// Gets and returns a formatted date and hour
// Date() methods return numerical based day, months, years so conversion is necessary
function getDateTimeGroup()
{
  let newDate = dayjs();

  return [newDate.hour(), getDayOfWeek(newDate.day()) + ", " + getMonthOfYear(newDate.month()) + " " + getOrdinalDate(newDate.date())];
}

// Switch statement to convert to the day
function getDayOfWeek(day)
{
  switch (day)
  {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }

  return day;
}

// Switch statement to convert to the month
function getMonthOfYear(month)
{
  switch (month)
  {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
  }

  return month;
}

// Adds ordinal indicators to the date
function getOrdinalDate(ord)
{
  let s = ['th', 'st', 'nd', 'rd'];
  let v = ord % 100; // Only need the last two digits to determine ordinal indicator

  // Found this neat code which utilizes Javascripts handling of negative number indexes
  // https://leancrew.com/all-this/2020/06/ordinal-numerals-and-javascript/
  return ord + (s[(v - 20) % 10] || s[v] || s[0]);
}