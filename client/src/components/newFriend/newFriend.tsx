import React from 'react';
import { INewFriendProps } from './INewFriendProps';
import { INewFriendState } from './INewFriendState';
import chicaScooter from '../../assets/chica-scooter.png';
import {Button, TextField } from '@material-ui/core';
import * as toastr from 'toastr';
import Service from '../../services/Service';

export default class NewFriend extends React.Component<INewFriendProps, INewFriendState> {

  constructor(props:INewFriendProps) {
    super(props);

    this.state = {
      your_user_id: ''
    }

  }

  public render(): React.ReactElement<INewFriendProps> {
    return (
      <div className="addFriend">
        <p className="description">Amplia tu comunidad de riders y comparte tus experiencias</p>
        <img className="image-scooter" src={chicaScooter}/>
        <div className="add-name">
            <TextField
                id="friendId"
                // label="Escriba "
                placeholder="nombre de usuario"
                margin="normal"
                className="name-textfield"
                variant="outlined"
                onChange={this.handleOnChange}
                />  
            <Button onClick={()=>this.addFriend()} variant="contained">
                Submit
            </Button>
        </div>
      </div>
    );
  }

  public handleOnChange = (event: any) => {
    this.setState({your_user_id:event.target.value});
  };

  public addFriend(){
    let service = new Service();
    service.createRelationship(this.props.user_id, +this.state.your_user_id)
    .then((response: string)=>{
      if (response==="OK") toastr.success("Tienes un/a nuev@ amig@!");
      else toastr.success("Ya eres amig@ de est@ usuari@!");
    })
    .catch((error:any)=>{
      toastr.error("El usuario introducido no existe... :(");
    })
  }

}