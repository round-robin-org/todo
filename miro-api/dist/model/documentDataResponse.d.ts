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
export declare class DocumentDataResponse {
    /**
     * The URL to download the resource. You must use your access token to access the URL. The URL contains the `redirect` parameter to control the request execution. `redirect`: By default, the `redirect` parameter is set to `false` and the resource object containing the URL and the resource type is returned with a 200 OK HTTP code. This URL is valid for 60 seconds. You can use this URL to retrieve the resource file. If the `redirect` parameter is set to `true`, a 307 TEMPORARY_REDIRECT HTTP response is returned. If you follow HTTP 3xx responses as redirects, you will automatically be redirected to the resource file and the content type returned is `application/octet-stream`.
     */
    'documentUrl'?: string;
    /**
     * A short text header to identify the document.
     */
    'title'?: string;
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
