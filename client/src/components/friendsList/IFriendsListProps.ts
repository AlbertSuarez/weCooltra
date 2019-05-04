export interface IFriendsListProps {
    user_id: number;
    changePage(text:string): void;
    visitFriendProfile(pageContent: string, friend_id: number, friend_name: string): void;
}