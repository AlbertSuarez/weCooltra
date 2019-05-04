import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { List } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { INavigationDrawerState } from './INavigationDrawerState';
import { INavigationDrawerProps } from './INavigationDrawerProps';

export default class NavigationDrawer extends React.Component<INavigationDrawerProps, INavigationDrawerState> {

    constructor(props:INavigationDrawerProps) {
        super(props);
      }

    public render(): React.ReactElement<INavigationDrawerProps> {
        return (
            <Drawer open={this.props.navigationDrawerOpen}
                    onClose={()=>this.toogleDrower()}>
                <div onClick={()=>this.toogleDrower()} className="iconBackDrawer"></div>
                <List>
                    {['Pagos', 'Mis viajes pasados'].map((text, index) => (
                        <ListItem onClick={()=>this.selectOption(text)} button key={text}>
                            <ListItemIcon>
                                <span className={text==='Pagos' ? "iconCredit" : "iconScooter"}></span>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Mis estadísticas', 'Riders','Packs','Invitar Amigos'].map((text, index) => (
                        <ListItem onClick={()=>this.selectOption(text)} button key={text}>
                            <ListItemIcon>
                                <span className={text==='Mis estadísticas' ? "iconQuality" : 
                                                 text==="Riders" ? "iconQuality" :
                                                 text==='Packs' ? "iconCart" : "iconGift"}></span>
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

}