export const get_date = function() {
    var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    var prnDt = new Date().toLocaleTimeString('en-us', options);
    // console.log(prnDt)
    return prnDt;
}