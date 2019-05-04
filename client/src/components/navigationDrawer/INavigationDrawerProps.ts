export interface INavigationDrawerProps {
    navigationDrawerOpen: boolean;
    changePage(text:string): void;
    toogleDrower(): void;
}