"use strict";
/**
 * Miro Developer Platform
 * <img src=\"https://content.pstmn.io/47449ea6-0ef7-4af2-bac1-e58a70e61c58/aW1hZ2UucG5n\" width=\"1685\" height=\"593\">  ### Miro Developer Platform concepts  - New to the Miro Developer Platform? Interested in learning more about platform concepts?? [Read our introduction page](https://beta.developers.miro.com/docs/introduction) and familiarize yourself with the Miro Developer Platform capabilities in a few minutes.   ### Getting started with the Miro REST API  - [Quickstart (video):](https://beta.developers.miro.com/docs/try-out-the-rest-api-in-less-than-3-minutes) try the REST API in less than 3 minutes. - [Quickstart (article):](https://beta.developers.miro.com/docs/build-your-first-hello-world-app-1) get started and try the REST API in less than 3 minutes.   ### Miro REST API tutorials  Check out our how-to articles with step-by-step instructions and code examples so you can:  - [Get started with OAuth 2.0 and Miro](https://beta.developers.miro.com/docs/getting-started-with-oauth)   ### Miro App Examples  Clone our [Miro App Examples repository](https://github.com/miroapp/app-examples) to get inspiration, customize, and explore apps built on top of Miro\'s Developer Platform 2.0.
 *
 * The version of the OpenAPI document: v2.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeDataForUpdate = void 0;
/**
 * @internal
 * Contains shape item data, such as the content or the type of the shape.
 */
class ShapeDataForUpdate {
    constructor() {
        /**
         * Defines the geometric shape of the item when it is rendered on the board. <details>   <summary>Basic shapes</summary>   <ul>     <li>rectangle</li>     <li>round_rectangle</li>     <li>circle</li>     <li>triangle</li>     <li>rhombus</li>     <li>parallelogram</li>     <li>trapezoid</li>     <li>pentagon</li>     <li>hexagon</li>     <li>octagon</li>     <li>wedge_round_rectangle_callout</li>     <li>star</li>     <li>flow_chart_predefined_process</li>     <li>cloud</li>     <li>cross</li>     <li>can</li>     <li>right_arrow</li>     <li>left_arrow</li>     <li>left_right_arrow</li>     <li>left_brace</li>     <li>right_brace</li>   </ul> </details> <details>   <summary>Flowchart shapes</summary>   <ul>     <li>flow_chart_connector</li>     <li>flow_chart_magnetic_disk</li>     <li>flow_chart_input_output</li>     <li>flow_chart_decision</li>     <li>flow_chart_delay</li>     <li>flow_chart_display</li>     <li>flow_chart_document</li>     <li>flow_chart_magnetic_drum</li>     <li>flow_chart_internal_storage</li>     <li>flow_chart_manual_input</li>     <li>flow_chart_manual_operation</li>     <li>flow_chart_merge</li>     <li>flow_chart_multidocuments</li>     <li>flow_chart_note_curly_left</li>     <li>flow_chart_note_curly_right</li>     <li>flow_chart_note_square</li>     <li>flow_chart_offpage_connector</li>     <li>flow_chart_or</li>     <li>flow_chart_predefined_process_2</li>     <li>flow_chart_preparation</li>     <li>flow_chart_process</li>     <li>flow_chart_online_storage</li>     <li>flow_chart_summing_junction</li>     <li>flow_chart_terminator</li>   </ul> </details>
         */
        this['shape'] = 'rectangle';
    }
    /** @ignore */
    static getAttributeTypeMap() {
        return ShapeDataForUpdate.attributeTypeMap;
    }
}
exports.ShapeDataForUpdate = ShapeDataForUpdate;
/** @ignore */
ShapeDataForUpdate.discriminator = undefined;
/** @ignore */
ShapeDataForUpdate.attributeTypeMap = [
    {
        name: 'content',
        baseName: 'content',
        type: 'string',
    },
    {
        name: 'shape',
        baseName: 'shape',
        type: 'string',
    },
];
