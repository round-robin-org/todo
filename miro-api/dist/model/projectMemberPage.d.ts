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
import { ProjectMember } from './projectMember';
export declare class ProjectMemberPage {
    /**
     * The maximum number of results to return per call. If the number of project member in the response is greater than the limit specified, the response returns the cursor parameter with a value.
     */
    'limit': number;
    /**
     * Number of results returned in the response considering the cursor and the limit values sent in the request. For example, if there are 20 results, the request does not have a cursor value, and the limit set to 10, the size of the results will be 10. In this example, the response will also return a cursor value that can be used to retrieve the next set of 10 remaining results in the collection.
     */
    'size': number;
    /**
     * Contains the result data.
     */
    'data': Array<ProjectMember>;
    /**
     * Indicator of the position of the next page of the result. To retrieve the next page, make another query setting its cursor field to the value returned by the current query. If the value is empty, there are no more pages to fetch.
     */
    'cursor'?: string;
    /**
     * Type of the object returned.
     */
    'type'?: string;
    /** @ignore */
    static discriminator: string | undefined;
    /** @ignore */
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    /** @ignore */
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
