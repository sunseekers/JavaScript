'use strict';

const videoElement = document.querySelector('video');
const videoSelect = document.querySelector('select#videoSource');
const selectors = [videoSelect];

let video = document.querySelector('video');
let canvas = document.getElementById('canvas');
let context1 = canvas.getContext('2d');


function gotDevices(deviceInfos) {
  const values = selectors.map(select => select.value);
  selectors.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (let i = 0; i !== deviceInfos.length; ++i) {

    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;

    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices)




function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function start() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const videoSource = videoSelect.value;
  const constraints = {
    video: {
      deviceId: videoSource ? {
        exact: videoSource
      } : undefined
    }
  };
  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}


videoSelect.onchange = start;

start();

//拍照
photograph.addEventListener("click", () => {
  // if (!this.isOpenCamera) return alert("请开启摄像机权限")

  let img = new Image();
  img.src = "";
  img.onload = function (ev) {
    context1.drawImage(img, 0, 0);
  }

  context1.drawImage(video, 50, 50); //将video对象内指定的区域捕捉绘制到画布上指定的区域，实现拍照。
  context1.drawImage(img, 50, 50);
})