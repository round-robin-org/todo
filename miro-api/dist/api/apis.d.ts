import { Response } from 'node-fetch';
import FormData = require('form-data');
import { AppCardCreateRequest } from '../model/appCardCreateRequest';
import { AppCardItem } from '../model/appCardItem';
import { AppCardUpdateRequest } from '../model/appCardUpdateRequest';
import { GetMetrics200ResponseInner } from '../model/getMetrics200ResponseInner';
import { GetMetricsTotal200Response } from '../model/getMetricsTotal200Response';
import { AuditPage } from '../model/auditPage';
import { BoardDataClassificationLabel } from '../model/boardDataClassificationLabel';
import { DataClassificationLabelId } from '../model/dataClassificationLabelId';
import { DataClassificationOrganizationSettings } from '../model/dataClassificationOrganizationSettings';
import { DataClassificationTeamSettings } from '../model/dataClassificationTeamSettings';
import { UpdateBoardsDataClassificationLabel } from '../model/updateBoardsDataClassificationLabel';
import { UpdateBoardsDataClassificationLabelRequest } from '../model/updateBoardsDataClassificationLabelRequest';
import { UpdateTeamSettingsRequest } from '../model/updateTeamSettingsRequest';
import { GetBoardItemContentLogsResponse } from '../model/getBoardItemContentLogsResponse';
import { BoardExportJobId } from '../model/boardExportJobId';
import { BoardExportJobStatus } from '../model/boardExportJobStatus';
import { BoardExportResult } from '../model/boardExportResult';
import { CreateBoardExportRequest } from '../model/createBoardExportRequest';
import { BoardMemberChanges } from '../model/boardMemberChanges';
import { BoardMemberWithLinks } from '../model/boardMemberWithLinks';
import { BoardMembersInvite } from '../model/boardMembersInvite';
import { BoardMembersPagedResponse } from '../model/boardMembersPagedResponse';
import { InvitationResult } from '../model/invitationResult';
import { BoardChanges } from '../model/boardChanges';
import { BoardWithLinks } from '../model/boardWithLinks';
import { BoardWithLinksAndLastOpened } from '../model/boardWithLinksAndLastOpened';
import { BoardWithLinksAndWithoutProject } from '../model/boardWithLinksAndWithoutProject';
import { BoardsPagedResponse } from '../model/boardsPagedResponse';
import { CopyBoardChanges } from '../model/copyBoardChanges';
import { ItemCreate } from '../model/itemCreate';
import { Items } from '../model/items';
import { CardCreateRequest } from '../model/cardCreateRequest';
import { CardItem } from '../model/cardItem';
import { CardUpdateRequest } from '../model/cardUpdateRequest';
import { ConnectorChangesData } from '../model/connectorChangesData';
import { ConnectorCreationData } from '../model/connectorCreationData';
import { ConnectorWithLinks } from '../model/connectorWithLinks';
import { ConnectorsCursorPaged } from '../model/connectorsCursorPaged';
import { CreateDocumentItemUsingFileFromDeviceRequestData } from '../model/createDocumentItemUsingFileFromDeviceRequestData';
import { DocumentCreateRequest } from '../model/documentCreateRequest';
import { DocumentItem } from '../model/documentItem';
import { DocumentUpdateRequest } from '../model/documentUpdateRequest';
import { UploadFileFromDeviceData } from '../model/uploadFileFromDeviceData';
import { EmbedCreateRequest } from '../model/embedCreateRequest';
import { EmbedItem } from '../model/embedItem';
import { EmbedUpdateRequest } from '../model/embedUpdateRequest';
import { GenericItem } from '../model/genericItem';
import { GenericItemCursorPaged } from '../model/genericItemCursorPaged';
import { ShapeCreateRequest } from '../model/shapeCreateRequest';
import { ShapeItem } from '../model/shapeItem';
import { ShapeUpdateRequest } from '../model/shapeUpdateRequest';
import { FrameCreateRequest } from '../model/frameCreateRequest';
import { FrameItem } from '../model/frameItem';
import { FrameUpdateRequest } from '../model/frameUpdateRequest';
import { GetAllGroups200Response } from '../model/getAllGroups200Response';
import { GetItemsByGroupId200Response } from '../model/getItemsByGroupId200Response';
import { Group } from '../model/group';
import { GroupResponseShort } from '../model/groupResponseShort';
import { ImageCreateRequest } from '../model/imageCreateRequest';
import { ImageItem } from '../model/imageItem';
import { ImageUpdateRequest } from '../model/imageUpdateRequest';
import { GenericItemUpdate } from '../model/genericItemUpdate';
import { MindmapCreateRequest } from '../model/mindmapCreateRequest';
import { MindmapCursorPaged } from '../model/mindmapCursorPaged';
import { MindmapItem } from '../model/mindmapItem';
import { EnterpriseGetOrganizationMembers200Response } from '../model/enterpriseGetOrganizationMembers200Response';
import { OrganizationMember } from '../model/organizationMember';
import { Organization } from '../model/organization';
import { AddProjectMemberRequest } from '../model/addProjectMemberRequest';
import { ProjectMember } from '../model/projectMember';
import { ProjectMemberPage } from '../model/projectMemberPage';
import { UpdateProjectMemberRequest } from '../model/updateProjectMemberRequest';
import { ProjectSettings } from '../model/projectSettings';
import { UpdateProjectSettingsRequest } from '../model/updateProjectSettingsRequest';
import { CreateProjectRequest } from '../model/createProjectRequest';
import { Project } from '../model/project';
import { ProjectPage } from '../model/projectPage';
import { UpdateProjectRequest } from '../model/updateProjectRequest';
import { StickyNoteCreateRequest } from '../model/stickyNoteCreateRequest';
import { StickyNoteItem } from '../model/stickyNoteItem';
import { StickyNoteUpdateRequest } from '../model/stickyNoteUpdateRequest';
import { GetTagsResponse } from '../model/getTagsResponse';
import { ItemPagedResponse } from '../model/itemPagedResponse';
import { TagCreateRequest } from '../model/tagCreateRequest';
import { TagUpdateRequest } from '../model/tagUpdateRequest';
import { TagWithLinks } from '../model/tagWithLinks';
import { TagsPagedResponse } from '../model/tagsPagedResponse';
import { TeamMember } from '../model/teamMember';
import { TeamMemberChanges } from '../model/teamMemberChanges';
import { TeamMemberInvite } from '../model/teamMemberInvite';
import { TeamMembersPage } from '../model/teamMembersPage';
import { TeamSettings } from '../model/teamSettings';
import { TeamSettingsChanges } from '../model/teamSettingsChanges';
import { CreateTeamRequest } from '../model/createTeamRequest';
import { Team } from '../model/team';
import { TeamChanges } from '../model/teamChanges';
import { TeamsPage } from '../model/teamsPage';
import { TextCreateRequest } from '../model/textCreateRequest';
import { TextItem } from '../model/textItem';
import { TextUpdateRequest } from '../model/textUpdateRequest';
import { TokenInformation } from '../model/tokenInformation';
import { BoardSubscription } from '../model/boardSubscription';
import { CreateBoardSubscriptionRequest } from '../model/createBoardSubscriptionRequest';
import { GenericSubscription } from '../model/genericSubscription';
import { GenericSubscriptionsCursorPaged } from '../model/genericSubscriptionsCursorPaged';
import { UpdateBoardSubscriptionRequest } from '../model/updateBoardSubscriptionRequest';
import { RequestFile } from '../model/models';
export declare type Logger = (...thing: any) => void;
export declare class MiroApi {
    accessToken: string | (() => Promise<string>);
    basePath: string;
    logger?: Logger;
    httpTimeout?: number;
    constructor(accessToken: string | (() => Promise<string>), basePath?: string, logger?: Logger, httpTimeout?: number);
    /**
     * Adds an app card item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create app card item
     * @param boardId Unique identifier (ID) of the board where you want to create the item.
     * @param appCardCreateRequest
     */
    createAppCardItem(boardId: string, appCardCreateRequest: AppCardCreateRequest): Promise<{
        response: Response;
        body: AppCardItem;
    }>;
    /**
     * Deletes an app card item from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete app card item
     * @param boardId Unique identifier (ID) of the board from which you want to delete an item.
     * @param itemId Unique identifier (ID) of the item that you want to delete.
     */
    deleteAppCardItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves information for a specific app card item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get app card item
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a specific item.
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getAppCardItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: AppCardItem;
    }>;
    /**
     * Updates an app card item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update app card item
     * @param boardId Unique identifier (ID) of the board where you want to update the item.
     * @param itemId Unique identifier (ID) of the item that you want to update.
     * @param appCardUpdateRequest
     */
    updateAppCardItem(boardId: string, itemId: string, appCardUpdateRequest: AppCardUpdateRequest): Promise<{
        response: Response;
        body: AppCardItem;
    }>;
    /**
     * Returns a list of usage metrics for a specific app for a given time range, grouped by requested time period.  This endpoint requires an app management API token. It can be generated in the <a href=\"https://developers.miro.com/?features=appMetricsToken#your-apps\">Your Apps</a> section of Developer Hub.
     * @summary Get app metrics
     * @param appId ID of the app to get metrics for.
     * @param startDate Start date of the period in UTC format. For example, 2024-12-31.
     * @param endDate End date of the period in UTC format. For example, 2024-12-31.
     * @param period Group data by this time period.
     */
    getMetrics(appId: string, startDate: string, endDate: string, query?: {
        period?: 'DAY' | 'WEEK' | 'MONTH';
    }): Promise<{
        response: Response;
        body: Array<GetMetrics200ResponseInner>;
    }>;
    /**
     * Returns total usage metrics for a specific app since the app was created.  This endpoint requires an app management API token. It can be generated in <a href=\"https://developers.miro.com/?features=appMetricsToken#your-apps\">your apps</a> section of Developer Hub.
     * @summary Get total app metrics
     * @param appId ID of the app to get total metrics for.
     */
    getMetricsTotal(appId: string): Promise<{
        response: Response;
        body: GetMetricsTotal200Response;
    }>;
    /**
     * Retrieves a page of audit events.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>auditlogs:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a>
     * @summary Get audit logs
     * @param createdAfter Retrieve audit logs created after the date and time provided. This is the start date of the duration for which you want to retrieve audit logs. For example, if you want to retrieve audit logs between &#x60;2023-03-30T17:26:50.000Z&#x60; and &#x60;2023-04-30T17:26:50.000Z&#x60;, provide &#x60;2023-03-30T17:26:50.000Z&#x60; as the value for the &#x60;createdAfter&#x60; parameter.&lt;br&gt;Format: UTC, adheres to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), including milliseconds and a [trailing Z offset](https://en.wikipedia.org/wiki/ISO_8601#Coordinated_Universal_Time_(UTC)).\&quot;
     * @param createdBefore Retrieve audit logs created before the date and time provided. This is the end date of the duration for which you want to retrieve audit logs. For example, if you want to retrieve audit logs between &#x60;2023-03-30T17:26:50.000Z&#x60; and &#x60;2023-04-30T17:26:50.000Z&#x60;, provide &#x60;2023-04-30T17:26:50.000Z&#x60; as the value for the &#x60;createdBefore&#x60; parameter.&lt;br&gt;Format: UTC, adheres to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), including milliseconds and a [trailing Z offset](https://en.wikipedia.org/wiki/ISO_8601#Coordinated_Universal_Time_(UTC)).
     * @param cursor A cursor-paginated method returns a portion of the total set of results based on the &#x60;limit&#x60; specified and a &#x60;cursor&#x60; that points to the next portion of the results. To retrieve the next set of results of the collection, set the &#x60;cursor&#x60; parameter in your next request to the appropriate cursor value returned in the response.
     * @param limit Maximum number of results returned based on the &#x60;limit&#x60; specified in the request. For example, if there are &#x60;30&#x60; results, the request has no &#x60;cursor&#x60; value, and the &#x60;limit&#x60; is set to &#x60;20&#x60;,the &#x60;size&#x60; of the results will be &#x60;20&#x60;. The rest of the results will not be returned. To retrieve the rest of the results, you must make another request and set the appropriate value for the &#x60;cursor&#x60; parameter value that  you obtained from the response.&lt;br&gt;Default: &#x60;100&#x60;
     * @param sorting Sort order in which you want to view the result set. Based on the value you provide, the results are sorted in an ascending or descending order of the audit log creation date (audit log &#x60;createdAt&#x60; parameter).&lt;br&gt;Default: &#x60;ASC&#x60;
     */
    enterpriseGetAuditLogs(createdAfter: string, createdBefore: string, query?: {
        cursor?: string;
        limit?: number;
        sorting?: 'ASC' | 'DESC';
    }): Promise<{
        response: Response;
        body: AuditPage;
    }>;
    /**
     * Retrieves board classification for a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get board classification
     * @param orgId id of the organization
     * @param teamId id of the team
     * @param boardId Unique identifier of the board that you want to retrieve.
     */
    enterpriseDataclassificationBoardGet(orgId: string, teamId: string, boardId: string): Promise<{
        response: Response;
        body: BoardDataClassificationLabel;
    }>;
    /**
     * Updates board classification for an existing board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update board classification
     * @param orgId id of the organization
     * @param teamId id of the team
     * @param boardId Unique identifier of the board that you want to update.
     * @param dataClassificationLabelId
     */
    enterpriseDataclassificationBoardSet(orgId: string, teamId: string, boardId: string, dataClassificationLabelId: DataClassificationLabelId): Promise<{
        response: Response;
        body: BoardDataClassificationLabel;
    }>;
    /**
     * Retrieves board classification settings for an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get organization settings
     * @param orgId id of the organization
     */
    enterpriseDataclassificationOrganizationSettingsGet(orgId: string): Promise<{
        response: Response;
        body: DataClassificationOrganizationSettings;
    }>;
    /**
     * Updates board classification for not-classified only or all boards in an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Bulk update boards classification
     * @param orgId id of the organization
     * @param teamId id of the team
     * @param updateBoardsDataClassificationLabelRequest
     */
    enterpriseDataclassificationTeamBoardsBulk(orgId: string, teamId: string, updateBoardsDataClassificationLabelRequest: UpdateBoardsDataClassificationLabelRequest): Promise<{
        response: Response;
        body: UpdateBoardsDataClassificationLabel;
    }>;
    /**
     * Retrieves board classification settings for an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get team settings
     * @param orgId id of the organization
     * @param teamId id of the team
     */
    enterpriseDataclassificationTeamSettingsGet(orgId: string, teamId: string): Promise<{
        response: Response;
        body: DataClassificationTeamSettings;
    }>;
    /**
     * Updates board classification settings for an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update team settings
     * @param orgId id of the organization
     * @param teamId id of the team
     * @param updateTeamSettingsRequest
     */
    enterpriseDataclassificationTeamSettingsSet(orgId: string, teamId: string, updateTeamSettingsRequest: UpdateTeamSettingsRequest): Promise<{
        response: Response;
        body: DataClassificationTeamSettings;
    }>;
    /**
     * Retrieves content changes for board items within your organization. Content changes are actions that users can perform on board items, such as updating a sticky note\'s text. You can retrieve results for a specific time period. You can also filter results based on the board IDs and the emails of users who created, modified, or deleted a board item. Additionally, results can be paginated for easier viewing and processing. <br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>contentlogs:export</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin.</p>
     * @summary Retrieve content change logs of board items
     * @param orgId Unique identifier of the organization.
     * @param from Filter content logs based on the date and time when the board item was last modified. This is the start date and time for the modified date duration. Format: UTC, adheres to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), includes a [trailing Z offset](https://en.wikipedia.org/wiki/ISO_8601#Coordinated_Universal_Time_(UTC)).
     * @param to Filter content logs based on the date and time when the board item was last modified. This is the end date and time for the modified date duration. Format: UTC, adheres to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), includes a [trailing Z offset](https://en.wikipedia.org/wiki/ISO_8601#Coordinated_Universal_Time_(UTC)).
     * @param boardIds List of board IDs for which you want to retrieve the content logs.
     * @param emails Filter content logs based on the list of emails of users who created, modified, or deleted the board item.
     * @param cursor A cursor-paginated method returns a portion of the total set of results based on the limit specified and a cursor that points to the next portion of the results. To retrieve the next portion of the collection, set the cursor parameter equal to the cursor value you received in the response of the previous request.
     * @param limit The maximum number of results to return per call. If the number of logs in the response is greater than the limit specified, the response returns the cursor parameter with a value.
     * @param sorting Sort order in which you want to view the result set based on the modified date. To sort by an ascending modified date, specify &#x60;asc&#x60;. To sort by a descending modified date, specify &#x60;desc&#x60;.
     */
    enterpriseBoardContentItemLogsFetch(orgId: string, from: Date, to: Date, query?: {
        boardIds?: Array<string>;
        emails?: Array<string>;
        cursor?: string;
        limit?: number;
        sorting?: 'asc' | 'desc';
    }): Promise<{
        response: Response;
        body: GetBoardItemContentLogsResponse;
    }>;
    /**
     * Retrieves the result of the board export job. The response provides more information about the board export job, such as the S3 link to the files created.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:export</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin and eDiscovery is enabled in the Settings. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get results for board export job
     * @param orgId Unique identifier of the organization.
     * @param jobId Unique identifier of the job.
     */
    enterpriseBoardExportJobResults(orgId: string, jobId: string): Promise<{
        response: Response;
        body: BoardExportResult;
    }>;
    /**
     * Retrieves the status of the board export job.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:export</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin and eDiscovery is enabled in the Settings. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get board export job status
     * @param orgId Unique identifier of the organization.
     * @param jobId Unique identifier of the board export job.
     */
    enterpriseBoardExportJobStatus(orgId: string, jobId: string): Promise<{
        response: Response;
        body: BoardExportJobStatus;
    }>;
    /**
     * Creates an export job for one or more boards.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:export</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin and eDiscovery is enabled in the Settings. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Create board export job
     * @param orgId Unique identifier of the organization.
     * @param requestId Unique identifier of the board export job.
     * @param createBoardExportRequest
     */
    enterpriseCreateBoardExport(orgId: string, requestId: string, createBoardExportRequest: CreateBoardExportRequest): Promise<{
        response: Response;
        body: BoardExportJobId;
    }>;
    /**
     * Retrieves a pageable list of members for a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get all board members
     * @param boardId Unique identifier (ID) of the board to which the board member belongs.
     * @param limit
     * @param offset
     */
    getBoardMembers(boardId: string, query?: {
        limit?: string;
        offset?: string;
    }): Promise<{
        response: Response;
        body: BoardMembersPagedResponse;
    }>;
    /**
     * Retrieves information for a board member.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get specific board member
     * @param boardId Unique identifier (ID) of the board to which the board member belongs.
     * @param boardMemberId Unique identifier (ID) of the board member whose role you want to retrieve.
     */
    getSpecificBoardMember(boardId: string, boardMemberId: string): Promise<{
        response: Response;
        body: BoardMemberWithLinks;
    }>;
    /**
     * Removes a board member from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Remove board member
     * @param boardId Unique identifier (ID) of the board from which you want to delete an item.
     * @param boardMemberId Unique identifier (ID) of the board member whose role you want to delete.
     */
    removeBoardMember(boardId: string, boardMemberId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Shares the board and Invites new members to collaborate on a board by sending an invitation email. Depending on the board\'s Sharing policy, there might be various scenarios where membership in the team is required in order to share the board with a user.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Share board
     * @param boardId Unique identifier (ID) of the board to which the board member belongs.
     * @param boardMembersInvite
     */
    shareBoard(boardId: string, boardMembersInvite: BoardMembersInvite): Promise<{
        response: Response;
        body: InvitationResult;
    }>;
    /**
     * Updates the role of a board member.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update board member
     * @param boardId Unique identifier (ID) of the board for which you want to update the role of the board member.
     * @param boardMemberId Unique identifier (ID) of the board member whose role you want to update.
     * @param boardMemberChanges
     */
    updateBoardMember(boardId: string, boardMemberId: string, boardMemberChanges: BoardMemberChanges): Promise<{
        response: Response;
        body: BoardMemberWithLinks;
    }>;
    /**
     * Creates a copy of an existing board. You can also update the name, description, sharing policy, and permissions policy for the new board in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a><br/>
     * @summary Copy board
     * @param copyFrom Unique identifier (ID) of the board that you want to copy.
     * @param copyBoardChanges
     */
    copyBoard(copyFrom: string, copyBoardChanges?: CopyBoardChanges): Promise<{
        response: Response;
        body: BoardWithLinksAndWithoutProject;
    }>;
    /**
     * Creates a board with the specified name and sharing policies.<br/><h4>Note</h4> You can only create up to 3 team boards with the free plan.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Create board
     * @param boardChanges
     */
    createBoard(boardChanges?: BoardChanges): Promise<{
        response: Response;
        body: BoardWithLinks;
    }>;
    /**
     * Deletes a board. Deleted boards go to Trash (on paid plans) and can be restored via UI within 90 days after deletion.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete board
     * @param boardId Unique identifier (ID) of the board that you want to delete.
     */
    deleteBoard(boardId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves a list of boards that the user associated with the access token  has access to. You can filter and sort the boards by specifying URL query parameter values. If you are an Enterprise customer and a Company Admin, you can retrieve all boards, including all private boards (boards that haven\'t been specifically shared with you) by enabling Content Admin permissions. To enable Content Admin permissions, see [Content Admin permissions for Company Admins](https://help.miro.com/hc/en-us/articles/360012777280-Content-Admin-permissions-for-Company-Admins). Note that you only get results instantaneously when you filter by the `team_id`, `project_id`, or both the `team_id` and `project_id`. If you use any other filter,  you need to give a few seconds for the indexing of newly created boards before retrieving boards.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get boards
     * @param teamId
     * @param projectId
     * @param query
     * @param owner
     * @param limit
     * @param offset
     * @param sort
     */
    getBoards(query?: {
        teamId?: string;
        projectId?: string;
        query?: string;
        owner?: string;
        limit?: string;
        offset?: string;
        sort?: 'default' | 'last_modified' | 'last_opened' | 'last_created' | 'alphabetically';
    }): Promise<{
        response: Response;
        body: BoardsPagedResponse;
    }>;
    /**
     * Retrieves information about a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get specific board
     * @param boardId Unique identifier (ID) of the board that you want to retrieve.
     */
    getSpecificBoard(boardId: string): Promise<{
        response: Response;
        body: BoardWithLinksAndLastOpened;
    }>;
    /**
     * Updates a specific board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update board
     * @param boardId Unique identifier (ID) of the board that you want to update.
     * @param boardChanges
     */
    updateBoard(boardId: string, boardChanges: BoardChanges): Promise<{
        response: Response;
        body: BoardWithLinks;
    }>;
    /**
     * Adds different types of items to a board. You can add up to 20 items of the same or different type per create call. For example, you can create 3 shape items, 4 card items, and 5 sticky notes in one create call. The bulk create operation is transactional. If any item\'s create operation fails, the create operation for all the remaining items also fails, and none of the items will be created. <br/><br>To try out this API in our documentation:<br/><br>1. In the **BODY PARAMS** section, scroll down until you see **ADD OBJECT** (Figure 1).<br><br><img alt=“add src=\"https://files.readme.io/570dac1-small-add_object.png\"><br>Figure 1. Add object user interface in readme<br><br>2. Click **ADD OBJECT**, and then select or enter the appropriate values for parameters of the item that you want to add.<br><br>3. Repeat steps 1 and 2 for each item that you want to add.<br> <br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> per item. For example, if you want to create one sticky note, one card, and one shape item in one call, the rate limiting applicable will be 300 credits. This is because create item calls take Level 2 rate limiting of 100 credits each, 100 for sticky note, 100 for card, and 100 for shape item.
     * @summary Create items in bulk
     * @param boardId Unique identifier (ID) of the board where you want to create the item.
     * @param itemCreate
     */
    createItems(boardId: string, itemCreate: Array<ItemCreate>): Promise<{
        response: Response;
        body: Items;
    }>;
    /**
     * Adds different types of items to a board using files from a device. You can add up to 20 items of the same or different type per create call. For example, you can create 5 document items and 5 images in one create call.  The bulk create operation is transactional. If any item\'s create operation fails, the create operation for all the remaining items also fails, and none of the items will be created. To try out this API in our documentation: 1. In the **BODY PARAMS** section, select **ADD FILE**, and then upload a local file. Repeat for each item that you want to add. 2. Upload a JSON file that contains the bulk data for the items you want to create.  <h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/> <h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> per item<br/>
     * @summary Create items in bulk using file from device
     * @param boardId Unique identifier (ID) of the board where you want to create the item.
     * @param data JSON file containing bulk data, where each object represents an item to be created. For details, see [JSON file example](https://developers.miro.com/reference/json-data-example).
     * @param resources Array of items to create (PDFs, images, etc.). Maximum of 20 items.
     */
    createItemsInBulkUsingFileFromDevice(boardId: string, data: RequestFile, resources: Array<RequestFile>): Promise<{
        response: Response;
        body: Items;
    }>;
    /**
     * Adds a card item to a board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create card item
     * @param boardId Unique identifier (ID) of the board where you want to create the item.
     * @param cardCreateRequest
     */
    createCardItem(boardId: string, cardCreateRequest: CardCreateRequest): Promise<{
        response: Response;
        body: CardItem;
    }>;
    /**
     * Deletes a card item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete card item
     * @param boardId Unique identifier (ID) of the board from which you want to delete the item.
     * @param itemId Unique identifier (ID) of the item that you want to delete.
     */
    deleteCardItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves information for a specific card item on a board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get card item
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a specific item.
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getCardItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: CardItem;
    }>;
    /**
     * Updates a card item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update card item
     * @param boardId Unique identifier (ID) of the board where you want to update the item.
     * @param itemId Unique identifier (ID) of the item that you want to update.
     * @param cardUpdateRequest
     */
    updateCardItem(boardId: string, itemId: string, cardUpdateRequest: CardUpdateRequest): Promise<{
        response: Response;
        body: CardItem;
    }>;
    /**
     * Adds a connector to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create connector
     * @param boardId Unique identifier (ID) of the board for which you want to create the connector.
     * @param connectorCreationData
     */
    createConnector(boardId: string, connectorCreationData: ConnectorCreationData): Promise<{
        response: Response;
        body: ConnectorWithLinks;
    }>;
    /**
     * Deletes the specified connector from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete connector
     * @param boardId Unique identifier (ID) of the board from which you want to delete the connector.
     * @param connectorId Unique identifier (ID) of the connector that you want to delete.
     */
    deleteConnector(boardId: string, connectorId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves information for a specific connector on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get specific connector
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a specific connector.
     * @param connectorId Unique identifier (ID) of the connector that you want to retrieve.
     */
    getConnector(boardId: string, connectorId: string): Promise<{
        response: Response;
        body: ConnectorWithLinks;
    }>;
    /**
     * Retrieves a list of connectors for a specific board.  This method returns results using a cursor-based approach. A cursor-paginated method returns a portion of the total set of results based on the limit specified and a cursor that points to the next portion of the results. To retrieve the next portion of the collection, on your next call to the same method, set the `cursor` parameter equal to the `cursor` value you received in the response of the previous request. For example, if you set the `limit` query parameter to `10` and the board contains 20 objects, the first call will return information about the first 10 objects in the response along with a cursor parameter and value. In this example, let\'s say the cursor parameter value returned in the response is `foo`. If you want to retrieve the next set of objects, on your next call to the same method, set the cursor parameter value to `foo`.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Get connectors
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a list of connectors.
     * @param limit
     * @param cursor
     */
    getConnectors(boardId: string, query?: {
        limit?: string;
        cursor?: string;
    }): Promise<{
        response: Response;
        body: ConnectorsCursorPaged;
    }>;
    /**
     * Updates a connector on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update connector
     * @param boardId Unique identifier (ID) of the board for which you want to update the connector.
     * @param connectorId Unique identifier (ID) of the connector that you want to update.
     * @param connectorChangesData
     */
    updateConnector(boardId: string, connectorId: string, connectorChangesData: ConnectorChangesData): Promise<{
        response: Response;
        body: ConnectorWithLinks;
    }>;
    /**
     * Adds a document item to a board by selecting file from device.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create document item using file from device
     * @param boardIdPlatformFileUpload Unique identifier (ID) of the board where you want to create the item.
     * @param resource Select a file to upload. Maximum file size is 6 MB.
     * @param data
     */
    createDocumentItemUsingFileFromDevice(boardIdPlatformFileUpload: string, resource: RequestFile, data?: CreateDocumentItemUsingFileFromDeviceRequestData): Promise<{
        response: Response;
        body: DocumentItem;
    }>;
    /**
     * Adds a document item to a board by specifying the URL where the document is hosted.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create document item using URL
     * @param boardId Unique identifier (ID) of the board where you want to create the item.
     * @param documentCreateRequest
     */
    createDocumentItemUsingUrl(boardId: string, documentCreateRequest: DocumentCreateRequest): Promise<{
        response: Response;
        body: DocumentItem;
    }>;
    /**
     * Deletes a document item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete document item
     * @param boardId Unique identifier (ID) of the board from which you want to delete the item.
     * @param itemId Unique identifier (ID) of the item that you want to delete.
     */
    deleteDocumentItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves information for a specific document item on a board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get document item
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a specific item.
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getDocumentItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: DocumentItem;
    }>;
    /**
     * Updates a document item on a board by using file from a device.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update document item using file from device
     * @param boardIdPlatformFileUpload Unique identifier (ID) of the board where you want to update the item.
     * @param itemId Unique identifier (ID) of the item that you want to update.
     * @param resource Select a file to upload. Maximum file size is 6 MB.
     * @param data
     */
    updateDocumentItemUsingFileFromDevice(boardIdPlatformFileUpload: string, itemId: string, resource: RequestFile, data?: UploadFileFromDeviceData): Promise<{
        response: Response;
        body: DocumentItem;
    }>;
    /**
     * Updates a document item on a board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update document item using URL
     * @param boardId Unique identifier (ID) of the board where you want to update the item.
     * @param itemId Unique identifier (ID) of the item that you want to update.
     * @param documentUpdateRequest
     */
    updateDocumentItemUsingUrl(boardId: string, itemId: string, documentUpdateRequest: DocumentUpdateRequest): Promise<{
        response: Response;
        body: DocumentItem;
    }>;
    /**
     * Adds an embed item containing external content to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create embed item
     * @param boardId Unique identifier (ID) of the board where you want to create the item.
     * @param embedCreateRequest
     */
    createEmbedItem(boardId: string, embedCreateRequest: EmbedCreateRequest): Promise<{
        response: Response;
        body: EmbedItem;
    }>;
    /**
     * Deletes an embed item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete embed item
     * @param boardId Unique identifier (ID) of the board from which you want to delete the item.
     * @param itemId Unique identifier (ID) of the item that you want to delete.
     */
    deleteEmbedItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves information for a specific embed item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get embed item
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a specific item.
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getEmbedItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: EmbedItem;
    }>;
    /**
     * Updates an embed item on a board based on the data properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update embed item
     * @param boardId Unique identifier (ID) of the board where you want to update the item.
     * @param itemId Unique identifier (ID) of the item that you want to update.
     * @param embedUpdateRequest
     */
    updateEmbedItem(boardId: string, itemId: string, embedUpdateRequest: EmbedUpdateRequest): Promise<{
        response: Response;
        body: EmbedItem;
    }>;
    /**
     * Adds a flowchart shape item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create shape item
     * @param boardId Unique identifier (ID) of the board where you want to create the item.
     * @param shapeCreateRequest
     */
    createShapeItemFlowchart(boardId: string, shapeCreateRequest: ShapeCreateRequest): Promise<{
        response: Response;
        body: ShapeItem;
    }>;
    /**
     * Deletes a flowchart shape item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete shape item
     * @param boardId Unique identifier (ID) of the board from which you want to delete the item.
     * @param itemId Unique identifier (ID) of the item that you want to delete.
     */
    deleteShapeItemFlowchart(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves a list of items for a specific board. You can retrieve all items on the board, a list of child items inside a parent item, or a list of specific types of items by specifying URL query parameter values.  This method returns results using a cursor-based approach. A cursor-paginated method returns a portion of the total set of results based on the limit specified and a cursor that points to the next portion of the results. To retrieve the next portion of the collection, on your next call to the same method, set the `cursor` parameter equal to the `cursor` value you received in the response of the previous request. For example, if you set the `limit` query parameter to `10` and the board contains 20 objects, the first call will return information about the first 10 objects in the response along with a cursor parameter and value. In this example, let\'s say the cursor parameter value returned in the response is `foo`. If you want to retrieve the next set of objects, on your next call to the same method, set the cursor parameter value to `foo`.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Get items on board
     * @param boardId Unique identifier (ID) of the board for which you want to retrieve the list of available items.
     * @param limit
     * @param type
     * @param cursor
     */
    getItemsExperimental(boardId: string, query?: {
        limit?: string;
        type?: 'shape';
        cursor?: string;
    }): Promise<{
        response: Response;
        body: GenericItemCursorPaged;
    }>;
    /**
     * Retrieves information for a specific shape item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get shape item
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a specific item.
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getShapeItemFlowchart(boardId: string, itemId: string): Promise<{
        response: Response;
        body: ShapeItem;
    }>;
    /**
     * Retrieves information for a specific item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get specific item on board
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a specific item.
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getSpecificItemExperimental(boardId: string, itemId: string): Promise<{
        response: Response;
        body: GenericItem;
    }>;
    /**
     * Updates a flowchart shape item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update shape item
     * @param boardId Unique identifier (ID) of the board where you want to update the item.
     * @param itemId Unique identifier (ID) of the item that you want to update.
     * @param shapeUpdateRequest
     */
    updateShapeItemFlowchart(boardId: string, itemId: string, shapeUpdateRequest: ShapeUpdateRequest): Promise<{
        response: Response;
        body: ShapeItem;
    }>;
    /**
     * Adds a frame to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create frame
     * @param boardId Unique identifier (ID) of the board where you want to create a frame.
     * @param frameCreateRequest
     */
    createFrameItem(boardId: string, frameCreateRequest: FrameCreateRequest): Promise<{
        response: Response;
        body: FrameItem;
    }>;
    /**
     * Deletes a frame from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete frame
     * @param boardId Unique identifier (ID) of the board from which you want to delete the frame.
     * @param itemId Unique identifier (ID) of the frame that you want to delete.
     */
    deleteFrameItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves information for a specific frame on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get frame
     * @param boardId Unique identifier (ID) of the board that contains the frame that you want to retrieve
     * @param itemId Unique identifier (ID) of the frame that you want to retrieve.
     */
    getFrameItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: FrameItem;
    }>;
    /**
     * Updates a frame on a board based on the data, style, or geometry properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update frame
     * @param boardId Unique identifier (ID) of the board where you want to update the frame.
     * @param itemId Unique identifier (ID) of the frame that you want to update.
     * @param frameUpdateRequest
     */
    updateFrameItem(boardId: string, itemId: string, frameUpdateRequest: FrameUpdateRequest): Promise<{
        response: Response;
        body: FrameItem;
    }>;
    /**
     * Creates a group of items on a board. The group is created with the items that are passed in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create group
     * @param boardId
     * @param group
     */
    createGroup(boardId: string, group: Group): Promise<{
        response: Response;
        body: GroupResponseShort;
    }>;
    /**
     * Deletes a group from a board. All the items in the groups are deleted along with the group.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Deletes the group
     * @param boardId Unique identifier (ID) of the board.
     * @param groupId Unique identifier (ID) of the group.
     * @param deleteItems Indicates whether the items should be removed. Set to &#x60;true&#x60; to delete items in the group.
     */
    deleteGroup(boardId: string, groupId: string, deleteItems: boolean): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Returns all the groups and the items of the respective groups within a specific board.<br/> This method returns results using a cursor-based approach. A cursor-paginated  method returns a portion of the total set of results based on the limit specified and a cursor that points to the next portion of the results. To retrieve the next portion of the collection, on your next call to the same method, set the `cursor` parameter equal to the `cursor` value you received in the response of the previous request.<br/> For example, if you set the `limit` query parameter to `10` and the board  contains 20 items that are a part of a group, the first call will return information about the first 10 items in the response along with a cursor parameter and value. In this example, let\'s say the cursor parameter value returned in the response is `foo`. If you want to retrieve the next set of objects, on your next call to the same method, set the cursor parameter value to `foo`.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Get all groups on a board
     * @param boardId Unique identifier (ID) of the board.
     * @param limit The maximum number of items to return at one time, default is 10, maximum is 50.
     * @param cursor
     */
    getAllGroups(boardId: string, query?: {
        limit?: number;
        cursor?: string;
    }): Promise<{
        response: Response;
        body: GetAllGroups200Response;
    }>;
    /**
     * Returns a list of items in a specific group. <br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> per item ID
     * @summary Get a group by its ID
     * @param boardId Unique identifier (ID) of the board.
     * @param groupId Unique identifier (ID) of the group.
     */
    getGroupById(boardId: string, groupId: string): Promise<{
        response: Response;
        body: GroupResponseShort;
    }>;
    /**
     * Returns a list of items that are a part of any group, within a specific board.<br/> This method returns results using a cursor-based approach. A cursor-paginated method returns a portion of the total set of results based on the limit specified and a cursor that points to the next portion of the results. To retrieve the next portion of the collection, on your next call to the same method, set the `cursor` parameter equal to the `cursor` value you received in the response of the previous request.<br/> For example, if you set the `limit` query parameter to `10` and the board  contains 20 items that are a part of a group, the first call will return information about the first 10 items (not 10 groups) in the response along with a cursor parameter and value. In this example, let\'s say the cursor parameter value returned in the response is `foo`. If you want to retrieve the next set of objects, on your next call to the same method, set the cursor parameter value to `foo`.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Get items of a group by ID
     * @param boardId Unique identifier (ID) of the board.
     * @param groupItemId The ID of the group item to retrieve.
     * @param limit The maximum number of items to return at one time, default is 10, maximum is 50.
     * @param cursor
     */
    getItemsByGroupId(boardId: string, groupItemId: string, query?: {
        limit?: number;
        cursor?: string;
    }): Promise<{
        response: Response;
        body: GetItemsByGroupId200Response;
    }>;
    /**
     * Ungroups items from a group.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Ungroup items
     * @param boardId Unique identifier (ID) of the board.
     * @param groupId Unique identifier (ID) of the group.
     * @param deleteItems Indicates whether the items should be removed. By default, false.
     */
    unGroup(boardId: string, groupId: string, query?: {
        deleteItems?: boolean;
    }): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * This endpoint updates an existing group by replacing it entirely with a new group.  When the update is made, the original group is completely replaced, and a new group ID is assigned. <br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Updates a group with new items
     * @param boardId Unique identifier (ID) of the board.
     * @param groupId Unique identifier (ID) of the group.
     * @param group
     */
    updateGroup(boardId: string, groupId: string, group: Group): Promise<{
        response: Response;
        body: GroupResponseShort;
    }>;
    /**
     * Adds an image item to a board by specifying a file from device.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create image item using file from device
     * @param boardIdPlatformFileUpload Unique identifier (ID) of the board where you want to create the item.
     * @param resource Select a file to upload. Maximum file size is 6 MB.
     * @param data
     */
    createImageItemUsingLocalFile(boardIdPlatformFileUpload: string, resource: RequestFile, data?: UploadFileFromDeviceData): Promise<{
        response: Response;
        body: ImageItem;
    }>;
    /**
     * Adds an image item to a board by specifying an image URL.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create image item using URL
     * @param boardId Unique identifier (ID) of the board where you want to create the item.
     * @param imageCreateRequest
     */
    createImageItemUsingUrl(boardId: string, imageCreateRequest: ImageCreateRequest): Promise<{
        response: Response;
        body: ImageItem;
    }>;
    /**
     * Deletes an image item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete image item
     * @param boardId Unique identifier (ID) of the board from which you want to delete the item.
     * @param itemId Unique identifier (ID) of the item that you want to delete.
     */
    deleteImageItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves information for a specific image item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get image item
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a specific item.
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getImageItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: ImageItem;
    }>;
    /**
     * Updates an image item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update image item using file from device
     * @param boardIdPlatformFileUpload Unique identifier (ID) of the board where you want to update the item.
     * @param itemId Unique identifier (ID) of the item that you want to update.
     * @param resource Select a file to upload. Maximum file size is 6 MB.
     * @param data
     */
    updateImageItemUsingFileFromDevice(boardIdPlatformFileUpload: string, itemId: string, resource: RequestFile, data?: UploadFileFromDeviceData): Promise<{
        response: Response;
        body: ImageItem;
    }>;
    /**
     * Updates an image item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update image item using URL
     * @param boardId Unique identifier (ID) of the board where you want to update the item.
     * @param itemId Unique identifier (ID) of the item that you want to update.
     * @param imageUpdateRequest
     */
    updateImageItemUsingUrl(boardId: string, itemId: string, imageUpdateRequest: ImageUpdateRequest): Promise<{
        response: Response;
        body: ImageItem;
    }>;
    /**
     * Deletes an item from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete item
     * @param boardId Unique identifier (ID) of the board from which you want to delete the item.
     * @param itemId Unique identifier (ID) of the item that you want to delete.
     */
    deleteItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Deletes an item from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete item
     * @param boardId Unique identifier (ID) of the board from which you want to delete the item.
     * @param itemId Unique identifier (ID) of the item that you want to delete.
     */
    deleteItemExperimental(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves a list of items for a specific board. You can retrieve all items on the board, a list of child items inside a parent item, or a list of specific types of items by specifying URL query parameter values.  This method returns results using a cursor-based approach. A cursor-paginated method returns a portion of the total set of results based on the limit specified and a cursor that points to the next portion of the results. To retrieve the next portion of the collection, on your next call to the same method, set the `cursor` parameter equal to the `cursor` value you received in the response of the previous request. For example, if you set the `limit` query parameter to `10` and the board contains 20 objects, the first call will return information about the first 10 objects in the response along with a cursor parameter and value. In this example, let\'s say the cursor parameter value returned in the response is `foo`. If you want to retrieve the next set of objects, on your next call to the same method, set the cursor parameter value to `foo`.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Get items on board
     * @param boardId Unique identifier (ID) of the board for which you want to retrieve the list of available items.
     * @param limit
     * @param type
     * @param cursor
     */
    getItems(boardId: string, query?: {
        limit?: string;
        type?: 'text' | 'shape' | 'sticky_note' | 'image' | 'document' | 'card' | 'app_card' | 'preview' | 'frame' | 'embed';
        cursor?: string;
    }): Promise<{
        response: Response;
        body: GenericItemCursorPaged;
    }>;
    /**
     * Retrieves a list of items within a specific frame. A frame is a parent item and all items within a frame are child items. This method returns results using a cursor-based approach. A cursor-paginated method returns a portion of the total set of results based on the limit specified and a cursor that points to the next portion of the results. To retrieve the next portion of the collection, on your next call to the same method, set the `cursor` parameter equal to the `cursor` value you received in the response of the previous request. For example, if you set the `limit` query parameter to `10` and the board contains 20 objects, the first call will return information about the first 10 objects in the response along with a cursor parameter and value. In this example, let\'s say the cursor parameter value returned in the response is `foo`. If you want to retrieve the next set of objects, on your next call to the same method, set the cursor parameter value to `foo`.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Get items within frame
     * @param boardIdPlatformContainers Unique identifier (ID) of the board that contains the frame for which you want to retrieve the list of available items.
     * @param parentItemId ID of the frame for which you want to retrieve the list of available items.
     * @param limit
     * @param type
     * @param cursor
     */
    getItemsWithinFrame(boardIdPlatformContainers: string, parentItemId: string, query?: {
        limit?: string;
        type?: string;
        cursor?: string;
    }): Promise<{
        response: Response;
        body: GenericItemCursorPaged;
    }>;
    /**
     * Retrieves information for a specific item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get specific item on board
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a specific item.
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getSpecificItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: GenericItem;
    }>;
    /**
     * Updates the position or the parent of an item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update item position or parent
     * @param boardId Unique identifier (ID) of the board where you want to update the item.
     * @param itemId Unique identifier (ID) of the item that you want to update.
     * @param genericItemUpdate
     */
    updateItemPositionOrParent(boardId: string, itemId: string, genericItemUpdate: GenericItemUpdate): Promise<{
        response: Response;
        body: GenericItem;
    }>;
    /**
     * Adds a mind map node to a board. A root node is the starting point of a mind map. A node that is created under a root node is a child node. For information on mind maps, use cases, mind map structure, and more, see the <a href=\"https://developers.miro.com/docs/mind-maps\" target=_blank>Mind Map Overview</a> page. <br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/><br/> <b>Known limitations on node placement: </b> Currently, the create API supports explicit positions for nodes. This means that users can only place nodes based on the x, y coordinates provided in the position parameters. If the position is not provided in the request, nodes default to coordinates x=0, y=0, effectively placing them at the center of the board. <br /><br /><b>Upcoming changes:</b> We understand the importance of flexibility in node placement. We are actively working on implementing changes to support positioning nodes relative to their parent node as well. This enhancement offers a more dynamic and intuitive mind mapping experience. <br /><br />Additionally, we are actively working on providing the update API, further enhancing the functionality of mind map APIs.
     * @summary Create mind map node
     * @param boardId Unique identifier (ID) of the board where you want to create the item.
     * @param mindmapCreateRequest
     */
    createMindmapNodesExperimental(boardId: string, mindmapCreateRequest: MindmapCreateRequest): Promise<{
        response: Response;
        body: MindmapItem;
    }>;
    /**
     * Deletes a mind map node item and its child nodes from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete mind map node
     * @param boardId Unique identifier (ID) of the board from which you want to delete the mind map node.
     * @param itemId Unique identifier (ID) of the mind map node that you want to delete.
     */
    deleteMindmapNodeExperimental(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves information for a specific mind map node on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get specific mind map node
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a mind map node.
     * @param itemId Unique identifier (ID) of the mind map node that you want to retrieve.
     */
    getMindmapNodeExperimental(boardId: string, itemId: string): Promise<{
        response: Response;
        body: MindmapItem;
    }>;
    /**
     * Retrieves a list of mind map nodes for a specific board.  This method returns results using a cursor-based approach. A cursor-paginated method returns a portion of the total set of results based on the limit specified and a cursor that points to the next portion of the results. To retrieve the next portion of the collection, on your next call to the same method, set the `cursor` parameter equal to the `cursor` value you received in the response of the previous request. For example, if you set the `limit` query parameter to `10` and the board contains 20 objects, the first call will return information about the first 10 objects in the response along with a cursor parameter and value. In this example, let\'s say the cursor parameter value returned in the response is `foo`. If you want to retrieve the next set of objects, on your next call to the same method, set the cursor parameter value to `foo`.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Get mind map nodes
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve mind map nodes.
     * @param limit Maximum number of results returned
     * @param cursor Points to the next portion of the results set
     */
    getMindmapNodesExperimental(boardId: string, query?: {
        limit?: string;
        cursor?: string;
    }): Promise<{
        response: Response;
        body: MindmapCursorPaged;
    }>;
    /**
     * Retrieves organization member information for an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get organization member
     * @param orgId id of the organization
     * @param memberId id of the organization member
     */
    enterpriseGetOrganizationMember(orgId: string, memberId: string): Promise<{
        response: Response;
        body: OrganizationMember;
    }>;
    /**
     * Retrieves organization members based on the organization ID and the cursor, or based on the user emails provided in the request.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get organization members
     * @param orgId id of the organization
     * @param emails
     * @param role
     * @param license
     * @param active
     * @param cursor
     * @param limit
     */
    enterpriseGetOrganizationMembers(orgId: string, query?: {
        emails?: string;
        role?: 'organization_internal_admin' | 'organization_internal_user' | 'organization_external_user' | 'organization_team_guest_user' | 'unknown';
        license?: 'full' | 'occasional' | 'free' | 'free_restricted' | 'full_trial' | 'unknown';
        active?: boolean;
        cursor?: string;
        limit?: number;
    }): Promise<{
        response: Response;
        body: EnterpriseGetOrganizationMembers200Response;
    }>;
    /**
     * Retrieves organization information.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get organization info
     * @param orgId id of the organization
     */
    enterpriseGetOrganization(orgId: string): Promise<{
        response: Response;
        body: Organization;
    }>;
    /**
     * Add a Miro user to a project.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>projects:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Add member in a project
     * @param orgId The ID of the organization to which the project belongs.
     * @param teamId The ID of the team to which the project belongs.
     * @param projectId The ID of the project to which you want to add a user.
     * @param addProjectMemberRequest
     */
    enterpriseAddProjectMember(orgId: string, teamId: string, projectId: string, addProjectMemberRequest: AddProjectMemberRequest): Promise<{
        response: Response;
        body: ProjectMember;
    }>;
    /**
     * Remove a member from a project. The user remains in the team even after the member is removed from a project.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>projects:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Remove project member
     * @param orgId The ID of the organization to which the project belongs.
     * @param teamId The ID of the team to which the project belongs.
     * @param projectId The ID of the project from which you want to remove a member.
     * @param memberId The ID of the member that you want to remove from a project.
     */
    enterpriseDeleteProjectMember(orgId: string, teamId: string, projectId: string, memberId: string): Promise<{
        response: Response;
        body?: any;
    }>;
    /**
     * Retrieves information for a specific project member.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>projects:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get project member
     * @param orgId The ID of the organization to which the project belongs.
     * @param teamId The ID of the team to which the project belongs.
     * @param projectId The ID of the project from which you want to retrieve specific member information.
     * @param memberId The ID of the member for which you want to retrieve information.
     */
    enterpriseGetProjectMember(orgId: string, teamId: string, projectId: string, memberId: string): Promise<{
        response: Response;
        body: ProjectMember;
    }>;
    /**
     * Retrieves the list of members for a specific project.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>projects:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary List of project members
     * @param orgId The ID of the organization to which the project belongs.
     * @param teamId The ID of the team to which the project belongs.
     * @param projectId The ID of the project for which you want to retrieve the list of members.
     * @param limit The maximum number of results to return per call. If the number of project members in the response is greater than the limit specified, the response returns the cursor parameter with a value.
     * @param cursor An indicator of the position of a page in the full set of results. To obtain the first page leave it empty. To obtain subsequent pages set it to the value returned in the cursor field of the previous request.
     */
    enterpriseGetProjectMembers(orgId: string, teamId: string, projectId: string, query?: {
        limit?: number;
        cursor?: string;
    }): Promise<{
        response: Response;
        body: ProjectMemberPage;
    }>;
    /**
     * Updates details of a project member, such as the member\'s role.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>projects:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update project member
     * @param orgId The ID of the organization to which the project member belongs.
     * @param teamId The ID of the team to which the project member belongs.
     * @param projectId The ID of a Project.
     * @param memberId The ID of the member whose details you want to update.
     * @param updateProjectMemberRequest
     */
    enterpriseUpdateProjectMember(orgId: string, teamId: string, projectId: string, memberId: string, updateProjectMemberRequest: UpdateProjectMemberRequest): Promise<{
        response: Response;
        body: ProjectMember;
    }>;
    /**
     * Retrieves the project settings.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>projects:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get project settings
     * @param orgId The ID of the organization to which the project belongs.
     * @param teamId The ID of the team to which the project belongs.
     * @param projectId The ID of the project for which you want to retrieve the project settings.
     */
    enterpriseGetProjectSettings(orgId: string, teamId: string, projectId: string): Promise<{
        response: Response;
        body: ProjectSettings;
    }>;
    /**
     * Updates the settings of a project.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>projects:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update project settings
     * @param orgId The ID of the organization to which the project belongs.
     * @param teamId The ID of the team to which the project belongs.
     * @param projectId The ID of the project whose settings you want to update.
     * @param updateProjectSettingsRequest
     */
    enterpriseUpdateProjectSettings(orgId: string, teamId: string, projectId: string, updateProjectSettingsRequest: UpdateProjectSettingsRequest): Promise<{
        response: Response;
        body: ProjectSettings;
    }>;
    /**
     * Projects are essentially folders of boards with the option to manage user access for a smaller group of people within a team. Projects are here to help you organize your boards and make them easier to find and share. In other words, a project is a group of boards that you can share with your teammates all at once. For more information, see our <a href=\"https://help.miro.com/hc/en-us/articles/360018262033-Projects\" target=_blank>Help Center page on Projects</a>. <br><br>This API creates a new project in an existing team of an organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>projects:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Create project
     * @param orgId The ID of the organization within which you you want to create a project.
     * @param teamId The ID of the team within which you you want to create a project.
     * @param createProjectRequest
     */
    enterpriseCreateProject(orgId: string, teamId: string, createProjectRequest: CreateProjectRequest): Promise<{
        response: Response;
        body: Project;
    }>;
    /**
     * Deletes a project. After a project is deleted, all boards and users that belong to the project remain in the team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>projects:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Delete project
     * @param orgId The ID of the organization from which you want to delete a project.
     * @param teamId The ID of the team from which you want to delete a project.
     * @param projectId The ID of the project that you want to delete.
     */
    enterpriseDeleteProject(orgId: string, teamId: string, projectId: string): Promise<{
        response: Response;
        body?: any;
    }>;
    /**
     * Retrieves project information, such as a name for an existing project.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>projects:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get project
     * @param orgId The ID of the organization from which you want to retrieve the project information.
     * @param teamId The ID of the team from which you want to retrieve the project information.
     * @param projectId The ID of the project for which you want to retrieve the information.
     */
    enterpriseGetProject(orgId: string, teamId: string, projectId: string): Promise<{
        response: Response;
        body: Project;
    }>;
    /**
     * Retrieves the list of projects in an existing team of an organization. You can retrieve all projects, including all private projects (projects that haven\'t been specifically shared with you) by enabling Content Admin permissions. To enable Content Admin permissions, see [Content Admin permissions for Company Admins](https://help.miro.com/hc/en-us/articles/360012777280-Content-Admin-permissions-for-Company-Admins).<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>projects:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary List of projects
     * @param orgId The ID of the organization from which you want to retrieve the list of available projects.
     * @param teamId The ID of the team from which you want to retrieve the list of available projects.
     * @param limit The maximum number of results to return per call. If the number of projects in the response is greater than the limit specified, the response returns the cursor parameter with a value.
     * @param cursor An indicator of the position of a page in the full set of results. To obtain the first page leave it empty. To obtain subsequent pages set it to the value returned in the cursor field of the previous request.
     */
    enterpriseGetProjects(orgId: string, teamId: string, query?: {
        limit?: number;
        cursor?: string;
    }): Promise<{
        response: Response;
        body: ProjectPage;
    }>;
    /**
     * Update information about a project, such as the project name.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>projects:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update project
     * @param orgId The ID of an Organization.
     * @param teamId The ID of a Team.
     * @param projectId The ID of a Project.
     * @param updateProjectRequest
     */
    enterpriseUpdateProject(orgId: string, teamId: string, projectId: string, updateProjectRequest: UpdateProjectRequest): Promise<{
        response: Response;
        body: Project;
    }>;
    /**
     * Reset all sessions of a user.  Admins can now take immediate action to restrict user access to company data in case of security concerns. Calling this API ends all active Miro sessions across devices for a particular user, requiring the user to sign in again. This is useful in situations where a user leaves the company, their credentials are compromised, or there\'s suspicious activity on their account.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>sessions:delete</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Reset all sessions of a user
     * @param email Email ID of the user whose sessions you want to reset. Note that this user will be signed out from all devices.
     */
    enterprisePostUserSessionsReset(email: string): Promise<{
        response: Response;
        body?: any;
    }>;
    /**
     * Adds a shape item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create shape item
     * @param boardId Unique identifier (ID) of the board where you want to create the item.
     * @param shapeCreateRequest
     */
    createShapeItem(boardId: string, shapeCreateRequest: ShapeCreateRequest): Promise<{
        response: Response;
        body: ShapeItem;
    }>;
    /**
     * Deletes a shape item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete shape item
     * @param boardId Unique identifier (ID) of the board from which you want to delete the item.
     * @param itemId Unique identifier (ID) of the item that you want to delete.
     */
    deleteShapeItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves information for a specific shape item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get shape item
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a specific item.
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getShapeItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: ShapeItem;
    }>;
    /**
     * Updates a shape item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update shape item
     * @param boardId Unique identifier (ID) of the board where you want to update the item.
     * @param itemId Unique identifier (ID) of the item that you want to update.
     * @param shapeUpdateRequest
     */
    updateShapeItem(boardId: string, itemId: string, shapeUpdateRequest: ShapeUpdateRequest): Promise<{
        response: Response;
        body: ShapeItem;
    }>;
    /**
     * Adds a sticky note item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create sticky note item
     * @param boardId Unique identifier (ID) of the board where you want to create the item.
     * @param stickyNoteCreateRequest
     */
    createStickyNoteItem(boardId: string, stickyNoteCreateRequest: StickyNoteCreateRequest): Promise<{
        response: Response;
        body: StickyNoteItem;
    }>;
    /**
     * Deletes a sticky note item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete sticky note item
     * @param boardId Unique identifier (ID) of the board from which you want to delete the item.
     * @param itemId Unique identifier (ID) of the item that you want to delete.
     */
    deleteStickyNoteItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves information for a specific sticky note item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get sticky note item
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a specific item.
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getStickyNoteItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: StickyNoteItem;
    }>;
    /**
     * Updates a sticky note item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update sticky note item
     * @param boardId Unique identifier (ID) of the board where you want to update the item.
     * @param itemId Unique identifier (ID) of the item that you want to update.
     * @param stickyNoteUpdateRequest
     */
    updateStickyNoteItem(boardId: string, itemId: string, stickyNoteUpdateRequest: StickyNoteUpdateRequest): Promise<{
        response: Response;
        body: StickyNoteItem;
    }>;
    /**
     * Attach an existing tag to the specified item. Card and sticky note items can have up to 8 tags. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:   [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),  [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Attach tag to item
     * @param boardIdPlatformTags Unique identifier (ID) of the board with the item that you want to add a tag to.
     * @param itemId Unique identifier (ID) of the item to which you want to add a tag.
     * @param tagId Unique identifier (ID) of the tag you want to add to the item.
     */
    attachTagToItem(boardIdPlatformTags: string, itemId: string, tagId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Creates a tag on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Create tag
     * @param boardId Unique identifier (ID) of the board where you want to create the tag.
     * @param tagCreateRequest
     */
    createTag(boardId: string, tagCreateRequest: TagCreateRequest): Promise<{
        response: Response;
        body: TagWithLinks;
    }>;
    /**
     * Deletes the specified tag from the board. The tag is also removed from all cards and sticky notes on the board. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),  [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),  [Update tag](https://developers.miro.com/reference/update-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Delete tag
     * @param boardId Unique identifier (ID) of the board where you want to delete a specific tag.
     * @param tagId Unique identifier (ID) of the tag that you want to delete.
     */
    deleteTag(boardId: string, tagId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves all the items that have the specified tag.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get items by tag
     * @param boardIdPlatformTags Unique identifier (ID) of the board where you want to retrieve a specific tag.
     * @param tagId Unique identifier (ID) of the tag that you want to retrieve.
     * @param limit
     * @param offset
     */
    getItemsByTag(boardIdPlatformTags: string, tagId: string, query?: {
        limit?: string;
        offset?: string;
    }): Promise<{
        response: Response;
        body: ItemPagedResponse;
    }>;
    /**
     * Retrieves information for a specific tag.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get tag
     * @param boardId Unique identifier (ID) of the board where you want to retrieve a specific tag.
     * @param tagId Unique identifier (ID) of the tag that you want to retrieve.
     */
    getTag(boardId: string, tagId: string): Promise<{
        response: Response;
        body: TagWithLinks;
    }>;
    /**
     * Retrieves all the tags from the specified board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get tags from board
     * @param boardId Unique identifier (ID) of the board whose tags you want to retrieve.
     * @param limit
     * @param offset
     */
    getTagsFromBoard(boardId: string, query?: {
        limit?: string;
        offset?: string;
    }): Promise<{
        response: Response;
        body: TagsPagedResponse;
    }>;
    /**
     * Retrieves all the tags from the specified item.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get tags from item
     * @param boardId Unique identifier (ID) of the board with the item whose tags you want to retrieve.
     * @param itemId Unique identifier (ID) of the item whose tags you want to retrieve.
     */
    getTagsFromItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: GetTagsResponse;
    }>;
    /**
     * Removes the specified tag from the specified item. The tag still exists on the board. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),   [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Remove tag from item
     * @param boardIdPlatformTags Unique identifier (ID) of the board with the item that you want to remove a tag from.
     * @param itemId Unique identifier (ID) of the item that you want to remove the tag from.
     * @param tagId Unique identifier (ID) of the tag that you want to remove from the item.
     */
    removeTagFromItem(boardIdPlatformTags: string, itemId: string, tagId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Updates a tag based on the data properties provided in the request body. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),  [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),   [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Update tag
     * @param boardId Unique identifier (ID) of the board where you want to update a specific tag.
     * @param tagId Unique identifier (ID) of the tag that you want to update.
     * @param tagUpdateRequest
     */
    updateTag(boardId: string, tagId: string, tagUpdateRequest: TagUpdateRequest): Promise<{
        response: Response;
        body: TagWithLinks;
    }>;
    /**
     * Deletes team member from team by id.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Delete team member from team
     * @param orgId The id of the Organization.
     * @param teamId The id of the Team.
     * @param memberId The id of the Team Member
     */
    enterpriseDeleteTeamMember(orgId: string, teamId: string, memberId: string): Promise<{
        response: Response;
        body?: any;
    }>;
    /**
     * Retrieves team member by id.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get team member
     * @param orgId The id of the Organization.
     * @param teamId The id of the Team.
     * @param memberId The id of the Team Member
     */
    enterpriseGetTeamMember(orgId: string, teamId: string, memberId: string): Promise<{
        response: Response;
        body: TeamMember;
    }>;
    /**
     * Retrieves team members by cursor.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary List team members
     * @param orgId The id of the Organization.
     * @param teamId The id of the Team.
     * @param limit
     * @param cursor An indicator of the position of a page in the full set of results. To obtain the first page leave it empty. To obtain subsequent pages set it to the value returned in the cursor field of the previous request.
     * @param role  Role query. Filters members by role using full word match. Accepted values are: * \&quot;member\&quot;:     Team member with full member permissions. * \&quot;admin\&quot;:      Admin of a team. Team member with permission to manage team. * \&quot;non_team\&quot;:   External user, non-team user. * \&quot;team_guest\&quot;: Team-guest user, user with access only to a team without access to organization.
     */
    enterpriseGetTeamMembers(orgId: string, teamId: string, query?: {
        limit?: number;
        cursor?: string;
        role?: string;
    }): Promise<{
        response: Response;
        body: TeamMembersPage;
    }>;
    /**
     * Invites a new Miro user to an existing team. The user must exist in your Miro organization. Users who do not exist in your Miro organization can be invited to the team via [SCIM](https://developers.miro.com/docs/scim) and an external identity provider, such as Okta or Azure Active Directory.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Invite team members
     * @param orgId The id of the Organization.
     * @param teamId The id of the Team.
     * @param teamMemberInvite
     */
    enterpriseInviteTeamMember(orgId: string, teamId: string, teamMemberInvite: TeamMemberInvite): Promise<{
        response: Response;
        body: TeamMember;
    }>;
    /**
     * Updates team member role in team by id.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update team member
     * @param orgId The id of the Organization.
     * @param teamId The id of the Team.
     * @param memberId The id of the Team Member
     * @param teamMemberChanges
     */
    enterpriseUpdateTeamMember(orgId: string, teamId: string, memberId: string, teamMemberChanges: TeamMemberChanges): Promise<{
        response: Response;
        body: TeamMember;
    }>;
    /**
     * Retrieves default team settings of an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get default team settings
     * @param orgId The id of an Organization.
     */
    enterpriseGetDefaultTeamSettings(orgId: string): Promise<{
        response: Response;
        body: TeamSettings;
    }>;
    /**
     * Retrieves team settings of an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get team settings
     * @param orgId The id of the Organization.
     * @param teamId The id of the Team.
     */
    enterpriseGetTeamSettings(orgId: string, teamId: string): Promise<{
        response: Response;
        body: TeamSettings;
    }>;
    /**
     * Updates team settings of an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update team settings
     * @param orgId The id of the Organization.
     * @param teamId The id of the Team.
     * @param teamSettingsChanges
     */
    enterpriseUpdateTeamSettings(orgId: string, teamId: string, teamSettingsChanges: TeamSettingsChanges): Promise<{
        response: Response;
        body: TeamSettings;
    }>;
    /**
     * Creates a new team in an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Create team
     * @param orgId The id of the Organization.
     * @param createTeamRequest
     */
    enterpriseCreateTeam(orgId: string, createTeamRequest: CreateTeamRequest): Promise<{
        response: Response;
        body: Team;
    }>;
    /**
     * Deletes an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Delete team
     * @param orgId The id of the Organization.
     * @param teamId The id of the Team.
     */
    enterpriseDeleteTeam(orgId: string, teamId: string): Promise<{
        response: Response;
        body?: any;
    }>;
    /**
     * Retrieves team information for an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get team
     * @param orgId The id of the Organization.
     * @param teamId The id of the Team.
     */
    enterpriseGetTeam(orgId: string, teamId: string): Promise<{
        response: Response;
        body: Team;
    }>;
    /**
     * Retrieves list of teams in an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary List teams
     * @param orgId The id of the Organization.
     * @param limit
     * @param cursor An indicator of the position of a page in the full set of results. To obtain the first page leave it empty. To obtain subsequent pages set it to the value returned in the cursor field of the previous request.
     * @param name Name query. Filters teams by name using case insensitive partial match. A value \&quot;dev\&quot; will return both \&quot;Developer\&#39;s team\&quot; and \&quot;Team for developers\&quot;.
     */
    enterpriseGetTeams(orgId: string, query?: {
        limit?: number;
        cursor?: string;
        name?: string;
    }): Promise<{
        response: Response;
        body: TeamsPage;
    }>;
    /**
     * Updates an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update team
     * @param orgId The id of the Organization.
     * @param teamId The id of the Team.
     * @param teamChanges
     */
    enterpriseUpdateTeam(orgId: string, teamId: string, teamChanges: TeamChanges): Promise<{
        response: Response;
        body: Team;
    }>;
    /**
     * Adds a text item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create text item
     * @param boardId Unique identifier (ID) of the board where you want to create the item.
     * @param textCreateRequest
     */
    createTextItem(boardId: string, textCreateRequest: TextCreateRequest): Promise<{
        response: Response;
        body: TextItem;
    }>;
    /**
     * Deletes a text item from the board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete text item
     * @param boardId Unique identifier (ID) of the board from which you want to delete the item.
     * @param itemId Unique identifier (ID) of the item that you want to delete.
     */
    deleteTextItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves information for a specific text item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get text item
     * @param boardId Unique identifier (ID) of the board from which you want to retrieve a specific item.
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getTextItem(boardId: string, itemId: string): Promise<{
        response: Response;
        body: TextItem;
    }>;
    /**
     * Updates a text item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update text item
     * @param boardId Unique identifier (ID) of the board where you want to update the item.
     * @param itemId Unique identifier (ID) of the item that you want to update.
     * @param textUpdateRequest
     */
    updateTextItem(boardId: string, itemId: string, textUpdateRequest: TextUpdateRequest): Promise<{
        response: Response;
        body: TextItem;
    }>;
    /**
     * Revoke the current access token. Revoking an access token means that the access token will no longer work. When an access token is revoked, the refresh token is also revoked and no longer valid. This does not uninstall the application for the user.
     * @summary Revoke token
     * @param accessToken Access token that you want to revoke
     */
    revokeToken(accessToken: string): Promise<{
        response: Response;
        body?: any;
    }>;
    /**
     * Get information about an access token, such as the token type, scopes, team, user, token creation date and time, and the user who created the token.
     * @summary Get access token information
     */
    tokenInfo(): Promise<{
        response: Response;
        body: TokenInformation;
    }>;
    /**
     * Creates a webhook subscription to receive notifications when an item on a board is updated. Subscriptions are created per user, per board. You can create multiple subscriptions. We currently support all board items except tags, connectors, and comments.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create webhook subscription
     * @param createBoardSubscriptionRequest
     */
    createBoardSubscription(createBoardSubscriptionRequest: CreateBoardSubscriptionRequest): Promise<{
        response: Response;
        body: BoardSubscription;
    }>;
    /**
     * Deletes the specified webhook subscription.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Delete webhook subscription
     * @param subscriptionId Unique identifier (ID) of the subscription that you want to delete
     */
    deleteSubscriptionById(subscriptionId: string): Promise<{
        response: Response;
        body: object;
    }>;
    /**
     * Retrieves information for a specific webhook subscription.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Get specific webhook subscription
     * @param subscriptionId Unique identifier (ID) of the subscription that you want to retrieve
     */
    getSubscriptionById(subscriptionId: string): Promise<{
        response: Response;
        body: GenericSubscription;
    }>;
    /**
     * Retrieves information about all webhook subscriptions for a specific user.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a><br/>
     * @summary Get webhook subscriptions
     * @param limit
     * @param cursor
     */
    getUserSubscriptions(query?: {
        limit?: string;
        cursor?: string;
    }): Promise<{
        response: Response;
        body: GenericSubscriptionsCursorPaged;
    }>;
    /**
     * Updates the status or the callback URL of an existing webhook subscription.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update webhook subscription
     * @param subscriptionId
     * @param updateBoardSubscriptionRequest
     */
    updateBoardSubscription(subscriptionId: string, updateBoardSubscriptionRequest: UpdateBoardSubscriptionRequest): Promise<{
        response: Response;
        body: BoardSubscription;
    }>;
    call(method: string, url: string, body?: string | FormData): Promise<{
        body: unknown;
        response: Response;
    }>;
}
export declare class HttpError extends Error {
    response: Response;
    body: any;
    statusCode?: number | undefined;
    constructor(response: Response, body: any, statusCode?: number | undefined);
}
export declare function makeJsonRequest(token: string, method: string, url: URL, body?: string | FormData, logger?: (...thing: any) => void, httpTimeout?: number): Promise<{
    bodyAsJson: unknown;
    response: Response;
}>;
