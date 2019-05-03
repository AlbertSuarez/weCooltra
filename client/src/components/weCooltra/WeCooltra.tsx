import React from 'react';
import logo from '../../logo.svg';
import '../../style/style.css';
import { IWeCooltraProps } from './IWeCooltraProps';
import { IWeCooltraState } from './IWeCooltraState';
import NavigationDrawer from '../navigationDrawer/NavigationDrawer';

export default class WeCooltra extends React.Component<IWeCooltraProps, IWeCooltraState> {

  constructor(props:IWeCooltraProps) {
    super(props);
  }

  public render(): React.ReactElement<IWeCooltraProps> {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <NavigationDrawer/>
        </header>
      </div>
    );
  }
}