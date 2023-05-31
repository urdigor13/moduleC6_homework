const btn = document.getElementById('btn');
const geo = document.getElementById('geo');
const input = document.getElementById('messageIn');
const output = document.getElementById('chatWindows');
const wsUri ='wss://echo-ws-service.herokuapp.com';

let websocket;

function writeToScreen(message, rightSide) {
  let msg = document.createElement("div");
  msg.innerHTML = message;
  msg.classList.add("chatMsg");
  if (rightSide) {
    msg.classList.add("fromClnt");
  }
  output.appendChild(msg);
  output.scrollTop = output.scrollHeight;
}

const error = () => {
  writeToScreen('Невозможно получить ваше местоположение');
}

const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  writeToScreen(`<span style="color: red;">https://www.openstreetmap.org/#map=18/${latitude}/${longitude}</span>`);
}

btn.addEventListener('click', () => {
  var message = input.value;
  document.getElementById('messageIn').value = ''
  if (message) {
    writeToScreen(message, true);
    websocket.send(message);
  };
});

geo.addEventListener('click', () => {
  var message = 'Геолокация';
  writeToScreen(message, true);
  message = 'https://www.openstreetmap.org';
  if (!navigator.geolocation) {
    writeToScreen('Geolocation не поддерживается вашим браузером');
  } else {
    console.log('Определение местоположения…');
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  websocket = new WebSocket(wsUri);
//  websocket.onopen = function(evt) {
//    writeToScreen("CONNECTED");
//  };
  websocket.onclose = function(evt) {
    console.log("DISCONNECTED");
    websocket = new WebSocket(wsUri);
  };
  websocket.onmessage = function(evt) {
    writeToScreen('<span style="color: blue;">' + evt.data+'</span>');
  };
  websocket.onerror = function(evt) {
    console.log('ERROR: ' + evt.data);
  };
});