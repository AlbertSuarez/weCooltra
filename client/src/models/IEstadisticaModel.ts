import { ILogroModel } from "../models/ILogroModel";

export interface IEstadisticaModel{
    user_id: number;
    kilometros: number;
    trips: number;
    average: number;
    puntos: number;
    logros: Array<ILogroModel>;
}