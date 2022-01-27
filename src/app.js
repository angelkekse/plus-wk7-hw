let now = new Date();
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let clock = now.toLocaleTimeString();
  let dateNum = now.getDate();
  let dateStatement = `${day}, ${dateNum} ${month} - ${clock}`;
  return dateStatement;
}
let timeDisplay = document.querySelector("#date-and-time");
timeDisplay.innerHTML = formatDate();
