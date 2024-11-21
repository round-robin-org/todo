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
 * Contains information about the shape style, such as the border color or opacity.
 */
export declare class UpdateShapeStyle {
    /**
     * Defines the color of the border of the shape.
     */
    'borderColor'?: string;
    /**
     * Defines the opacity level of the shape border. Possible values: any number between `0.0` and `1.0`, where: `0.0`: the background color is completely transparent or invisible `1.0`: the background color is completely opaque or solid
     */
    'borderOpacity'?: string;
    /**
     * Defines the style used to represent the border of the shape.
     */
    'borderStyle'?: string | (typeof UpdateShapeStyle.BorderStyleEnum)[keyof typeof UpdateShapeStyle.BorderStyleEnum];
    /**
     * Defines the thickness of the shape border, in dp.
     */
    'borderWidth'?: string;
    /**
     * Hex value representing the color for the text within the shape item.
     */
    'color'?: string;
    /**
     * Fill color for the shape. Hex values: `#f5f6f8` `#d5f692` `#d0e17a` `#93d275` `#67c6c0` `#23bfe7` `#a6ccf5` `#7b92ff` `#fff9b1` `#f5d128` `#ff9d48` `#f16c7f` `#ea94bb` `#ffcee0` `#b384bb` `#000000`
     */
    'fillColor'?: string;
    /**
     * Opacity level of the fill color. Possible values: any number between `0` and `1`, where: `0.0`: the background color is completely transparent or invisible `1.0`: the background color is completely opaque or solid
     */
    'fillOpacity'?: string;
    /**
     * Defines the font type for the text in the shape item.
     */
    'fontFamily'?: string | (typeof UpdateShapeStyle.FontFamilyEnum)[keyof typeof UpdateShapeStyle.FontFamilyEnum];
    /**
     * Defines the font size, in dp, for the text on the shape.
     */
    'fontSize'?: string;
    /**
     * Defines how the sticky note text is horizontally aligned.
     */
    'textAlign'?: string | (typeof UpdateShapeStyle.TextAlignEnum)[keyof typeof UpdateShapeStyle.TextAlignEnum];
    /**
     * Defines how the sticky note text is vertically aligned.
     */
    'textAlignVertical'?: string | (typeof UpdateShapeStyle.TextAlignVerticalEnum)[keyof typeof UpdateShapeStyle.TextAlignVerticalEnum];
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
export declare namespace UpdateShapeStyle {
    const BorderStyleEnum: {
        readonly Normal: "normal";
        readonly Dotted: "dotted";
        readonly Dashed: "dashed";
    };
    const FontFamilyEnum: {
        readonly Arial: "arial";
        readonly AbrilFatface: "abril_fatface";
        readonly Bangers: "bangers";
        readonly EbGaramond: "eb_garamond";
        readonly Georgia: "georgia";
        readonly Graduate: "graduate";
        readonly GravitasOne: "gravitas_one";
        readonly FredokaOne: "fredoka_one";
        readonly NixieOne: "nixie_one";
        readonly OpenSans: "open_sans";
        readonly PermanentMarker: "permanent_marker";
        readonly PtSans: "pt_sans";
        readonly PtSansNarrow: "pt_sans_narrow";
        readonly PtSerif: "pt_serif";
        readonly RammettoOne: "rammetto_one";
        readonly Roboto: "roboto";
        readonly RobotoCondensed: "roboto_condensed";
        readonly RobotoSlab: "roboto_slab";
        readonly Caveat: "caveat";
        readonly TimesNewRoman: "times_new_roman";
        readonly TitanOne: "titan_one";
        readonly LemonTuesday: "lemon_tuesday";
        readonly RobotoMono: "roboto_mono";
        readonly NotoSans: "noto_sans";
        readonly PlexSans: "plex_sans";
        readonly PlexSerif: "plex_serif";
        readonly PlexMono: "plex_mono";
        readonly Spoof: "spoof";
        readonly TiemposText: "tiempos_text";
        readonly Formular: "formular";
    };
    const TextAlignEnum: {
        readonly Left: "left";
        readonly Right: "right";
        readonly Center: "center";
    };
    const TextAlignVerticalEnum: {
        readonly Top: "top";
        readonly Middle: "middle";
        readonly Bottom: "bottom";
    };
}
