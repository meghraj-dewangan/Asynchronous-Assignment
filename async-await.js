




let outputDiv = document.querySelector(".fetchData");
    outputDiv.style.display = "none"
async function fetchData(){

    try{

       let response =  await fetch("https://dummyjson.com/posts");
       let jsonData = await response.json();
           console.log(jsonData)
             return jsonData;
             
    } catch(error){
        console.log("Error fetching data",error)
        
    }
    
}



async function run(){

    try{
        let body1 = document.querySelector("body");
        body1.style.backgroundImage = "url('./image/background_image.jpg')"

        let syncData = fetchData();
       
        let outputDiv = document.querySelector(".fetchData");
        outputDiv.style.display = "block"
        
        
        let timeOutPromise = new Promise((resolve,reject)=>{            //out of the 5 sec time is over msg display and fetching stop
            setTimeout(()=>{reject("Time is over")},5000);

        })

        let result = await Promise.race([syncData,timeOutPromise]);
       
        let createP = document.createElement("p");
        createP.innerHTML =JSON.stringify(result) ;
        
        outputDiv.appendChild(createP);
        outputDiv.style.display = "block"   //display the outputDiv
        let img = document.querySelector("img"); //hide the loading image
        img.style.display = "none";       //hide the gif

       

    } catch(error){
        console.log(error);
        outputDiv.style.display = "block";
        outputDiv.innerHTML = error.message;
    }
}

document.querySelector("button").addEventListener("click",run);

