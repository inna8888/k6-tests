import http from "k6/http";
import { check } from "k6";
import { Options } from "k6/http";

export const options: Options = {
   vus: 2,
   duration: "2s",
}


//https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-UpdateBooking
//get token
export default function () {
   const response = http.post("https://restful-booker.herokuapp.com/auth", 
   JSON.stringify({
         username: "admin",
         password: "password123"
      }),
      {
         headers: {
            "Content-Type": "application/json"
         }
      }
   );

   const token: any = response.json()!["token"];
   console.log("Token: " + token);
   //create booking

   const createBookingResponse = http.post("https://restful-booker.herokuapp.com/booking", 
   JSON.stringify({
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
          checkin: "2026-01-01",
          checkout: "2026-01-02"
      },
      additionalneeds: "Breakfast"
   }),
   {
      headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
         "Cookie": `token=${token}`
      }
   }
   
   );

   const bookingId: any = createBookingResponse.json()!["bookingid"];
   console.log("Create booking response: " + JSON.stringify(createBookingResponse.json()));
   console.log("Booking ID: " + bookingId);

   check(createBookingResponse, {
      "Status 200": (response) => response.status === 200,
   });
   
   //update booking
   const updateBookingResponse = http.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, 
      JSON.stringify({
         firstname: "James",
         lastname: "Brown",
         totalprice: 111,
         depositpaid: true,
         bookingdates: {
             checkin: "2026-01-01",
             checkout: "2026-01-02"
         },
         additionalneeds: "Breakfast"
      }),
      {
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${token}`
         }
      }
   )
   console.log("Updated booking response: " + JSON.stringify(updateBookingResponse.json()));

   check(createBookingResponse, {
      "Status 200": (response) => response.status === 200,
   });

//delete booking
   const deleteBookingResposnse = http.del(`https://restful-booker.herokuapp.com/booking/${bookingId}`,
     undefined,
         {
            headers: {
               "Content-Type": "application/json",
               "Accept": "application/json",
               "Cookie": `token=${token}`
            }
         }
      );

      check(createBookingResponse, {
      "Status 200": (response) => response.status === 200,
      });

}

