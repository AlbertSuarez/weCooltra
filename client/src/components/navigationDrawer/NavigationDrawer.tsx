import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { List } from '@material-ui/core';
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
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
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

}