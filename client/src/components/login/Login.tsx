import React from 'react';
import { ILoginProps } from "./ILoginProps";
import { ILoginState } from "./ILoginState";
import { Card, CardHeader, CardContent, Button, TextField } from '@material-ui/core';
import Service from '../../services/Service';
import * as toastr from 'toastr';
import { IUserModel } from '../../models/IUserModel';

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props:ILoginProps){
        super(props);

        this.state = {
            user_id: ''
        }
    }

    public render(): React.ReactElement<ILoginProps> {
        return(
            <div className="login">
                <Card className="loginCard">
                    <CardHeader title="Login"/>
                    <CardContent>
                        <div>
                            <TextField
                                id="userId"
                                label="Escriba su User ID"
                                placeholder="Escriba su User ID"
                                margin="normal"
                                className="loginTextField"
                                type="number"
                                onChange={this.handleOnChange}
                                />  
                            <Button onClick={()=>this.loginUser()} variant="contained">
                                Submit
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    public handleOnChange = (event: any) => {
        this.setState({user_id: event.target.value});
    };

    public loginUser(){
        let service = new Service();
        service.getUser(+this.state.user_id)
        .then((user: IUserModel)=>{
            toastr.success("Autenticado correctamente");
            this.props.loginUser(user);
        })
        .catch((error:any)=>{
            alert("Este identificador no existe");
        })
    }
}