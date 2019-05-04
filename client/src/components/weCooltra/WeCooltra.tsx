import React from 'react';
import '../../style/style.scss';
import { IWeCooltraProps } from './IWeCooltraProps';
import { IWeCooltraState } from './IWeCooltraState';
import NavigationDrawer from '../navigationDrawer/NavigationDrawer';
import Map from '../map/Map';
import MisEstadisticas from '../misEstadicas/MisEstadisticas';

import menuLogo from '../../assets/menu.svg';
import Login from '../login/Login';
import { IUserModel } from '../../models/IUserModel';

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
              <div onClick={()=>this.toogleDrower()} >
                <img className="iconNav iconMenu" src={menuLogo}></img>
              </div> : null
            }
          </div>
          <div className="pageContent">
            {this.state.pageContent==="Login" ? <Login loginUser={this.loginUser.bind(this)} /> :
            this.state.pageContent==="Main Page" ? <Map/> :
            this.state.pageContent==="Pagos" ? null :
            this.state.pageContent==="Mis viajes pasados" ?  null :
            this.state.pageContent==="Mis estadísticas" ? <MisEstadisticas/> : 
            this.state.pageContent==="Riders" ? null : 
            this.state.pageContent==="Packs" ? null :
            this.state.pageContent==="Invitar Amigos" ? null : null}
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
    else this.setState({pageContent: pageContent})
  }

  public toogleDrower(){
    this.setState({navigationDrawerOpen: !this.state.navigationDrawerOpen});
  }

  public loginUser(user: IUserModel){
    this.setState({pageContent: "Main Page", user: user});
  }

}