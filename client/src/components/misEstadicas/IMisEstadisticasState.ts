import { IEstadisticaModel } from "../../models/IEstadisticaModel";
import { ILogroModel } from "../../models/ILogroModel";

export interface IMisEstadisticasState {
    estadistica?: IEstadisticaModel;
    dialogOpen:  boolean;
    dialogTitle: string;
    dialogDescription: string;
    dialogImg: number;
    dialogPuntos: number;
    logros: Array<ILogroModel>;
    isWhite: boolean;
    mylogros: Array<number>;
}