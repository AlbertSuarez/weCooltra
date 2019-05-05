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
import icon1 from '../../assets/ciudades/1.png';
import icon2 from '../../assets/ciudades/2.png';
import icon3 from '../../assets/ciudades/3.png';
import icon4 from '../../assets/ciudades/4.png';
import icon5 from '../../assets/ciudades/5.png';
import icon6 from '../../assets/ciudades/6.png';
import icon7 from '../../assets/ciudades/7.png';
import icon8 from '../../assets/ciudades/8.png';
import icon9 from '../../assets/ciudades/9.png';
import icon10 from '../../assets/ciudades/10.png';
import icon11 from '../../assets/ciudades/11.png';
import icon12 from '../../assets/ciudades/12.png';
import icon13 from '../../assets/ciudades/13.png';
import icon14 from '../../assets/ciudades/14.png';
import icon15 from '../../assets/ciudades/15.png';
import icon16 from '../../assets/ciudades/16.png';
import icon17 from '../../assets/ciudades/17.png';
import icon18 from '../../assets/ciudades/18.png';
import icon19 from '../../assets/ciudades/19.png';
import icon20 from '../../assets/ciudades/20.png';
import icon21 from '../../assets/ciudades/21.png';
import icon22 from '../../assets/ciudades/22.png';

//ICONS LOGROS WHITE

import icon1white from '../../assets/bad_cuidades/1.png';
import icon2white from '../../assets/bad_cuidades/2.png';
import icon3white from '../../assets/bad_cuidades/3.png';
import icon4white from '../../assets/bad_cuidades/4.png';
import icon5white from '../../assets/bad_cuidades/5.png';
import icon6white from '../../assets/bad_cuidades/6.png';
import icon7white from '../../assets/bad_cuidades/7.png';
import icon8white from '../../assets/bad_cuidades/8.png';
import icon9white from '../../assets/bad_cuidades/9.png';
import icon10white from '../../assets/bad_cuidades/10.png';
import icon11white from '../../assets/bad_cuidades/11.png';
import icon12white from '../../assets/bad_cuidades/12.png';
import icon13white from '../../assets/bad_cuidades/13.png';
import icon14white from '../../assets/bad_cuidades/14.png';
import icon15white from '../../assets/bad_cuidades/15.png';
import icon16white from '../../assets/bad_cuidades/16.png';
import icon17white from '../../assets/bad_cuidades/17.png';
import icon18white from '../../assets/bad_cuidades/18.png';
import icon19white from '../../assets/bad_cuidades/19.png';
import icon20white from '../../assets/bad_cuidades/20.png';
import icon21white from '../../assets/bad_cuidades/21.png';
import icon22white from '../../assets/bad_cuidades/22.png';

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
                                                    <div className="opacity" onClick={()=>this.openDialog(logro.title,logro.description,logro.id,logro.puntos,true)}>
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
            if(idLogro==1) return (<img className="iconBadge" src={icon1white}></img>);
            else if(idLogro==2) return (<img className="iconBadge" src={icon2white}></img>);
            else if(idLogro==3) return (<img className="iconBadge" src={icon3white}></img>);
            else if(idLogro==4) return (<img className="iconBadge" src={icon4white}></img>);
            else if(idLogro==5) return (<img className="iconBadge" src={icon5white}></img>);
            else if(idLogro==6) return (<img className="iconBadge" src={icon6white}></img>);
            else if(idLogro==7) return (<img className="iconBadge" src={icon7white}></img>);
            else if(idLogro==8) return (<img className="iconBadge" src={icon8white}></img>);
            else if(idLogro==9) return (<img className="iconBadge" src={icon9white}></img>);
            else if(idLogro==10) return (<img className="iconBadge" src={icon10white}></img>);
            else if(idLogro==11) return (<img className="iconBadge" src={icon11white}></img>);
            else if(idLogro==12) return (<img className="iconBadge" src={icon12white}></img>);
            else if(idLogro==13) return (<img className="iconBadge" src={icon13white}></img>);
            else if(idLogro==14) return (<img className="iconBadge" src={icon14white}></img>);
            else if(idLogro==15) return (<img className="iconBadge" src={icon15white}></img>);
            else if(idLogro==16) return (<img className="iconBadge" src={icon16white}></img>);
            else if(idLogro==17) return (<img className="iconBadge" src={icon17white}></img>);
            else if(idLogro==18) return (<img className="iconBadge" src={icon18white}></img>);
            else if(idLogro==19) return (<img className="iconBadge" src={icon19white}></img>);
            else if(idLogro==20) return (<img className="iconBadge" src={icon20white}></img>);
            else if(idLogro==21) return (<img className="iconBadge" src={icon21white}></img>);
            else if(idLogro==22) return (<img className="iconBadge" src={icon22white}></img>);
        }
        else{
            if(idLogro==1) return (<img className="iconBadge" src={icon1}></img>);
            else if(idLogro==2) return (<img className="iconBadge" src={icon2}></img>);
            else if(idLogro==3) return (<img className="iconBadge" src={icon3}></img>);
            else if(idLogro==4) return (<img className="iconBadge" src={icon4}></img>);
            else if(idLogro==5) return (<img className="iconBadge" src={icon5}></img>);
            else if(idLogro==6) return (<img className="iconBadge" src={icon6}></img>);
            else if(idLogro==7) return (<img className="iconBadge" src={icon7}></img>);
            else if(idLogro==8) return (<img className="iconBadge" src={icon8}></img>);
            else if(idLogro==9) return (<img className="iconBadge" src={icon9}></img>);
            else if(idLogro==10) return (<img className="iconBadge" src={icon10}></img>);
            else if(idLogro==11) return (<img className="iconBadge" src={icon11}></img>);
            else if(idLogro==12) return (<img className="iconBadge" src={icon12}></img>);
            else if(idLogro==13) return (<img className="iconBadge" src={icon13}></img>);
            else if(idLogro==14) return (<img className="iconBadge" src={icon14}></img>);
            else if(idLogro==15) return (<img className="iconBadge" src={icon15}></img>);
            else if(idLogro==16) return (<img className="iconBadge" src={icon16}></img>);
            else if(idLogro==17) return (<img className="iconBadge" src={icon17}></img>);
            else if(idLogro==18) return (<img className="iconBadge" src={icon18}></img>);
            else if(idLogro==19) return (<img className="iconBadge" src={icon19}></img>);
            else if(idLogro==20) return (<img className="iconBadge" src={icon20}></img>);
            else if(idLogro==21) return (<img className="iconBadge" src={icon21}></img>);
            else if(idLogro==22) return (<img className="iconBadge" src={icon22}></img>);
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