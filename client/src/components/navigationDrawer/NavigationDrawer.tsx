import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { List } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { INavigationDrawerState } from './INavigationDrawerState';
import { INavigationDrawerProps } from './INavigationDrawerProps';


// INCONS

import creditLogo from '../../assets/credit.svg';
import qualityLogo from '../../assets/quality.svg';
import giftLogo from '../../assets/gift.svg';
import scooterLogo from '../../assets/scooter.svg';
import settingsLogo from '../../assets/settings.svg';
import shoppingLogo from '../../assets/shopping-cart.svg';
import backLogo from '../../assets/left-arrow.svg';
import coinsLogo from '../../assets/coins.svg';

export default class NavigationDrawer extends React.Component<INavigationDrawerProps, INavigationDrawerState> {

    constructor(props:INavigationDrawerProps) {
        super(props);
      }

    public render(): React.ReactElement<INavigationDrawerProps> {
        return (
            <Drawer open={this.props.navigationDrawerOpen}
                    onClose={()=>this.toogleDrower()}
                    className="mainDrawer">
                <div className="first-level">
                    <div onClick={()=>this.toogleDrower()} className="iconNav iconBackDrawer">
                        <img className='iconNav' src={backLogo}/>
                    </div>
                    <div className="settings">
                        <img className='iconNav' src={settingsLogo}/>
                    </div>
                </div>



                
                <div className="profile-photo">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg"/>
                </div>
                <div className="profile-info">
                    <div className="under_div">
                        <p className="name">Elena Ruiz</p>
                        <div className="info">
                            <div className="money">
                                <img className="iconNav" src={coinsLogo}></img>
                                <p>9,18€</p>    
                            </div>
                            <div className="puntuation">
                                <p>503xp</p>
                            </div>
                        </div>
                    </div>
                </div>

                <List>
                    {['Pagos', 'Mis viajes'].map((text, index) => (
                        <ListItem onClick={()=>this.selectOption(text)} button key={text}>
                            <ListItemIcon>
                                <img className='iconNav' src={text==='Pagos' ? creditLogo : scooterLogo}></img>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Mis estadísticas', 'Comunidad','Packs','Invitar Amigos'].map((text, index) => (
                        <ListItem onClick={()=>this.selectOption(text)} button key={text}>
                            <ListItemIcon>
                                <img className="iconNav" src={text==='Mis estadísticas' ? qualityLogo : 
                                                 text==="Riders" ? scooterLogo :
                                                 text==='Packs' ? shoppingLogo : giftLogo}></img>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        );
    }

    private selectOption(text: string){
        console.log("option Selected");
        this.props.changePage(text);
    }

    private toogleDrower(){
        this.props.toogleDrower();
    }

    private logOutUser(){
        this.props.logOutUser();
    }

}