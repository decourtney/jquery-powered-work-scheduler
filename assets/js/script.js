$(function ()
{
  let mainContainerEl = $('.container-lg');
  let dateTimeEl = $('#currentDay');

  let [currentHour, currentDate] = getDateTimeGroup();

  dateTimeEl.text(currentDate);

  for (let i = 9; i < 18; i++)
  {
    let hour;
    let meridiem;
    let tense;

    meridiem = i >= 12 ? "PM" : "AM";
    hour = (i % 12) || 12;

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

    mainContainerEl.append(
      $("<div>", { "id": "hour-" + hour, "class": "row time-block " + tense }).append(
        $("<div>", { "class": "col-2 col-md-1 hour text-center py-3" }).text(hour + meridiem),
        $("<textArea>", { "class": "col-8 col-md-10 description", "rows": "3" }),
        $("<button>", { "class": "btn saveBtn col-2 col-md-1", "aria-label": "save" }).append(
          $("<i>", { "class": "fas fa-save", "aria-hidden": "true" }))));
  }

  mainContainerEl.on("click", ".time-block button", function (event)
  {
    localStorage.setItem($(this).parent().attr("id"), $(this).parent().children("textArea").val());
    mainContainerEl.prepend($("<div>", { "class": "row entry-msg" }).append($("<p>", { "class": "col-12 message text-center text-primary lead py-2" }).text("Appointment saved to localstorage \u2705")));
    setTimeout(function(){
      $('.message').remove();
    }, 2000);
  });

  for (let i = 0; i < localStorage.length; i++)
  {
    $("#" + localStorage.key(i)).children("textArea").text(localStorage.getItem(localStorage.key(i)));
  }
});

function getDateTimeGroup()
{
  let newDate = new Date();

  return [newDate.getHours(), getDayOfWeek(newDate.getDay()) + ", " + getDateOfMonth(newDate.getMonth()) + " " + getOrdinalDate(newDate.getDate())];
}

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

function getDateOfMonth(month)
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

function getOrdinalDate(ord)
{
  let s = ['th', 'st', 'nd', 'rd'];
  let v = ord % 100;
  return ord + (s[(v - 20) % 10] || s[v] || s[0]);
}