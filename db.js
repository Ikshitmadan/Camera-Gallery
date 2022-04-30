let db;
let openRequest = indexedDB.open("MyNewDatabase");
openRequest.addEventListener("success",(e)=>{
console.log("new database is made");
db=openRequest.result;
})
openRequest.addEventListener("error",(e)=>{
    console.log(" DB error");
})
openRequest.addEventListener("upgradeneeded",(e)=>{
    console.log("Upgraded DB");
    db=openRequest.result;
    db.createObjectStore("video",{keyPath:"id"});
    db.createObjectStore("image",{keyPath:"id"});
})
