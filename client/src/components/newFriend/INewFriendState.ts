import { IPersonaProps } from "office-ui-fabric-react/lib/Persona";

export interface INewFriendState {
    your_user_id: string;
    selectedPersona?: Array<IPersonaProps>;
}