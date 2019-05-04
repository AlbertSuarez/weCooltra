import React from 'react';
import { IFriendsListProps } from './IFriendsListProps';
import { IFriendsListState } from './IFriendsListState';
import Service from '../../services/Service';
import { IUserModel } from '../../models/IUserModel';
import { Card, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import rightArrow from '../../assets/rightArrow.svg';

export default class FriendsList extends React.Component<IFriendsListProps, IFriendsListState> {

    constructor(props:IFriendsListProps) {
        super(props);
        
        this.state ={
            friends: new Array<IUserModel>()
        }
    }

    public render(): React.ReactElement<IFriendsListProps> {
        return(
            <div className="friendsListContent">
                {this.state.friends.map((friend: IUserModel)=>{
                    return(
                        <Card className="friendsCard" onClick={()=>this.selectOption("Perfil de Amigo")}>
                            <div className="friendsListCardContent">
                                <div className="cardProfilePhoto">
                                    <img src={friend.image_url}/>
                                </div>
                                <div className="cardTextContainer">
                                    <div className="friendFullName">{friend.fullName}</div>
                                    <div className="friendExperience">{friend.points+"xp"}</div>
                                </div>
                                <div className="cardRightArrow">
                                    <img className='friendsIcon' src={rightArrow}></img>
                                </div>
                            </div>
                        </Card>
                    );
                })}
                <Fab className="friendsFab" onClick={()=>this.selectOption("Añadir Amigo")}>
                    <AddIcon/>
                </Fab>
            </div>
        )
    }

    public componentDidMount(){
        let service = new Service();
        service.getFriends(this.props.user_id).then((friends: Array<IUserModel>)=>{
            this.setState({friends:friends});
        });
    }

    private selectOption(text: string){
        this.props.changePage(text);
      }

}