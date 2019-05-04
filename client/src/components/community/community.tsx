import React from 'react';
import { ICommunityProps } from './ICommunityProps';
import { ICommunityState } from './ICommunityState';
import creditLogo from '../../assets/credit.svg';

export default class Community extends React.Component<ICommunityProps, ICommunityState> {

  constructor(props:ICommunityProps) {
    super(props);
  }

  public render(): React.ReactElement<ICommunityProps> {
    return (
      <div>
        <button className="myFriends" onClick={()=>this.selectOption("Lista de Amigos")}><img className="iconNav" src={creditLogo}/>Mis Amigos</button>
        <button className="createEvent" onClick={()=>this.selectOption("Crear Evento")}><img className="iconNav" src={creditLogo}/>Crear Evento</button>
      </div>
    );
  }

  private selectOption(text: string){
    this.props.changePage(text);
  }

}