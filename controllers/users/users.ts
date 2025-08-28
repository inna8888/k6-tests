
import http from "k6/http";

export class Users {
   
   getToken() {
      const response = http.post("https://quickpizza.grafana.com/api/users/token/login?set_cookie=true", 
        JSON.stringify({
          username: "default",
          password: "12345678",
        })
        );
      
        const json: any = response.json();
        const token = json.token;
        return token;
   }
}