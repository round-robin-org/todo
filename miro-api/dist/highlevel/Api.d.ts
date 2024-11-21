import { Board } from './index';
import { MiroApi } from '../api';
/** @hidden */
export declare abstract class BaseApi {
    abstract _api: MiroApi;
    /** {@inheritDoc api/apis!MiroApi.revokeToken} */
    revokeToken(): Promise<void>;
    /**
     * Retrieves all boards that match the search criteria provided in the request. If you are an Enterprise customer and a Company Admin, you can retrieve all boards, including all private boards (boards that haven\'t been specifically shared with you) by enabling Content Admin permissions. To enable Content Admin permissions, see https://help.miro.com/hc/en-us/articles/360012777280-Content-Admin-permissions-for-Company-Admins. Note that you only get results instantaneously when you filter by `team_id`. If you use any other filter,  you need to give a few seconds for the indexing of newly created boards before retrieving boards.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=https://developers.miro.com/reference/ratelimiting>Level 1</a><br/>
     *
     * Returns an iterator which will automatically paginate and fetch all available boards
     * @summary Get boards
     */
    getAllBoards(query?: Omit<Parameters<MiroApi['getBoards']>[0], 'offset'>): AsyncGenerator<Board, void>;
}
