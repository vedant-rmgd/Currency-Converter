let BASE_URL = "https://api.frankfurter.dev/v1/latest?";
//let BASE_URL = "https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");


// 1st STEP :- to populate select with currency codes.

for(let select of dropdowns) { // ->we selected the select element in which we want to add options of currency codes
    for(currCode in countryList){ // -> accessed the currency codes in countryList in order to create a new element(options) 
        let newOption = document.createElement("option"); //-> creared a new element (option) 
        newOption.innerText = currCode; // -> assigned the text of option element to currCode
        newOption.value = currCode; // -> also assigned the valuw of value to currCode
        if(select.name === "from" && currCode === "USD"){  // -> setting value of "from" to "USD" and "to" to "INR" at the beginning
            newOption.selected = "selected"
        } else if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption); // ->after creating the option element we appended it into select element
    };

    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    })
};

//3rd STEP :- writing logic of exchange of currency amount

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    };
    let URL = `${BASE_URL}base=${fromCurr.value}&symbols=${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rates = data.rates[toCurr.value]
    let finalAmt = rates * amtVal
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

//2nd STEP :- changing the flag

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newLink
};
 

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load" , () => {
    updateExchangeRate();
});