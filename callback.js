


let outputDiv = document.querySelector(".fetchData");
outputDiv.style.display = "none"; // hide box-shadow


function delay(callback) {
    setTimeout(callback,5000);
}



function run() {
    
    let body1 = document.querySelector("body");  
    body1.style.backgroundImage = "url('./image/background_image.jpg')"  //after run background color change
    // body1.style.backgroundSize = "cover"
    
    

     outputDiv.style.display = "block"; //display box-shdow after run
    let loadingMsg = document.querySelector('.loading');
    loadingMsg.style.display = 'block'; // Display the loading message
    delay(function () {
       
        fetch('https://dummyjson.com/posts')
            .then((res) => res.json())
            .then((jsonData) => {
                // console.log(jsonData)
                let outputDiv = document.querySelector(".fetchData");
                
               let p = document.createElement("p");
                p.innerHTML = JSON.stringify(jsonData);
            
               outputDiv.appendChild(p);
             
                // outputDiv.style.display = "block"  // display box shadow when data show
                loadingMsg.style.display = 'none'; // Hide the loading message after data is loaded
                let img = document.querySelector("img"); //hide the loading image
                img.style.display = "none"
                
    }).catch((error)=>{console.log("Error Fetching Data",error)
   
                   let outputDiv = document.querySelector(".fetchData")
                //    outputDiv.style.display = "block"
                   outputDiv.innerHTML = "Error Fetching Data";

                   
    }
                
)
})

}



document.querySelector("button").addEventListener("click", run);
