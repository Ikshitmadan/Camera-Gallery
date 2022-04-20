let video=document.querySelector("video");
let recordBtnCont=document.querySelector(".record-btn-cont");
let recordBtn=document.querySelector(".record-btn");
let captureBtnCont=document.querySelector(".capture-btn-cont");
let captureBtn=document.querySelector(".capture-btn");
let filterLayer=document.querySelector(".filter-layer");
let desiredColor="transparent";
let recorder;
let chunks=[];
let recorderflag=false;
let captureFlag=false;
let constraints={
video:true,
audio:true,
}
let counter=0;
let timerID;
let timer=document.querySelector(".timer");
console.log("hello");
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  /* use the stream */
  video.srcObject=stream;
  recorder=new MediaRecorder(stream);

  recorder.addEventListener("dataavailable",(e)=>{

    chunks.push(e.data);
  })

  recorder.addEventListener("start",()=>{
    chunks=[];
  });
  recorder.addEventListener("stop",()=>{
    let blob=new Blob(chunks,{type:"video/mp4"});
    let videoUrl=URL.createObjectURL(blob);
    let a=document.createElement("a");
    a.href=videoUrl;
    a.download="stream.mp4";
    a.click();
  })
})
recordBtn.addEventListener("click",(e)=>{

  console.log("welcome to record-btn");
  if(!recorder)
  {
    console.log("rejected");
    return;
  }

  recorderflag=!recorderflag;

  if(recorderflag)
  {
    recorder.start()
    console.log("start");
    starttimer();
    // recordBtn.classList.add("scale-record");
  }
  else{
    console.log("stop-lord");
    recorder.stop()
    stopTimer();
    // recordBtn.classList.remove("scale-record");
  }
})


function starttimer() {
  timer.style.display="block";
  console.log("go");
  
  function displaytimer() {
    console.log("display");
//
    let totalseconds=counter;
    let hours=Number.parseInt(totalseconds/3600);
    totalseconds=totalseconds%3600;

    let min=Number.parseInt(totalseconds/60);

totalseconds=totalseconds%60;
let sec=totalseconds;
timer.innerText=`${hours}:${min}:${sec}`;
    counter++;
  }

 timerID= setInterval(displaytimer,1000);

 

}
function stopTimer() {
  clearInterval(timerID);
  counter=0;
  timer.innerText=`00:00:00`;
timer.style.display="none";
}
console.log("hi");

captureBtn.addEventListener("click",()=>{

  captureFlag=!captureFlag;

    let canvas=document.createElement("canvas");
    canvas.height=video.videoHeight;
    canvas.width=video.videoWidth;
    let tool=canvas.getContext("2d");
    

    tool.drawImage(video,0,0,canvas.width,canvas.height);
    tool.fillStyle = desiredColor;
    tool.fillRect(0,0,canvas.width,canvas.height);
    let imageUrl=canvas.toDataURL();
    let a=document.createElement("a");
    a.href=imageUrl;
    a.download="image.jpg";
    a.click();
    document.body.appendChild(a);
    a.remove();
  
})

let allfilters=document.querySelectorAll(".filter");

Array.from(allfilters, filterele =>{
  filterele.addEventListener("click",()=>{

    console.log("welcome to filters");
     desiredColor= getComputedStyle(filterele).getPropertyValue("background-color");
   filterLayer.style.backgroundColor=desiredColor;
    console.log(desiredColor);
    
     })
});
