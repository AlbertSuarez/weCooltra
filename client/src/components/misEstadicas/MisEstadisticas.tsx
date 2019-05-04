import React from 'react';
import { IMisEstadisticasProps } from './IMisEstadisticasProps';
import { IMisEstadisticasState } from './IMisEstadisticasState';
import { IEstadisticaModel } from "../../models/IEstadisticaModel";
import Service from '../../services/Service';
//ICONS
import creditLogo from '../../assets/credit.svg';


export default class MisEstadisticas extends React.Component<IMisEstadisticasProps, IMisEstadisticasState> {

    constructor(props:IMisEstadisticasProps) {
        super(props);

        this.state = {
            estadistica: undefined
        }
    }

    public render(): React.ReactElement<IMisEstadisticasProps> {
        return(
            <div className="misEstadisticas">
                {this.state.estadistica==undefined ? null : 
                    <div>
                        <div className="misEstadisticasHeader">
                            <ellipse className="misEstadisticasHeaderElipse"></ellipse>
                            <div className="misEstadisticasHeaderKilometersNumber">{this.state.estadistica.kilometros}</div>
                            <div className="misEstadisticasHeaderKilometersText">kilometros</div>
                            <image className="misEstadisticasImageScooter"/>
                        </div>
                        <div className="misEstadisticasContent">
                            <div className="misEstadisticasContentFlex">
                                <div className="misEstadisticasContentPuntosContainer">
                                    <div className="misEstadisticasContentPuntos">{this.state.estadistica.puntos + " puntos"}</div>
                                </div>
                            </div>
                            <div className="misEstadisticasLogros">
                                <div className="misEstadisticasContentFlex">
                                    <div className="misEstadisticasLogrosTitle">LOGROS</div>  
                                </div>
                                <div className="misEstadisticasContentFlexLogros">
                                    {this.state.estadistica.logros.map((logro:string)=>{
                                        return (<img className="iconBadge" src={creditLogo}></img>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }

    public componentDidMount(){
        let service = new Service();
        service.retriveStatistics(1).then((text: IEstadisticaModel)=>{
            this.setState({estadistica:text});
        });
    }

}