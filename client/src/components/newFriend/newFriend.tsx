import React from 'react';
import { INewFriendProps } from './INewFriendProps';
import { INewFriendState } from './INewFriendState';
import chicaScooter from '../../assets/chica-scooter.png';
import {Button, TextField } from '@material-ui/core';
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
      <div>
        <p className="newFriendText">Amplia tu comunidad de riders y comparte tus experiencias</p>
        <img className="newFriendImageScooter" src={chicaScooter}/>
        <div>
            <TextField
                id="friendId"
                // label="Escriba "
                placeholder="nombre de usuario"
                margin="normal"
                className="newFriendTextField"
                variant="outlined"
                onChange={this.handleOnChange}
                />  
            <Button className="addFriendButton" onClick={()=>this.addFriend()} variant="contained">
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
      alert(response);
    })
    .catch((error:any)=>{
      alert("Este identificador no existe");
    })
  }

}