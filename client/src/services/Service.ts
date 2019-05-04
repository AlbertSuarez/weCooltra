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

    public getUser(user_id: string): Promise<IUserModel>{
        return new Promise<IUserModel>((resolve,reject)=>{
            fetch("http://api.wecooltra.ga/user?user_id="+user_id,{
                method: 'GET',
            })
            .then(response=>{
                response.json()
                .then(data=>{
                    let user: IUserModel = {
                        user_id: data.response.id,
                        fullName: data.response.full_name,
                        image_url: data.response.image_url,
                        points: data.response.points
                    }
                    resolve(user);
                })
            })
            .catch(error=>{
                reject(error);
            })
        });
    }
}