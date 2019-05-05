import IService from "./IService";
import { string } from "prop-types";
import { IEstadisticaModel } from "../models/IEstadisticaModel";
import { IUserModel } from "../models/IUserModel";
import { ILogroModel } from "../models/ILogroModel";
import { IPersonaProps } from "office-ui-fabric-react/lib/Persona";

export default class Service implements IService {

    public retriveStatistics(user_id: number): Promise<IEstadisticaModel>{
        return new Promise<IEstadisticaModel>((resolve,reject)=>{

            let headers = new Headers();        

            fetch("http://api.wecooltra.ga/statistics?user_id="+user_id,{
                headers: headers,
                method: 'GET',
            })
            .then(response=>{
                response.json()
                .then(data=>{

                    let logros = new Array<ILogroModel>();
                    data.response.achievements.forEach((badge:any) => {
                        let logro: ILogroModel = {
                            id: badge.id,
                            title: badge.title,
                            description: badge.description,
                            puntos: badge.points
                        }
                        logros.push(logro);
                    });

                    let myStatistics: IEstadisticaModel = {
                        user_id: data.response.user.id,
                        kilometros: data.response.kilometers,
                        average: data.response.average,
                        trips: data.response.trips,
                        puntos: data.response.user.points,
                        logros: logros
                    }
    
                    resolve(myStatistics);
                });
            })
        });
    }

    public getAllAchivements(): Promise<Array<ILogroModel>> {
        return new Promise<Array<ILogroModel>>((resolve,reject)=>{
            let headers = new Headers();        

            fetch("http://api.wecooltra.ga/achievement",{
                headers: headers,
                method: 'GET',
            })
            .then(response=>{
                response.json()
                .then(data=>{

                    let logros = new Array<ILogroModel>();
                    data.response.forEach((badge:any) => {
                        let logro: ILogroModel = {
                            id: badge.id,
                            title: badge.title,
                            description: badge.description,
                            puntos: badge.points
                        }
                        logros.push(logro);
                    });

                    resolve(logros);
                });
            })
            .catch(error=>{
                reject(error);
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

    public searchUser(prefix_id: number): Promise<Array<IPersonaProps>>{
        return new Promise<Array<IPersonaProps>>((resolve,reject)=>{
            fetch("http://api.wecooltra.ga/user/search?prefix_user="+prefix_id,{
                method: 'GET',
            })
            .then(response=>{
                response.json()
                .then(data=>{
                    if(data.error){
                        reject(data.error.message);
                    }
                    else{

                        let arrayFriends = new Array<IPersonaProps>();

                        data.response.forEach((userResponse:any) => {
                            let user: IPersonaProps = {
                                secondaryText: userResponse.id,
                                primaryText: userResponse.full_name.replace(/\b\w/g, function(l:any){ return l.toUpperCase() }),
                                imageUrl: userResponse.image_url
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

    public createRelationship(my_user_id:number, your_user_id:string | undefined):Promise<string>{

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

    // private titleCase(stri:string):string {
    //     let str = stri.toLowerCase().split(' ');                // will split the string delimited by space into an array of words
   
    //     for(var i = 0; i < str.length; i++){               // str.length holds the number of occurrences of the array...
    //          let str[i] = str[i].split('');                    // splits the array occurrence into an array of letters
    //          let str[i][0] = str[i][0].toUpperCase();          // converts the first occurrence of the array to uppercase
    //          str[i] = str[i].join('');                     // converts the array of letters back into a word.
    //     }
    //     return str.join(' ');                              //  converts the array of words back to a sentence.
    // }
}