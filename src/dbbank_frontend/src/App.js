import { dbbank_backend } from '../../declarations/dbbank_backend'

  window.addEventListener("load", async function () {
  
    update()
})

document.querySelector("form").addEventListener("submit", async function (event) {
event.preventDefault();

const button = event.target.querySelector("#submit-btn");

const inputAmount = parseFloat(document.getElementById("input-amount").value);
const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

button.setAttribute("disabled", true);

if (document.getElementById("input-amount").value.length !=0) {
  await dbbank_backend.topUp(inputAmount);
}

if (document.getElementById("withdrawal-amount").value.length !=0){
  await dbbank_backend.withdrawl(outputAmount);
}

await dbbank_backend.compound(); 

update()

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");

});
 

async function update(){

const currentAmount = await dbbank_backend.checkBalance();
document.getElementById("value").innerText = Math.round(currentAmount * 100) /100;

}