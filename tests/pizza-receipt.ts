import http from "k6/http";

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
export default function () {
const response = http.post("https://quickpizza.grafana.com/api/pizza", 
   JSON.stringify({
      maxCaloriesPerSlice: 1000,
      mustBeVegetarian: false,
      excludedIngredients: [],
      excludedTools: [],
      maxNumberOfToppings: 5,
      minNumberOfToppings: 2,
      customName: "",
    }),
    {
      headers: {
        accept: "*/*",
        "accept-language": "uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7",
        authorization: "Token abcdef0123456789"
      }
   }
 );

 check(response, {
   "Status-code": (response) => response.status === 200,
   'Response-duration': (response) => response.timings.duration < 300,
 });
}