export const parser = function(logs) {
    let actiontype          = logs['action']['type']
    let payload             = logs['action']['payload'] === undefined ? null : JSON.stringify(logs['action']['payload'])
    let state               = logs['state']
    let timestamp           = getFormattedTimestamp();



    let userid              = state.loginReducer.userinfo.id ==null ? null : state.loginReducer.userinfo.id
    let service_user_id     = state.ClientReducer.clientinfo.id ==null ? null : state.ClientReducer.clientinfo.id

    if (actiontype === "session/updateSessionExternal") {
        return null
    }
    // console.log("userid service_user_id, actiontype, payload, timestamp----->", userid, service_user_id, actiontype, payload, timestamp)
    let logMessage = JSON.stringify(userid+'$' +service_user_id+'$' +actiontype+'$'+payload+'$'+timestamp)
    return logMessage;


}

function getFormattedTimestamp() {
    const now = new Date();

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dayNames[now.getDay()];

    const date = now.getDate();
    const month = now.getMonth() + 1; // Months are zero-based in JavaScript
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    return `${day},${date}/${month}/${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

console.log(getFormattedTimestamp());