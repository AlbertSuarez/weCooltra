import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { List } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { INavigationDrawerState } from './INavigationDrawerState';
import { INavigationDrawerProps } from './INavigationDrawerProps';

export default class NavigationDrawer extends React.Component<INavigationDrawerProps, INavigationDrawerState> {

    constructor(props:INavigationDrawerProps) {
        super(props);
        
        this.state ={
            navigationDrawerOpen: this.props.navigationDrawerOpen
        }
      }

    public render(): React.ReactElement<INavigationDrawerProps> {
        return (
            <Drawer open={this.state.navigationDrawerOpen}>
                <List>
                    {['Pagos', 'Mis viajes pasados'].map((text, index) => (
                        <ListItem onClick={()=>this.selectOption(text)} button key={text}>
                            <ListItemIcon>
                                <span className={text=='Pagos' ? "iconCredit" : "iconScooter"}></span>
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
                                <span className={text=='Mis estadísticas' ? "iconQuality" : 
                                                 text=="Riders" ? "iconQuality" :
                                                 text=='Packs' ? "iconCart" : "iconGift"}></span>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        );
    }

    public componentWillReciveProps(newProps: INavigationDrawerProps){
        this.setState({navigationDrawerOpen: newProps.navigationDrawerOpen});
    }

    private selectOption(text: string){
        this.props.changePage(text);
    }

}