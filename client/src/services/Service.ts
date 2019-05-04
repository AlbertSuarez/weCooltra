import IService from "./IService";
import { string } from "prop-types";

export default class Service implements IService {

    public retriveStatistics(user_id: number): Promise<string>{
        return new Promise<string>((resolve,reject)=>{

            let headers = new Headers();

            // headers.append('Content-Type', 'application/json');
            // headers.append('Accept', 'application/json');
          
            // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
            // headers.append('Access-Control-Allow-Credentials', 'true');
            // headers.append("Authorization", "Bearer 1aac8517b0e4325e0aa58c6f3292bfd55f36af4fe29939940906639d1dc12572");          

            fetch("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=e2b9357594875a9a24508547112f381c",{
                headers: headers,

            })
            .then(response=>{
                response.json()
                .then((data)=>{
                    resolve(data.base);  
                })
            })
        });
    }
}