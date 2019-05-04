import React from 'react';
import { IMisEstadisticasProps } from './IMisEstadisticasProps';
import { IMisEstadisticasState } from './IMisEstadisticasState';
import { IEstadisticaModel } from "../../models/IEstadisticaModel";
import Service from '../../services/Service';
//ICONS
import creditLogo from '../../assets/credit.svg';
import motoEcooltra from '../../assets/askoll.png';
import abacusLogo from '../../assets/abacus.svg';
import statsLogo from '../../assets/computer.svg';


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

                        <div className="header">
                            <p>Utilizando eCooltra tienes acumulado:</p>
                            <div className="puntos-container">
                                <p className="puntos">{this.state.estadistica.puntos + " puntos"}</p>
                            </div>
                        </div>
                        <div className="scooter-img">
                            <img src={motoEcooltra}></img>
                        </div>
                        <div className="kilometers">
                            <div className="eclipse-km">
                                <p className="numbers-km">{this.state.estadistica.kilometros}</p>
                                <p className="text-km">kilómetros</p>
                            </div>
                        </div>

                        <div className="stats">
                            <div className="stats-content">
                            <img className="iconNav" src={abacusLogo}></img>
                                <p>45 viajes</p>
                            </div>
                            <div className="stats-content">
                                <img className="iconNav" src={statsLogo}></img>
                                <p>5km/viaje</p>
                            </div>
                        </div>
                        <div className="misEstadisticasContent">
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
                        {/* <div>{this.state.estadistica.logros}</div> */}
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