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
/**
 * @internal
 * Contains information about the style of a connector, such as the color or caption font size
 */
export declare class UpdateConnectorStyle {
    /**
     * Hex value representing the color for the captions on the connector.
     */
    'color'?: string;
    /**
     * The decoration cap of the connector end, like an arrow or circle.
     */
    'endStrokeCap'?: string | (typeof UpdateConnectorStyle.EndStrokeCapEnum)[keyof typeof UpdateConnectorStyle.EndStrokeCapEnum];
    /**
     * Defines the font size, in dp, for the captions on the connector.
     */
    'fontSize'?: string;
    /**
     * The decoration cap of the connector end, like an arrow or circle.
     */
    'startStrokeCap'?: string | (typeof UpdateConnectorStyle.StartStrokeCapEnum)[keyof typeof UpdateConnectorStyle.StartStrokeCapEnum];
    /**
     * Hex value of the color of the connector line.
     */
    'strokeColor'?: string;
    /**
     * The stroke pattern of the connector line.
     */
    'strokeStyle'?: string | (typeof UpdateConnectorStyle.StrokeStyleEnum)[keyof typeof UpdateConnectorStyle.StrokeStyleEnum];
    /**
     * The thickness of the connector line, in dp.
     */
    'strokeWidth'?: string;
    /**
     * The captions orientation relatively to the connector line curvature.
     */
    'textOrientation'?: string | (typeof UpdateConnectorStyle.TextOrientationEnum)[keyof typeof UpdateConnectorStyle.TextOrientationEnum];
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
export declare namespace UpdateConnectorStyle {
    const EndStrokeCapEnum: {
        readonly None: "none";
        readonly Stealth: "stealth";
        readonly Diamond: "diamond";
        readonly FilledDiamond: "filled_diamond";
        readonly Oval: "oval";
        readonly FilledOval: "filled_oval";
        readonly Arrow: "arrow";
        readonly Triangle: "triangle";
        readonly FilledTriangle: "filled_triangle";
        readonly ErdOne: "erd_one";
        readonly ErdMany: "erd_many";
        readonly ErdOnlyOne: "erd_only_one";
        readonly ErdZeroOrOne: "erd_zero_or_one";
        readonly ErdOneOrMany: "erd_one_or_many";
        readonly ErdZeroOrMany: "erd_zero_or_many";
        readonly Unknown: "unknown";
    };
    const StartStrokeCapEnum: {
        readonly None: "none";
        readonly Stealth: "stealth";
        readonly Diamond: "diamond";
        readonly FilledDiamond: "filled_diamond";
        readonly Oval: "oval";
        readonly FilledOval: "filled_oval";
        readonly Arrow: "arrow";
        readonly Triangle: "triangle";
        readonly FilledTriangle: "filled_triangle";
        readonly ErdOne: "erd_one";
        readonly ErdMany: "erd_many";
        readonly ErdOnlyOne: "erd_only_one";
        readonly ErdZeroOrOne: "erd_zero_or_one";
        readonly ErdOneOrMany: "erd_one_or_many";
        readonly ErdZeroOrMany: "erd_zero_or_many";
        readonly Unknown: "unknown";
    };
    const StrokeStyleEnum: {
        readonly Normal: "normal";
        readonly Dotted: "dotted";
        readonly Dashed: "dashed";
    };
    const TextOrientationEnum: {
        readonly Horizontal: "horizontal";
        readonly Aligned: "aligned";
    };
}
