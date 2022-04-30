setTimeout(()=>{

    if(db)

{
    console.log(2);
    // video retrieval
    let videoTransaction=db.transaction("video","readonly");
    let videostore=videoTransaction.objectStore("video");
    let videorequest=videostore.getAll();
videorequest.onsuccess=(e)=>{
    let videoresults=videorequest.result;
  let gallerycont=document.querySelector(".gallery-cont");
 videoresults.forEach((videObj) => {
let mediaEle=document.createElement("div");
mediaEle.setAttribute("class","media-cont");
mediaEle.setAttribute("id",videObj.id);
let url=URL.createObjectURL(videObj.blobData);

mediaEle.innerHTML=`  <div class="media">
<video autoplay loop  src="${url}"></video>
</div>
<div class="delete action-btn">Delete</div>
<div class="download action-btn">Download</div>`
gallerycont.appendChild(mediaEle);
let deleteBtn=mediaEle.querySelector(".delete");
console.log("delete");
deleteBtn.addEventListener("click",deleteMedia);
let downloadBtn=mediaEle.querySelector(".download");
downloadBtn.addEventListener("click",downloadMedia);

})
}

let imageTransaction=db.transaction("image","readonly");
    let imagestore=imageTransaction.objectStore("image");
    let imagerequest=imagestore.getAll();
imagerequest.onsuccess=(e)=>{
    let imageresults=imagerequest.result;
  let gallerycont=document.querySelector(".gallery-cont");
 imageresults.forEach((imageObj) => {
     console.log("images -loop");
let mediaEle=document.createElement("div");
mediaEle.setAttribute("class","media-cont");
mediaEle.setAttribute("id",imageObj.id);
let url=imageObj.Url;

mediaEle.innerHTML=`  <div class="media">
<img src="${url}"/ >
</div>
<div class="delete action-btn">Delete</div>
<div class="download action-btn">Download</div>`
gallerycont.appendChild(mediaEle);
let deleteBtn=mediaEle.querySelector(".delete");
console.log("delete");
deleteBtn.addEventListener("click",deleteMedia);
let downloadBtn=mediaEle.querySelector(".download");

downloadBtn.addEventListener("click",downloadMedia);


})
}

function deleteMedia(e) {
    console.log("event-delete");
    let id=e.target.parentElement.getAttribute("id");

    console.log(id);
    let type=id.slice(0,3);


    if(type=="vid")
    {
        let videoTransaction=db.transaction("video","readwrite");
        let videostore=videoTransaction.objectStore("video");
        videostore.delete(id);
        
    }
    else if(type=="img")
    {
        let imageTransaction=db.transaction("image","readwrite");

         let imagestore=imageTransaction.objectStore("image");
         imagestore.delete(id);
    }
    e.target.parentElement.remove();
}

function downloadMedia(e) {
    console.log("event-delete");
    let id=e.target.parentElement.getAttribute("id");

    // console.log(id);
    let type=id.slice(0,3);


    if(type=="vid")
    {
        let videoTransaction=db.transaction("video","readwrite");
        let videostore=videoTransaction.objectStore("video");
     let videorequest=   videostore.get(id);
     videorequest.onsuccess=(e)=>{
         let videoresults=videorequest.result;
         let videoUrl=URL.createObjectURL(videoresults.blobData);
           let a=document.createElement("a");
    a.href=videoUrl;
    a.download="stream.mp4";
    a.click();

     }
        
    }
    else if(type=="img")
    {
        let imageTransaction=db.transaction("image","readwrite");

         let imagestore=imageTransaction.objectStore("image");
     
         let imagerequest=imagestore.get(id);
         imagerequest.onsuccess=(e)=>{
             let imageResult=imagerequest.result;
             let imageUrl=imageResult.Url;
             let a=document.createElement("a");
    a.href=imageUrl;
    a.download="image.jpg";
    a.click();
    document.body.appendChild(a);
    a.remove();

         }
    }    

}

}
},1000)


