
/*--------------If the Promise takes longer than 5 seconds to resolve, reject it with a message
like "Operation timed out."   */


let outputDiv = document.querySelector(".fetchData");
outputDiv.style.display = "none"; // hide box-shadow intially


function run() {

    let body1 = document.querySelector("body");
    body1.style.backgroundImage = "url('./image/background_image.jpg')" //after run background color change

    outputDiv.style.display = "block"; //display box-shdow after run
    let loadingMsg = document.querySelector('.loading');
    loadingMsg.style.display = 'block'; // Display the loading message

    const fetchDataPromise = new Promise((resolve, reject) => {
        fetch('https://dummyjson.com/posts')
            .then((res) => res.json())
            .then((jsonData) => {
                let outputDiv = document.querySelector(".fetchData");
                let p = document.createElement("p");
                p.innerHTML = JSON.stringify(jsonData);
                outputDiv.appendChild(p);

                outputDiv.style.display = "block"; // display box shadow when data show
                loadingMsg.style.display = 'none'; // Hide the loading message after data is loaded
                let img = document.querySelector("img"); //hide the loading animation
                img.style.display = "none";
                resolve(jsonData);
            })
            .catch((error) => {
                reject("Error Fetching Data",error);

            });
    });

    // after 5 sec display this timed out and stop fetching
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Operation timed out.");
        }, 5000);
    });
 

    Promise.race([fetchDataPromise, timeoutPromise])
        .then((result) => {
            // If fetchDataPromise resolves first, this  will execute
            console.log("Data fetched successfully:", result);
        })
        .catch((error) => {
            // If timeoutPromise resolves first (i.e., timeout occurs) or fetchDataPromise rejects
            console.log(error);
            outputDiv.innerHTML = error; // Display the error message
            outputDiv.style.display = "block"; // Display the outputDiv to show the error message
            loadingMsg.style.display = 'none'; // Hide the loading message
        });
}

document.querySelector("button").addEventListener("click", run);



