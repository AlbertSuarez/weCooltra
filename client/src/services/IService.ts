export default interface IService {
    retriveStatistics(user_id: number): Promise<string>;
}