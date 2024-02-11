const quoteApiUrl = "https://api.quotable.io/random?minLength=100&maxLength=140";
const quoteSection = document.getElementById("para");
const userInput = document.getElementById("input-text");

let quote ="";
let time = 60;
let timer ="";
let mistakes = 0;

const renderNewQuote = async () =>{
    const response = await fetch(quoteApiUrl);
    let data = await response.json();

    quote = data.content;
    let arr = quote.split("").map((value) => {
        return "<span class='quote-chars'>" + value + "</span>";
    })
    quoteSection.innerHTML= arr.join("");
};

//logic for comaring words
userInput.addEventListener("input", () =>{
    let qouteChar = document.querySelectorAll(".quote-chars");

    qouteChar = Array.from(qouteChar);
    
    let userInputChar = userInput.value.split("");

    qouteChar.forEach((char, index) => {
        if(char.innerText == userInputChar[index]){
            char.classList.add("success");
        }
        else if(userInputChar[index] == null){

            if(char.classList.contains("success")){
                char.classList.remove("success");
            }
            else{
                char.classList.remove("fail");
            }
        }
        else{
            if(!char.classList.contains("fail")){
                mistakes += 1;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;

        }
        let check = qouteChar.every(element =>{
            return element.classList.contains("success");
        });
        if(check){
            displayResult();
        }
    })
    
});

function updateTimer(){
    if(time == 0){
        displayResult();
    }else{
        document.getElementById("timer").innerText = --time + "s";
    }
}

const timeReducer = ()=>{
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

const displayResult = ()=>{
    document.getElementById("marks").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    document.getElementById("start-test").style.display = "block";

    userInput.disabled = true;
    let timeTaken = 1;
    if(time != 0){
        timeTaken = (60- time)/100;
    }
    document.getElementById("result").innerText = (userInput.value.length /5/ timeTaken).toFixed(2) + "Wpm";
    document.getElementById("accr").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";
    console.log(math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%");
};

const startTest = ()=>{
    mistakes =0;
    timer = "";
    userInput.disabled = false;
    timeReducer();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
};


window.onload = ()=>{
    userInput.value = "";
    document.getElementById("marks").style.display = "none";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
};