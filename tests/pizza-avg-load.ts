import { check } from "k6";
import http from "k6/http";
import { Options } from "k6/http";
import { Users } from "../controllers/users/users.ts";
import { Pizza } from "../controllers/users/pizza.ts";

//npm run k6:test

//k6 run file-name
//k6 cloud file-name - to run tests in the cloud


export const options: Options = {

   cloud: {
    projectID: 4100611,
    name: 'get pizza receipt',
    distribution: {
      'amazon:de:frankfurt': { loadZone: 'amazon:de:frankfurt', percent: 100 },
    },
    stages: [
      { duration: '2m', target: 100 }, // ramp up to 100 users
      { duration: '5m', target: 100 }, // stay at 100 users for 5 minutes
      { duration: '2m', target: 0 }, // ramp down to 0 users
    ] //for avarage-load testing
  },

   vus: 2,
   duration: "5s",
   //iterations: 10,
};

export function setup() {
  const users = new Users();
  const token = users.getToken();
  return { token };
};

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