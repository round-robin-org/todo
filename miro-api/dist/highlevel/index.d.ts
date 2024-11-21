import { MiroApi } from '../api';
import { KeepBase } from './helpers';
import { BaseApi } from './../highlevel/Api';
import { TokenInformation as BaseTokenInformation } from './../model/tokenInformation';
import { BaseOrganization } from './Organization';
import { OrganizationMember as BaseOrganizationMember } from './../model/organizationMember';
import { BaseTeam } from './Team';
import { BoardDataClassificationLabel as BaseBoardDataClassification } from './../model/boardDataClassificationLabel';
import { DataClassificationOrganizationSettings as BaseDataClassification } from './../model/dataClassificationOrganizationSettings';
import { TeamMember as BaseTeamMember } from './../model/teamMember';
import { TeamSettings as BaseTeamSettings } from './../model/teamSettings';
import { BaseBoard } from './Board';
import { BoardMember as BaseBoardMember } from './../model/boardMember';
import { BaseItem } from './Item';
import { BaseAppCardItem } from './AppCardItem';
import { BaseCardItem } from './CardItem';
import { BaseDocumentItem } from './DocumentItem';
import { BaseEmbedItem } from './EmbedItem';
import { BaseFrameItem } from './FrameItem';
import { BaseImageItem } from './ImageItem';
import { BaseShapeItem } from './ShapeItem';
import { BaseStickyNoteItem } from './StickyNoteItem';
import { BaseTextItem } from './TextItem';
import { ConnectorWithLinks as BaseConnector } from './../model/connectorWithLinks';
import { BaseTag } from './Tag';
export declare class Api extends BaseApi {
    /** @hidden */
    _api: MiroApi;
    /** @hidden */
    constructor(api: MiroApi, props: KeepBase<BaseApi>);
    /**
     * Creates a board with the specified name and sharing policies.<br/><h4>Note</h4> You can only create up to 3 team boards with the free plan.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Create board
     * @param boardChanges
     */
    createBoard(boardChanges: Parameters<MiroApi['createBoard']>[0]): Promise<Board>;
    /**
     * Retrieves information about a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get specific board
     * @param boardId Unique identifier (ID) of the board that you want to retrieve.
     */
    getBoard(boardId: Parameters<MiroApi['getSpecificBoard']>[0]): Promise<Board>;
    /**
     * Retrieves organization information.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get organization info
     * @param orgId id of the organization
     */
    getOrganization(orgId: Parameters<MiroApi['enterpriseGetOrganization']>[0]): Promise<Organization>;
    /**
     * Get information about an access token, such as the token type, scopes, team, user, token creation date and time, and the user who created the token.
     * @summary Get access token information
     */
    tokenInfo(): Promise<TokenInformation>;
}
export declare class TokenInformation extends BaseTokenInformation {
    /** @hidden */
    _api: MiroApi;
    /** @hidden */
    constructor(api: MiroApi, props: KeepBase<BaseTokenInformation>);
}
export declare class Organization extends BaseOrganization {
    /** @hidden */
    _api: MiroApi;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, id: string, props: KeepBase<BaseOrganization>);
    /**
     * Creates a new team in an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Create team
     * @param createTeamRequest
     */
    createTeam(createTeamRequest: Parameters<MiroApi['enterpriseCreateTeam']>[1]): Promise<Team>;
    /**
     * Retrieves board classification settings for an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get organization settings
     */
    getDataClassification(): Promise<DataClassification>;
    /**
     * Retrieves default team settings of an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get default team settings
     */
    getDefaultTeamSettings(): Promise<TeamSettings>;
    /**
     * Retrieves organization member information for an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get organization member
     * @param memberId id of the organization member
     */
    getOrganizationMember(memberId: Parameters<MiroApi['enterpriseGetOrganizationMember']>[1]): Promise<OrganizationMember>;
    /**
     * Retrieves team information for an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get team
     * @param teamId The id of the Team.
     */
    getTeam(teamId: Parameters<MiroApi['enterpriseGetTeam']>[1]): Promise<Team>;
}
export declare class OrganizationMember extends BaseOrganizationMember {
    /** @hidden */
    _api: MiroApi;
    orgId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, orgId: string, id: string, props: KeepBase<BaseOrganizationMember>);
}
export declare class Team extends BaseTeam {
    /** @hidden */
    _api: MiroApi;
    orgId: string;
    teamId: string;
    /** @hidden */
    constructor(api: MiroApi, orgId: string, teamId: string, props: KeepBase<BaseTeam>);
    /**
     * Deletes an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Delete team
     */
    deleteTeam(): Promise<void>;
    /**
     * Deletes team member from team by id.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Delete team member from team
     * @param memberId The id of the Team Member
     */
    deleteTeamMember(memberId: Parameters<MiroApi['enterpriseDeleteTeamMember']>[2]): Promise<void>;
    /**
     * Retrieves board classification for a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get board classification
     * @param boardId Unique identifier of the board that you want to retrieve.
     */
    getBoardDataClassification(boardId: Parameters<MiroApi['enterpriseDataclassificationBoardGet']>[2]): Promise<BoardDataClassification>;
    /**
     * Updates board classification for an existing board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update board classification
     * @param boardId Unique identifier of the board that you want to update.
     * @param dataClassificationLabelId
     */
    setBoardDataClassification(boardId: Parameters<MiroApi['enterpriseDataclassificationBoardSet']>[2], dataClassificationLabelId: Parameters<MiroApi['enterpriseDataclassificationBoardSet']>[3]): Promise<void>;
    /**
     * Updates board classification for not-classified only or all boards in an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Bulk update boards classification
     * @param updateBoardsDataClassificationLabelRequest
     */
    setBoardDataClassificationBulk(updateBoardsDataClassificationLabelRequest: Parameters<MiroApi['enterpriseDataclassificationTeamBoardsBulk']>[2]): Promise<void>;
    /**
     * Retrieves board classification settings for an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get team settings
     */
    getDataClassification(): Promise<DataClassification>;
    /**
     * Updates board classification settings for an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update team settings
     * @param updateTeamSettingsRequest
     */
    setDataClassification(updateTeamSettingsRequest: Parameters<MiroApi['enterpriseDataclassificationTeamSettingsSet']>[2]): Promise<void>;
    /**
     * Invites a new Miro user to an existing team. The user must exist in your Miro organization. Users who do not exist in your Miro organization can be invited to the team via [SCIM](https://developers.miro.com/docs/scim) and an external identity provider, such as Okta or Azure Active Directory.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Invite team members
     * @param teamMemberInvite
     */
    inviteTeamMember(teamMemberInvite: Parameters<MiroApi['enterpriseInviteTeamMember']>[2]): Promise<void>;
    /**
     * Retrieves team member by id.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get team member
     * @param memberId The id of the Team Member
     */
    getTeamMember(memberId: Parameters<MiroApi['enterpriseGetTeamMember']>[2]): Promise<TeamMember>;
    /**
     * Updates an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update team
     * @param teamChanges
     */
    updateTeam(teamChanges: Parameters<MiroApi['enterpriseUpdateTeam']>[2]): Promise<void>;
    /**
     * Retrieves team settings of an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get team settings
     * @param teamId The id of the Team.
     */
    getTeamSettings(teamId: Parameters<MiroApi['enterpriseGetTeamSettings']>[1]): Promise<TeamSettings>;
    /**
     * Updates team settings of an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update team settings
     * @param teamId The id of the Team.
     * @param teamSettingsChanges
     */
    updateTeamSettings(teamId: Parameters<MiroApi['enterpriseUpdateTeamSettings']>[1], teamSettingsChanges: Parameters<MiroApi['enterpriseUpdateTeamSettings']>[2]): Promise<void>;
}
export declare class BoardDataClassification extends BaseBoardDataClassification {
    /** @hidden */
    _api: MiroApi;
    /** @hidden */
    constructor(api: MiroApi, props: KeepBase<BaseBoardDataClassification>);
}
export declare class DataClassification extends BaseDataClassification {
    /** @hidden */
    _api: MiroApi;
    /** @hidden */
    constructor(api: MiroApi, props: KeepBase<BaseDataClassification>);
}
export declare class TeamMember extends BaseTeamMember {
    /** @hidden */
    _api: MiroApi;
    orgId: string;
    teamId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, orgId: string, teamId: string, id: string, props: KeepBase<BaseTeamMember>);
    /**
     * Updates team member role in team by id.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update team member
     * @param teamMemberChanges
     */
    update(teamMemberChanges: Parameters<MiroApi['enterpriseUpdateTeamMember']>[3]): Promise<void>;
}
export declare class TeamSettings extends BaseTeamSettings {
    /** @hidden */
    _api: MiroApi;
    /** @hidden */
    constructor(api: MiroApi, props: KeepBase<BaseTeamSettings>);
}
export declare class Board extends BaseBoard {
    /** @hidden */
    _api: MiroApi;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, id: string, props: KeepBase<BaseBoard>);
    /**
     * Adds an app card item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create app card item
     * @param appCardCreateRequest
     */
    createAppCardItem(appCardCreateRequest: Parameters<MiroApi['createAppCardItem']>[1]): Promise<AppCardItem>;
    /**
     * Adds a card item to a board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create card item
     * @param cardCreateRequest
     */
    createCardItem(cardCreateRequest: Parameters<MiroApi['createCardItem']>[1]): Promise<CardItem>;
    /**
     * Adds a connector to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create connector
     * @param connectorCreationData
     */
    createConnector(connectorCreationData: Parameters<MiroApi['createConnector']>[1]): Promise<Connector>;
    /**
     * Adds an embed item containing external content to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create embed item
     * @param embedCreateRequest
     */
    createEmbedItem(embedCreateRequest: Parameters<MiroApi['createEmbedItem']>[1]): Promise<EmbedItem>;
    /**
     * Adds a frame to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create frame
     * @param frameCreateRequest
     */
    createFrameItem(frameCreateRequest: Parameters<MiroApi['createFrameItem']>[1]): Promise<FrameItem>;
    /**
     * Adds a shape item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create shape item
     * @param shapeCreateRequest
     */
    createShapeItem(shapeCreateRequest: Parameters<MiroApi['createShapeItem']>[1]): Promise<ShapeItem>;
    /**
     * Adds a sticky note item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create sticky note item
     * @param stickyNoteCreateRequest
     */
    createStickyNoteItem(stickyNoteCreateRequest: Parameters<MiroApi['createStickyNoteItem']>[1]): Promise<StickyNoteItem>;
    /**
     * Creates a tag on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Create tag
     * @param tagCreateRequest
     */
    createTag(tagCreateRequest: Parameters<MiroApi['createTag']>[1]): Promise<Tag>;
    /**
     * Adds a text item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create text item
     * @param textCreateRequest
     */
    createTextItem(textCreateRequest: Parameters<MiroApi['createTextItem']>[1]): Promise<TextItem>;
    /**
     * Adds an image item to a board by specifying a file from device.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create image item using file from device
     * @param resource Select a file to upload. Maximum file size is 6 MB.
     * @param data
     */
    createImageItemUsingLocalFile(resource: Parameters<MiroApi['createImageItemUsingLocalFile']>[1], data: Parameters<MiroApi['createImageItemUsingLocalFile']>[2]): Promise<ImageItem>;
    /**
     * Adds a document item to a board by selecting file from device.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create document item using file from device
     * @param resource Select a file to upload. Maximum file size is 6 MB.
     * @param data
     */
    createDocumentItemUsingFileFromDevice(resource: Parameters<MiroApi['createDocumentItemUsingFileFromDevice']>[1], data: Parameters<MiroApi['createDocumentItemUsingFileFromDevice']>[2]): Promise<DocumentItem>;
    /**
     * Retrieves information for a specific app card item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get app card item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getAppCardItem(itemId: Parameters<MiroApi['getAppCardItem']>[1]): Promise<AppCardItem>;
    /**
     * Retrieves information for a specific card item on a board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get card item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getCardItem(itemId: Parameters<MiroApi['getCardItem']>[1]): Promise<CardItem>;
    /**
     * Retrieves information for a specific connector on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get specific connector
     * @param connectorId Unique identifier (ID) of the connector that you want to retrieve.
     */
    getConnector(connectorId: Parameters<MiroApi['getConnector']>[1]): Promise<Connector>;
    /**
     * Retrieves information for a specific document item on a board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get document item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getDocumentItem(itemId: Parameters<MiroApi['getDocumentItem']>[1]): Promise<DocumentItem>;
    /**
     * Retrieves information for a specific embed item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get embed item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getEmbedItem(itemId: Parameters<MiroApi['getEmbedItem']>[1]): Promise<EmbedItem>;
    /**
     * Retrieves information for a specific frame on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get frame
     * @param itemId Unique identifier (ID) of the frame that you want to retrieve.
     */
    getFrameItem(itemId: Parameters<MiroApi['getFrameItem']>[1]): Promise<FrameItem>;
    /**
     * Retrieves information for a specific image item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get image item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getImageItem(itemId: Parameters<MiroApi['getImageItem']>[1]): Promise<ImageItem>;
    /**
     * Retrieves information for a specific shape item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get shape item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getShapeItem(itemId: Parameters<MiroApi['getShapeItem']>[1]): Promise<ShapeItem>;
    /**
     * Retrieves information for a board member.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get specific board member
     * @param boardMemberId Unique identifier (ID) of the board member whose role you want to retrieve.
     */
    getMember(boardMemberId: Parameters<MiroApi['getSpecificBoardMember']>[1]): Promise<BoardMember>;
    /**
     * Retrieves information for a specific sticky note item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get sticky note item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getStickyNoteItem(itemId: Parameters<MiroApi['getStickyNoteItem']>[1]): Promise<StickyNoteItem>;
    /**
     * Retrieves information for a specific tag.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get tag
     * @param tagId Unique identifier (ID) of the tag that you want to retrieve.
     */
    getTag(tagId: Parameters<MiroApi['getTag']>[1]): Promise<Tag>;
    /**
     * Retrieves information for a specific text item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get text item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    getTextItem(itemId: Parameters<MiroApi['getTextItem']>[1]): Promise<TextItem>;
    /**
     * Creates a copy of an existing board. You can also update the name, description, sharing policy, and permissions policy for the new board in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a><br/>
     * @summary Copy board
     * @param copyBoardChanges
     */
    copy(copyBoardChanges: Parameters<MiroApi['copyBoard']>[1]): Promise<Board>;
    /**
     * Shares the board and Invites new members to collaborate on a board by sending an invitation email. Depending on the board\'s Sharing policy, there might be various scenarios where membership in the team is required in order to share the board with a user.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Share board
     * @param boardMembersInvite
     */
    share(boardMembersInvite: Parameters<MiroApi['shareBoard']>[1]): Promise<void>;
    /**
     * Updates a specific board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update board
     * @param boardChanges
     */
    update(boardChanges: Parameters<MiroApi['updateBoard']>[1]): Promise<void>;
    /**
     * Deletes a board. Deleted boards go to Trash (on paid plans) and can be restored via UI within 90 days after deletion.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete board
     */
    delete(): Promise<void>;
    /**
     * Removes a board member from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Remove board member
     * @param boardMemberId Unique identifier (ID) of the board member whose role you want to delete.
     */
    removeMember(boardMemberId: Parameters<MiroApi['removeBoardMember']>[1]): Promise<void>;
    /**
     * Removes the specified tag from the specified item. The tag still exists on the board. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),   [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Remove tag from item
     * @param itemId Unique identifier (ID) of the item that you want to remove the tag from.
     * @param tagId Unique identifier (ID) of the tag that you want to remove from the item.
     */
    removeTag(itemId: Parameters<MiroApi['removeTagFromItem']>[1], tagId: Parameters<MiroApi['removeTagFromItem']>[2]): Promise<void>;
}
export declare class BoardMember extends BaseBoardMember {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseBoardMember>);
    /**
     * Updates the role of a board member.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update board member
     * @param boardMemberChanges
     */
    update(boardMemberChanges: Parameters<MiroApi['updateBoardMember']>[2]): Promise<void>;
}
export declare class Item extends BaseItem {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseItem>);
    /**
     * Updates the position or the parent of an item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update item position or parent
     * @param genericItemUpdate
     */
    update(genericItemUpdate: Parameters<MiroApi['updateItemPositionOrParent']>[2]): Promise<void>;
    /**
     * Deletes an item from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete item
     */
    delete(): Promise<void>;
}
export declare class AppCardItem extends BaseAppCardItem {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseAppCardItem>);
    /**
     * Updates an app card item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update app card item
     * @param appCardUpdateRequest
     */
    update(appCardUpdateRequest: Parameters<MiroApi['updateAppCardItem']>[2]): Promise<void>;
    /**
     * Deletes an app card item from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete app card item
     */
    delete(): Promise<void>;
    /**
     * Retrieves all the tags from the specified item.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get tags from item
     */
    getAllTags(): Promise<Tag[]>;
    /**
     * Removes the specified tag from the specified item. The tag still exists on the board. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),   [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Remove tag from item
     * @param tagId Unique identifier (ID) of the tag that you want to remove from the item.
     */
    removeTag(tagId: Parameters<MiroApi['removeTagFromItem']>[2]): Promise<void>;
    /**
     * Attach an existing tag to the specified item. Card and sticky note items can have up to 8 tags. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:   [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),  [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Attach tag to item
     * @param tagId Unique identifier (ID) of the tag you want to add to the item.
     */
    attachTag(tagId: Parameters<MiroApi['attachTagToItem']>[2]): Promise<void>;
}
export declare class CardItem extends BaseCardItem {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseCardItem>);
    /**
     * Updates a card item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update card item
     * @param cardUpdateRequest
     */
    update(cardUpdateRequest: Parameters<MiroApi['updateCardItem']>[2]): Promise<void>;
    /**
     * Deletes a card item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete card item
     */
    delete(): Promise<void>;
    /**
     * Retrieves all the tags from the specified item.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get tags from item
     */
    getAllTags(): Promise<Tag[]>;
    /**
     * Removes the specified tag from the specified item. The tag still exists on the board. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),   [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Remove tag from item
     * @param tagId Unique identifier (ID) of the tag that you want to remove from the item.
     */
    removeTag(tagId: Parameters<MiroApi['removeTagFromItem']>[2]): Promise<void>;
    /**
     * Attach an existing tag to the specified item. Card and sticky note items can have up to 8 tags. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:   [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),  [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Attach tag to item
     * @param tagId Unique identifier (ID) of the tag you want to add to the item.
     */
    attachTag(tagId: Parameters<MiroApi['attachTagToItem']>[2]): Promise<void>;
}
export declare class DocumentItem extends BaseDocumentItem {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseDocumentItem>);
    /**
     * Updates a document item on a board by using file from a device.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update document item using file from device
     * @param resource Select a file to upload. Maximum file size is 6 MB.
     * @param data
     */
    updateUsingFile(resource: Parameters<MiroApi['updateDocumentItemUsingFileFromDevice']>[2], data: Parameters<MiroApi['updateDocumentItemUsingFileFromDevice']>[3]): Promise<void>;
    /**
     * Updates a document item on a board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update document item using URL
     * @param documentUpdateRequest
     */
    updateUsingUrl(documentUpdateRequest: Parameters<MiroApi['updateDocumentItemUsingUrl']>[2]): Promise<void>;
    /**
     * Deletes a document item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete document item
     */
    delete(): Promise<void>;
}
export declare class EmbedItem extends BaseEmbedItem {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseEmbedItem>);
    /**
     * Updates an embed item on a board based on the data properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update embed item
     * @param embedUpdateRequest
     */
    update(embedUpdateRequest: Parameters<MiroApi['updateEmbedItem']>[2]): Promise<void>;
    /**
     * Deletes an embed item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete embed item
     */
    delete(): Promise<void>;
}
export declare class FrameItem extends BaseFrameItem {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseFrameItem>);
    /**
     * Updates a frame on a board based on the data, style, or geometry properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update frame
     * @param frameUpdateRequest
     */
    update(frameUpdateRequest: Parameters<MiroApi['updateFrameItem']>[2]): Promise<void>;
    /**
     * Deletes a frame from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete frame
     */
    delete(): Promise<void>;
}
export declare class ImageItem extends BaseImageItem {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseImageItem>);
    /**
     * Updates an image item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update image item using file from device
     * @param resource Select a file to upload. Maximum file size is 6 MB.
     * @param data
     */
    updateUsingFile(resource: Parameters<MiroApi['updateImageItemUsingFileFromDevice']>[2], data: Parameters<MiroApi['updateImageItemUsingFileFromDevice']>[3]): Promise<void>;
    /**
     * Updates an image item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update image item using URL
     * @param imageUpdateRequest
     */
    updateUsingUrl(imageUpdateRequest: Parameters<MiroApi['updateImageItemUsingUrl']>[2]): Promise<void>;
    /**
     * Deletes an image item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete image item
     */
    delete(): Promise<void>;
}
export declare class ShapeItem extends BaseShapeItem {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseShapeItem>);
    /**
     * Updates a shape item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update shape item
     * @param shapeUpdateRequest
     */
    update(shapeUpdateRequest: Parameters<MiroApi['updateShapeItem']>[2]): Promise<void>;
    /**
     * Deletes a shape item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete shape item
     */
    delete(): Promise<void>;
}
export declare class StickyNoteItem extends BaseStickyNoteItem {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseStickyNoteItem>);
    /**
     * Updates a sticky note item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update sticky note item
     * @param stickyNoteUpdateRequest
     */
    update(stickyNoteUpdateRequest: Parameters<MiroApi['updateStickyNoteItem']>[2]): Promise<void>;
    /**
     * Deletes a sticky note item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete sticky note item
     */
    delete(): Promise<void>;
    /**
     * Retrieves all the tags from the specified item.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get tags from item
     */
    getAllTags(): Promise<Tag[]>;
    /**
     * Removes the specified tag from the specified item. The tag still exists on the board. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),   [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Remove tag from item
     * @param tagId Unique identifier (ID) of the tag that you want to remove from the item.
     */
    removeTag(tagId: Parameters<MiroApi['removeTagFromItem']>[2]): Promise<void>;
    /**
     * Attach an existing tag to the specified item. Card and sticky note items can have up to 8 tags. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:   [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),  [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Attach tag to item
     * @param tagId Unique identifier (ID) of the tag you want to add to the item.
     */
    attachTag(tagId: Parameters<MiroApi['attachTagToItem']>[2]): Promise<void>;
}
export declare class TextItem extends BaseTextItem {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseTextItem>);
    /**
     * Updates a text item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update text item
     * @param textUpdateRequest
     */
    update(textUpdateRequest: Parameters<MiroApi['updateTextItem']>[2]): Promise<void>;
    /**
     * Deletes a text item from the board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete text item
     */
    delete(): Promise<void>;
}
export declare class Connector extends BaseConnector {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseConnector>);
    /**
     * Updates a connector on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update connector
     * @param connectorChangesData
     */
    update(connectorChangesData: Parameters<MiroApi['updateConnector']>[2]): Promise<void>;
    /**
     * Deletes the specified connector from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete connector
     */
    delete(): Promise<void>;
}
export declare class Tag extends BaseTag {
    /** @hidden */
    _api: MiroApi;
    boardId: string;
    id: string;
    /** @hidden */
    constructor(api: MiroApi, boardId: string, id: string, props: KeepBase<BaseTag>);
    /**
     * Updates a tag based on the data properties provided in the request body. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),  [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),   [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Update tag
     * @param tagUpdateRequest
     */
    update(tagUpdateRequest: Parameters<MiroApi['updateTag']>[2]): Promise<void>;
    /**
     * Deletes the specified tag from the board. The tag is also removed from all cards and sticky notes on the board. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),  [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),  [Update tag](https://developers.miro.com/reference/update-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Delete tag
     */
    delete(): Promise<void>;
}
