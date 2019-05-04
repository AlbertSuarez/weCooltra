import React from 'react';
import { IMisEstadisticasProps } from './IMisEstadisticasProps';
import { IMisEstadisticasState } from './IMisEstadisticasState';
import Service from '../../services/Service';


export default class MisEstadisticas extends React.Component<IMisEstadisticasProps, IMisEstadisticasState> {

    constructor(props:IMisEstadisticasProps) {
        super(props);

        this.state = {
            demo: 'undefined'
        }
    }

    public render(): React.ReactElement<IMisEstadisticasProps> {
        return(
            <div>{this.state.demo}</div>
        );
    }

    public componentDidMount(){
        let service = new Service();
        service.retriveStatistics(1).then((text: string)=>{
            this.setState({demo:text});
        });
    }

}