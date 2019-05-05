import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import { IMisEstadisticasProps } from './IMisEstadisticasProps';
import { IMisEstadisticasState } from './IMisEstadisticasState';
import { IEstadisticaModel } from "../../models/IEstadisticaModel";
import { ILogroModel } from "../../models/ILogroModel";
import Service from '../../services/Service';

//ICONS
import creditLogo from '../../assets/credit.svg';
import motoEcooltra from '../../assets/askoll.png';
import abacusLogo from '../../assets/abacus.svg';
import statsLogo from '../../assets/computer.svg';

//ICONS LOGROS
import icon7 from '../../assets/ciudades/7.png';
import icon8 from '../../assets/ciudades/8.png';
import icon9 from '../../assets/ciudades/9.png';
import icon10 from '../../assets/ciudades/10.png';
import icon11 from '../../assets/ciudades/11.png';
import icon12 from '../../assets/ciudades/12.png';

//ICONS LOGROS WHITE
import icon7white from '../../assets/bad_cuidades/7.png';
import icon8white from '../../assets/bad_cuidades/8.png';
import icon9white from '../../assets/bad_cuidades/9.png';
import icon10white from '../../assets/bad_cuidades/10.png';
import icon11white from '../../assets/bad_cuidades/11.png';
import icon12white from '../../assets/bad_cuidades/12.png';

export default class MisEstadisticas extends React.Component<IMisEstadisticasProps, IMisEstadisticasState> {

    constructor(props:IMisEstadisticasProps) {
        super(props);

        this.state = {
            estadistica: undefined,
            dialogOpen: false,
            dialogTitle: '',
            dialogDescription: '',
            dialogImg: 0,
            dialogPuntos: 0,
            logros: new Array<ILogroModel>(),
            isWhite: false,
            mylogros: new Array<number>()
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
                                    {this.state.estadistica.logros.map((logro:ILogroModel)=>{
                                        return (
                                            <div onClick={()=>this.openDialog(logro.title,logro.description,logro.id,logro.puntos,false)}>
                                                {this.renderlogo(logro.id, false)}
                                            </div>
                                        )
                                    })}
                                    {this.props.user_name=="" ?
                                        this.state.logros.map((logro: ILogroModel)=>{
                                            if(this.state.estadistica && this.state.mylogros.indexOf(logro.id)==-1){
                                                console.log("HELOO AMIGO",logro);
                                                return(
                                                    <div onClick={()=>this.openDialog(logro.title,logro.description,logro.id,logro.puntos,true)}>
                                                        {this.renderlogo(logro.id, true)}
                                                    </div>
                                                );
                                            }
                                        }) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Dialog open={this.state.dialogOpen} onClose={()=>this.handleClose()}>
                    <DialogTitle>{this.state.dialogTitle}</DialogTitle>
                    <div className="misEstadisticasFlex">
                        {this.renderlogo(this.state.dialogImg, this.state.isWhite)}
                    </div>
                    <div className="descripcionTitle">Puntos</div>
                    <div className="descripcionContent">{this.state.dialogPuntos}</div>
                    <div className="descripcionTitle">Descripción</div>
                    <div className="descripcionContent">{this.state.dialogDescription}</div>
                </Dialog>
            </div>
        );
    }

    public renderlogo(idLogro: number, white: boolean){
        if(white){
            if(idLogro==1) return (<img className="iconBadge" src={icon8}></img>);
            else if(idLogro==7) return (<img className="iconBadge" src={icon7white}></img>);
            else return (<img className="iconBadge" src={icon8white}></img>);
        }
        else{
            if(idLogro==1) return (<img className="iconBadge" src={icon8}></img>);
            else if(idLogro==7) return (<img className="iconBadge" src={icon7}></img>);
            else return (<img className="iconBadge" src={icon8}></img>);
        }
    }

    private handleClose(){
        this.setState({dialogOpen: false });
    };

    private openDialog(title:string, description:string, id: number,puntos: number, white: boolean){
        this.setState({dialogOpen:true, dialogTitle: title, dialogDescription: description, dialogImg:id, dialogPuntos: puntos, isWhite:white});
    }

    public componentDidMount(){
        let service = new Service();
        service.retriveStatistics(this.props.user_id).then((estadisticas: IEstadisticaModel)=>{
            service.getAllAchivements().then((logros:Array<ILogroModel>)=>{
                let arrayLogros = new Array<number>();
                estadisticas.logros.forEach((logro:ILogroModel) => {
                    arrayLogros.push(logro.id);
                });
                this.setState({estadistica:estadisticas, logros:logros, mylogros: arrayLogros});
            });
        });
    }

}