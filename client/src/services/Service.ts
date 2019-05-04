import IService from "./IService";
import { string } from "prop-types";
import { IEstadisticaModel } from "../models/IEstadisticaModel";
import { IUserModel } from "../models/IUserModel";

export default class Service implements IService {

    public retriveStatistics(user_id: number): Promise<IEstadisticaModel>{
        return new Promise<IEstadisticaModel>((resolve,reject)=>{

            let headers = new Headers();        

            fetch("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=e2b9357594875a9a24508547112f381c",{
                headers: headers,
                method: 'GET',
            })
            .then(response=>{

                let logros = new Array<string>();
                logros.push("Barcelona Expert");
                logros.push("Madrid Expert");
                logros.push("A Favor de la Comunidad");

                let myStatistics: IEstadisticaModel = {
                    user_id: 100343,
                    kilometros: 5027,
                    puntos: 250,
                    logros: logros
                }

                resolve(myStatistics);

                // response.json()
                // .then((data)=>{
                //     resolve(data.base);  
                // })
            })
        });
    }

    public getUser(user_id: number): Promise<IUserModel>{
        return new Promise<IUserModel>((resolve,reject)=>{
            fetch("http://api.wecooltra.ga/user?user_id="+user_id,{
                method: 'GET',
            })
            .then(response=>{
                response.json()
                .then(data=>{
                    console.log("DATA",data);
                    if(data.error){
                        reject(data.error.message);
                    }
                    else{
                        let user: IUserModel = {
                            user_id: data.response.id,
                            fullName: data.response.full_name,
                            image_url: data.response.image_url,
                            points: data.response.points,
                            balance: data.response.balance
                        }
                        resolve(user);   
                    }
                })
            })
            .catch(error=>{
                reject(error);
            })
        });
    }

    public getFriends(user_id: number): Promise<Array<IUserModel>>{
        return new Promise<Array<IUserModel>>((resolve,reject)=>{
            fetch("http://api.wecooltra.ga/friend?user_id="+user_id,{
                method: 'GET',
            })
            .then(response=>{
                response.json()
                .then(data=>{
                    if(data.error){
                        reject(data.error.message);
                    }
                    else{

                        let arrayFriends = new Array<IUserModel>();

                        data.response.forEach((userResponse:any) => {
                            let user: IUserModel = {
                                user_id: userResponse.id,
                                fullName: userResponse.full_name,
                                image_url: userResponse.image_url,
                                points: userResponse.points,
                                balance: userResponse.balance
                            } 

                            arrayFriends.push(user);
                        });

                        resolve(arrayFriends);   
                    }
                })
            })
            .catch(error=>{
                reject(error);
            })
        });
    }

    public createRelationship(my_user_id:number, your_user_id:number):Promise<string>{

        console.log("data",my_user_id,your_user_id);
        return new Promise<string>((resolve,reject)=>{

            let body = {
                "user_one": my_user_id,
                "user_two": your_user_id
            };

            let jsonBody = JSON.stringify(body);

            console.log("JSON BODY", jsonBody);
            fetch("http://api.wecooltra.ga/friend",{
                method: 'POST',
                body:jsonBody,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            })
            .then(response=>{
                response.json()
                .then(data=>{
                    console.log(data);
                    if(data.error){
                        reject(data.error.message);
                    }
                    else {
                        resolve(data.response);
                    }
                });
            })
            .catch(error=>{
                reject(error);
            })
        })
    }
}