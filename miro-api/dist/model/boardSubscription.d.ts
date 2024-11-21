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
import { BoardSubscriptionData } from './boardSubscriptionData';
export declare class BoardSubscription {
    /**
     * Indicates the HTTPS URL to which Miro sends a webhook when an event occurs.
     */
    'callbackUrl'?: string;
    /**
     * Date and time when the webhook subscription was created.<br>Format: UTC, adheres to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), includes a [trailing Z offset](https://en.wikipedia.org/wiki/ISO_8601#Coordinated_Universal_Time_(UTC)).
     */
    'createdAt'?: Date;
    'data'?: BoardSubscriptionData;
    /**
     * Unique identifier (ID) of a webhook subscription.
     */
    'id'?: string;
    /**
     * Date and time when the webhook subscription was last modified. <br>Format: UTC, adheres to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), includes a [trailing Z offset](https://en.wikipedia.org/wiki/ISO_8601#Coordinated_Universal_Time_(UTC)).
     */
    'modifiedAt'?: Date;
    /**
     * Indicates whether the status of the webhook subscription. `enabled`: Miro sends a webhook when an event occurs in the associated board. `disabled`: Miro does not send a webhook even when an event occurs in the associated board. `lost_access`: The user with which the webhook subscription is associated has lost access to the board. The user needs to regain access to the board, and then reenable the webhook subscription by updating the webhook subscription status to `enabled` by using the update webhook endpoint.
     */
    'status'?: string | (typeof BoardSubscription.StatusEnum)[keyof typeof BoardSubscription.StatusEnum];
    /**
     * The type of object associated with the webhook subscription.
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
export declare namespace BoardSubscription {
    const StatusEnum: {
        readonly Enabled: "enabled";
        readonly Disabled: "disabled";
        readonly LostAccess: "lost_access";
    };
}
