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
import { CustomField } from './customField';
/**
 * @internal
 * Contains the item data, such as the item title, content, or description.
 */
export declare class WidgetDataOutput {
    /**
     * The actual text (content) that appears in the sticky note item.
     */
    'content': string;
    /**
     * Type of the embedded item\'s content.
     */
    'contentType'?: string;
    /**
     * A short text description to add context about the app card.
     */
    'description'?: string;
    /**
     * Html code of the embedded item.
     */
    'html'?: string;
    /**
     * Defines how the content in the embed item is displayed on the board. `inline`: The embedded content is displayed directly on the board. `modal`: The embedded content is displayed inside a modal overlay on the board.
     */
    'mode'?: string | (typeof WidgetDataOutput.ModeEnum)[keyof typeof WidgetDataOutput.ModeEnum];
    /**
     * The URL to download the resource. You must use your access token to access the URL. The URL contains the `redirect` parameter and the `format` parameter to control the request execution as described in the following parameters: `format` parameter: By default, the image format is set to the preview image. If you want to download the original image, set the `format` parameter in the URL to `original`. `redirect`: By default, the `redirect` parameter is set to `false` and the resource object containing the URL and the resource type is returned with a 200 OK HTTP code. This URL is valid for 60 seconds. You can use this URL to retrieve the resource file. If the `redirect` parameter is set to `true`, a 307 TEMPORARY_REDIRECT HTTP response is returned. If you follow HTTP 3xx responses as redirects, you will automatically be redirected to the resource file and the content type returned can be `image/png`, \'image/svg\', or \'image/jpg\', depending on the original image type.
     */
    'previewUrl'?: string;
    /**
     * Name of the content\'s provider.
     */
    'providerName'?: string;
    /**
     * Url of the content\'s provider.
     */
    'providerUrl'?: string;
    /**
     * Title of the frame. This title appears at the top of the frame.
     */
    'title'?: string;
    /**
     * A [valid URL](https://developers.miro.com/reference/data#embeddata) pointing to the content resource that you want to embed in the board. Possible transport protocols: HTTP, HTTPS.
     */
    'url'?: string;
    /**
     * Unique user identifier. In the GUI, the user ID is mapped to the name of the user who is assigned as the owner of the task or activity described in the card. The identifier is numeric, and it is automatically assigned to a user when they first sign up.
     */
    'assigneeId'?: string;
    /**
     * The date when the task or activity described in the card is due to be completed. In the GUI, users can select the due date from a calendar. Format: UTC, adheres to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), includes a [trailing Z offset](https://en.wikipedia.org/wiki/ISO_8601#Coordinated_Universal_Time_(UTC)).
     */
    'dueDate'?: Date;
    /**
     * Array where each object represents a custom preview field. Preview fields are displayed on the bottom half of the app card in the compact view.
     */
    'fields'?: Array<CustomField>;
    /**
     * Defines whether the card is owned by the application making the call.
     */
    'owned'?: boolean;
    /**
     * Status indicating whether an app card is connected and in sync with the source. When the source for the app card is deleted, the status returns `disabled`.
     */
    'status'?: string | (typeof WidgetDataOutput.StatusEnum)[keyof typeof WidgetDataOutput.StatusEnum];
    /**
     * The URL to download the resource. You must use your access token to access the URL. The URL contains the `redirect` parameter and the `format` parameter to control the request execution as described in the following parameters: `format` parameter: By default, the image format is set to the preview image. If you want to download the original image, set the `format` parameter in the URL to `original`. `redirect`: By default, the `redirect` parameter is set to `false` and the resource object containing the URL and the resource type is returned with a 200 OK HTTP code. This URL is valid for 60 seconds. You can use this URL to retrieve the resource file. If the `redirect` parameter is set to `true`, a 307 TEMPORARY_REDIRECT HTTP response is returned. If you follow HTTP 3xx responses as redirects, you will automatically be redirected to the resource file and the content type returned can be `image/png`, \'image/svg\', or \'image/jpg\', depending on the original image type.
     */
    'imageUrl'?: string;
    /**
     * The URL to download the resource. You must use your access token to access the URL. The URL contains the `redirect` parameter to control the request execution. `redirect`: By default, the `redirect` parameter is set to `false` and the resource object containing the URL and the resource type is returned with a 200 OK HTTP code. This URL is valid for 60 seconds. You can use this URL to retrieve the resource file. If the `redirect` parameter is set to `true`, a 307 TEMPORARY_REDIRECT HTTP response is returned. If you follow HTTP 3xx responses as redirects, you will automatically be redirected to the resource file and the content type returned is `application/octet-stream`.
     */
    'documentUrl'?: string;
    /**
     * Defines the geometric shape of the sticky note and aspect ratio for its dimensions.
     */
    'shape'?: string | (typeof WidgetDataOutput.ShapeEnum)[keyof typeof WidgetDataOutput.ShapeEnum];
    /**
     * Only custom frames are supported at the moment.
     */
    'format'?: string | (typeof WidgetDataOutput.FormatEnum)[keyof typeof WidgetDataOutput.FormatEnum];
    /**
     * Only free form frames are supported at the moment.
     */
    'type'?: string | (typeof WidgetDataOutput.TypeEnum)[keyof typeof WidgetDataOutput.TypeEnum];
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
export declare namespace WidgetDataOutput {
    const ModeEnum: {
        readonly Inline: "inline";
        readonly Modal: "modal";
    };
    const StatusEnum: {
        readonly Disconnected: "disconnected";
        readonly Connected: "connected";
        readonly Disabled: "disabled";
    };
    const ShapeEnum: {
        readonly Square: "square";
        readonly Rectangle: "rectangle";
    };
    const FormatEnum: {
        readonly Custom: "custom";
        readonly Desktop: "desktop";
        readonly Phone: "phone";
        readonly Tablet: "tablet";
        readonly A4: "a4";
        readonly Letter: "letter";
        readonly Ratio1x1: "ratio_1x1";
        readonly Ratio4x3: "ratio_4x3";
        readonly Ratio16x9: "ratio_16x9";
    };
    const TypeEnum: {
        readonly Freeform: "freeform";
        readonly Heap: "heap";
        readonly Grid: "grid";
        readonly Rows: "rows";
        readonly Columns: "columns";
    };
}
