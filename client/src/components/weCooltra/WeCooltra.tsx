import React from 'react';
import '../../style/style.scss';
import { IWeCooltraProps } from './IWeCooltraProps';
import { IWeCooltraState } from './IWeCooltraState';
import NavigationDrawer from '../navigationDrawer/NavigationDrawer';

export default class WeCooltra extends React.Component<IWeCooltraProps, IWeCooltraState> {

  constructor(props:IWeCooltraProps) {
    super(props);

    this.state = {
      navigationDrawerOpen: false,
      pageContent: "Main Page"
    }
  }

  public render(): React.ReactElement<IWeCooltraProps> {
    return (
      <div>
        <div>
          <div className="pageHeader">
            <div onClick={()=>this.toogleDrower()} className="iconMenu"></div>
          </div>
          <div className="pageContent">
          {this.state.pageContent==="Main Page" ? null :
           this.state.pageContent==="Pagos" ? null :
           this.state.pageContent==="Mis viajes pasados" ?  null :
           this.state.pageContent==="Mis estadísticas" ? null : 
           this.state.pageContent==="Riders" ? null : 
           this.state.pageContent==="Packs" ? null :
           this.state.pageContent==="Invitar Amigos" ? null : null}

          </div>
        </div>
        <NavigationDrawer 
          navigationDrawerOpen={this.state.navigationDrawerOpen}
          changePage={this.changePage.bind(this)}
          toogleDrower={this.toogleDrower.bind(this)}/>
      </div>
    );
  }

  public changePage(pageContent:string){
    this.setState({pageContent: pageContent})
  }

  public toogleDrower(){
    console.log("toogle 2");
    this.setState({navigationDrawerOpen: !this.state.navigationDrawerOpen});
  }


}