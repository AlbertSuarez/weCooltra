import React from 'react';
import { INewFriendProps } from './INewFriendProps';
import { INewFriendState } from './INewFriendState';
import chicaScooter from '../../assets/chica-scooter.png';
import {Button, TextField } from '@material-ui/core';
import * as toastr from 'toastr';
import { NormalPeoplePicker } from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaProps } from "office-ui-fabric-react/lib/Persona";
import { Label } from 'office-ui-fabric-react/lib/Label';
import Service from '../../services/Service';

export default class NewFriend extends React.Component<INewFriendProps, INewFriendState> {

  constructor(props:INewFriendProps) {
    super(props);

    this.state = {
      your_user_id: '',
      selectedPersona: new Array<IPersonaProps>()
    }

  }

  public render(): React.ReactElement<INewFriendProps> {
    return (
      <div className="addFriend">
        <p className="description">Amplia tu comunidad de riders y comparte tus experiencias</p>
        <img className="image-scooter" src={chicaScooter}/>
        <div className="add-name">
            <Label>Introduzca el identificador del usuario:</Label>
            <NormalPeoplePicker
              onResolveSuggestions={this.onFilterChanged.bind(this)}
              onChange={this.onItemChange.bind(this)}
              selectedItems={this.state.selectedPersona}
              className="name-textfield"/>
            {/* <TextField
                id="friendId"
                // label="Escriba "
                placeholder="nombre de usuario"
                margin="normal"
                className="name-textfield"
                variant="outlined"
                onChange={this.handleOnChange}
                />   */}
            <Button onClick={()=>this.addFriend()} variant="contained">
                Submit
            </Button>
        </div>
      </div>
    );
  }

  private onItemChange = (items: Array<IPersonaProps> | undefined): void => {
    if(items!=undefined && ((this.state.selectedPersona.length==0 &&  items.length==1) || (items.length==0 && this.state.selectedPersona.length==1))) this.setState({selectedPersona: items});
  }

  private onFilterChanged = (filterText: string, selectedItems: IPersonaProps[] | undefined): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText && filterText.length>=3) {
        let reg = /^\d+$/;
        if(reg.test(filterText)){
          let service = new Service();
          return service.searchUser(+filterText);
        }
        else return [];
    }
    else return [];
  }

  public handleOnChange = (event: any) => {
    this.setState({your_user_id:event.target.value});
  };

  public addFriend(){
    let service = new Service();
    if(this.state.selectedPersona && this.state.selectedPersona.length==1){
      service.createRelationship(this.props.user_id, this.state.selectedPersona[0].secondaryText)
      .then((response: string)=>{
        if (response==="OK") toastr.success("Tienes un/a nuev@ amig@!");
        else toastr.success("Ya eres amig@ de est@ usuari@!");
      })
      .catch((error:any)=>{
        toastr.error("El usuario introducido no existe... :(");
      })
    }
  }

}