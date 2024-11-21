"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSerializer = void 0;
__exportStar(require("./addProjectMemberRequest"), exports);
__exportStar(require("./adminRole"), exports);
__exportStar(require("./appCardCreateRequest"), exports);
__exportStar(require("./appCardData"), exports);
__exportStar(require("./appCardDataChanges"), exports);
__exportStar(require("./appCardDataResponse"), exports);
__exportStar(require("./appCardItem"), exports);
__exportStar(require("./appCardStyle"), exports);
__exportStar(require("./appCardStylePlatformbulkcreateoperation"), exports);
__exportStar(require("./appCardUpdateRequest"), exports);
__exportStar(require("./auditContext"), exports);
__exportStar(require("./auditCreatedBy"), exports);
__exportStar(require("./auditEvent"), exports);
__exportStar(require("./auditObject"), exports);
__exportStar(require("./auditOrganization"), exports);
__exportStar(require("./auditPage"), exports);
__exportStar(require("./auditTeam"), exports);
__exportStar(require("./basicError"), exports);
__exportStar(require("./basicErrorOrganizationsEnterprisePlan"), exports);
__exportStar(require("./board"), exports);
__exportStar(require("./boardChanges"), exports);
__exportStar(require("./boardContentLogData"), exports);
__exportStar(require("./boardDataClassificationLabel"), exports);
__exportStar(require("./boardExportJobId"), exports);
__exportStar(require("./boardExportJobStatus"), exports);
__exportStar(require("./boardExportResult"), exports);
__exportStar(require("./boardExportTaskResult"), exports);
__exportStar(require("./boardItemContentLog"), exports);
__exportStar(require("./boardLinks"), exports);
__exportStar(require("./boardMember"), exports);
__exportStar(require("./boardMemberChanges"), exports);
__exportStar(require("./boardMemberWithLinks"), exports);
__exportStar(require("./boardMembersInvite"), exports);
__exportStar(require("./boardMembersPagedResponse"), exports);
__exportStar(require("./boardPermissionsPolicy"), exports);
__exportStar(require("./boardPolicy"), exports);
__exportStar(require("./boardPolicyChange"), exports);
__exportStar(require("./boardProject"), exports);
__exportStar(require("./boardSharingPolicy"), exports);
__exportStar(require("./boardSharingPolicyChange"), exports);
__exportStar(require("./boardSubscription"), exports);
__exportStar(require("./boardSubscriptionData"), exports);
__exportStar(require("./boardWithLinks"), exports);
__exportStar(require("./boardWithLinksAndLastOpened"), exports);
__exportStar(require("./boardWithLinksAndWithoutProject"), exports);
__exportStar(require("./boardsPagedResponse"), exports);
__exportStar(require("./bulkOperationError"), exports);
__exportStar(require("./bulkOperationErrorContext"), exports);
__exportStar(require("./bulkSubOperationError"), exports);
__exportStar(require("./caption"), exports);
__exportStar(require("./cardCreateRequest"), exports);
__exportStar(require("./cardData"), exports);
__exportStar(require("./cardDataPlatformbulkcreateoperation"), exports);
__exportStar(require("./cardItem"), exports);
__exportStar(require("./cardStyle"), exports);
__exportStar(require("./cardStylePlatformbulkcreateoperation"), exports);
__exportStar(require("./cardUpdateRequest"), exports);
__exportStar(require("./connectorChangesData"), exports);
__exportStar(require("./connectorCreationData"), exports);
__exportStar(require("./connectorStyle"), exports);
__exportStar(require("./connectorWithLinks"), exports);
__exportStar(require("./connectorsCursorPaged"), exports);
__exportStar(require("./copyBoardChanges"), exports);
__exportStar(require("./createBoardExportRequest"), exports);
__exportStar(require("./createBoardSubscriptionRequest"), exports);
__exportStar(require("./createDocumentItemUsingFileFromDeviceRequestData"), exports);
__exportStar(require("./createFrameItem400Response"), exports);
__exportStar(require("./createProjectRequest"), exports);
__exportStar(require("./createTeamRequest"), exports);
__exportStar(require("./createdBy"), exports);
__exportStar(require("./createdByPlatformContainers"), exports);
__exportStar(require("./createdByPlatformExperimentalFeatures"), exports);
__exportStar(require("./createdByPlatformFileUpload"), exports);
__exportStar(require("./createdByPlatformTags"), exports);
__exportStar(require("./createdByPlatformcreateitemsinbulkusingfilefromdevice"), exports);
__exportStar(require("./createdByPlatformgroups"), exports);
__exportStar(require("./customField"), exports);
__exportStar(require("./customFieldPlatformTags"), exports);
__exportStar(require("./customFieldPlatformbulkcreateoperation"), exports);
__exportStar(require("./dataClassificationLabel"), exports);
__exportStar(require("./dataClassificationLabelId"), exports);
__exportStar(require("./dataClassificationOrganizationSettings"), exports);
__exportStar(require("./dataClassificationTeamSettings"), exports);
__exportStar(require("./documentCreateRequest"), exports);
__exportStar(require("./documentData"), exports);
__exportStar(require("./documentDataResponse"), exports);
__exportStar(require("./documentDataResponsePlatformcreateitemsinbulkusingfilefromdevice"), exports);
__exportStar(require("./documentItem"), exports);
__exportStar(require("./documentItemPlatformFileUpload"), exports);
__exportStar(require("./documentUpdateRequest"), exports);
__exportStar(require("./documentUrlData"), exports);
__exportStar(require("./documentUrlDataChanges"), exports);
__exportStar(require("./documentUrlDataPlatformbulkcreateoperation"), exports);
__exportStar(require("./embedCreateRequest"), exports);
__exportStar(require("./embedData"), exports);
__exportStar(require("./embedDataResponse"), exports);
__exportStar(require("./embedItem"), exports);
__exportStar(require("./embedUpdateRequest"), exports);
__exportStar(require("./embedUrlData"), exports);
__exportStar(require("./embedUrlDataChanges"), exports);
__exportStar(require("./embedUrlDataPlatformbulkcreateoperation"), exports);
__exportStar(require("./enterpriseGetOrganizationMembers200Response"), exports);
__exportStar(require("./error400"), exports);
__exportStar(require("./error401"), exports);
__exportStar(require("./error403"), exports);
__exportStar(require("./error404"), exports);
__exportStar(require("./error409"), exports);
__exportStar(require("./error429"), exports);
__exportStar(require("./fixedRatioGeometry"), exports);
__exportStar(require("./fixedRatioGeometryPlatformFileUpload"), exports);
__exportStar(require("./fixedRatioNoRotationGeometry"), exports);
__exportStar(require("./frameChanges"), exports);
__exportStar(require("./frameCreateRequest"), exports);
__exportStar(require("./frameData"), exports);
__exportStar(require("./frameDataPlatformContainers"), exports);
__exportStar(require("./frameItem"), exports);
__exportStar(require("./frameStyle"), exports);
__exportStar(require("./frameUpdateRequest"), exports);
__exportStar(require("./genericItem"), exports);
__exportStar(require("./genericItemCursorPaged"), exports);
__exportStar(require("./genericItemCursorPagedPlatformContainers"), exports);
__exportStar(require("./genericItemPlatformTags"), exports);
__exportStar(require("./genericItemUpdate"), exports);
__exportStar(require("./genericSubscription"), exports);
__exportStar(require("./genericSubscriptionsCursorPaged"), exports);
__exportStar(require("./geometry"), exports);
__exportStar(require("./geometryNoRotation"), exports);
__exportStar(require("./geometryPlatformContainers"), exports);
__exportStar(require("./geometryPlatformExperimentalFeatures"), exports);
__exportStar(require("./geometryPlatformFileUpload"), exports);
__exportStar(require("./geometryPlatformTags"), exports);
__exportStar(require("./geometryPlatformbulkcreateoperation"), exports);
__exportStar(require("./geometryPlatformcreateitemsinbulkusingfilefromdevice"), exports);
__exportStar(require("./geometryPlatformgroups"), exports);
__exportStar(require("./getAllGroups200Response"), exports);
__exportStar(require("./getAllGroups400Response"), exports);
__exportStar(require("./getAllGroups404Response"), exports);
__exportStar(require("./getAllGroups429Response"), exports);
__exportStar(require("./getBoardItemContentLogsResponse"), exports);
__exportStar(require("./getBoardUserInfoLastOpenedBy"), exports);
__exportStar(require("./getItemsByGroupId200Response"), exports);
__exportStar(require("./getItemsByGroupId200ResponseData"), exports);
__exportStar(require("./getMetrics200ResponseInner"), exports);
__exportStar(require("./getMetrics404Response"), exports);
__exportStar(require("./getMetricsTotal200Response"), exports);
__exportStar(require("./getMetricsTotal404Response"), exports);
__exportStar(require("./getTagsFromItem400Response"), exports);
__exportStar(require("./getTagsResponse"), exports);
__exportStar(require("./group"), exports);
__exportStar(require("./groupData"), exports);
__exportStar(require("./groupResponseShort"), exports);
__exportStar(require("./imageCreateRequest"), exports);
__exportStar(require("./imageData"), exports);
__exportStar(require("./imageDataResponse"), exports);
__exportStar(require("./imageDataResponsePlatformcreateitemsinbulkusingfilefromdevice"), exports);
__exportStar(require("./imageItem"), exports);
__exportStar(require("./imageItemPlatformFileUpload"), exports);
__exportStar(require("./imageUpdateRequest"), exports);
__exportStar(require("./imageUrlData"), exports);
__exportStar(require("./imageUrlDataChanges"), exports);
__exportStar(require("./invitationError"), exports);
__exportStar(require("./invitationResult"), exports);
__exportStar(require("./item"), exports);
__exportStar(require("./itemChanges"), exports);
__exportStar(require("./itemConnectionChangesData"), exports);
__exportStar(require("./itemConnectionCreationData"), exports);
__exportStar(require("./itemConnectionWithLinks"), exports);
__exportStar(require("./itemCreate"), exports);
__exportStar(require("./itemData"), exports);
__exportStar(require("./itemDataChanges"), exports);
__exportStar(require("./itemDataCreate"), exports);
__exportStar(require("./itemPagedResponse"), exports);
__exportStar(require("./itemPagedResponsePlatformTags"), exports);
__exportStar(require("./itemStyle"), exports);
__exportStar(require("./itemTypeChange"), exports);
__exportStar(require("./items"), exports);
__exportStar(require("./itemsPage"), exports);
__exportStar(require("./mindMapNodeGeometry"), exports);
__exportStar(require("./mindmapCreateRequest"), exports);
__exportStar(require("./mindmapCursorPaged"), exports);
__exportStar(require("./mindmapData"), exports);
__exportStar(require("./mindmapDataForCreate"), exports);
__exportStar(require("./mindmapItem"), exports);
__exportStar(require("./mindmapNode"), exports);
__exportStar(require("./mindmapNodeStyle"), exports);
__exportStar(require("./mindmapNodeTextData"), exports);
__exportStar(require("./mindmapNodeView"), exports);
__exportStar(require("./mindmapStyle"), exports);
__exportStar(require("./mindmapWidgetDataOutput"), exports);
__exportStar(require("./modelError"), exports);
__exportStar(require("./modifiedBy"), exports);
__exportStar(require("./modifiedByPlatformContainers"), exports);
__exportStar(require("./modifiedByPlatformExperimentalFeatures"), exports);
__exportStar(require("./modifiedByPlatformFileUpload"), exports);
__exportStar(require("./modifiedByPlatformTags"), exports);
__exportStar(require("./modifiedByPlatformcreateitemsinbulkusingfilefromdevice"), exports);
__exportStar(require("./modifiedByPlatformgroups"), exports);
__exportStar(require("./organization"), exports);
__exportStar(require("./organizationInformation"), exports);
__exportStar(require("./organizationMember"), exports);
__exportStar(require("./organizationMembersSearchResponse"), exports);
__exportStar(require("./pageLinks"), exports);
__exportStar(require("./pageLinksPlatformExperimentalFeatures"), exports);
__exportStar(require("./parent"), exports);
__exportStar(require("./parentLinksEnvelope"), exports);
__exportStar(require("./parentLinksEnvelopePlatformContainers"), exports);
__exportStar(require("./parentWithLinks"), exports);
__exportStar(require("./parentWithLinksPlatformcreateitemsinbulkusingfilefromdevice"), exports);
__exportStar(require("./picture"), exports);
__exportStar(require("./position"), exports);
__exportStar(require("./positionChange"), exports);
__exportStar(require("./project"), exports);
__exportStar(require("./projectMember"), exports);
__exportStar(require("./projectMemberPage"), exports);
__exportStar(require("./projectPage"), exports);
__exportStar(require("./projectRole"), exports);
__exportStar(require("./projectRoleToAdd"), exports);
__exportStar(require("./projectSettings"), exports);
__exportStar(require("./relativeOffset"), exports);
__exportStar(require("./selfLink"), exports);
__exportStar(require("./selfLinkPlatformFileUpload"), exports);
__exportStar(require("./selfLinkPlatformTags"), exports);
__exportStar(require("./shapeCreateRequest"), exports);
__exportStar(require("./shapeData"), exports);
__exportStar(require("./shapeDataForCreate"), exports);
__exportStar(require("./shapeDataForUpdate"), exports);
__exportStar(require("./shapeDataPlatformTags"), exports);
__exportStar(require("./shapeItem"), exports);
__exportStar(require("./shapeStyle"), exports);
__exportStar(require("./shapeStyleForCreate"), exports);
__exportStar(require("./shapeStyleForUpdate"), exports);
__exportStar(require("./shapeUpdateRequest"), exports);
__exportStar(require("./sharingPolicySettings"), exports);
__exportStar(require("./stickyNoteCreateRequest"), exports);
__exportStar(require("./stickyNoteData"), exports);
__exportStar(require("./stickyNoteDataPlatformTags"), exports);
__exportStar(require("./stickyNoteDataPlatformbulkcreateoperation"), exports);
__exportStar(require("./stickyNoteItem"), exports);
__exportStar(require("./stickyNoteStyle"), exports);
__exportStar(require("./stickyNoteStylePlatformbulkcreateoperation"), exports);
__exportStar(require("./stickyNoteUpdateRequest"), exports);
__exportStar(require("./subscriptionData"), exports);
__exportStar(require("./tag"), exports);
__exportStar(require("./tagCreateRequest"), exports);
__exportStar(require("./tagUpdateRequest"), exports);
__exportStar(require("./tagWithLinks"), exports);
__exportStar(require("./tagsPagedResponse"), exports);
__exportStar(require("./team"), exports);
__exportStar(require("./teamAccess"), exports);
__exportStar(require("./teamAccountDiscoverySettings"), exports);
__exportStar(require("./teamAccountDiscoverySettingsChanges"), exports);
__exportStar(require("./teamChanges"), exports);
__exportStar(require("./teamCollaborationSettings"), exports);
__exportStar(require("./teamCollaborationSettingsChanges"), exports);
__exportStar(require("./teamCopyAccessLevelSettings"), exports);
__exportStar(require("./teamCopyAccessLevelSettingsChanges"), exports);
__exportStar(require("./teamInformation"), exports);
__exportStar(require("./teamInvitationSettings"), exports);
__exportStar(require("./teamInvitationSettingsChanges"), exports);
__exportStar(require("./teamMember"), exports);
__exportStar(require("./teamMemberChanges"), exports);
__exportStar(require("./teamMemberInvite"), exports);
__exportStar(require("./teamMembersPage"), exports);
__exportStar(require("./teamSettings"), exports);
__exportStar(require("./teamSettingsChanges"), exports);
__exportStar(require("./teamSharingPolicySettings"), exports);
__exportStar(require("./teamSharingPolicySettingsChanges"), exports);
__exportStar(require("./teamsPage"), exports);
__exportStar(require("./textCreateRequest"), exports);
__exportStar(require("./textData"), exports);
__exportStar(require("./textDataPlatformTags"), exports);
__exportStar(require("./textDataPlatformbulkcreateoperation"), exports);
__exportStar(require("./textItem"), exports);
__exportStar(require("./textStyle"), exports);
__exportStar(require("./textUpdateRequest"), exports);
__exportStar(require("./tokenInformation"), exports);
__exportStar(require("./unGroup400Response"), exports);
__exportStar(require("./unGroup404Response"), exports);
__exportStar(require("./unGroup429Response"), exports);
__exportStar(require("./updateAppCardStyle"), exports);
__exportStar(require("./updateBoardSubscriptionRequest"), exports);
__exportStar(require("./updateBoardsDataClassificationLabel"), exports);
__exportStar(require("./updateBoardsDataClassificationLabelRequest"), exports);
__exportStar(require("./updateCardStyle"), exports);
__exportStar(require("./updateConnectorStyle"), exports);
__exportStar(require("./updateFrameItem409Response"), exports);
__exportStar(require("./updateFrameStyle"), exports);
__exportStar(require("./updateProjectMemberRequest"), exports);
__exportStar(require("./updateProjectRequest"), exports);
__exportStar(require("./updateProjectSettingsRequest"), exports);
__exportStar(require("./updateShapeStyle"), exports);
__exportStar(require("./updateStickyNoteStyle"), exports);
__exportStar(require("./updateTeamSettingsRequest"), exports);
__exportStar(require("./updateTextStyle"), exports);
__exportStar(require("./uploadFileFromDeviceData"), exports);
__exportStar(require("./user"), exports);
__exportStar(require("./userInfoLastOpenedBy"), exports);
__exportStar(require("./userInfoShort"), exports);
__exportStar(require("./userInformation"), exports);
__exportStar(require("./widgetDataOutput"), exports);
__exportStar(require("./widgetLinks"), exports);
__exportStar(require("./widgetLinksPlatformContainers"), exports);
__exportStar(require("./widgetLinksPlatformExperimentalFeatures"), exports);
__exportStar(require("./widgetLinksPlatformFileUpload"), exports);
__exportStar(require("./widthOnlyAdjustableGeometry"), exports);
const addProjectMemberRequest_1 = require("./addProjectMemberRequest");
const adminRole_1 = require("./adminRole");
const appCardCreateRequest_1 = require("./appCardCreateRequest");
const appCardData_1 = require("./appCardData");
const appCardDataChanges_1 = require("./appCardDataChanges");
const appCardDataResponse_1 = require("./appCardDataResponse");
const appCardItem_1 = require("./appCardItem");
const appCardStyle_1 = require("./appCardStyle");
const appCardStylePlatformbulkcreateoperation_1 = require("./appCardStylePlatformbulkcreateoperation");
const appCardUpdateRequest_1 = require("./appCardUpdateRequest");
const auditContext_1 = require("./auditContext");
const auditCreatedBy_1 = require("./auditCreatedBy");
const auditEvent_1 = require("./auditEvent");
const auditObject_1 = require("./auditObject");
const auditOrganization_1 = require("./auditOrganization");
const auditPage_1 = require("./auditPage");
const auditTeam_1 = require("./auditTeam");
const basicError_1 = require("./basicError");
const basicErrorOrganizationsEnterprisePlan_1 = require("./basicErrorOrganizationsEnterprisePlan");
const board_1 = require("./board");
const boardChanges_1 = require("./boardChanges");
const boardContentLogData_1 = require("./boardContentLogData");
const boardDataClassificationLabel_1 = require("./boardDataClassificationLabel");
const boardExportJobId_1 = require("./boardExportJobId");
const boardExportJobStatus_1 = require("./boardExportJobStatus");
const boardExportResult_1 = require("./boardExportResult");
const boardExportTaskResult_1 = require("./boardExportTaskResult");
const boardItemContentLog_1 = require("./boardItemContentLog");
const boardLinks_1 = require("./boardLinks");
const boardMember_1 = require("./boardMember");
const boardMemberChanges_1 = require("./boardMemberChanges");
const boardMemberWithLinks_1 = require("./boardMemberWithLinks");
const boardMembersInvite_1 = require("./boardMembersInvite");
const boardMembersPagedResponse_1 = require("./boardMembersPagedResponse");
const boardPermissionsPolicy_1 = require("./boardPermissionsPolicy");
const boardPolicy_1 = require("./boardPolicy");
const boardPolicyChange_1 = require("./boardPolicyChange");
const boardProject_1 = require("./boardProject");
const boardSharingPolicy_1 = require("./boardSharingPolicy");
const boardSharingPolicyChange_1 = require("./boardSharingPolicyChange");
const boardSubscription_1 = require("./boardSubscription");
const boardSubscriptionData_1 = require("./boardSubscriptionData");
const boardWithLinks_1 = require("./boardWithLinks");
const boardWithLinksAndLastOpened_1 = require("./boardWithLinksAndLastOpened");
const boardWithLinksAndWithoutProject_1 = require("./boardWithLinksAndWithoutProject");
const boardsPagedResponse_1 = require("./boardsPagedResponse");
const bulkOperationError_1 = require("./bulkOperationError");
const bulkOperationErrorContext_1 = require("./bulkOperationErrorContext");
const bulkSubOperationError_1 = require("./bulkSubOperationError");
const caption_1 = require("./caption");
const cardCreateRequest_1 = require("./cardCreateRequest");
const cardData_1 = require("./cardData");
const cardDataPlatformbulkcreateoperation_1 = require("./cardDataPlatformbulkcreateoperation");
const cardItem_1 = require("./cardItem");
const cardStyle_1 = require("./cardStyle");
const cardStylePlatformbulkcreateoperation_1 = require("./cardStylePlatformbulkcreateoperation");
const cardUpdateRequest_1 = require("./cardUpdateRequest");
const connectorChangesData_1 = require("./connectorChangesData");
const connectorCreationData_1 = require("./connectorCreationData");
const connectorStyle_1 = require("./connectorStyle");
const connectorWithLinks_1 = require("./connectorWithLinks");
const connectorsCursorPaged_1 = require("./connectorsCursorPaged");
const copyBoardChanges_1 = require("./copyBoardChanges");
const createBoardExportRequest_1 = require("./createBoardExportRequest");
const createBoardSubscriptionRequest_1 = require("./createBoardSubscriptionRequest");
const createDocumentItemUsingFileFromDeviceRequestData_1 = require("./createDocumentItemUsingFileFromDeviceRequestData");
const createFrameItem400Response_1 = require("./createFrameItem400Response");
const createProjectRequest_1 = require("./createProjectRequest");
const createTeamRequest_1 = require("./createTeamRequest");
const createdBy_1 = require("./createdBy");
const createdByPlatformContainers_1 = require("./createdByPlatformContainers");
const createdByPlatformExperimentalFeatures_1 = require("./createdByPlatformExperimentalFeatures");
const createdByPlatformFileUpload_1 = require("./createdByPlatformFileUpload");
const createdByPlatformTags_1 = require("./createdByPlatformTags");
const createdByPlatformcreateitemsinbulkusingfilefromdevice_1 = require("./createdByPlatformcreateitemsinbulkusingfilefromdevice");
const createdByPlatformgroups_1 = require("./createdByPlatformgroups");
const customField_1 = require("./customField");
const customFieldPlatformTags_1 = require("./customFieldPlatformTags");
const customFieldPlatformbulkcreateoperation_1 = require("./customFieldPlatformbulkcreateoperation");
const dataClassificationLabel_1 = require("./dataClassificationLabel");
const dataClassificationLabelId_1 = require("./dataClassificationLabelId");
const dataClassificationOrganizationSettings_1 = require("./dataClassificationOrganizationSettings");
const dataClassificationTeamSettings_1 = require("./dataClassificationTeamSettings");
const documentCreateRequest_1 = require("./documentCreateRequest");
const documentData_1 = require("./documentData");
const documentDataResponse_1 = require("./documentDataResponse");
const documentDataResponsePlatformcreateitemsinbulkusingfilefromdevice_1 = require("./documentDataResponsePlatformcreateitemsinbulkusingfilefromdevice");
const documentItem_1 = require("./documentItem");
const documentItemPlatformFileUpload_1 = require("./documentItemPlatformFileUpload");
const documentUpdateRequest_1 = require("./documentUpdateRequest");
const documentUrlData_1 = require("./documentUrlData");
const documentUrlDataChanges_1 = require("./documentUrlDataChanges");
const documentUrlDataPlatformbulkcreateoperation_1 = require("./documentUrlDataPlatformbulkcreateoperation");
const embedCreateRequest_1 = require("./embedCreateRequest");
const embedData_1 = require("./embedData");
const embedDataResponse_1 = require("./embedDataResponse");
const embedItem_1 = require("./embedItem");
const embedUpdateRequest_1 = require("./embedUpdateRequest");
const embedUrlData_1 = require("./embedUrlData");
const embedUrlDataChanges_1 = require("./embedUrlDataChanges");
const embedUrlDataPlatformbulkcreateoperation_1 = require("./embedUrlDataPlatformbulkcreateoperation");
const enterpriseGetOrganizationMembers200Response_1 = require("./enterpriseGetOrganizationMembers200Response");
const error400_1 = require("./error400");
const error401_1 = require("./error401");
const error403_1 = require("./error403");
const error404_1 = require("./error404");
const error409_1 = require("./error409");
const error429_1 = require("./error429");
const fixedRatioGeometry_1 = require("./fixedRatioGeometry");
const fixedRatioGeometryPlatformFileUpload_1 = require("./fixedRatioGeometryPlatformFileUpload");
const fixedRatioNoRotationGeometry_1 = require("./fixedRatioNoRotationGeometry");
const frameChanges_1 = require("./frameChanges");
const frameCreateRequest_1 = require("./frameCreateRequest");
const frameData_1 = require("./frameData");
const frameDataPlatformContainers_1 = require("./frameDataPlatformContainers");
const frameItem_1 = require("./frameItem");
const frameStyle_1 = require("./frameStyle");
const frameUpdateRequest_1 = require("./frameUpdateRequest");
const genericItem_1 = require("./genericItem");
const genericItemCursorPaged_1 = require("./genericItemCursorPaged");
const genericItemCursorPagedPlatformContainers_1 = require("./genericItemCursorPagedPlatformContainers");
const genericItemPlatformTags_1 = require("./genericItemPlatformTags");
const genericItemUpdate_1 = require("./genericItemUpdate");
const genericSubscription_1 = require("./genericSubscription");
const genericSubscriptionsCursorPaged_1 = require("./genericSubscriptionsCursorPaged");
const geometry_1 = require("./geometry");
const geometryNoRotation_1 = require("./geometryNoRotation");
const geometryPlatformContainers_1 = require("./geometryPlatformContainers");
const geometryPlatformExperimentalFeatures_1 = require("./geometryPlatformExperimentalFeatures");
const geometryPlatformFileUpload_1 = require("./geometryPlatformFileUpload");
const geometryPlatformTags_1 = require("./geometryPlatformTags");
const geometryPlatformbulkcreateoperation_1 = require("./geometryPlatformbulkcreateoperation");
const geometryPlatformcreateitemsinbulkusingfilefromdevice_1 = require("./geometryPlatformcreateitemsinbulkusingfilefromdevice");
const geometryPlatformgroups_1 = require("./geometryPlatformgroups");
const getAllGroups200Response_1 = require("./getAllGroups200Response");
const getAllGroups400Response_1 = require("./getAllGroups400Response");
const getAllGroups404Response_1 = require("./getAllGroups404Response");
const getAllGroups429Response_1 = require("./getAllGroups429Response");
const getBoardItemContentLogsResponse_1 = require("./getBoardItemContentLogsResponse");
const getBoardUserInfoLastOpenedBy_1 = require("./getBoardUserInfoLastOpenedBy");
const getItemsByGroupId200Response_1 = require("./getItemsByGroupId200Response");
const getItemsByGroupId200ResponseData_1 = require("./getItemsByGroupId200ResponseData");
const getMetrics200ResponseInner_1 = require("./getMetrics200ResponseInner");
const getMetrics404Response_1 = require("./getMetrics404Response");
const getMetricsTotal200Response_1 = require("./getMetricsTotal200Response");
const getMetricsTotal404Response_1 = require("./getMetricsTotal404Response");
const getTagsFromItem400Response_1 = require("./getTagsFromItem400Response");
const getTagsResponse_1 = require("./getTagsResponse");
const group_1 = require("./group");
const groupData_1 = require("./groupData");
const groupResponseShort_1 = require("./groupResponseShort");
const imageCreateRequest_1 = require("./imageCreateRequest");
const imageData_1 = require("./imageData");
const imageDataResponse_1 = require("./imageDataResponse");
const imageDataResponsePlatformcreateitemsinbulkusingfilefromdevice_1 = require("./imageDataResponsePlatformcreateitemsinbulkusingfilefromdevice");
const imageItem_1 = require("./imageItem");
const imageItemPlatformFileUpload_1 = require("./imageItemPlatformFileUpload");
const imageUpdateRequest_1 = require("./imageUpdateRequest");
const imageUrlData_1 = require("./imageUrlData");
const imageUrlDataChanges_1 = require("./imageUrlDataChanges");
const invitationError_1 = require("./invitationError");
const invitationResult_1 = require("./invitationResult");
const item_1 = require("./item");
const itemChanges_1 = require("./itemChanges");
const itemConnectionChangesData_1 = require("./itemConnectionChangesData");
const itemConnectionCreationData_1 = require("./itemConnectionCreationData");
const itemConnectionWithLinks_1 = require("./itemConnectionWithLinks");
const itemCreate_1 = require("./itemCreate");
const itemData_1 = require("./itemData");
const itemDataChanges_1 = require("./itemDataChanges");
const itemDataCreate_1 = require("./itemDataCreate");
const itemPagedResponse_1 = require("./itemPagedResponse");
const itemPagedResponsePlatformTags_1 = require("./itemPagedResponsePlatformTags");
const itemStyle_1 = require("./itemStyle");
const itemTypeChange_1 = require("./itemTypeChange");
const items_1 = require("./items");
const itemsPage_1 = require("./itemsPage");
const mindMapNodeGeometry_1 = require("./mindMapNodeGeometry");
const mindmapCreateRequest_1 = require("./mindmapCreateRequest");
const mindmapCursorPaged_1 = require("./mindmapCursorPaged");
const mindmapData_1 = require("./mindmapData");
const mindmapDataForCreate_1 = require("./mindmapDataForCreate");
const mindmapItem_1 = require("./mindmapItem");
const mindmapNode_1 = require("./mindmapNode");
const mindmapNodeStyle_1 = require("./mindmapNodeStyle");
const mindmapNodeTextData_1 = require("./mindmapNodeTextData");
const mindmapNodeView_1 = require("./mindmapNodeView");
const mindmapStyle_1 = require("./mindmapStyle");
const mindmapWidgetDataOutput_1 = require("./mindmapWidgetDataOutput");
const modelError_1 = require("./modelError");
const modifiedBy_1 = require("./modifiedBy");
const modifiedByPlatformContainers_1 = require("./modifiedByPlatformContainers");
const modifiedByPlatformExperimentalFeatures_1 = require("./modifiedByPlatformExperimentalFeatures");
const modifiedByPlatformFileUpload_1 = require("./modifiedByPlatformFileUpload");
const modifiedByPlatformTags_1 = require("./modifiedByPlatformTags");
const modifiedByPlatformcreateitemsinbulkusingfilefromdevice_1 = require("./modifiedByPlatformcreateitemsinbulkusingfilefromdevice");
const modifiedByPlatformgroups_1 = require("./modifiedByPlatformgroups");
const organization_1 = require("./organization");
const organizationInformation_1 = require("./organizationInformation");
const organizationMember_1 = require("./organizationMember");
const organizationMembersSearchResponse_1 = require("./organizationMembersSearchResponse");
const pageLinks_1 = require("./pageLinks");
const pageLinksPlatformExperimentalFeatures_1 = require("./pageLinksPlatformExperimentalFeatures");
const parent_1 = require("./parent");
const parentLinksEnvelope_1 = require("./parentLinksEnvelope");
const parentLinksEnvelopePlatformContainers_1 = require("./parentLinksEnvelopePlatformContainers");
const parentWithLinks_1 = require("./parentWithLinks");
const parentWithLinksPlatformcreateitemsinbulkusingfilefromdevice_1 = require("./parentWithLinksPlatformcreateitemsinbulkusingfilefromdevice");
const picture_1 = require("./picture");
const position_1 = require("./position");
const positionChange_1 = require("./positionChange");
const project_1 = require("./project");
const projectMember_1 = require("./projectMember");
const projectMemberPage_1 = require("./projectMemberPage");
const projectPage_1 = require("./projectPage");
const projectRole_1 = require("./projectRole");
const projectRoleToAdd_1 = require("./projectRoleToAdd");
const projectSettings_1 = require("./projectSettings");
const relativeOffset_1 = require("./relativeOffset");
const selfLink_1 = require("./selfLink");
const selfLinkPlatformFileUpload_1 = require("./selfLinkPlatformFileUpload");
const selfLinkPlatformTags_1 = require("./selfLinkPlatformTags");
const shapeCreateRequest_1 = require("./shapeCreateRequest");
const shapeData_1 = require("./shapeData");
const shapeDataForCreate_1 = require("./shapeDataForCreate");
const shapeDataForUpdate_1 = require("./shapeDataForUpdate");
const shapeDataPlatformTags_1 = require("./shapeDataPlatformTags");
const shapeItem_1 = require("./shapeItem");
const shapeStyle_1 = require("./shapeStyle");
const shapeStyleForCreate_1 = require("./shapeStyleForCreate");
const shapeStyleForUpdate_1 = require("./shapeStyleForUpdate");
const shapeUpdateRequest_1 = require("./shapeUpdateRequest");
const sharingPolicySettings_1 = require("./sharingPolicySettings");
const stickyNoteCreateRequest_1 = require("./stickyNoteCreateRequest");
const stickyNoteData_1 = require("./stickyNoteData");
const stickyNoteDataPlatformTags_1 = require("./stickyNoteDataPlatformTags");
const stickyNoteDataPlatformbulkcreateoperation_1 = require("./stickyNoteDataPlatformbulkcreateoperation");
const stickyNoteItem_1 = require("./stickyNoteItem");
const stickyNoteStyle_1 = require("./stickyNoteStyle");
const stickyNoteStylePlatformbulkcreateoperation_1 = require("./stickyNoteStylePlatformbulkcreateoperation");
const stickyNoteUpdateRequest_1 = require("./stickyNoteUpdateRequest");
const subscriptionData_1 = require("./subscriptionData");
const tag_1 = require("./tag");
const tagCreateRequest_1 = require("./tagCreateRequest");
const tagUpdateRequest_1 = require("./tagUpdateRequest");
const tagWithLinks_1 = require("./tagWithLinks");
const tagsPagedResponse_1 = require("./tagsPagedResponse");
const team_1 = require("./team");
const teamAccess_1 = require("./teamAccess");
const teamAccountDiscoverySettings_1 = require("./teamAccountDiscoverySettings");
const teamAccountDiscoverySettingsChanges_1 = require("./teamAccountDiscoverySettingsChanges");
const teamChanges_1 = require("./teamChanges");
const teamCollaborationSettings_1 = require("./teamCollaborationSettings");
const teamCollaborationSettingsChanges_1 = require("./teamCollaborationSettingsChanges");
const teamCopyAccessLevelSettings_1 = require("./teamCopyAccessLevelSettings");
const teamCopyAccessLevelSettingsChanges_1 = require("./teamCopyAccessLevelSettingsChanges");
const teamInformation_1 = require("./teamInformation");
const teamInvitationSettings_1 = require("./teamInvitationSettings");
const teamInvitationSettingsChanges_1 = require("./teamInvitationSettingsChanges");
const teamMember_1 = require("./teamMember");
const teamMemberChanges_1 = require("./teamMemberChanges");
const teamMemberInvite_1 = require("./teamMemberInvite");
const teamMembersPage_1 = require("./teamMembersPage");
const teamSettings_1 = require("./teamSettings");
const teamSettingsChanges_1 = require("./teamSettingsChanges");
const teamSharingPolicySettings_1 = require("./teamSharingPolicySettings");
const teamSharingPolicySettingsChanges_1 = require("./teamSharingPolicySettingsChanges");
const teamsPage_1 = require("./teamsPage");
const textCreateRequest_1 = require("./textCreateRequest");
const textData_1 = require("./textData");
const textDataPlatformTags_1 = require("./textDataPlatformTags");
const textDataPlatformbulkcreateoperation_1 = require("./textDataPlatformbulkcreateoperation");
const textItem_1 = require("./textItem");
const textStyle_1 = require("./textStyle");
const textUpdateRequest_1 = require("./textUpdateRequest");
const tokenInformation_1 = require("./tokenInformation");
const unGroup400Response_1 = require("./unGroup400Response");
const unGroup404Response_1 = require("./unGroup404Response");
const unGroup429Response_1 = require("./unGroup429Response");
const updateAppCardStyle_1 = require("./updateAppCardStyle");
const updateBoardSubscriptionRequest_1 = require("./updateBoardSubscriptionRequest");
const updateBoardsDataClassificationLabel_1 = require("./updateBoardsDataClassificationLabel");
const updateBoardsDataClassificationLabelRequest_1 = require("./updateBoardsDataClassificationLabelRequest");
const updateCardStyle_1 = require("./updateCardStyle");
const updateConnectorStyle_1 = require("./updateConnectorStyle");
const updateFrameItem409Response_1 = require("./updateFrameItem409Response");
const updateFrameStyle_1 = require("./updateFrameStyle");
const updateProjectMemberRequest_1 = require("./updateProjectMemberRequest");
const updateProjectRequest_1 = require("./updateProjectRequest");
const updateProjectSettingsRequest_1 = require("./updateProjectSettingsRequest");
const updateShapeStyle_1 = require("./updateShapeStyle");
const updateStickyNoteStyle_1 = require("./updateStickyNoteStyle");
const updateTeamSettingsRequest_1 = require("./updateTeamSettingsRequest");
const updateTextStyle_1 = require("./updateTextStyle");
const uploadFileFromDeviceData_1 = require("./uploadFileFromDeviceData");
const user_1 = require("./user");
const userInfoLastOpenedBy_1 = require("./userInfoLastOpenedBy");
const userInfoShort_1 = require("./userInfoShort");
const userInformation_1 = require("./userInformation");
const widgetDataOutput_1 = require("./widgetDataOutput");
const widgetLinks_1 = require("./widgetLinks");
const widgetLinksPlatformContainers_1 = require("./widgetLinksPlatformContainers");
const widgetLinksPlatformExperimentalFeatures_1 = require("./widgetLinksPlatformExperimentalFeatures");
const widgetLinksPlatformFileUpload_1 = require("./widgetLinksPlatformFileUpload");
const widthOnlyAdjustableGeometry_1 = require("./widthOnlyAdjustableGeometry");
/* tslint:disable:no-unused-variable */
let primitives = ['string', 'boolean', 'double', 'integer', 'long', 'float', 'number', 'any'];
let enumsMap = {
    'AdminRole.TypeEnum': adminRole_1.AdminRole.TypeEnum,
    'AppCardData.StatusEnum': appCardData_1.AppCardData.StatusEnum,
    'AppCardDataChanges.StatusEnum': appCardDataChanges_1.AppCardDataChanges.StatusEnum,
    'AppCardDataResponse.StatusEnum': appCardDataResponse_1.AppCardDataResponse.StatusEnum,
    'AuditCreatedBy.TypeEnum': auditCreatedBy_1.AuditCreatedBy.TypeEnum,
    'BoardMember.RoleEnum': boardMember_1.BoardMember.RoleEnum,
    'BoardMemberChanges.RoleEnum': boardMemberChanges_1.BoardMemberChanges.RoleEnum,
    'BoardMemberWithLinks.RoleEnum': boardMemberWithLinks_1.BoardMemberWithLinks.RoleEnum,
    'BoardMembersInvite.RoleEnum': boardMembersInvite_1.BoardMembersInvite.RoleEnum,
    'BoardPermissionsPolicy.CollaborationToolsStartAccessEnum': boardPermissionsPolicy_1.BoardPermissionsPolicy.CollaborationToolsStartAccessEnum,
    'BoardPermissionsPolicy.CopyAccessEnum': boardPermissionsPolicy_1.BoardPermissionsPolicy.CopyAccessEnum,
    'BoardPermissionsPolicy.SharingAccessEnum': boardPermissionsPolicy_1.BoardPermissionsPolicy.SharingAccessEnum,
    'BoardSharingPolicy.AccessEnum': boardSharingPolicy_1.BoardSharingPolicy.AccessEnum,
    'BoardSharingPolicy.InviteToAccountAndBoardLinkAccessEnum': boardSharingPolicy_1.BoardSharingPolicy.InviteToAccountAndBoardLinkAccessEnum,
    'BoardSharingPolicy.OrganizationAccessEnum': boardSharingPolicy_1.BoardSharingPolicy.OrganizationAccessEnum,
    'BoardSharingPolicy.TeamAccessEnum': boardSharingPolicy_1.BoardSharingPolicy.TeamAccessEnum,
    'BoardSharingPolicyChange.AccessEnum': boardSharingPolicyChange_1.BoardSharingPolicyChange.AccessEnum,
    'BoardSharingPolicyChange.InviteToAccountAndBoardLinkAccessEnum': boardSharingPolicyChange_1.BoardSharingPolicyChange.InviteToAccountAndBoardLinkAccessEnum,
    'BoardSharingPolicyChange.OrganizationAccessEnum': boardSharingPolicyChange_1.BoardSharingPolicyChange.OrganizationAccessEnum,
    'BoardSharingPolicyChange.TeamAccessEnum': boardSharingPolicyChange_1.BoardSharingPolicyChange.TeamAccessEnum,
    'BoardSubscription.StatusEnum': boardSubscription_1.BoardSubscription.StatusEnum,
    'Caption.TextAlignVerticalEnum': caption_1.Caption.TextAlignVerticalEnum,
    'ConnectorChangesData.ShapeEnum': connectorChangesData_1.ConnectorChangesData.ShapeEnum,
    'ConnectorCreationData.ShapeEnum': connectorCreationData_1.ConnectorCreationData.ShapeEnum,
    'ConnectorStyle.EndStrokeCapEnum': connectorStyle_1.ConnectorStyle.EndStrokeCapEnum,
    'ConnectorStyle.StartStrokeCapEnum': connectorStyle_1.ConnectorStyle.StartStrokeCapEnum,
    'ConnectorStyle.StrokeStyleEnum': connectorStyle_1.ConnectorStyle.StrokeStyleEnum,
    'ConnectorStyle.TextOrientationEnum': connectorStyle_1.ConnectorStyle.TextOrientationEnum,
    'ConnectorWithLinks.ShapeEnum': connectorWithLinks_1.ConnectorWithLinks.ShapeEnum,
    'CreateBoardSubscriptionRequest.StatusEnum': createBoardSubscriptionRequest_1.CreateBoardSubscriptionRequest.StatusEnum,
    'CustomField.IconShapeEnum': customField_1.CustomField.IconShapeEnum,
    'CustomFieldPlatformTags.IconShapeEnum': customFieldPlatformTags_1.CustomFieldPlatformTags.IconShapeEnum,
    'CustomFieldPlatformbulkcreateoperation.IconShapeEnum': customFieldPlatformbulkcreateoperation_1.CustomFieldPlatformbulkcreateoperation.IconShapeEnum,
    'EmbedData.ModeEnum': embedData_1.EmbedData.ModeEnum,
    'EmbedDataResponse.ModeEnum': embedDataResponse_1.EmbedDataResponse.ModeEnum,
    'EmbedUrlData.ModeEnum': embedUrlData_1.EmbedUrlData.ModeEnum,
    'EmbedUrlDataChanges.ModeEnum': embedUrlDataChanges_1.EmbedUrlDataChanges.ModeEnum,
    'EmbedUrlDataPlatformbulkcreateoperation.ModeEnum': embedUrlDataPlatformbulkcreateoperation_1.EmbedUrlDataPlatformbulkcreateoperation.ModeEnum,
    'FrameChanges.FormatEnum': frameChanges_1.FrameChanges.FormatEnum,
    'FrameChanges.TypeEnum': frameChanges_1.FrameChanges.TypeEnum,
    'FrameData.FormatEnum': frameData_1.FrameData.FormatEnum,
    'FrameData.TypeEnum': frameData_1.FrameData.TypeEnum,
    'FrameDataPlatformContainers.FormatEnum': frameDataPlatformContainers_1.FrameDataPlatformContainers.FormatEnum,
    'FrameDataPlatformContainers.TypeEnum': frameDataPlatformContainers_1.FrameDataPlatformContainers.TypeEnum,
    'GenericSubscription.StatusEnum': genericSubscription_1.GenericSubscription.StatusEnum,
    'ItemConnectionChangesData.SnapToEnum': itemConnectionChangesData_1.ItemConnectionChangesData.SnapToEnum,
    'ItemConnectionCreationData.SnapToEnum': itemConnectionCreationData_1.ItemConnectionCreationData.SnapToEnum,
    'ItemDataChanges.StatusEnum': itemDataChanges_1.ItemDataChanges.StatusEnum,
    'ItemDataCreate.StatusEnum': itemDataCreate_1.ItemDataCreate.StatusEnum,
    'ItemDataCreate.ModeEnum': itemDataCreate_1.ItemDataCreate.ModeEnum,
    'ItemDataCreate.ShapeEnum': itemDataCreate_1.ItemDataCreate.ShapeEnum,
    'ItemStyle.BorderStyleEnum': itemStyle_1.ItemStyle.BorderStyleEnum,
    'ItemStyle.FontFamilyEnum': itemStyle_1.ItemStyle.FontFamilyEnum,
    'ItemStyle.TextAlignEnum': itemStyle_1.ItemStyle.TextAlignEnum,
    'ItemStyle.TextAlignVerticalEnum': itemStyle_1.ItemStyle.TextAlignVerticalEnum,
    ItemTypeChange: itemTypeChange_1.ItemTypeChange,
    'MindmapData.DirectionEnum': mindmapData_1.MindmapData.DirectionEnum,
    'MindmapStyle.ShapeEnum': mindmapStyle_1.MindmapStyle.ShapeEnum,
    'Organization.PlanEnum': organization_1.Organization.PlanEnum,
    'OrganizationMember.LicenseEnum': organizationMember_1.OrganizationMember.LicenseEnum,
    'OrganizationMember.RoleEnum': organizationMember_1.OrganizationMember.RoleEnum,
    'Position.OriginEnum': position_1.Position.OriginEnum,
    'Position.RelativeToEnum': position_1.Position.RelativeToEnum,
    ProjectRole: projectRole_1.ProjectRole,
    ProjectRoleToAdd: projectRoleToAdd_1.ProjectRoleToAdd,
    'ShapeData.ShapeEnum': shapeData_1.ShapeData.ShapeEnum,
    'ShapeDataPlatformTags.ShapeEnum': shapeDataPlatformTags_1.ShapeDataPlatformTags.ShapeEnum,
    'ShapeStyle.BorderStyleEnum': shapeStyle_1.ShapeStyle.BorderStyleEnum,
    'ShapeStyle.FontFamilyEnum': shapeStyle_1.ShapeStyle.FontFamilyEnum,
    'ShapeStyle.TextAlignEnum': shapeStyle_1.ShapeStyle.TextAlignEnum,
    'ShapeStyle.TextAlignVerticalEnum': shapeStyle_1.ShapeStyle.TextAlignVerticalEnum,
    'ShapeStyleForCreate.BorderStyleEnum': shapeStyleForCreate_1.ShapeStyleForCreate.BorderStyleEnum,
    'ShapeStyleForCreate.FontFamilyEnum': shapeStyleForCreate_1.ShapeStyleForCreate.FontFamilyEnum,
    'ShapeStyleForCreate.TextAlignEnum': shapeStyleForCreate_1.ShapeStyleForCreate.TextAlignEnum,
    'ShapeStyleForCreate.TextAlignVerticalEnum': shapeStyleForCreate_1.ShapeStyleForCreate.TextAlignVerticalEnum,
    'ShapeStyleForUpdate.BorderStyleEnum': shapeStyleForUpdate_1.ShapeStyleForUpdate.BorderStyleEnum,
    'ShapeStyleForUpdate.FontFamilyEnum': shapeStyleForUpdate_1.ShapeStyleForUpdate.FontFamilyEnum,
    'ShapeStyleForUpdate.TextAlignEnum': shapeStyleForUpdate_1.ShapeStyleForUpdate.TextAlignEnum,
    'ShapeStyleForUpdate.TextAlignVerticalEnum': shapeStyleForUpdate_1.ShapeStyleForUpdate.TextAlignVerticalEnum,
    'StickyNoteData.ShapeEnum': stickyNoteData_1.StickyNoteData.ShapeEnum,
    'StickyNoteDataPlatformTags.ShapeEnum': stickyNoteDataPlatformTags_1.StickyNoteDataPlatformTags.ShapeEnum,
    'StickyNoteDataPlatformbulkcreateoperation.ShapeEnum': stickyNoteDataPlatformbulkcreateoperation_1.StickyNoteDataPlatformbulkcreateoperation.ShapeEnum,
    'StickyNoteStyle.FillColorEnum': stickyNoteStyle_1.StickyNoteStyle.FillColorEnum,
    'StickyNoteStyle.TextAlignEnum': stickyNoteStyle_1.StickyNoteStyle.TextAlignEnum,
    'StickyNoteStyle.TextAlignVerticalEnum': stickyNoteStyle_1.StickyNoteStyle.TextAlignVerticalEnum,
    'StickyNoteStylePlatformbulkcreateoperation.FillColorEnum': stickyNoteStylePlatformbulkcreateoperation_1.StickyNoteStylePlatformbulkcreateoperation.FillColorEnum,
    'StickyNoteStylePlatformbulkcreateoperation.TextAlignEnum': stickyNoteStylePlatformbulkcreateoperation_1.StickyNoteStylePlatformbulkcreateoperation.TextAlignEnum,
    'StickyNoteStylePlatformbulkcreateoperation.TextAlignVerticalEnum': stickyNoteStylePlatformbulkcreateoperation_1.StickyNoteStylePlatformbulkcreateoperation.TextAlignVerticalEnum,
    'Tag.FillColorEnum': tag_1.Tag.FillColorEnum,
    'TagCreateRequest.FillColorEnum': tagCreateRequest_1.TagCreateRequest.FillColorEnum,
    'TagUpdateRequest.FillColorEnum': tagUpdateRequest_1.TagUpdateRequest.FillColorEnum,
    'TagWithLinks.FillColorEnum': tagWithLinks_1.TagWithLinks.FillColorEnum,
    TeamAccess: teamAccess_1.TeamAccess,
    'TeamAccountDiscoverySettings.AccountDiscoveryEnum': teamAccountDiscoverySettings_1.TeamAccountDiscoverySettings.AccountDiscoveryEnum,
    'TeamAccountDiscoverySettingsChanges.AccountDiscoveryEnum': teamAccountDiscoverySettingsChanges_1.TeamAccountDiscoverySettingsChanges.AccountDiscoveryEnum,
    'TeamCollaborationSettings.CoOwnerRoleEnum': teamCollaborationSettings_1.TeamCollaborationSettings.CoOwnerRoleEnum,
    'TeamCollaborationSettingsChanges.CoOwnerRoleEnum': teamCollaborationSettingsChanges_1.TeamCollaborationSettingsChanges.CoOwnerRoleEnum,
    'TeamCopyAccessLevelSettings.CopyAccessLevelEnum': teamCopyAccessLevelSettings_1.TeamCopyAccessLevelSettings.CopyAccessLevelEnum,
    'TeamCopyAccessLevelSettings.CopyAccessLevelLimitationEnum': teamCopyAccessLevelSettings_1.TeamCopyAccessLevelSettings.CopyAccessLevelLimitationEnum,
    'TeamCopyAccessLevelSettingsChanges.CopyAccessLevelEnum': teamCopyAccessLevelSettingsChanges_1.TeamCopyAccessLevelSettingsChanges.CopyAccessLevelEnum,
    'TeamCopyAccessLevelSettingsChanges.CopyAccessLevelLimitationEnum': teamCopyAccessLevelSettingsChanges_1.TeamCopyAccessLevelSettingsChanges.CopyAccessLevelLimitationEnum,
    'TeamInvitationSettings.InviteExternalUsersEnum': teamInvitationSettings_1.TeamInvitationSettings.InviteExternalUsersEnum,
    'TeamInvitationSettings.WhoCanInviteEnum': teamInvitationSettings_1.TeamInvitationSettings.WhoCanInviteEnum,
    'TeamInvitationSettingsChanges.InviteExternalUsersEnum': teamInvitationSettingsChanges_1.TeamInvitationSettingsChanges.InviteExternalUsersEnum,
    'TeamInvitationSettingsChanges.WhoCanInviteEnum': teamInvitationSettingsChanges_1.TeamInvitationSettingsChanges.WhoCanInviteEnum,
    'TeamMember.RoleEnum': teamMember_1.TeamMember.RoleEnum,
    'TeamMemberChanges.RoleEnum': teamMemberChanges_1.TeamMemberChanges.RoleEnum,
    'TeamMemberInvite.RoleEnum': teamMemberInvite_1.TeamMemberInvite.RoleEnum,
    'TeamSharingPolicySettings.CreateAssetAccessLevelEnum': teamSharingPolicySettings_1.TeamSharingPolicySettings.CreateAssetAccessLevelEnum,
    'TeamSharingPolicySettings.DefaultBoardAccessEnum': teamSharingPolicySettings_1.TeamSharingPolicySettings.DefaultBoardAccessEnum,
    'TeamSharingPolicySettings.DefaultBoardSharingAccessEnum': teamSharingPolicySettings_1.TeamSharingPolicySettings.DefaultBoardSharingAccessEnum,
    'TeamSharingPolicySettings.DefaultOrganizationAccessEnum': teamSharingPolicySettings_1.TeamSharingPolicySettings.DefaultOrganizationAccessEnum,
    'TeamSharingPolicySettings.DefaultProjectAccessEnum': teamSharingPolicySettings_1.TeamSharingPolicySettings.DefaultProjectAccessEnum,
    'TeamSharingPolicySettings.MoveBoardToAccountEnum': teamSharingPolicySettings_1.TeamSharingPolicySettings.MoveBoardToAccountEnum,
    'TeamSharingPolicySettings.RestrictAllowedDomainsEnum': teamSharingPolicySettings_1.TeamSharingPolicySettings.RestrictAllowedDomainsEnum,
    'TeamSharingPolicySettings.SharingOnAccountEnum': teamSharingPolicySettings_1.TeamSharingPolicySettings.SharingOnAccountEnum,
    'TeamSharingPolicySettings.SharingOnOrganizationEnum': teamSharingPolicySettings_1.TeamSharingPolicySettings.SharingOnOrganizationEnum,
    'TeamSharingPolicySettings.SharingViaPublicLinkEnum': teamSharingPolicySettings_1.TeamSharingPolicySettings.SharingViaPublicLinkEnum,
    'TeamSharingPolicySettingsChanges.CreateAssetAccessLevelEnum': teamSharingPolicySettingsChanges_1.TeamSharingPolicySettingsChanges.CreateAssetAccessLevelEnum,
    'TeamSharingPolicySettingsChanges.DefaultBoardAccessEnum': teamSharingPolicySettingsChanges_1.TeamSharingPolicySettingsChanges.DefaultBoardAccessEnum,
    'TeamSharingPolicySettingsChanges.DefaultBoardSharingAccessEnum': teamSharingPolicySettingsChanges_1.TeamSharingPolicySettingsChanges.DefaultBoardSharingAccessEnum,
    'TeamSharingPolicySettingsChanges.DefaultOrganizationAccessEnum': teamSharingPolicySettingsChanges_1.TeamSharingPolicySettingsChanges.DefaultOrganizationAccessEnum,
    'TeamSharingPolicySettingsChanges.DefaultProjectAccessEnum': teamSharingPolicySettingsChanges_1.TeamSharingPolicySettingsChanges.DefaultProjectAccessEnum,
    'TeamSharingPolicySettingsChanges.MoveBoardToAccountEnum': teamSharingPolicySettingsChanges_1.TeamSharingPolicySettingsChanges.MoveBoardToAccountEnum,
    'TeamSharingPolicySettingsChanges.RestrictAllowedDomainsEnum': teamSharingPolicySettingsChanges_1.TeamSharingPolicySettingsChanges.RestrictAllowedDomainsEnum,
    'TeamSharingPolicySettingsChanges.SharingOnAccountEnum': teamSharingPolicySettingsChanges_1.TeamSharingPolicySettingsChanges.SharingOnAccountEnum,
    'TeamSharingPolicySettingsChanges.SharingOnOrganizationEnum': teamSharingPolicySettingsChanges_1.TeamSharingPolicySettingsChanges.SharingOnOrganizationEnum,
    'TeamSharingPolicySettingsChanges.SharingViaPublicLinkEnum': teamSharingPolicySettingsChanges_1.TeamSharingPolicySettingsChanges.SharingViaPublicLinkEnum,
    'TextStyle.FontFamilyEnum': textStyle_1.TextStyle.FontFamilyEnum,
    'TextStyle.TextAlignEnum': textStyle_1.TextStyle.TextAlignEnum,
    'UpdateBoardSubscriptionRequest.StatusEnum': updateBoardSubscriptionRequest_1.UpdateBoardSubscriptionRequest.StatusEnum,
    'UpdateConnectorStyle.EndStrokeCapEnum': updateConnectorStyle_1.UpdateConnectorStyle.EndStrokeCapEnum,
    'UpdateConnectorStyle.StartStrokeCapEnum': updateConnectorStyle_1.UpdateConnectorStyle.StartStrokeCapEnum,
    'UpdateConnectorStyle.StrokeStyleEnum': updateConnectorStyle_1.UpdateConnectorStyle.StrokeStyleEnum,
    'UpdateConnectorStyle.TextOrientationEnum': updateConnectorStyle_1.UpdateConnectorStyle.TextOrientationEnum,
    'UpdateShapeStyle.BorderStyleEnum': updateShapeStyle_1.UpdateShapeStyle.BorderStyleEnum,
    'UpdateShapeStyle.FontFamilyEnum': updateShapeStyle_1.UpdateShapeStyle.FontFamilyEnum,
    'UpdateShapeStyle.TextAlignEnum': updateShapeStyle_1.UpdateShapeStyle.TextAlignEnum,
    'UpdateShapeStyle.TextAlignVerticalEnum': updateShapeStyle_1.UpdateShapeStyle.TextAlignVerticalEnum,
    'UpdateStickyNoteStyle.FillColorEnum': updateStickyNoteStyle_1.UpdateStickyNoteStyle.FillColorEnum,
    'UpdateStickyNoteStyle.TextAlignEnum': updateStickyNoteStyle_1.UpdateStickyNoteStyle.TextAlignEnum,
    'UpdateStickyNoteStyle.TextAlignVerticalEnum': updateStickyNoteStyle_1.UpdateStickyNoteStyle.TextAlignVerticalEnum,
    'UpdateTextStyle.FontFamilyEnum': updateTextStyle_1.UpdateTextStyle.FontFamilyEnum,
    'UpdateTextStyle.TextAlignEnum': updateTextStyle_1.UpdateTextStyle.TextAlignEnum,
    'WidgetDataOutput.ModeEnum': widgetDataOutput_1.WidgetDataOutput.ModeEnum,
    'WidgetDataOutput.StatusEnum': widgetDataOutput_1.WidgetDataOutput.StatusEnum,
    'WidgetDataOutput.ShapeEnum': widgetDataOutput_1.WidgetDataOutput.ShapeEnum,
    'WidgetDataOutput.FormatEnum': widgetDataOutput_1.WidgetDataOutput.FormatEnum,
    'WidgetDataOutput.TypeEnum': widgetDataOutput_1.WidgetDataOutput.TypeEnum,
};
let typeMap = {
    AddProjectMemberRequest: addProjectMemberRequest_1.AddProjectMemberRequest,
    AdminRole: adminRole_1.AdminRole,
    AppCardCreateRequest: appCardCreateRequest_1.AppCardCreateRequest,
    AppCardData: appCardData_1.AppCardData,
    AppCardDataChanges: appCardDataChanges_1.AppCardDataChanges,
    AppCardDataResponse: appCardDataResponse_1.AppCardDataResponse,
    AppCardItem: appCardItem_1.AppCardItem,
    AppCardStyle: appCardStyle_1.AppCardStyle,
    AppCardStylePlatformbulkcreateoperation: appCardStylePlatformbulkcreateoperation_1.AppCardStylePlatformbulkcreateoperation,
    AppCardUpdateRequest: appCardUpdateRequest_1.AppCardUpdateRequest,
    AuditContext: auditContext_1.AuditContext,
    AuditCreatedBy: auditCreatedBy_1.AuditCreatedBy,
    AuditEvent: auditEvent_1.AuditEvent,
    AuditObject: auditObject_1.AuditObject,
    AuditOrganization: auditOrganization_1.AuditOrganization,
    AuditPage: auditPage_1.AuditPage,
    AuditTeam: auditTeam_1.AuditTeam,
    BasicError: basicError_1.BasicError,
    BasicErrorOrganizationsEnterprisePlan: basicErrorOrganizationsEnterprisePlan_1.BasicErrorOrganizationsEnterprisePlan,
    Board: board_1.Board,
    BoardChanges: boardChanges_1.BoardChanges,
    BoardContentLogData: boardContentLogData_1.BoardContentLogData,
    BoardDataClassificationLabel: boardDataClassificationLabel_1.BoardDataClassificationLabel,
    BoardExportJobId: boardExportJobId_1.BoardExportJobId,
    BoardExportJobStatus: boardExportJobStatus_1.BoardExportJobStatus,
    BoardExportResult: boardExportResult_1.BoardExportResult,
    BoardExportTaskResult: boardExportTaskResult_1.BoardExportTaskResult,
    BoardItemContentLog: boardItemContentLog_1.BoardItemContentLog,
    BoardLinks: boardLinks_1.BoardLinks,
    BoardMember: boardMember_1.BoardMember,
    BoardMemberChanges: boardMemberChanges_1.BoardMemberChanges,
    BoardMemberWithLinks: boardMemberWithLinks_1.BoardMemberWithLinks,
    BoardMembersInvite: boardMembersInvite_1.BoardMembersInvite,
    BoardMembersPagedResponse: boardMembersPagedResponse_1.BoardMembersPagedResponse,
    BoardPermissionsPolicy: boardPermissionsPolicy_1.BoardPermissionsPolicy,
    BoardPolicy: boardPolicy_1.BoardPolicy,
    BoardPolicyChange: boardPolicyChange_1.BoardPolicyChange,
    BoardProject: boardProject_1.BoardProject,
    BoardSharingPolicy: boardSharingPolicy_1.BoardSharingPolicy,
    BoardSharingPolicyChange: boardSharingPolicyChange_1.BoardSharingPolicyChange,
    BoardSubscription: boardSubscription_1.BoardSubscription,
    BoardSubscriptionData: boardSubscriptionData_1.BoardSubscriptionData,
    BoardWithLinks: boardWithLinks_1.BoardWithLinks,
    BoardWithLinksAndLastOpened: boardWithLinksAndLastOpened_1.BoardWithLinksAndLastOpened,
    BoardWithLinksAndWithoutProject: boardWithLinksAndWithoutProject_1.BoardWithLinksAndWithoutProject,
    BoardsPagedResponse: boardsPagedResponse_1.BoardsPagedResponse,
    BulkOperationError: bulkOperationError_1.BulkOperationError,
    BulkOperationErrorContext: bulkOperationErrorContext_1.BulkOperationErrorContext,
    BulkSubOperationError: bulkSubOperationError_1.BulkSubOperationError,
    Caption: caption_1.Caption,
    CardCreateRequest: cardCreateRequest_1.CardCreateRequest,
    CardData: cardData_1.CardData,
    CardDataPlatformbulkcreateoperation: cardDataPlatformbulkcreateoperation_1.CardDataPlatformbulkcreateoperation,
    CardItem: cardItem_1.CardItem,
    CardStyle: cardStyle_1.CardStyle,
    CardStylePlatformbulkcreateoperation: cardStylePlatformbulkcreateoperation_1.CardStylePlatformbulkcreateoperation,
    CardUpdateRequest: cardUpdateRequest_1.CardUpdateRequest,
    ConnectorChangesData: connectorChangesData_1.ConnectorChangesData,
    ConnectorCreationData: connectorCreationData_1.ConnectorCreationData,
    ConnectorStyle: connectorStyle_1.ConnectorStyle,
    ConnectorWithLinks: connectorWithLinks_1.ConnectorWithLinks,
    ConnectorsCursorPaged: connectorsCursorPaged_1.ConnectorsCursorPaged,
    CopyBoardChanges: copyBoardChanges_1.CopyBoardChanges,
    CreateBoardExportRequest: createBoardExportRequest_1.CreateBoardExportRequest,
    CreateBoardSubscriptionRequest: createBoardSubscriptionRequest_1.CreateBoardSubscriptionRequest,
    CreateDocumentItemUsingFileFromDeviceRequestData: createDocumentItemUsingFileFromDeviceRequestData_1.CreateDocumentItemUsingFileFromDeviceRequestData,
    CreateFrameItem400Response: createFrameItem400Response_1.CreateFrameItem400Response,
    CreateProjectRequest: createProjectRequest_1.CreateProjectRequest,
    CreateTeamRequest: createTeamRequest_1.CreateTeamRequest,
    CreatedBy: createdBy_1.CreatedBy,
    CreatedByPlatformContainers: createdByPlatformContainers_1.CreatedByPlatformContainers,
    CreatedByPlatformExperimentalFeatures: createdByPlatformExperimentalFeatures_1.CreatedByPlatformExperimentalFeatures,
    CreatedByPlatformFileUpload: createdByPlatformFileUpload_1.CreatedByPlatformFileUpload,
    CreatedByPlatformTags: createdByPlatformTags_1.CreatedByPlatformTags,
    CreatedByPlatformcreateitemsinbulkusingfilefromdevice: createdByPlatformcreateitemsinbulkusingfilefromdevice_1.CreatedByPlatformcreateitemsinbulkusingfilefromdevice,
    CreatedByPlatformgroups: createdByPlatformgroups_1.CreatedByPlatformgroups,
    CustomField: customField_1.CustomField,
    CustomFieldPlatformTags: customFieldPlatformTags_1.CustomFieldPlatformTags,
    CustomFieldPlatformbulkcreateoperation: customFieldPlatformbulkcreateoperation_1.CustomFieldPlatformbulkcreateoperation,
    DataClassificationLabel: dataClassificationLabel_1.DataClassificationLabel,
    DataClassificationLabelId: dataClassificationLabelId_1.DataClassificationLabelId,
    DataClassificationOrganizationSettings: dataClassificationOrganizationSettings_1.DataClassificationOrganizationSettings,
    DataClassificationTeamSettings: dataClassificationTeamSettings_1.DataClassificationTeamSettings,
    DocumentCreateRequest: documentCreateRequest_1.DocumentCreateRequest,
    DocumentData: documentData_1.DocumentData,
    DocumentDataResponse: documentDataResponse_1.DocumentDataResponse,
    DocumentDataResponsePlatformcreateitemsinbulkusingfilefromdevice: documentDataResponsePlatformcreateitemsinbulkusingfilefromdevice_1.DocumentDataResponsePlatformcreateitemsinbulkusingfilefromdevice,
    DocumentItem: documentItem_1.DocumentItem,
    DocumentItemPlatformFileUpload: documentItemPlatformFileUpload_1.DocumentItemPlatformFileUpload,
    DocumentUpdateRequest: documentUpdateRequest_1.DocumentUpdateRequest,
    DocumentUrlData: documentUrlData_1.DocumentUrlData,
    DocumentUrlDataChanges: documentUrlDataChanges_1.DocumentUrlDataChanges,
    DocumentUrlDataPlatformbulkcreateoperation: documentUrlDataPlatformbulkcreateoperation_1.DocumentUrlDataPlatformbulkcreateoperation,
    EmbedCreateRequest: embedCreateRequest_1.EmbedCreateRequest,
    EmbedData: embedData_1.EmbedData,
    EmbedDataResponse: embedDataResponse_1.EmbedDataResponse,
    EmbedItem: embedItem_1.EmbedItem,
    EmbedUpdateRequest: embedUpdateRequest_1.EmbedUpdateRequest,
    EmbedUrlData: embedUrlData_1.EmbedUrlData,
    EmbedUrlDataChanges: embedUrlDataChanges_1.EmbedUrlDataChanges,
    EmbedUrlDataPlatformbulkcreateoperation: embedUrlDataPlatformbulkcreateoperation_1.EmbedUrlDataPlatformbulkcreateoperation,
    EnterpriseGetOrganizationMembers200Response: enterpriseGetOrganizationMembers200Response_1.EnterpriseGetOrganizationMembers200Response,
    Error400: error400_1.Error400,
    Error401: error401_1.Error401,
    Error403: error403_1.Error403,
    Error404: error404_1.Error404,
    Error409: error409_1.Error409,
    Error429: error429_1.Error429,
    FixedRatioGeometry: fixedRatioGeometry_1.FixedRatioGeometry,
    FixedRatioGeometryPlatformFileUpload: fixedRatioGeometryPlatformFileUpload_1.FixedRatioGeometryPlatformFileUpload,
    FixedRatioNoRotationGeometry: fixedRatioNoRotationGeometry_1.FixedRatioNoRotationGeometry,
    FrameChanges: frameChanges_1.FrameChanges,
    FrameCreateRequest: frameCreateRequest_1.FrameCreateRequest,
    FrameData: frameData_1.FrameData,
    FrameDataPlatformContainers: frameDataPlatformContainers_1.FrameDataPlatformContainers,
    FrameItem: frameItem_1.FrameItem,
    FrameStyle: frameStyle_1.FrameStyle,
    FrameUpdateRequest: frameUpdateRequest_1.FrameUpdateRequest,
    GenericItem: genericItem_1.GenericItem,
    GenericItemCursorPaged: genericItemCursorPaged_1.GenericItemCursorPaged,
    GenericItemCursorPagedPlatformContainers: genericItemCursorPagedPlatformContainers_1.GenericItemCursorPagedPlatformContainers,
    GenericItemPlatformTags: genericItemPlatformTags_1.GenericItemPlatformTags,
    GenericItemUpdate: genericItemUpdate_1.GenericItemUpdate,
    GenericSubscription: genericSubscription_1.GenericSubscription,
    GenericSubscriptionsCursorPaged: genericSubscriptionsCursorPaged_1.GenericSubscriptionsCursorPaged,
    Geometry: geometry_1.Geometry,
    GeometryNoRotation: geometryNoRotation_1.GeometryNoRotation,
    GeometryPlatformContainers: geometryPlatformContainers_1.GeometryPlatformContainers,
    GeometryPlatformExperimentalFeatures: geometryPlatformExperimentalFeatures_1.GeometryPlatformExperimentalFeatures,
    GeometryPlatformFileUpload: geometryPlatformFileUpload_1.GeometryPlatformFileUpload,
    GeometryPlatformTags: geometryPlatformTags_1.GeometryPlatformTags,
    GeometryPlatformbulkcreateoperation: geometryPlatformbulkcreateoperation_1.GeometryPlatformbulkcreateoperation,
    GeometryPlatformcreateitemsinbulkusingfilefromdevice: geometryPlatformcreateitemsinbulkusingfilefromdevice_1.GeometryPlatformcreateitemsinbulkusingfilefromdevice,
    GeometryPlatformgroups: geometryPlatformgroups_1.GeometryPlatformgroups,
    GetAllGroups200Response: getAllGroups200Response_1.GetAllGroups200Response,
    GetAllGroups400Response: getAllGroups400Response_1.GetAllGroups400Response,
    GetAllGroups404Response: getAllGroups404Response_1.GetAllGroups404Response,
    GetAllGroups429Response: getAllGroups429Response_1.GetAllGroups429Response,
    GetBoardItemContentLogsResponse: getBoardItemContentLogsResponse_1.GetBoardItemContentLogsResponse,
    GetBoardUserInfoLastOpenedBy: getBoardUserInfoLastOpenedBy_1.GetBoardUserInfoLastOpenedBy,
    GetItemsByGroupId200Response: getItemsByGroupId200Response_1.GetItemsByGroupId200Response,
    GetItemsByGroupId200ResponseData: getItemsByGroupId200ResponseData_1.GetItemsByGroupId200ResponseData,
    GetMetrics200ResponseInner: getMetrics200ResponseInner_1.GetMetrics200ResponseInner,
    GetMetrics404Response: getMetrics404Response_1.GetMetrics404Response,
    GetMetricsTotal200Response: getMetricsTotal200Response_1.GetMetricsTotal200Response,
    GetMetricsTotal404Response: getMetricsTotal404Response_1.GetMetricsTotal404Response,
    GetTagsFromItem400Response: getTagsFromItem400Response_1.GetTagsFromItem400Response,
    GetTagsResponse: getTagsResponse_1.GetTagsResponse,
    Group: group_1.Group,
    GroupData: groupData_1.GroupData,
    GroupResponseShort: groupResponseShort_1.GroupResponseShort,
    ImageCreateRequest: imageCreateRequest_1.ImageCreateRequest,
    ImageData: imageData_1.ImageData,
    ImageDataResponse: imageDataResponse_1.ImageDataResponse,
    ImageDataResponsePlatformcreateitemsinbulkusingfilefromdevice: imageDataResponsePlatformcreateitemsinbulkusingfilefromdevice_1.ImageDataResponsePlatformcreateitemsinbulkusingfilefromdevice,
    ImageItem: imageItem_1.ImageItem,
    ImageItemPlatformFileUpload: imageItemPlatformFileUpload_1.ImageItemPlatformFileUpload,
    ImageUpdateRequest: imageUpdateRequest_1.ImageUpdateRequest,
    ImageUrlData: imageUrlData_1.ImageUrlData,
    ImageUrlDataChanges: imageUrlDataChanges_1.ImageUrlDataChanges,
    InvitationError: invitationError_1.InvitationError,
    InvitationResult: invitationResult_1.InvitationResult,
    Item: item_1.Item,
    ItemChanges: itemChanges_1.ItemChanges,
    ItemConnectionChangesData: itemConnectionChangesData_1.ItemConnectionChangesData,
    ItemConnectionCreationData: itemConnectionCreationData_1.ItemConnectionCreationData,
    ItemConnectionWithLinks: itemConnectionWithLinks_1.ItemConnectionWithLinks,
    ItemCreate: itemCreate_1.ItemCreate,
    ItemData: itemData_1.ItemData,
    ItemDataChanges: itemDataChanges_1.ItemDataChanges,
    ItemDataCreate: itemDataCreate_1.ItemDataCreate,
    ItemPagedResponse: itemPagedResponse_1.ItemPagedResponse,
    ItemPagedResponsePlatformTags: itemPagedResponsePlatformTags_1.ItemPagedResponsePlatformTags,
    ItemStyle: itemStyle_1.ItemStyle,
    Items: items_1.Items,
    ItemsPage: itemsPage_1.ItemsPage,
    MindMapNodeGeometry: mindMapNodeGeometry_1.MindMapNodeGeometry,
    MindmapCreateRequest: mindmapCreateRequest_1.MindmapCreateRequest,
    MindmapCursorPaged: mindmapCursorPaged_1.MindmapCursorPaged,
    MindmapData: mindmapData_1.MindmapData,
    MindmapDataForCreate: mindmapDataForCreate_1.MindmapDataForCreate,
    MindmapItem: mindmapItem_1.MindmapItem,
    MindmapNode: mindmapNode_1.MindmapNode,
    MindmapNodeStyle: mindmapNodeStyle_1.MindmapNodeStyle,
    MindmapNodeTextData: mindmapNodeTextData_1.MindmapNodeTextData,
    MindmapNodeView: mindmapNodeView_1.MindmapNodeView,
    MindmapStyle: mindmapStyle_1.MindmapStyle,
    MindmapWidgetDataOutput: mindmapWidgetDataOutput_1.MindmapWidgetDataOutput,
    ModelError: modelError_1.ModelError,
    ModifiedBy: modifiedBy_1.ModifiedBy,
    ModifiedByPlatformContainers: modifiedByPlatformContainers_1.ModifiedByPlatformContainers,
    ModifiedByPlatformExperimentalFeatures: modifiedByPlatformExperimentalFeatures_1.ModifiedByPlatformExperimentalFeatures,
    ModifiedByPlatformFileUpload: modifiedByPlatformFileUpload_1.ModifiedByPlatformFileUpload,
    ModifiedByPlatformTags: modifiedByPlatformTags_1.ModifiedByPlatformTags,
    ModifiedByPlatformcreateitemsinbulkusingfilefromdevice: modifiedByPlatformcreateitemsinbulkusingfilefromdevice_1.ModifiedByPlatformcreateitemsinbulkusingfilefromdevice,
    ModifiedByPlatformgroups: modifiedByPlatformgroups_1.ModifiedByPlatformgroups,
    Organization: organization_1.Organization,
    OrganizationInformation: organizationInformation_1.OrganizationInformation,
    OrganizationMember: organizationMember_1.OrganizationMember,
    OrganizationMembersSearchResponse: organizationMembersSearchResponse_1.OrganizationMembersSearchResponse,
    PageLinks: pageLinks_1.PageLinks,
    PageLinksPlatformExperimentalFeatures: pageLinksPlatformExperimentalFeatures_1.PageLinksPlatformExperimentalFeatures,
    Parent: parent_1.Parent,
    ParentLinksEnvelope: parentLinksEnvelope_1.ParentLinksEnvelope,
    ParentLinksEnvelopePlatformContainers: parentLinksEnvelopePlatformContainers_1.ParentLinksEnvelopePlatformContainers,
    ParentWithLinks: parentWithLinks_1.ParentWithLinks,
    ParentWithLinksPlatformcreateitemsinbulkusingfilefromdevice: parentWithLinksPlatformcreateitemsinbulkusingfilefromdevice_1.ParentWithLinksPlatformcreateitemsinbulkusingfilefromdevice,
    Picture: picture_1.Picture,
    Position: position_1.Position,
    PositionChange: positionChange_1.PositionChange,
    Project: project_1.Project,
    ProjectMember: projectMember_1.ProjectMember,
    ProjectMemberPage: projectMemberPage_1.ProjectMemberPage,
    ProjectPage: projectPage_1.ProjectPage,
    ProjectSettings: projectSettings_1.ProjectSettings,
    RelativeOffset: relativeOffset_1.RelativeOffset,
    SelfLink: selfLink_1.SelfLink,
    SelfLinkPlatformFileUpload: selfLinkPlatformFileUpload_1.SelfLinkPlatformFileUpload,
    SelfLinkPlatformTags: selfLinkPlatformTags_1.SelfLinkPlatformTags,
    ShapeCreateRequest: shapeCreateRequest_1.ShapeCreateRequest,
    ShapeData: shapeData_1.ShapeData,
    ShapeDataForCreate: shapeDataForCreate_1.ShapeDataForCreate,
    ShapeDataForUpdate: shapeDataForUpdate_1.ShapeDataForUpdate,
    ShapeDataPlatformTags: shapeDataPlatformTags_1.ShapeDataPlatformTags,
    ShapeItem: shapeItem_1.ShapeItem,
    ShapeStyle: shapeStyle_1.ShapeStyle,
    ShapeStyleForCreate: shapeStyleForCreate_1.ShapeStyleForCreate,
    ShapeStyleForUpdate: shapeStyleForUpdate_1.ShapeStyleForUpdate,
    ShapeUpdateRequest: shapeUpdateRequest_1.ShapeUpdateRequest,
    SharingPolicySettings: sharingPolicySettings_1.SharingPolicySettings,
    StickyNoteCreateRequest: stickyNoteCreateRequest_1.StickyNoteCreateRequest,
    StickyNoteData: stickyNoteData_1.StickyNoteData,
    StickyNoteDataPlatformTags: stickyNoteDataPlatformTags_1.StickyNoteDataPlatformTags,
    StickyNoteDataPlatformbulkcreateoperation: stickyNoteDataPlatformbulkcreateoperation_1.StickyNoteDataPlatformbulkcreateoperation,
    StickyNoteItem: stickyNoteItem_1.StickyNoteItem,
    StickyNoteStyle: stickyNoteStyle_1.StickyNoteStyle,
    StickyNoteStylePlatformbulkcreateoperation: stickyNoteStylePlatformbulkcreateoperation_1.StickyNoteStylePlatformbulkcreateoperation,
    StickyNoteUpdateRequest: stickyNoteUpdateRequest_1.StickyNoteUpdateRequest,
    SubscriptionData: subscriptionData_1.SubscriptionData,
    Tag: tag_1.Tag,
    TagCreateRequest: tagCreateRequest_1.TagCreateRequest,
    TagUpdateRequest: tagUpdateRequest_1.TagUpdateRequest,
    TagWithLinks: tagWithLinks_1.TagWithLinks,
    TagsPagedResponse: tagsPagedResponse_1.TagsPagedResponse,
    Team: team_1.Team,
    TeamAccountDiscoverySettings: teamAccountDiscoverySettings_1.TeamAccountDiscoverySettings,
    TeamAccountDiscoverySettingsChanges: teamAccountDiscoverySettingsChanges_1.TeamAccountDiscoverySettingsChanges,
    TeamChanges: teamChanges_1.TeamChanges,
    TeamCollaborationSettings: teamCollaborationSettings_1.TeamCollaborationSettings,
    TeamCollaborationSettingsChanges: teamCollaborationSettingsChanges_1.TeamCollaborationSettingsChanges,
    TeamCopyAccessLevelSettings: teamCopyAccessLevelSettings_1.TeamCopyAccessLevelSettings,
    TeamCopyAccessLevelSettingsChanges: teamCopyAccessLevelSettingsChanges_1.TeamCopyAccessLevelSettingsChanges,
    TeamInformation: teamInformation_1.TeamInformation,
    TeamInvitationSettings: teamInvitationSettings_1.TeamInvitationSettings,
    TeamInvitationSettingsChanges: teamInvitationSettingsChanges_1.TeamInvitationSettingsChanges,
    TeamMember: teamMember_1.TeamMember,
    TeamMemberChanges: teamMemberChanges_1.TeamMemberChanges,
    TeamMemberInvite: teamMemberInvite_1.TeamMemberInvite,
    TeamMembersPage: teamMembersPage_1.TeamMembersPage,
    TeamSettings: teamSettings_1.TeamSettings,
    TeamSettingsChanges: teamSettingsChanges_1.TeamSettingsChanges,
    TeamSharingPolicySettings: teamSharingPolicySettings_1.TeamSharingPolicySettings,
    TeamSharingPolicySettingsChanges: teamSharingPolicySettingsChanges_1.TeamSharingPolicySettingsChanges,
    TeamsPage: teamsPage_1.TeamsPage,
    TextCreateRequest: textCreateRequest_1.TextCreateRequest,
    TextData: textData_1.TextData,
    TextDataPlatformTags: textDataPlatformTags_1.TextDataPlatformTags,
    TextDataPlatformbulkcreateoperation: textDataPlatformbulkcreateoperation_1.TextDataPlatformbulkcreateoperation,
    TextItem: textItem_1.TextItem,
    TextStyle: textStyle_1.TextStyle,
    TextUpdateRequest: textUpdateRequest_1.TextUpdateRequest,
    TokenInformation: tokenInformation_1.TokenInformation,
    UnGroup400Response: unGroup400Response_1.UnGroup400Response,
    UnGroup404Response: unGroup404Response_1.UnGroup404Response,
    UnGroup429Response: unGroup429Response_1.UnGroup429Response,
    UpdateAppCardStyle: updateAppCardStyle_1.UpdateAppCardStyle,
    UpdateBoardSubscriptionRequest: updateBoardSubscriptionRequest_1.UpdateBoardSubscriptionRequest,
    UpdateBoardsDataClassificationLabel: updateBoardsDataClassificationLabel_1.UpdateBoardsDataClassificationLabel,
    UpdateBoardsDataClassificationLabelRequest: updateBoardsDataClassificationLabelRequest_1.UpdateBoardsDataClassificationLabelRequest,
    UpdateCardStyle: updateCardStyle_1.UpdateCardStyle,
    UpdateConnectorStyle: updateConnectorStyle_1.UpdateConnectorStyle,
    UpdateFrameItem409Response: updateFrameItem409Response_1.UpdateFrameItem409Response,
    UpdateFrameStyle: updateFrameStyle_1.UpdateFrameStyle,
    UpdateProjectMemberRequest: updateProjectMemberRequest_1.UpdateProjectMemberRequest,
    UpdateProjectRequest: updateProjectRequest_1.UpdateProjectRequest,
    UpdateProjectSettingsRequest: updateProjectSettingsRequest_1.UpdateProjectSettingsRequest,
    UpdateShapeStyle: updateShapeStyle_1.UpdateShapeStyle,
    UpdateStickyNoteStyle: updateStickyNoteStyle_1.UpdateStickyNoteStyle,
    UpdateTeamSettingsRequest: updateTeamSettingsRequest_1.UpdateTeamSettingsRequest,
    UpdateTextStyle: updateTextStyle_1.UpdateTextStyle,
    UploadFileFromDeviceData: uploadFileFromDeviceData_1.UploadFileFromDeviceData,
    User: user_1.User,
    UserInfoLastOpenedBy: userInfoLastOpenedBy_1.UserInfoLastOpenedBy,
    UserInfoShort: userInfoShort_1.UserInfoShort,
    UserInformation: userInformation_1.UserInformation,
    WidgetDataOutput: widgetDataOutput_1.WidgetDataOutput,
    WidgetLinks: widgetLinks_1.WidgetLinks,
    WidgetLinksPlatformContainers: widgetLinksPlatformContainers_1.WidgetLinksPlatformContainers,
    WidgetLinksPlatformExperimentalFeatures: widgetLinksPlatformExperimentalFeatures_1.WidgetLinksPlatformExperimentalFeatures,
    WidgetLinksPlatformFileUpload: widgetLinksPlatformFileUpload_1.WidgetLinksPlatformFileUpload,
    WidthOnlyAdjustableGeometry: widthOnlyAdjustableGeometry_1.WidthOnlyAdjustableGeometry,
};
class ObjectSerializer {
    static findCorrectType(data, expectedType) {
        if (data == undefined) {
            return expectedType;
        }
        else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        }
        else if (expectedType === 'Date') {
            return expectedType;
        }
        else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }
            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }
            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            }
            else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if (typeMap[discriminatorType]) {
                        return discriminatorType; // use the type given in the discriminator
                    }
                    else {
                        return expectedType; // discriminator did not map to a type
                    }
                }
                else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }
    static serialize(data, type) {
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf('Array<', 0) === 0) {
            // string.startsWith pre es6
            let subType = type.replace('Array<', ''); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.serialize(datum, subType));
            }
            return transformedData;
        }
        else if (type === 'Date') {
            return data.toISOString();
        }
        else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) {
                // in case we dont know the type
                return data;
            }
            // Get the actual type of this object
            type = this.findCorrectType(data, type);
            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance = {};
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }
    static deserialize(data, type) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf('Array<', 0) === 0) {
            // string.startsWith pre es6
            let subType = type.replace('Array<', ''); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.deserialize(datum, subType));
            }
            return transformedData;
        }
        else if (type === 'Date') {
            return new Date(data);
        }
        else {
            if (enumsMap[type]) {
                // is Enum
                return data;
            }
            if (!typeMap[type]) {
                // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}
exports.ObjectSerializer = ObjectSerializer;
