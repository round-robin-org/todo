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
import { Board } from './board';
import { PageLinks } from './pageLinks';
export declare class BoardsPagedResponse {
    /**
     * Contains the result data.
     */
    'data'?: Array<Board>;
    /**
     * Total number of results available. If the value of the `total` parameter is higher than the value of the `size` parameter, this means that there are more results that you can retrieve. To retrieve more results, you can make another request and set the `offset` value accordingly. For example, if there are `30` results, and the request has the `offset` set to `0` and the `limit` set to `20`, the `size` parameter will return `20` and the `total` parameter will return `30`. This means that there are 9 more results to retrieve (as the offset is zero-based).
     */
    'total'?: number;
    /**
     * Number of results returned in the response. The `size` is the number of results returned considering the `offset` and the `limit` values sent in the request. For example, if there are `30` results, and the request has the offset set to `0` and the `limit` set to `20`, the `size` of the results will be `20`.<br>If there are `10` results, and the request has the offset set to `0` and the `limit` set to `20`, the `size` of the results will be `10`.<br>If there are `30` results, and the request has the offset set to `28` and the `limit` set to `20`, the `size` of the results will be `2` as the `offset` is the zero-based offset of the first item in the collection.
     */
    'size'?: number;
    /**
     * Zero-based index of the first item in the collection. For example, If there are `30` results, and the request has the offset set to `28`, the response will return `2` results.
     */
    'offset'?: number;
    /**
     * Maximum number of results returned based on the `limit` specified in the request. For example, if there are `30` results, and the request has the offset set to `0` and the `limit` set to `20`, the `size` of the results will be `20`. The rest of the results will not be returned. To retrieve the rest of the results, you must make another request and set the appropriate value for the offset parameter. In this example, you will set the offset parameter to 20 as the offset is zero-based.
     */
    'limit'?: number;
    'links'?: PageLinks;
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
