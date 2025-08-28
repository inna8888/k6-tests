import http from "k6/http";

export class Pizza {
   createPizzaReceipt(token: string) {
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
       return response;
   }
}