const API_URL = process.env.REACT_APP_API_URL;

function retrieveGameCode(pin, callback) {
  if (typeof callback !== "function")
    throw new TypeError("callback is not a function");

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;

    if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 200) {
      const json = xhr.responseText;

      const data = JSON.parse(json);

      callback(null, data.reverse());
    }
  };
  xhr.open("GET", `${API_URL}/gameCodes`);

  xhr.setRequestHeader("Content-type", "application/json");
  debugger;
  // xhr.send(`{ "pin": "${pin}"}`);

  const json = JSON.stringify({ pin: pin });

  // xhr.send(JSON.stringify({ pin: pin }));
  xhr.send(json);
}

export default retrieveGameCode;
