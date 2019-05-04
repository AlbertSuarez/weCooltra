import React from 'react';
import { ICommunityProps } from './ICommunityProps';
import { ICommunityState } from './ICommunityState';
import usersLogo from '../../assets/users.svg';

export default class Community extends React.Component<ICommunityProps, ICommunityState> {

  constructor(props:ICommunityProps) {
    super(props);
  }

  public render(): React.ReactElement<ICommunityProps> {
    return (
      <div>
        <div className="community">
          <button className="myFriends">
          <img className="iconNav" src={usersLogo}/>
            <p>
              Mis Amigos
            </p>
          </button>
          <button className="createEvent">
              <img className="iconNav" src={usersLogo}/>
              <p>
                Crear evento
              </p>
          </button>
        </div>
        <div className="degradado-com">
        </div>
      </div>

    );
  }
}