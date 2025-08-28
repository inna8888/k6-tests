import { check } from "k6";
import http from "k6/http";
import { Options } from "k6/http";
import { Users } from "../controllers/users/users.ts";
import { Pizza } from "../controllers/users/pizza.ts";

//npm run k6:test

// vus (virtual users) — кількість одночасних "віртуальних користувачів", які імітують навантаження на систему.
// duration — тривалість тесту
// iterations — загальна кількість ітерацій (запитів), які буде виконано під час тесту.

function totallyRandomNumber() {
  let randomNumber = (Math.random() * 1000) / 10 +Math.random() * 1000 * 1000;
  return Math.floor(randomNumber);
} 

// Налаштування тесту: 2 віртуальних користувача, тривалість 5 секунд
export const options: Options = {
   vus: 1,
   duration: "2s",
   //iterations: 10,
};

export function setup() {
  const users = new Users();
  const token = users.getToken();
  return { token };
};


//Copy next to the request in Network > Copy as fetch (Node.js)
/*fetch("https://quickpizza.grafana.com/api/pizza", {
  "headers": {
    "accept": "*",
    "accept-language": "uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7",
    "authorization": "Token I0QNCSLdmbgL5WVj",
    "content-type": "application/json",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    
  },
  "body": "{\"maxCaloriesPerSlice\":1000,\"mustBeVegetarian\":false,\"excludedIngredients\":[],\"excludedTools\":[],\"maxNumberOfToppings\":5,\"minNumberOfToppings\":2,\"customName\":\"\"}",
  "method": "POST"
});*/
//синтаксис export default function () {} обовязковий
export default function ({ token }) {
  const pizza = new Pizza();
const response = pizza.createPizzaReceipt(token);

 check(response, {
   "Status-code": (response) => response.status === 200,
   'Response-duration': (response) => response.timings.duration < 400,
 });
}

export function teardown({token}) {
  console.log(`This is my token: ${token}`);
}