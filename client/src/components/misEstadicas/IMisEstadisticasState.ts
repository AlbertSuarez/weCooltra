import { IEstadisticaModel } from "../../models/IEstadisticaModel";

export interface IMisEstadisticasState {
    estadistica?: IEstadisticaModel;
    dialogOpen:  boolean;
    dialogTitle: string;
    dialogDescription: string;
    dialogImg: string;
}