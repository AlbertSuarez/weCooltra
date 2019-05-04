import React from 'react';
import logo from '../../logo.svg';
import '../../style/style.scss';
import { IWeCooltraProps } from './IWeCooltraProps';
import { IWeCooltraState } from './IWeCooltraState';
import NavigationDrawer from '../navigationDrawer/NavigationDrawer';
import { tsExternalModuleReference } from '@babel/types';

export default class WeCooltra extends React.Component<IWeCooltraProps, IWeCooltraState> {

  constructor(props:IWeCooltraProps) {
    super(props);

    this.state = {
      navigationDrawerOpen: true,
      pageContent: "Main Page"
    }
  }

  public render(): React.ReactElement<IWeCooltraProps> {
    return (
      <div>
        <div>
          <div className="pageHeader">

          </div>
          <div className="pageContent">

          </div>
        </div>
        <NavigationDrawer 
          navigationDrawerOpen={this.state.navigationDrawerOpen}
          changePage={this.changePage}/>
      </div>
    );
  }

  public changePage(pageContent:string){
    this.setState({pageContent: pageContent})
  }


}