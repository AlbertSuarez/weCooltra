import React from 'react';
import '../../style/style.scss';
import { IWeCooltraProps } from './IWeCooltraProps';
import { IWeCooltraState } from './IWeCooltraState';
import NavigationDrawer from '../navigationDrawer/NavigationDrawer';
import Map from '../map/Map';
import MisEstadisticas from '../misEstadicas/MisEstadisticas';

import menuLogo from '../../assets/menu.svg';
import backLogo from '../../assets/left-arrow.svg';
import Login from '../login/Login';
import { IUserModel } from '../../models/IUserModel';
import Community from '../community/community';
import FriendsList from '../friendsList/FriendsList';
import NewFriend from '../newFriend/newFriend';

export default class WeCooltra extends React.Component<IWeCooltraProps, IWeCooltraState> {

  constructor(props:IWeCooltraProps) {
    super(props);

    this.state = {
      navigationDrawerOpen: false,
      pageContent: "Login",
      user: undefined
    }
  }

  public render(): React.ReactElement<IWeCooltraProps> {
    return (
      <div>
        <div>
          <div className="pageHeader">
            {this.state.user!=undefined ?
              this.state.pageContent==="Main Page" ?

              <div onClick={()=>this.toogleDrower()} >
                <img className="iconNav iconMenu" src={menuLogo}></img>
              </div> :

              <div onClick={()=>this.goBack()} >
                <img className="iconNav iconMenu" src={backLogo}></img>
               
              </div> : null
            }
             <p className="subtitle">{this.state.pageContent}</p>
          </div>
          <div className="pageContent">
            {this.state.pageContent==="Login" ? <Login loginUser={this.loginUser.bind(this)} /> :
            this.state.pageContent==="Main Page" ? <Map/> :
            this.state.pageContent==="Pagos" ? null :
            this.state.pageContent==="Mis viajes pasados" ?  null :
            this.state.pageContent==="Mis estadísticas" ? <MisEstadisticas/> : 
            this.state.pageContent==="Comunidad" ? <Community changePage={this.changePage.bind(this)}/> : 
            this.state.pageContent==="Packs" ? null :
            this.state.pageContent==="Lista de Amigos" && this.state.user ? <FriendsList 
                                                                              changePage={this.changePage.bind(this)} 
                                                                              user_id={this.state.user.user_id}/> :
            this.state.pageContent==="Añadir Amigo" ? <NewFriend/> : null}
          </div>
        </div>
        {this.state.user!=undefined ?
          <NavigationDrawer 
            navigationDrawerOpen={this.state.navigationDrawerOpen}
            user={this.state.user}
            changePage={this.changePage.bind(this)}
            toogleDrower={this.toogleDrower.bind(this)}/> : null }
      </div>
    );
  }

  public changePage(pageContent:string){
    if(pageContent==='Log Out') this.setState({pageContent: 'Login', user: undefined});
    else if (pageContent==='Lista de Amigos' || pageContent==='Añadir Amigo') this.setState({pageContent: pageContent});
    else {
      this.setState({pageContent: pageContent});
      this.toogleDrower();
    }
  }

  public goBack(){
    if(this.state.pageContent==='Lista de Amigos') this.setState({pageContent: 'Comunidad'});
    else if(this.state.pageContent==='Añadir Amigo') this.setState({pageContent: 'Lista de Amigos'});
    else this.setState({pageContent: 'Main Page'})
  }

  public toogleDrower(){
    this.setState({navigationDrawerOpen: !this.state.navigationDrawerOpen});
  }

  public loginUser(user: IUserModel){
    this.setState({pageContent: "Main Page", user: user});
  }

}