export const get_date = function() {
    // var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    // var prnDt = new Date().toLocaleTimeString('en-us', options);
    var d = new Date;
    var date = formatDate(d)
    // console.log(prnDt)
    return date;
}
function formatDate(d){
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], 
    months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var day = days[d.getDay()], 
        month = months[d.getMonth()], 
        date = d.getDate(), 
        year = d.getFullYear();
    var hours = d.getHours(), 
        minutes = d.getMinutes(), 
        seconds = d.getSeconds();
    return day + ', ' + date + ' ' + month + ' ' + year  + ' ' + hours + ':' + minutes + ':' + seconds;
  }