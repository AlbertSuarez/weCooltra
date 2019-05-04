import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
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
            estadistica: undefined,
            dialogOpen: false,
            dialogTitle: '',
            dialogDescription: '',
            dialogImg: ''
        }
    }

    public render(): React.ReactElement<IMisEstadisticasProps> {
        return(
            <div className="misEstadisticas">
                {this.state.estadistica==undefined ? null : 
                    <div>

                        {this.props.user_id!=0 ?
                            <div className="misEstadisticasFlex">
                                <div className="misEstadisticasFlexText">{this.props.user_name}</div>
                            </div> : null}

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
                                <p>{this.state.estadistica.trips + " viajes"}</p>
                            </div>
                            <div className="stats-content">
                                <img className="iconNav" src={statsLogo}></img>
                                <p>{this.state.estadistica.average+" km/viaje"}</p>
                            </div>
                        </div>
                        <div className="degradado">
                            <div className="misEstadisticasLogros">
                                <div className="title-logros">LOGROS</div>  
                                <div className="misEstadisticasContentFlexLogros">
                                    {this.state.estadistica.logros.map((logro:string)=>{
                                        return (<img onClick={()=>this.openDialog(logro,logro,logro)} className="iconBadge" src={creditLogo}></img>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Dialog open={this.state.dialogOpen} onClose={()=>this.handleClose()}>
                    <DialogTitle>{this.state.dialogTitle}</DialogTitle>
                    <div className="misEstadisticasFlex">
                        <img className="iconBadge" src={this.state.dialogImg}></img>
                    </div>
                    <div className="descripcionTitle">Descripción</div>
                    <div className="descripcionContent">{this.state.dialogDescription}</div>
                </Dialog>
            </div>
        );
    }

    private handleClose(){
        this.setState({dialogOpen: false });
    };

    private openDialog(title:string, description:string, imgUrl: string){
        this.setState({dialogOpen:true, dialogTitle: title, dialogDescription: description, dialogImg:imgUrl});
    }

    public componentDidMount(){
        let service = new Service();
        service.retriveStatistics(this.props.user_id).then((estadisticas: IEstadisticaModel)=>{
            console.log("ESTADISTICAS",estadisticas);
            this.setState({estadistica:estadisticas});
        });
    }

}