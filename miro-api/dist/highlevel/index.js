"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.Connector = exports.TextItem = exports.StickyNoteItem = exports.ShapeItem = exports.ImageItem = exports.FrameItem = exports.EmbedItem = exports.DocumentItem = exports.CardItem = exports.AppCardItem = exports.Item = exports.BoardMember = exports.Board = exports.TeamSettings = exports.TeamMember = exports.DataClassification = exports.BoardDataClassification = exports.Team = exports.OrganizationMember = exports.Organization = exports.TokenInformation = exports.Api = void 0;
const Api_1 = require("./../highlevel/Api");
const tokenInformation_1 = require("./../model/tokenInformation");
const Organization_1 = require("./Organization");
const organizationMember_1 = require("./../model/organizationMember");
const Team_1 = require("./Team");
const boardDataClassificationLabel_1 = require("./../model/boardDataClassificationLabel");
const dataClassificationOrganizationSettings_1 = require("./../model/dataClassificationOrganizationSettings");
const teamMember_1 = require("./../model/teamMember");
const teamSettings_1 = require("./../model/teamSettings");
const Board_1 = require("./Board");
const boardMember_1 = require("./../model/boardMember");
const Item_1 = require("./Item");
const AppCardItem_1 = require("./AppCardItem");
const CardItem_1 = require("./CardItem");
const DocumentItem_1 = require("./DocumentItem");
const EmbedItem_1 = require("./EmbedItem");
const FrameItem_1 = require("./FrameItem");
const ImageItem_1 = require("./ImageItem");
const ShapeItem_1 = require("./ShapeItem");
const StickyNoteItem_1 = require("./StickyNoteItem");
const TextItem_1 = require("./TextItem");
const connectorWithLinks_1 = require("./../model/connectorWithLinks");
const Tag_1 = require("./Tag");
class Api extends Api_1.BaseApi {
    /** @hidden */
    constructor(api, props) {
        super();
        this._api = api;
        Object.assign(this, props);
    }
    /**
     * Creates a board with the specified name and sharing policies.<br/><h4>Note</h4> You can only create up to 3 team boards with the free plan.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Create board
     * @param boardChanges
     */
    async createBoard(boardChanges) {
        const result = (await this._api.createBoard(boardChanges)).body;
        return new Board(this._api, result.id, result);
    }
    /**
     * Retrieves information about a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get specific board
     * @param boardId Unique identifier (ID) of the board that you want to retrieve.
     */
    async getBoard(boardId) {
        const result = (await this._api.getSpecificBoard(boardId)).body;
        return new Board(this._api, result.id, result);
    }
    /**
     * Retrieves organization information.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get organization info
     * @param orgId id of the organization
     */
    async getOrganization(orgId) {
        const result = (await this._api.enterpriseGetOrganization(orgId)).body;
        return new Organization(this._api, result.id, result);
    }
    /**
     * Get information about an access token, such as the token type, scopes, team, user, token creation date and time, and the user who created the token.
     * @summary Get access token information
     */
    async tokenInfo() {
        const result = (await this._api.tokenInfo()).body;
        return new TokenInformation(this._api, result);
    }
}
exports.Api = Api;
class TokenInformation extends tokenInformation_1.TokenInformation {
    /** @hidden */
    constructor(api, props) {
        super();
        this._api = api;
        Object.assign(this, props);
    }
}
exports.TokenInformation = TokenInformation;
class Organization extends Organization_1.BaseOrganization {
    /** @hidden */
    constructor(api, id, props) {
        super();
        this._api = api;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Creates a new team in an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Create team
     * @param createTeamRequest
     */
    async createTeam(createTeamRequest) {
        const result = (await this._api.enterpriseCreateTeam(this.id.toString(), createTeamRequest)).body;
        return new Team(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves board classification settings for an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get organization settings
     */
    async getDataClassification() {
        const result = (await this._api.enterpriseDataclassificationOrganizationSettingsGet(this.id.toString())).body;
        return new DataClassification(this._api, result);
    }
    /**
     * Retrieves default team settings of an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get default team settings
     */
    async getDefaultTeamSettings() {
        const result = (await this._api.enterpriseGetDefaultTeamSettings(this.id.toString())).body;
        return new TeamSettings(this._api, result);
    }
    /**
     * Retrieves organization member information for an existing organization.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get organization member
     * @param memberId id of the organization member
     */
    async getOrganizationMember(memberId) {
        const result = (await this._api.enterpriseGetOrganizationMember(this.id.toString(), memberId)).body;
        return new OrganizationMember(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves team information for an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get team
     * @param teamId The id of the Team.
     */
    async getTeam(teamId) {
        const result = (await this._api.enterpriseGetTeam(this.id.toString(), teamId)).body;
        return new Team(this._api, this.id, result.id, result);
    }
}
exports.Organization = Organization;
class OrganizationMember extends organizationMember_1.OrganizationMember {
    /** @hidden */
    constructor(api, orgId, id, props) {
        super();
        this._api = api;
        this.orgId = orgId;
        this.id = id;
        Object.assign(this, props);
    }
}
exports.OrganizationMember = OrganizationMember;
class Team extends Team_1.BaseTeam {
    /** @hidden */
    constructor(api, orgId, teamId, props) {
        super();
        this._api = api;
        this.orgId = orgId;
        this.teamId = teamId;
        Object.assign(this, props);
    }
    /**
     * Deletes an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Delete team
     */
    async deleteTeam() {
        await this._api.enterpriseDeleteTeam(this.orgId.toString(), this.teamId.toString());
    }
    /**
     * Deletes team member from team by id.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Delete team member from team
     * @param memberId The id of the Team Member
     */
    async deleteTeamMember(memberId) {
        await this._api.enterpriseDeleteTeamMember(this.orgId.toString(), this.teamId.toString(), memberId);
    }
    /**
     * Retrieves board classification for a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get board classification
     * @param boardId Unique identifier of the board that you want to retrieve.
     */
    async getBoardDataClassification(boardId) {
        const result = (await this._api.enterpriseDataclassificationBoardGet(this.orgId.toString(), this.teamId.toString(), boardId)).body;
        return new BoardDataClassification(this._api, result);
    }
    /**
     * Updates board classification for an existing board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update board classification
     * @param boardId Unique identifier of the board that you want to update.
     * @param dataClassificationLabelId
     */
    async setBoardDataClassification(boardId, dataClassificationLabelId) {
        await this._api.enterpriseDataclassificationBoardSet(this.orgId.toString(), this.teamId.toString(), boardId, dataClassificationLabelId);
    }
    /**
     * Updates board classification for not-classified only or all boards in an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Bulk update boards classification
     * @param updateBoardsDataClassificationLabelRequest
     */
    async setBoardDataClassificationBulk(updateBoardsDataClassificationLabelRequest) {
        await this._api.enterpriseDataclassificationTeamBoardsBulk(this.orgId.toString(), this.teamId.toString(), updateBoardsDataClassificationLabelRequest);
    }
    /**
     * Retrieves board classification settings for an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get team settings
     */
    async getDataClassification() {
        const result = (await this._api.enterpriseDataclassificationTeamSettingsGet(this.orgId.toString(), this.teamId.toString())).body;
        return new DataClassification(this._api, result);
    }
    /**
     * Updates board classification settings for an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update team settings
     * @param updateTeamSettingsRequest
     */
    async setDataClassification(updateTeamSettingsRequest) {
        await this._api.enterpriseDataclassificationTeamSettingsSet(this.orgId.toString(), this.teamId.toString(), updateTeamSettingsRequest);
    }
    /**
     * Invites a new Miro user to an existing team. The user must exist in your Miro organization. Users who do not exist in your Miro organization can be invited to the team via [SCIM](https://developers.miro.com/docs/scim) and an external identity provider, such as Okta or Azure Active Directory.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Invite team members
     * @param teamMemberInvite
     */
    async inviteTeamMember(teamMemberInvite) {
        await this._api.enterpriseInviteTeamMember(this.orgId.toString(), this.teamId.toString(), teamMemberInvite);
    }
    /**
     * Retrieves team member by id.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get team member
     * @param memberId The id of the Team Member
     */
    async getTeamMember(memberId) {
        const result = (await this._api.enterpriseGetTeamMember(this.orgId.toString(), this.teamId.toString(), memberId))
            .body;
        return new TeamMember(this._api, this.orgId, this.teamId, result.id, result);
    }
    /**
     * Updates an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update team
     * @param teamChanges
     */
    async updateTeam(teamChanges) {
        await this._api.enterpriseUpdateTeam(this.orgId.toString(), this.teamId.toString(), teamChanges);
    }
    /**
     * Retrieves team settings of an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Get team settings
     * @param teamId The id of the Team.
     */
    async getTeamSettings(teamId) {
        const result = (await this._api.enterpriseGetTeamSettings(this.teamId.toString(), teamId)).body;
        return new TeamSettings(this._api, result);
    }
    /**
     * Updates team settings of an existing team.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update team settings
     * @param teamId The id of the Team.
     * @param teamSettingsChanges
     */
    async updateTeamSettings(teamId, teamSettingsChanges) {
        await this._api.enterpriseUpdateTeamSettings(this.teamId.toString(), teamId, teamSettingsChanges);
    }
}
exports.Team = Team;
class BoardDataClassification extends boardDataClassificationLabel_1.BoardDataClassificationLabel {
    /** @hidden */
    constructor(api, props) {
        super();
        this._api = api;
        Object.assign(this, props);
    }
}
exports.BoardDataClassification = BoardDataClassification;
class DataClassification extends dataClassificationOrganizationSettings_1.DataClassificationOrganizationSettings {
    /** @hidden */
    constructor(api, props) {
        super();
        this._api = api;
        Object.assign(this, props);
    }
}
exports.DataClassification = DataClassification;
class TeamMember extends teamMember_1.TeamMember {
    /** @hidden */
    constructor(api, orgId, teamId, id, props) {
        super();
        this._api = api;
        this.orgId = orgId;
        this.teamId = teamId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates team member role in team by id.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>organizations:teams:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a> <br/><h3>Enterprise only</h3> <p>This API is available only for <a target=_blank href=\"/reference/api-reference#enterprise-plan\">Enterprise plan</a> users. You can only use this endpoint if you have the role of a Company Admin. You can request temporary access to Enterprise APIs using <a target=_blank href=\"https://miro-survey.typeform.com/to/BVPTNWJ9\">this form</a>.</p>
     * @summary Update team member
     * @param teamMemberChanges
     */
    async update(teamMemberChanges) {
        await this._api.enterpriseUpdateTeamMember(this.orgId.toString(), this.teamId.toString(), this.id.toString(), teamMemberChanges);
    }
}
exports.TeamMember = TeamMember;
class TeamSettings extends teamSettings_1.TeamSettings {
    /** @hidden */
    constructor(api, props) {
        super();
        this._api = api;
        Object.assign(this, props);
    }
}
exports.TeamSettings = TeamSettings;
class Board extends Board_1.BaseBoard {
    /** @hidden */
    constructor(api, id, props) {
        super();
        this._api = api;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Adds an app card item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create app card item
     * @param appCardCreateRequest
     */
    async createAppCardItem(appCardCreateRequest) {
        const result = (await this._api.createAppCardItem(this.id.toString(), appCardCreateRequest)).body;
        return new AppCardItem(this._api, this.id, result.id, result);
    }
    /**
     * Adds a card item to a board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create card item
     * @param cardCreateRequest
     */
    async createCardItem(cardCreateRequest) {
        const result = (await this._api.createCardItem(this.id.toString(), cardCreateRequest)).body;
        return new CardItem(this._api, this.id, result.id, result);
    }
    /**
     * Adds a connector to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create connector
     * @param connectorCreationData
     */
    async createConnector(connectorCreationData) {
        const result = (await this._api.createConnector(this.id.toString(), connectorCreationData)).body;
        return new Connector(this._api, this.id, result.id, result);
    }
    /**
     * Adds an embed item containing external content to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create embed item
     * @param embedCreateRequest
     */
    async createEmbedItem(embedCreateRequest) {
        const result = (await this._api.createEmbedItem(this.id.toString(), embedCreateRequest)).body;
        return new EmbedItem(this._api, this.id, result.id, result);
    }
    /**
     * Adds a frame to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create frame
     * @param frameCreateRequest
     */
    async createFrameItem(frameCreateRequest) {
        const result = (await this._api.createFrameItem(this.id.toString(), frameCreateRequest)).body;
        return new FrameItem(this._api, this.id, result.id, result);
    }
    /**
     * Adds a shape item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create shape item
     * @param shapeCreateRequest
     */
    async createShapeItem(shapeCreateRequest) {
        const result = (await this._api.createShapeItem(this.id.toString(), shapeCreateRequest)).body;
        return new ShapeItem(this._api, this.id, result.id, result);
    }
    /**
     * Adds a sticky note item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create sticky note item
     * @param stickyNoteCreateRequest
     */
    async createStickyNoteItem(stickyNoteCreateRequest) {
        const result = (await this._api.createStickyNoteItem(this.id.toString(), stickyNoteCreateRequest)).body;
        return new StickyNoteItem(this._api, this.id, result.id, result);
    }
    /**
     * Creates a tag on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Create tag
     * @param tagCreateRequest
     */
    async createTag(tagCreateRequest) {
        const result = (await this._api.createTag(this.id.toString(), tagCreateRequest)).body;
        return new Tag(this._api, this.id, result.id, result);
    }
    /**
     * Adds a text item to a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create text item
     * @param textCreateRequest
     */
    async createTextItem(textCreateRequest) {
        const result = (await this._api.createTextItem(this.id.toString(), textCreateRequest)).body;
        return new TextItem(this._api, this.id, result.id, result);
    }
    /**
     * Adds an image item to a board by specifying a file from device.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create image item using file from device
     * @param resource Select a file to upload. Maximum file size is 6 MB.
     * @param data
     */
    async createImageItemUsingLocalFile(resource, data) {
        const result = (await this._api.createImageItemUsingLocalFile(this.id.toString(), resource, data)).body;
        return new ImageItem(this._api, this.id, result.id, result);
    }
    /**
     * Adds a document item to a board by selecting file from device.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Create document item using file from device
     * @param resource Select a file to upload. Maximum file size is 6 MB.
     * @param data
     */
    async createDocumentItemUsingFileFromDevice(resource, data) {
        const result = (await this._api.createDocumentItemUsingFileFromDevice(this.id.toString(), resource, data)).body;
        return new DocumentItem(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves information for a specific app card item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get app card item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    async getAppCardItem(itemId) {
        const result = (await this._api.getAppCardItem(this.id.toString(), itemId)).body;
        return new AppCardItem(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves information for a specific card item on a board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get card item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    async getCardItem(itemId) {
        const result = (await this._api.getCardItem(this.id.toString(), itemId)).body;
        return new CardItem(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves information for a specific connector on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get specific connector
     * @param connectorId Unique identifier (ID) of the connector that you want to retrieve.
     */
    async getConnector(connectorId) {
        const result = (await this._api.getConnector(this.id.toString(), connectorId)).body;
        return new Connector(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves information for a specific document item on a board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get document item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    async getDocumentItem(itemId) {
        const result = (await this._api.getDocumentItem(this.id.toString(), itemId)).body;
        return new DocumentItem(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves information for a specific embed item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get embed item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    async getEmbedItem(itemId) {
        const result = (await this._api.getEmbedItem(this.id.toString(), itemId)).body;
        return new EmbedItem(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves information for a specific frame on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get frame
     * @param itemId Unique identifier (ID) of the frame that you want to retrieve.
     */
    async getFrameItem(itemId) {
        const result = (await this._api.getFrameItem(this.id.toString(), itemId)).body;
        return new FrameItem(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves information for a specific image item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get image item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    async getImageItem(itemId) {
        const result = (await this._api.getImageItem(this.id.toString(), itemId)).body;
        return new ImageItem(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves information for a specific shape item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get shape item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    async getShapeItem(itemId) {
        const result = (await this._api.getShapeItem(this.id.toString(), itemId)).body;
        return new ShapeItem(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves information for a board member.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get specific board member
     * @param boardMemberId Unique identifier (ID) of the board member whose role you want to retrieve.
     */
    async getMember(boardMemberId) {
        const result = (await this._api.getSpecificBoardMember(this.id.toString(), boardMemberId)).body;
        return new BoardMember(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves information for a specific sticky note item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get sticky note item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    async getStickyNoteItem(itemId) {
        const result = (await this._api.getStickyNoteItem(this.id.toString(), itemId)).body;
        return new StickyNoteItem(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves information for a specific tag.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get tag
     * @param tagId Unique identifier (ID) of the tag that you want to retrieve.
     */
    async getTag(tagId) {
        const result = (await this._api.getTag(this.id.toString(), tagId)).body;
        return new Tag(this._api, this.id, result.id, result);
    }
    /**
     * Retrieves information for a specific text item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get text item
     * @param itemId Unique identifier (ID) of the item that you want to retrieve.
     */
    async getTextItem(itemId) {
        const result = (await this._api.getTextItem(this.id.toString(), itemId)).body;
        return new TextItem(this._api, this.id, result.id, result);
    }
    /**
     * Creates a copy of an existing board. You can also update the name, description, sharing policy, and permissions policy for the new board in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 4</a><br/>
     * @summary Copy board
     * @param copyBoardChanges
     */
    async copy(copyBoardChanges) {
        const result = (await this._api.copyBoard(this.id.toString(), copyBoardChanges)).body;
        return new Board(this._api, result.id, result);
    }
    /**
     * Shares the board and Invites new members to collaborate on a board by sending an invitation email. Depending on the board\'s Sharing policy, there might be various scenarios where membership in the team is required in order to share the board with a user.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Share board
     * @param boardMembersInvite
     */
    async share(boardMembersInvite) {
        await this._api.shareBoard(this.id.toString(), boardMembersInvite);
    }
    /**
     * Updates a specific board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update board
     * @param boardChanges
     */
    async update(boardChanges) {
        await this._api.updateBoard(this.id.toString(), boardChanges);
    }
    /**
     * Deletes a board. Deleted boards go to Trash (on paid plans) and can be restored via UI within 90 days after deletion.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete board
     */
    async delete() {
        await this._api.deleteBoard(this.id.toString());
    }
    /**
     * Removes a board member from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Remove board member
     * @param boardMemberId Unique identifier (ID) of the board member whose role you want to delete.
     */
    async removeMember(boardMemberId) {
        await this._api.removeBoardMember(this.id.toString(), boardMemberId);
    }
    /**
     * Removes the specified tag from the specified item. The tag still exists on the board. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),   [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Remove tag from item
     * @param itemId Unique identifier (ID) of the item that you want to remove the tag from.
     * @param tagId Unique identifier (ID) of the tag that you want to remove from the item.
     */
    async removeTag(itemId, tagId) {
        await this._api.removeTagFromItem(this.id.toString(), itemId, tagId);
    }
}
exports.Board = Board;
class BoardMember extends boardMember_1.BoardMember {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates the role of a board member.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update board member
     * @param boardMemberChanges
     */
    async update(boardMemberChanges) {
        await this._api.updateBoardMember(this.boardId.toString(), this.id.toString(), boardMemberChanges);
    }
}
exports.BoardMember = BoardMember;
class Item extends Item_1.BaseItem {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates the position or the parent of an item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update item position or parent
     * @param genericItemUpdate
     */
    async update(genericItemUpdate) {
        await this._api.updateItemPositionOrParent(this.boardId.toString(), this.id.toString(), genericItemUpdate);
    }
    /**
     * Deletes an item from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete item
     */
    async delete() {
        await this._api.deleteItem(this.boardId.toString(), this.id.toString());
    }
}
exports.Item = Item;
class AppCardItem extends AppCardItem_1.BaseAppCardItem {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates an app card item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update app card item
     * @param appCardUpdateRequest
     */
    async update(appCardUpdateRequest) {
        await this._api.updateAppCardItem(this.boardId.toString(), this.id.toString(), appCardUpdateRequest);
    }
    /**
     * Deletes an app card item from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete app card item
     */
    async delete() {
        await this._api.deleteAppCardItem(this.boardId.toString(), this.id.toString());
    }
    /**
     * Retrieves all the tags from the specified item.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get tags from item
     */
    async getAllTags() {
        const result = (await this._api.getTagsFromItem(this.boardId.toString(), this.id.toString())).body;
        return result.tags
            ? result.tags.map((result) => {
                return new Tag(this._api, this.boardId, result.id, result);
            })
            : [];
    }
    /**
     * Removes the specified tag from the specified item. The tag still exists on the board. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),   [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Remove tag from item
     * @param tagId Unique identifier (ID) of the tag that you want to remove from the item.
     */
    async removeTag(tagId) {
        await this._api.removeTagFromItem(this.boardId.toString(), this.id.toString(), tagId);
    }
    /**
     * Attach an existing tag to the specified item. Card and sticky note items can have up to 8 tags. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:   [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),  [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Attach tag to item
     * @param tagId Unique identifier (ID) of the tag you want to add to the item.
     */
    async attachTag(tagId) {
        await this._api.attachTagToItem(this.boardId.toString(), this.id.toString(), tagId);
    }
}
exports.AppCardItem = AppCardItem;
class CardItem extends CardItem_1.BaseCardItem {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates a card item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update card item
     * @param cardUpdateRequest
     */
    async update(cardUpdateRequest) {
        await this._api.updateCardItem(this.boardId.toString(), this.id.toString(), cardUpdateRequest);
    }
    /**
     * Deletes a card item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete card item
     */
    async delete() {
        await this._api.deleteCardItem(this.boardId.toString(), this.id.toString());
    }
    /**
     * Retrieves all the tags from the specified item.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get tags from item
     */
    async getAllTags() {
        const result = (await this._api.getTagsFromItem(this.boardId.toString(), this.id.toString())).body;
        return result.tags
            ? result.tags.map((result) => {
                return new Tag(this._api, this.boardId, result.id, result);
            })
            : [];
    }
    /**
     * Removes the specified tag from the specified item. The tag still exists on the board. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),   [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Remove tag from item
     * @param tagId Unique identifier (ID) of the tag that you want to remove from the item.
     */
    async removeTag(tagId) {
        await this._api.removeTagFromItem(this.boardId.toString(), this.id.toString(), tagId);
    }
    /**
     * Attach an existing tag to the specified item. Card and sticky note items can have up to 8 tags. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:   [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),  [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Attach tag to item
     * @param tagId Unique identifier (ID) of the tag you want to add to the item.
     */
    async attachTag(tagId) {
        await this._api.attachTagToItem(this.boardId.toString(), this.id.toString(), tagId);
    }
}
exports.CardItem = CardItem;
class DocumentItem extends DocumentItem_1.BaseDocumentItem {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates a document item on a board by using file from a device.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update document item using file from device
     * @param resource Select a file to upload. Maximum file size is 6 MB.
     * @param data
     */
    async updateUsingFile(resource, data) {
        await this._api.updateDocumentItemUsingFileFromDevice(this.boardId.toString(), this.id.toString(), resource, data);
    }
    /**
     * Updates a document item on a board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update document item using URL
     * @param documentUpdateRequest
     */
    async updateUsingUrl(documentUpdateRequest) {
        await this._api.updateDocumentItemUsingUrl(this.boardId.toString(), this.id.toString(), documentUpdateRequest);
    }
    /**
     * Deletes a document item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete document item
     */
    async delete() {
        await this._api.deleteDocumentItem(this.boardId.toString(), this.id.toString());
    }
}
exports.DocumentItem = DocumentItem;
class EmbedItem extends EmbedItem_1.BaseEmbedItem {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates an embed item on a board based on the data properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update embed item
     * @param embedUpdateRequest
     */
    async update(embedUpdateRequest) {
        await this._api.updateEmbedItem(this.boardId.toString(), this.id.toString(), embedUpdateRequest);
    }
    /**
     * Deletes an embed item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete embed item
     */
    async delete() {
        await this._api.deleteEmbedItem(this.boardId.toString(), this.id.toString());
    }
}
exports.EmbedItem = EmbedItem;
class FrameItem extends FrameItem_1.BaseFrameItem {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates a frame on a board based on the data, style, or geometry properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update frame
     * @param frameUpdateRequest
     */
    async update(frameUpdateRequest) {
        await this._api.updateFrameItem(this.boardId.toString(), this.id.toString(), frameUpdateRequest);
    }
    /**
     * Deletes a frame from a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete frame
     */
    async delete() {
        await this._api.deleteFrameItem(this.boardId.toString(), this.id.toString());
    }
}
exports.FrameItem = FrameItem;
class ImageItem extends ImageItem_1.BaseImageItem {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates an image item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update image item using file from device
     * @param resource Select a file to upload. Maximum file size is 6 MB.
     * @param data
     */
    async updateUsingFile(resource, data) {
        await this._api.updateImageItemUsingFileFromDevice(this.boardId.toString(), this.id.toString(), resource, data);
    }
    /**
     * Updates an image item on a board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update image item using URL
     * @param imageUpdateRequest
     */
    async updateUsingUrl(imageUpdateRequest) {
        await this._api.updateImageItemUsingUrl(this.boardId.toString(), this.id.toString(), imageUpdateRequest);
    }
    /**
     * Deletes an image item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete image item
     */
    async delete() {
        await this._api.deleteImageItem(this.boardId.toString(), this.id.toString());
    }
}
exports.ImageItem = ImageItem;
class ShapeItem extends ShapeItem_1.BaseShapeItem {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates a shape item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update shape item
     * @param shapeUpdateRequest
     */
    async update(shapeUpdateRequest) {
        await this._api.updateShapeItem(this.boardId.toString(), this.id.toString(), shapeUpdateRequest);
    }
    /**
     * Deletes a shape item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete shape item
     */
    async delete() {
        await this._api.deleteShapeItem(this.boardId.toString(), this.id.toString());
    }
}
exports.ShapeItem = ShapeItem;
class StickyNoteItem extends StickyNoteItem_1.BaseStickyNoteItem {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates a sticky note item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update sticky note item
     * @param stickyNoteUpdateRequest
     */
    async update(stickyNoteUpdateRequest) {
        await this._api.updateStickyNoteItem(this.boardId.toString(), this.id.toString(), stickyNoteUpdateRequest);
    }
    /**
     * Deletes a sticky note item from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete sticky note item
     */
    async delete() {
        await this._api.deleteStickyNoteItem(this.boardId.toString(), this.id.toString());
    }
    /**
     * Retrieves all the tags from the specified item.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:read</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Get tags from item
     */
    async getAllTags() {
        const result = (await this._api.getTagsFromItem(this.boardId.toString(), this.id.toString())).body;
        return result.tags
            ? result.tags.map((result) => {
                return new Tag(this._api, this.boardId, result.id, result);
            })
            : [];
    }
    /**
     * Removes the specified tag from the specified item. The tag still exists on the board. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),   [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Remove tag from item
     * @param tagId Unique identifier (ID) of the tag that you want to remove from the item.
     */
    async removeTag(tagId) {
        await this._api.removeTagFromItem(this.boardId.toString(), this.id.toString(), tagId);
    }
    /**
     * Attach an existing tag to the specified item. Card and sticky note items can have up to 8 tags. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:   [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),  [Update tag](https://developers.miro.com/reference/update-tag),  [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Attach tag to item
     * @param tagId Unique identifier (ID) of the tag you want to add to the item.
     */
    async attachTag(tagId) {
        await this._api.attachTagToItem(this.boardId.toString(), this.id.toString(), tagId);
    }
}
exports.StickyNoteItem = StickyNoteItem;
class TextItem extends TextItem_1.BaseTextItem {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates a text item on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update text item
     * @param textUpdateRequest
     */
    async update(textUpdateRequest) {
        await this._api.updateTextItem(this.boardId.toString(), this.id.toString(), textUpdateRequest);
    }
    /**
     * Deletes a text item from the board<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete text item
     */
    async delete() {
        await this._api.deleteTextItem(this.boardId.toString(), this.id.toString());
    }
}
exports.TextItem = TextItem;
class Connector extends connectorWithLinks_1.ConnectorWithLinks {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates a connector on a board based on the data and style properties provided in the request body.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 2</a><br/>
     * @summary Update connector
     * @param connectorChangesData
     */
    async update(connectorChangesData) {
        await this._api.updateConnector(this.boardId.toString(), this.id.toString(), connectorChangesData);
    }
    /**
     * Deletes the specified connector from the board.<br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 3</a><br/>
     * @summary Delete connector
     */
    async delete() {
        await this._api.deleteConnector(this.boardId.toString(), this.id.toString());
    }
}
exports.Connector = Connector;
class Tag extends Tag_1.BaseTag {
    /** @hidden */
    constructor(api, boardId, id, props) {
        super();
        this._api = api;
        this.boardId = boardId;
        this.id = id;
        Object.assign(this, props);
    }
    /**
     * Updates a tag based on the data properties provided in the request body. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),  [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),   [Delete tag](https://developers.miro.com/reference/delete-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Update tag
     * @param tagUpdateRequest
     */
    async update(tagUpdateRequest) {
        await this._api.updateTag(this.boardId.toString(), this.id.toString(), tagUpdateRequest);
    }
    /**
     * Deletes the specified tag from the board. The tag is also removed from all cards and sticky notes on the board. <br><blockquote><strong>Note:</strong> Updates to tags made via the REST API  will not be reflected on the board in realtime. To see REST API updates to tags on a board,  you need to refresh the board. This applies to the following endpoints:  [Attach tag to item](https://developers.miro.com/reference/attach-tag-to-item),  [Remove tag from item](https://developers.miro.com/reference/remove-tag-from-item),  [Update tag](https://developers.miro.com/reference/update-tag).</blockquote><br/><h3>Required scope</h3> <a target=_blank href=https://developers.miro.com/reference/scopes>boards:write</a> <br/><h3>Rate limiting</h3> <a target=_blank href=\"/docs/miro-rest-api-introduction#rate-limiting\">Level 1</a><br/>
     * @summary Delete tag
     */
    async delete() {
        await this._api.deleteTag(this.boardId.toString(), this.id.toString());
    }
}
exports.Tag = Tag;
