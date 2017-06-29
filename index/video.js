var video = document.querySelector("#videoElement");
var record=document.querySelector('.record');
var stop=document.querySelector('.stop'); 


var playvideo=document.querySelector("#playElement");

var mediaRecorder;
var recordedBlobs;
var sourceBuffer;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;


function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
    var mediaRecorder=new MediaRecorder(stream);
    console.log('getUserMedia() got stream: ', stream);
    window.stream=stream;
    
    //else video.src=stream;
}

function videoError(e) {
    // do something
    alert("You have a problem");
}

function handlestop(event){
    console.log("stopped");
}

function handledata(event){
    if (event.data && event.data.size>0){
        recordedBlobs.push(event.data);
    }
}



 navigator.getUserMedia({video: true, audio: true}, handleVideo, videoError);


function startrecord(){
 console.log("start recording");
 recordedBlobs=[];
 var options = {mimeType: 'video/webm;codecs=vp9'};
 if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.log(options.mimeType + ' is not Supported');
    options = {mimeType: 'video/webm;codecs=vp8'};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(options.mimeType + ' is not Supported');
      options = {mimeType: 'video/webm'};
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = {mimeType: ''};
    }
}
}

try {
    mediaRecorder = new MediaRecorder(window.stream, options);
} catch (e) {
    console.error('Exception while creating MediaRecorder: ' + e);
    alert('Exception while creating MediaRecorder: '
      + e + '. mimeType: ' + options.mimeType);
    return;
}

mediaRecorder.ondataavailable=handledata;
mediaRecorder.start(10);
console.log("clicked");
}

function endrecord(){


    mediaRecorder.stop();
    mediaRecorder.onstop=handlestop;
    console.log(mediaRecorder.state);
}

function playrecord(){
    var superBuffer= new Blob(recordedBlobs, {type: 'video/webm'});
    playvideo.src=window.URL.createObjectURL(superBuffer);
}







