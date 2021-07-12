/**
 * THEOplayer
 * https://www.theoplayer.com
 *
 * Version: 2021.2.2 (2.86.0)
 */

/**
 * Describes the adaptive bitrate configuration.
 *
 * @remarks
 * <br/> - Available since v2.30.0.
 *
 * @public
 */
export declare interface ABRConfiguration {
    /**
     * The adaptive bitrate strategy.
     *
     * @defaultValue `'bandwidth'`
     */
    strategy?: ABRStrategy;
    /**
     * The amount which the player should buffer ahead of the current playback position, in seconds.
     *
     * @remarks
     * <br/> - This duration has a maximum of 60 seconds.
     * <br/> - The player might reduce or ignore the configured amount because of device or performance constraints.
     *
     * @defaultValue `20`
     */
    targetBuffer?: number;
    /**
     * The amount of data which the player should keep in its buffer before the current playback position, in seconds.
     * This configuration option can be used to reduce the memory footprint on memory restricted devices or on devices
     * which don't automatically prune decoder buffers.
     *
     * Note that the player can decide to keep less data in the decoder buffer in case memory is running low.
     * A value of 0 or lower is not accepted and will be treated as default.
     *
     * @defaultValue `30`
     */
    bufferLookbackWindow?: number;
}

/**
 * Describes the metadata of the adaptive bitrate strategy.
 *
 * @public
 */
export declare interface ABRMetadata {
    /**
     * The initial bitrate, in bits per second.
     *
     * @defaultValue Bitrate available to the browser.
     */
    bitrate?: number;
}

/**
 * The adaptive bitrate stratey.
 *
 * @public
 */
export declare type ABRStrategy = ABRStrategyConfiguration | ABRStrategyType;

/**
 * Describes the configuration of the adaptive bitrate strategy.
 *
 * @public
 */
export declare interface ABRStrategyConfiguration {
    /**
     * The strategy for initial playback.
     */
    type: ABRStrategyType;
    /**
     * The metadata for the initial playback strategy.
     *
     * @defaultValue A {@link ABRMetadata} object with default values.
     */
    metadata?: ABRMetadata;
}

/**
 * The adaptive bitrate strategy of the first segment, represented by a value from the following list:
 * <br/> - `'performance'`: The player will optimize ABR behavior to focus on the performance of the player. This strategy initiates playback with the lowest quality suitable for the device which means faster start-up time.
 * <br/> - `'quality'`: The player will optimize ABR behavior to focus displaying the best visual quality to the end-user. This strategy initiates playback with the highest bit rate suitable for the device.
 * <br/> - `'bandwidth'`: The player will optimize the ABR behavior to focus on displaying the most optimal quality based on historic data of available bandwidth and knowledge of the network conditions.
 *
 * @public
 */
export declare type ABRStrategyType = 'performance' | 'quality' | 'bandwidth';

/**
 * @public
 */
export declare interface ActiveTrackInfoLabel extends MetricLabel {
    readonly audioSwitchingSetId: string;
    readonly audioTrackId: string;
    readonly videoSwitchingSetId: string;
    readonly videoTrackId: string;
}

/**
 * @public
 */
export declare interface ActiveTrackLabeledMetric extends Metric {
    readonly labelData: ActiveTrackInfoLabel;
}

/**
 * Represents a VAST creative. It is either a linear or non-linear ad.
 *
 * @public
 */
export declare interface Ad {
    /**
     * The integration of the ad, represented by a value from the following list:
     * <br/> - `'theo'`
     * <br/> - `'google-ima'`
     * <br/> - `'google-dai'`
     * <br/> - `'freewheel'`
     *
     * @defaultValue `'theo'`
     */
    integration?: string;
    /**
     * The type of the ad, represented by a value from the following list:
     * <br/> - `'linear'`
     * <br/> - `'nonlinear'`
     */
    type: string;
    /**
     * The identifier of the creative.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    id: string | undefined;
    /**
     * The ready state of the ad.
     */
    readyState?: AdReadyState;
    /**
     * The ad break which the ad is part of.
     *
     * @remarks
     * <br/> - Available for VAST-ads.
     */
    adBreak: AdBreak;
    /**
     * The duration of the ad, in seconds.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     * <br/> - Only available for LinearAd.
     */
    duration?: number;
    /**
     * The width of the ad, in pixels.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    width: number | undefined;
    /**
     * The height of the ad.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    height: number | undefined;
    /**
     * The URI of the the ad content.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    resourceURI?: string;
    /**
     * The website of the advertisement.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    clickThrough: string | undefined;
    /**
     * List of companions which can be displayed outside the player.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     * <br/> - Only supported for `'theo'` and `'google-dai'`.
     */
    companions: CompanionAd[];
    /**
     * Offset after which the ad break may be skipped, in seconds.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     * <br/> - If the offset is -1, the ad is unskippable.
     * <br/> - If the offset is 0, the ad is immediately skippable.
     * <br/> - Otherwise it must be a positive number indicating the offset.
     */
    skipOffset: number | undefined;
    /**
     * The list of universal ad ID information of the selected creative for the ad.
     *
     * @remarks
     * <br/> - Only supported for `'theo'` and `'google-ima'`.
     */
    universalAdIds: UniversalAdId[];
}

/**
 * Represents an ad break in the VMAP specification or an ad pod in the VAST specification.
 *
 * @public
 */
export declare interface AdBreak {
    /**
     * The integration of the ad break, represented by a value from the following list:
     * <br/> - `'theo'`
     * <br/> - `'google-ima'`
     * <br/> - `'google-dai'`
     * <br/> - `'freewheel'`
     */
    integration: string | undefined;
    /**
     * List of ads which will be played sequentially at the ad break's time offset.
     */
    ads: Ad[] | undefined;
    /**
     * The time offset at which content will be paused to play the ad break, in seconds.
     */
    timeOffset: number;
    /**
     * The duration of the ad break, in seconds.
     *
     * @remarks
     * <br/> - Ads are lazily loaded. This property becomes available when all ads are loaded.
     */
    maxDuration: number | undefined;
    /**
     * The remaining duration of the ad break, in seconds.
     *
     * @remarks
     * <br/> - Ads are lazily loaded. This property becomes available when all ads are loaded.
     * <br/> - This feature is not available in the Google IMA integration and will default to -1.
     */
    maxRemainingDuration: number | undefined;
}

/**
 * Fired when the ad has stalled playback to buffer.
 *
 * @public
 */
export declare interface AdBufferingEvent extends Event_2<'adbuffering'> {
    /**
     * The ad which is buffered.
     */
    readonly ad: GoogleImaAd;
}

/**
 * Fired when a caching task is added.
 *
 * @public
 */
export declare interface AddCachingTaskEvent extends Event_2<'addtask'> {
    /**
     * The task which has been added.
     */
    readonly task: CachingTask;
}

/**
 * Describes an ad break request.
 *
 * @public
 */
export declare interface AdDescription {
    /**
     * The integration of the ad break.
     *
     * @defaultValue `'theo'`
     */
    integration?: AdIntegrationKind;
    /**
     * Whether the ad replaces playback of the content.
     *
     * @remarks
     * <br/> - When the ad ends, the content will resume at the ad break's offset plus its duration.
     *
     * @defaultValue
     * <br/> - `true` for live content,
     * <br/> - `false` for VOD content
     */
    replaceContent?: boolean;
    /**
     * A source which contains the location of ad resources to be scheduled.
     *
     * @remarks
     * <br/> - Important: This should *not* be an array of sources.
     * <br/> - VPAID support is limited to the `'google-ima'` integration.
     * <br/> - Not specifying this property should only happen when using a third party ad integration that uses an other system of specifying which ads to schedule
     */
    sources?: string | AdSource;
    /**
     * Offset after which the ad break will start.
     *
     * Possible formats:
     * <br/> - A number for the offset in seconds.
     * <br/> - `'start'` for a preroll.
     * <br/> - `'end'` for a postroll.
     * <br/> - `'HH:MM:SS.mmm'` for a timestamp in the playback window.
     * <br/> - A percentage string (XX%) for a proportion of the content duration.
     *
     * @remarks
     * <br/> - A timestamp which is not in the playback window will result in the ad break not being started.
     * <br/> - VMAP resources will ignore this value as they contain an internal offset.
     * <br/> - Since 2.18, numbers are supported for the Google IMA integration, since 2.21 other formats as well.
     *
     * @defaultValue `'start'`
     *
     */
    timeOffset?: string | number;
}

/**
 * The integration of an ad break, represented by a value from the following list:
 * <br/> - `'theo'`: Default ad playback.
 * <br/> - `'google-ima'`: {@link https://developers.google.com/interactive-media-ads/docs/sdks/html5|Google IMA} pre-integrated ad playback.
 * <br/> - `'spotx'`: {@link https://developer.spotxchange.com/|SpotX} pre-integrated ad playback.
 * <br/> - `'freewheel'`: {@link https://vi.freewheel.tv/|FreeWheel} pre-integrated ad playback.
 *
 * @remarks
 * <br/> - An empty string defaults to `'theo'`.
 *
 * @public
 */
export declare type AdIntegrationKind = '' | 'theo' | 'google-ima' | 'spotx' | 'freewheel';

/**
 * Fired when an ads list is loaded.
 *
 * @public
 */
export declare interface AdMetadataEvent extends Event_2<'admetadata'> {
}

/**
 * The ad preloading strategy, represented by a value from the following list:
 * <br/> - `'none'`: Ads are not preloaded.
 * <br/> - `'midroll-and-postroll'`: Mid- and postrolls are preloaded.
 *
 * @remarks
 * <br/> - For Google IMA, preloading starts 4 seconds before ad playback.
 *
 * @public
 */
export declare type AdPreloadType = 'none' | 'midroll-and-postroll';

/**
 * The ad readiness state, represented by a value from the following list:
 * <br/> - `'none'`: The ad not loaded state.
 * <br/> - `'ready'`: The ad loaded state.
 *
 * @remarks
 * <br/> - An ad is loaded when the ad resource (e.g. VAST file) is downloaded.
 * <br/> - another remark
 *
 * @public
 */
export declare type AdReadyState = 'none' | 'ready';

/**
 * The API for advertisements.
 *
 * @remarks
 * <br/> - Integrates with `'theo'`, `'google-ima'`, `'google-dai'` or `'freewheel'`.
 *
 * @public
 */
export declare interface Ads extends EventDispatcher<AdsEventMap> {
    /**
     * Whether a linear ad is currently playing.
     */
    playing: boolean;
    /**
     * The currently playing ad break.
     */
    readonly currentAdBreak: AdBreak | null;
    /**
     * List of currently playing ads.
     */
    readonly currentAds: Ad[];
    /**
     * List of ad breaks which still need to be played.
     */
    readonly scheduledAdBreaks: AdBreak[];
    /**
     * List of ads which still need to be played.
     *
     * @remarks
     * <br/> - Only available in the `'theo'` ad integration.
     *
     * @deprecated Superseded by {@link Ads.scheduledAdBreaks}.
     */
    readonly scheduledAds: Ad[];
    /**
     * Add an ad break request.
     *
     * @remarks
     * <br/> - Available since v2.18.0.
     * <br/> - Prefer scheduling ad breaks up front through {@link SourceConfiguration.ads}.
     *
     * @param adDescription - Describes the ad break to be scheduled.
     */
    schedule(adDescription: AdDescription): void;
    /**
     * Skip the current linear ad.
     *
     * @remarks
     * <br/> - This will have no effect when the current linear ad is (not yet) skippable.
     */
    skip(): void;
}

/**
 * Describes the configuration of advertisement.
 *
 * @public
 */
export declare interface AdsConfiguration {
    /**
     * Allows configuring which mime types are allowed during ad playback.
     *
     * @remarks
     * <br/> - This feature is only available for Google IMA.
     * <br/> - If set to an array, all ads with another mime types will be ignored.
     * <br/> - If set to `undefined` the ad system will pick media based on the browser's capabilities.
     *
     * @defaultValue `undefined`
     */
    allowedMimeTypes?: string[];
    /**
     * Whether an advertisement duration countdown will be shown in the UI.
     *
     * @remarks
     * <br/> - Available since v2.22.9.
     * <br/> - This feature is only available for Google IMA.
     *
     * @defaultValue `true`
     */
    showCountdown?: boolean;
    /**
     * Whether media files of mid- and postrolls are preloaded.
     *
     * @remarks
     * <br/> - This feature is only available for Google IMA.
     *
     * @defaultValue `'midroll-and-postroll'`
     */
    preload?: AdPreloadType;
    /**
     * The iframe policy for VPAID ads.
     *
     * @remarks
     * <br/> - This feature is only available for Google IMA and SpotX.
     *
     * @defaultValue `'enabled'`
     */
    vpaidMode?: VPAIDMode;
    
}

/**
 * The events fired by the {@link Ads | ads API}.
 *
 * @public
 */
export declare interface AdsEventMap {
    /**
     * Fired when an ad break is added.
     *
     * @remarks
     * <br/> - Available since v2.60.0.
     */
    addadbreak: Event_2<'addadbreak'>;
    /**
     * Fired when an ad break is removed.
     *
     * @remarks
     * <br/> - Available since v2.60.0.
     */
    removeadbreak: Event_2<'removeadbreak'>;
    /**
     * Fired when an ad break begins.
     */
    adbreakbegin: Event_2<'adbreakbegin'>;
    /**
     * Fired when an ad break ends.
     */
    adbreakend: Event_2<'adbreakend'>;
    /**
     * Fired when an ad break changes.
     */
    adbreakchange: Event_2<'adbreakchange'>;
    /**
     * Fired when an ad is added.
     *
     * @remarks
     * <br/> - Available since v2.60.0.
     */
    addad: Event_2<'addad'>;
    /**
     * Fired when an ad is updated.
     *
     * @remarks
     * <br/> - Available since v2.60.0.
     */
    updatead: Event_2<'updatead'>;
    /**
     * Fired when an AdBreak is updated.
     *
     * @remarks
     * <br/> - Available since v2.66.0.
     */
    updateadbreak: Event_2<'updateadbreak'>;
    /**
     * Fired when an ad is loaded.
     */
    adloaded: Event_2<'adloaded'>;
    /**
     * Fired when an ad begins.
     */
    adbegin: Event_2<'adbegin'>;
    /**
     * Fired when an ad ends.
     */
    adend: Event_2<'adend'>;
    /**
     * Fired when an ad is skipped.
     */
    adskip: Event_2<'adskip'>;
    /**
     * Fired when an ad errors.
     */
    aderror: Event_2<'aderror'>;
    /**
     * Fired when an ad counts as an impression.
     */
    adimpression: Event_2<'adimpression'>;
    /**
     * Fired when an ad reaches the first quartile.
     */
    adfirstquartile: Event_2<'adfirstquartile'>;
    /**
     * Fired when an ad reaches the mid point.
     */
    admidpoint: Event_2<'admidpoint'>;
    /**
     * Fired when an ad reaches the third quartile.
     */
    adthirdquartile: Event_2<'adthirdquartile'>;
    /**
     * Fired when the ad has stalled playback to buffer.
     *
     * @remarks
     * <br/> - only available in the Google IMA integration.
     */
    adbuffering: AdBufferingEvent;
    /**
     * Fired when an ads list is loaded.
     *
     * @remarks
     * <br/> - only available in the Google IMA integration.
     */
    admetadata: AdMetadataEvent;
}

/**
 * Describes the source of the ad.
 *
 * @public
 */
export declare interface AdSource {
    /**
     * The URL of the ad resource.
     */
    src: string;
    /**
     * The type of ad resource.
     *
     * @defaultValue 'vmap' when set through {@link SourceConfiguration.ads} without a time offset, otherwise 'vast'.
     */
    type?: AdSourceType;
}

/**
 * The type of ad source:
 * <br/> - `'vast'`: The source is a VAST resource.
 * <br/> - `'vmap'`: The source is a VMAP resource.
 * <br/> - `'adrule'`: The source is a Ad Rule resource.
 *
 * @remarks
 * <br/> - An ad rule is a simplified VMAP alternative only available in the Google IMA integration.
 *
 * @public
 */
export declare type AdSourceType = 'vast' | 'vmap' | 'adrule';

/**
 * Describes the AES128 key system configuration.
 *
 * @public
 */
export declare interface AES128KeySystemConfiguration {
    /**
     * Whether the player is allowed to use credentials for cross-origin requests.
     *
     * @remarks
     * <br/> - Credentials are cookies, authorization headers or TLS client certificates.
     *
     * @defaultValue `false`
     */
    useCredentials?: true;
}

/**
 * The identifier of the Agama integration.
 *
 * @public
 */
export declare type AgamaAnalyticsIntegrationID = 'agama';

/**
 * Describes the configuration of Agama.
 *
 * @public
 */
export declare interface AgamaConfiguration extends AnalyticsDescription {
    /**
     * {@inheritDoc AnalyticsDescription.integration}
     */
    integration: AgamaAnalyticsIntegrationID;
}

/**
 * The type of log level for the Agama integration, represented by a value from the following list:
 * <br/> - `'info'`
 * <br/> - `'debug'`
 * <br/> - `'warning'`
 * <br/> - `'error'`
 * <br/> - `'fatal'`
 *
 * @public
 */
export declare type AgamaLogLevelType = 'info' | 'debug' | 'warning' | 'error' | 'fatal';

/**
 * Describes the configuration of Agama.
 *
 * @remarks
 * <br/> - Available since v2.45.6.
 *
 * @public
 */
export declare interface AgamaPlayerConfiguration extends AgamaConfiguration {
    /**
     * The initial base configuration.
     *
     * @remarks
     * <br/> - For more information, consult the Agama documentation.
     *
     * @example
     * <br/> - 'emp_service=http://127.0.0.1:8191/report;report_interval=60;id_report_interval=240;operator_id=fooSoo'
     */
    config: string;
    /**
     * The type of log level.
     *
     * @defaultValue `'fatal'`
     */
    logLevel?: AgamaLogLevelType;
    /**
     * The name of your application.
     *
     * @remarks
     * <br/> - Available since v2.61.0.
     * <br/> - Will not be reported to Agama if not present
     */
    application?: string;
    /**
     * The version of your application
     *
     * @remarks
     * <br/> - Available since v2.61.0.
     * <br/> - Will not be reported to Agama if not present
     */
    applicationVersion?: string;
    /**
     * The identifier of the user account.
     *
     * @remarks
     * <br/> - Available since v2.61.0.
     * <br/> - Will not be reported to Agama if not present
     */
    userAccountID?: string;
}

/**
 * The service name, represented by a value from the following list:
 * <br/> - `'live'`
 * <br/> - `'svod'`
 * <br/> - `'nvod'`
 * <br/> - `'tvod'`
 * <br/> - `'avod'`
 * <br/> - `'catchuptv'`
 *
 * @public
 */
export declare type AgamaServiceName = 'live' | 'svod' | 'nvod' | 'tvod' | 'avod' | 'catchuptv';

/**
 * Describes the configuration of Agama for this source.
 *
 * @remarks
 * <br/> - Available since v2.45.6.
 * <br/> - Overrides the {@link AgamaPlayerConfiguration}.
 *
 * @public
 */
export declare interface AgamaSourceConfiguration extends AgamaConfiguration {
    /**
     * The identifier of the asset.
     */
    asset: string;
    /**
     * The stream type of the session.
     */
    streamType: AgamaStreamType;
    /**
     * The service name.
     *
     * @remarks
     * <br/> - Available since v2.61.0.
     * <br/> - Will not be reported to Agama if not present
     */
    serviceName?: AgamaServiceName;
    /**
     * The CDN from which the content is served.
     *
     * @remarks
     * <br/> - Available since v2.61.0.
     * <br/> - Will not be reported to Agama if not present
     */
    cdn?: string;
    /**
     * The title of the content.
     *
     * @remarks
     * <br/> - Available since v2.61.0.
     * <br/> - Will not be reported to Agama if not present
     * <br/> - The format is `title` or `title/season` or `title/season/episode` (e.g. Game of Thrones/Season 4/Episode 7)
     */
    contentTitle?: string;
    /**
     * The type of the content.
     *
     * @remarks
     * <br/> - Available since v2.61.0.
     * <br/> - Will not be reported to Agama if not present
     * <br/> - Suggested values are 'trailer', 'movie', 'news', 'documentary', ...
     */
    contentType?: string;
    /**
     * The description of the content.
     *
     * @remarks
     * <br/> - Available since v2.61.0.
     * <br/> - Will not be reported to Agama if not present
     */
    contentDescription?: string;
}

/**
 * The stream type, represented by a value from the following list:
 * <br/> - `'live'`
 * <br/> - `'vod'`
 *
 * @public
 */
export declare type AgamaStreamType = 'live' | 'vod';

/**
 * The AirPlay API.
 *
 * @public
 */
export declare interface AirPlay extends VendorCast {
}

/**
 * @public
 */
export declare type Analytic = AnalyticMap[keyof AnalyticMap];

/**
 * @public
 */
export declare interface AnalyticBase<N extends AnalyticType, V> {
    readonly name: N;
    readonly value: V;
    readonly unit: string;
    readonly description: string;
}

/**
 * @public
 */
export declare interface AnalyticMap {
    [AnalyticType.LIVE_OFFSET]: AnalyticBase<AnalyticType.LIVE_OFFSET, number>;
    [AnalyticType.TRACK_BYTES_DOWNLOADED]: AnalyticBase<AnalyticType.TRACK_BYTES_DOWNLOADED, TrackBytesDownloadedData>;
    [AnalyticType.ESTIMATED_TRACK_NETWORK_BANDWIDTH]: AnalyticBase<AnalyticType.ESTIMATED_TRACK_NETWORK_BANDWIDTH, number>;
    [AnalyticType.ESTIMATED_TRACK_MEDIA_DATA_BANDWIDTH]: AnalyticBase<AnalyticType.ESTIMATED_TRACK_MEDIA_DATA_BANDWIDTH, number>;
    [AnalyticType.SEGMENT_RECEIVE_INTERVAL]: AnalyticBase<AnalyticType.SEGMENT_RECEIVE_INTERVAL, SegmentReceiveIntervalData>;
}

/**
 * The analytics API.
 *
 * @public
 */
export declare interface Analytics {
    /**
     * The Conviva analytics API.
     *
     * @remarks
     * <br/> - Only available with the feature `'conviva'`.
     */
    conviva?: Conviva_2;
}

/**
 * Describes the configuration of an analytics integration.
 *
 * @public
 */
export declare interface AnalyticsDescription {
    /**
     * The identifier of the analytics integration.
     */
    integration: AnalyticsIntegrationID;
}

/**
 * The integration identifier of an analytics description, represented by a value from the following list:
 * <br/> - `'agama'`: The description is an {@link AgamaConfiguration}
 * <br/> - `'conviva'`: The description is a {@link ConvivaConfiguration}
 * <br/> - `'youbora'`: The description is a {@link YouboraOptions}
 * <br/> - `'moat'`: The description is a {@link MoatConfiguration}
 * <br/> - `'streamone'`: The description is a {@link StreamOneConfiguration}
 * <br/> - `'smartsight'`: The description is a {@link SmartSightConfiguration}
 *
 * @public
 */
export declare type AnalyticsIntegrationID = 'agama' | 'conviva' | 'youbora' | 'moat' | 'streamone' | 'smartsight';

/**
 * @public
 */
export declare enum AnalyticType {
    LIVE_OFFSET = "liveoffset",
    TRACK_BYTES_DOWNLOADED = "trackbytesdownloaded",
    ESTIMATED_TRACK_NETWORK_BANDWIDTH = "estimatedtracknetworkbandwidth",
    ESTIMATED_TRACK_MEDIA_DATA_BANDWIDTH = "estimatedtrackmediadatabandwidth",
    SEGMENT_RECEIVE_INTERVAL = "segmentreceiveinterval"
}

/**
 * Represents a quality of an audio track.
 *
 * @public
 */
export declare interface AudioQuality extends Quality {
    /**
     * The sampling rate of the audio quality.
     */
    readonly audioSamplingRate: number | [number, number];
}

/**
 * Describes the configuration of the Axinom DRM integration.
 *
 * @example
 * ```
 * const drmConfiguration = {
 *     integration : 'axinom',
 *     token: 'yourToken',
 *     fairplay: {
 *          licenseAcquisitionURL: 'yourLicenseAcquisitionURL'
 *          certificateURL: 'yourCertificateAcquisitionURL'
 *     },
 * }
 * ```
 *
 * @public
 */
export declare interface AxinomDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: AxinomIntegrationID;
    /**
     * The Axinom Authorization Token.
     *
     * @remarks
     * <br/> - This token which will be attached to the license request (custom data) is retrieved.
     */
    token: string;
}

/**
 * The identifier of the Axinom integration.
 *
 * @public
 */
export declare type AxinomIntegrationID = 'axinom';

/**
 * Describes the configuration of the Azure Media Services DRM integration.
 *
 * @public
 */
export declare interface AzureDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: AzureIntegrationID;
    /**
     * The Azure Media Services Authorization Token.
     *
     * @remarks
     * <br/> -  This token which will be used for the license request.
     */
    token: string;
}

/**
 * The identifier of the Azure Media Services integration.
 *
 * @public
 */
export declare type AzureIntegrationID = 'azure';

/**
 * Util for encoding binary data as base64 string and vice versa.
 *
 * @public
 */
export declare interface Base64Util {
    encode(value: Uint8Array): string;
    decode(value: string): Uint8Array;
}

/**
 * Represents the common properties of a media resource.
 *
 * @public
 */
export declare interface BaseSource {
    /**
     * The integration ID of the source.
     *
     * @remarks
     * <br/> - This can be used to signal that a source is specific to an integration.
     */
    integration?: SourceIntegrationId;
    /**
     * The cross-origin setting of the source.
     *
     * @defaultValue `''`
     *
     * @remarks
     * <br/> - Available since v2.9.0.
     */
    crossOrigin?: CrossOriginSetting;
    /**
     * Whether the player is allowed to use credentials for cross-origin requests.
     *
     * @remarks
     * <br/> - Credentials are cookies, authorization headers or TLS client certificates.
     *
     * @defaultValue `false`
     */
    useCredentials?: boolean;
    /**
     * The offset in seconds used to determine the live point.
     * This live point is the end of the manifest minus the provided offset.
     *
     * @remarks
     * <br/> - Available since v2.35.0.
     *
     * @defaultValue Three times the segment's target duration.
     */
    liveOffset?: number;
    /**
     * The URL of a time server used by the player to synchronise the time in DASH sources.
     *
     * @remarks
     * <br/> - Available since v2.47.0.
     * <br/> - The time server should return time in ISO-8601 format.
     * <br/> - Overrides the time server provided the DASH manifest's `<UTCTiming>`.
     * <br/> - Only this source will use the time server. Alternatively, for all source use {@link SourceConfiguration.timeServer}.
     */
    timeServer?: string;
    /**
     * Whether the player should parse and expose date ranges from HLS manifests.
     *
     * @defaultValue `false`
     *
     * @remarks
     * <br/> - Available since v2.61.0.
     */
    hlsDateRange?: boolean;
    
    
    /**
     * Whether the source should be played in the low-latency-mode of the player.
     *
     * @defaultValue `false`
     *
     * @remarks
     * <br/> - This setting must be `true` when using Low-Latency CMAF with ABR.
     * <br/> - Available since v2.62.0.
     */
    lowLatency?: boolean;
    /**
     * Whether this source should be played using native playback.
     *
     * @defaultValue `false`
     *
     * @remarks
     * <br/> - Available since v2.68.0.
     * <br/> - Ignored for DASH streams.
     * <br/> - Only supported on browsers that can play HLS streams natively, will error otherwise.
     */
    useNativePlayback?: boolean;
    /**
     * The configuration for controlling playback of an MPEG-DASH stream.
     *
     * @remarks
     * <br/> - Available since v2.79.0.
     * <br/> - Ignored for non-DASH streams.
     */
    dash?: DashPlaybackConfiguration;
    /**
     * The configuration for controlling playback of an HLS stream.
     *
     * @remarks
     * <br/> - Available since v2.82.0.
     * <br/> - Ignored for non-HLS streams.
     */
    hls?: HlsPlaybackConfiguration;
}

/**
 * @public
 */
export declare interface BaseUriLabel extends MetricLabel {
    baseUri: string;
}

/**
 * A boundary can be one of 3 possible types:
 * <br/> - c3: An ad that is relevant for up to 3 days after the original airing.
 * <br/> - c7: An ad that is relevant for up to 7 days after the original airing.
 * <br/> - halftime: Identifies special content.
 *
 * @remarks
 * <br/> - See {@link https://docs.vdms.com/video/#Setup/Boundaries-Setup-Playback.htm | Boundaries }
 *
 * @public
 */
export declare type Boundary = BoundaryC3 | BoundaryC7 | BoundaryHalftime;

/**
 * Represents the boundary of an ad that is relevant for up to three days after the original airing.
 *
 * @public
 */
export declare interface BoundaryC3 {
    c3: BoundaryInfo;
}

/**
 * Represents the boundary of an ad that is relevant for up to seven days after the original airing.
 *
 * @public
 */
export declare interface BoundaryC7 {
    c7: BoundaryInfo;
}

/**
 * Represents the boundary that identifies special content.
 *
 * @public
 */
export declare interface BoundaryHalftime {
    halftime: BoundaryInfo;
}

/**
 * Represents the information of an ad boundary.
 *
 * @public
 */
export declare interface BoundaryInfo {
    /**
     * The duration of this boundary, in seconds.
     */
    duration: number;
    /**
     * The offset for this boundary, in seconds.
     */
    offset: number;
}

/**
 * The number of audio and video segments in the buffer.
 *
 * @public
 */
export declare interface BufferedSegments {
    amountOfBufferedAudioSegments: number;
    amountOfBufferedVideoSegments: number;
}

/**
 * Helper type that represents either an ArrayBuffer or an ArrayBufferView.
 * Inspired by https://developer.mozilla.org/en-US/docs/Web/API/BufferSource.
 *
 * @public
 */
declare type BufferSource_2 = ArrayBufferView | ArrayBuffer;
export { BufferSource_2 as BufferSource }

/**
 * The global cache API.
 *
 * @public
 */
export declare const cache: Cache_2;

/**
 * The media caching API.
 *
 * @remarks
 * <br/> - Available since v2.26.
 *
 * @public
 */
declare interface Cache_2 extends EventDispatcher<CacheEventMap> {
    /**
     * List of caching tasks which control the caching of media.
     */
    readonly tasks: CachingTaskList;
    /**
     * The current status of the cache.
     */
    readonly status: CacheStatus;
    /**
     * The cache's network API which allows intercepting requests and responses made by the cache.
     */
    readonly network: NetworkInterceptorController;
    /**
     * Create a caching task which controls the caching of media.
     *
     * @param source - Describes the media source to be cached.
     * @param parameters - Contains caching task related options.
     */
    createTask(source: SourceDescription, parameters: CachingTaskParameters): CachingTask;
}
export { Cache_2 as Cache }

/**
 * The events fired by the {@link Cache | cache API}.
 *
 * @public
 */
export declare interface CacheEventMap {
    /**
     * Fired when {@link Cache.status} changes.
     */
    statechange: Event_2<'statechange'>;
}

/**
 * The cache status, represented by a value from the following list:
 * <br/> - `'uninitialised'`: Previously stored caching tasks are unavailable.
 * <br/> - `'initialised'`: Previously stored caching tasks are now available.
 *
 * @public
 */
export declare type CacheStatus = 'uninitialised' | 'initialised';

/**
 * The cache task status, represented by a value from the following list:
 * <br/> - `'idle'`: The task has been created, but has not started downloading content.
 * <br/> - `'loading'`: The task is currently downloading the content.
 * <br/> - `'done'`: The task has finished downloading all content.
 * <br/> - `'error'`: The task has encountered an error while downloading or evicting content.
 * <br/> - `'evicted'`: All data associated with the task has been removed because the task expired or the user invoked the {@link CachingTask.remove|remove} method.
 *
 * @public
 */
export declare type CacheTaskStatus = 'idle' | 'loading' | 'done' | 'error' | 'evicted';

/**
 * Represents a caching task.
 *
 * @public
 */
export declare interface CachingTask extends EventDispatcher<CachingTaskEventMap> {
    /**
     * The generated identifier for the task.
     */
    readonly id: string;
    /**
     * The current status of the task.
     */
    readonly status: CacheTaskStatus;
    /**
     * The media source associated with the task.
     */
    readonly source: SourceDescription;
    /**
     * The configuration of the task.
     */
    readonly parameters: CachingTaskParameters;
    /**
     * The requested cached duration of the media, in seconds.
     */
    readonly duration: number;
    /**
     * The time ranges cached.
     */
    readonly cached: NativeTimeRanges;
    /**
     * The duration cached, in seconds.
     */
    readonly secondsCached: number;
    /**
     * The percentage cached.
     */
    readonly percentageCached: number;
    /**
     * The estimation of the amount this task will download and store, in bytes.
     *
     * @remarks
     * <br/> - Returns -1 if the estimate is not available yet.
     */
    readonly bytes: number;
    /**
     * The amount downloaded and stored, in bytes.
     */
    readonly bytesCached: number;
    /**
     * The API for license related queries and operations
     */
    readonly license: CachingTaskLicense;
    /**
     * Start caching the media.
     */
    start(): void;
    /**
     * Remove the cached media.
     */
    remove(): void;
    /**
     * Pause caching the media.
     *
     * @remarks
     * <br/> - A paused task can be resumed with {@link CachingTask.start}.
     */
    pause(): void;
}

/**
 * The events fired by the {@link CachingTask}.
 *
 * @public
 */
export declare interface CachingTaskEventMap {
    /**
     * Fired when a segment is added to the cache.
     */
    progress: Event_2<'progress'>;
    /**
     * Fired when {@link CachingTask.status} changes.
     */
    statechange: Event_2<'statechange'>;
}

/**
 * The {@link CachingTask}'s license API.
 *
 * @public
 */
export declare interface CachingTaskLicense {
    /**
     * Renew all the licenses associated with this task.
     *
     * @param drmConfiguration - The DRM configuration used for license renewals. Defaults to the DRM configuration of the original sourceDescription when omitted.
     */
    renew(drmConfiguration?: DRMConfiguration): void;
}

/**
 * List of caching tasks.
 *
 * @public
 */
export declare interface CachingTaskList extends EventedList<CachingTask, CachingTaskListEventMap> {
}

/**
 * The events fired by the {@link CachingTaskList}.
 *
 * @public
 */
export declare interface CachingTaskListEventMap {
    /**
     * {@inheritDoc AddCachingTaskEvent}
     */
    addtask: AddCachingTaskEvent;
    /**
     * {@inheritDoc AddCachingTaskEvent}
     */
    removetask: RemoveCachingTaskEvent;
}

/**
 * Describes the configuration of a caching task.
 *
 * @public
 */
export declare interface CachingTaskParameters {
    /**
     * The amount of data to cache for the given stream.
     *
     * @remarks
     * Possible formats:
     * <br/> - A number in seconds.
     * <br/> - A percentage string (XX%) for a proportion of the content duration.
     */
    amount: number | string;
    /**
     * The expiration date of the cached data.
     *
     * @remarks
     * <br/> - Must be a date in the future.
     * <br/> - Data might be removed by the browser if it runs out of disk space.
     *
     * @defaultValue 30 minutes after starting the caching task.
     */
    expirationDate?: Date;
    /**
     * Upper bandwidth limit of the quality to cache.
     *
     * @remarks
     * <br/> - This will take the quality with the highest bandwidth that is lower than the specified bandwidth.
     * <br/> - It should be a value between zero and infinity.
     *
     * @defaultValue Infinity
     */
    bandwidth?: number;
}

/**
 * Fired when the player can resume playback of the media data.
 *
 * @public
 */
export declare interface CanPlayEvent extends Event_2<'canplay'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}

/**
 * Fired when the player can resume playback of the media data and buffering is unlikely.
 *
 * @public
 */
export declare interface CanPlayThroughEvent extends Event_2<'canplaythrough'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}

/**
 * The canvas API which allows drawing the player's current frame to a 2D or WebGL context.
 *
 * @remarks
 * This allows for advanced usages of the images, like transformations, drawing and cropping.
 *
 * Cross-origin restrictions:
 * Browsers place additional security restrictions for cross-origin video content drawn to a canvas.
 * When you draw video content retrieved without proper cross-origin settings to a canvas, the canvas becomes "tainted".
 * A {@link https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#What_is_a_tainted_canvas | tainted canvas}
 * can still be used, but will throw errors when attempting to read pixel data from it (for example when calling
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData | `getImageData`} or
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob | `toBlob`}).
 *
 * In order to avoid tainting the canvas, the video content must be retrieved with the proper CORS settings.
 * Set `crossOrigin` to `"anonymous"` or `"use-credentials"` in the {@link TypedSource} of your {@link SourceDescription}
 * when loading the video source into THEOplayer.
 * This ensures that the content is always retrieved with CORS-enabled HTTP requests, and will not taint the canvas when drawn.
 *
 * Drawing cross-origin content to WebGL context on iOS 10 and lower:
 * iOS version 10 and lower has a bug that prevents drawing cross-origin video content to a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext | `WebGLRenderingContext`},
 * even when the proper CORS settings are provided ({@link https://bugs.webkit.org/show_bug.cgi?id=135379 | WebKit bug #135379}).
 * In particular, cross-origin 360° videos (using the {@link VR | VR API}) only render correctly in iOS 11 and higher.
 *
 * If you need to support iOS 10 and below, we recommend loading the stream from the same origin as the web page.
 *
 * DRM protected content:
 * It is not possible to render DRM protected content to a canvas.
 *
 * Available since v2.12.0.
 *
 * @public
 */
export declare interface Canvas {
    /**
     * Draw the current frame to a 2D Canvas context.
     *
     * @remarks
     * <br/> - If the video hasn't loaded yet, nothing will be drawn.
     * <br/> - The first argument is the destination 2D context for the draw operation. The other arguments are passed to the native CanvasRenderingContext2D.drawImage method.
     * <br/> - see {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage | CanvasRenderingContext2D.drawImage()}.
     *
     * @param context2D - The 2D destination context.
     * @param dx - The x-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
     * @param dy - The y-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
     */
    drawImage(context2D: CanvasRenderingContext2D, dx: number, dy: number): boolean;
    /**
     * Draw the current frame to a 2D Canvas context.
     *
     * @remarks
     * <br/> - If the video hasn't loaded yet, nothing will be drawn.
     * <br/> - The first argument is the destination 2D context for the draw operation. The other arguments are passed to the native CanvasRenderingContext2D.drawImage method.
     * <br/> - see {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage | CanvasRenderingContext2D.drawImage()}.
     *
     * @param context2D - The 2D destination context.
     * @param dx - The x-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
     * @param dy - The y-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
     * @param dWidth - The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
     * @param dHeight - The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.
     */
    drawImage(context2D: CanvasRenderingContext2D, dx: number, dy: number, dWidth: number, dHeight: number): boolean;
    /**
     * Draw the current frame to a 2D Canvas context.
     *
     * @remarks
     * <br/> - If the video hasn't loaded yet, nothing will be drawn.
     * <br/> - The first argument is the destination 2D context for the draw operation. The other arguments are passed to the native CanvasRenderingContext2D.drawImage method.
     * <br/> - see {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage | CanvasRenderingContext2D.drawImage()}.
     *
     * @param context2D - The 2D destination context.
     * @param sx - The x-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
     * @param sy - The y-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
     * @param sWidth - The width of the sub-rectangle of the source image to draw into the destination context. If not specified, the entire rectangle from the coordinates specified by sx and sy to the bottom-right corner of the image is used.
     * @param sHeight - The height of the sub-rectangle of the source image to draw into the destination context.
     * @param dx - The x-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
     * @param dy - The y-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
     * @param dWidth - The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
     * @param dHeight - The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.
     */
    drawImage(context2D: CanvasRenderingContext2D, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number): boolean;
    /**
     * Draw the current frame as a 2D texture to a 3D WebGL context.
     *
     * @remarks
     * <br/> - If the video hasn't loaded yet, nothing will be drawn.
     * <br/> - The first argument is the destination WebGL context for the draw operation. The other arguments are passed to the native WebGLRenderingContext.texImage2D method.
     * <br/> - See {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D | WebGLRenderingContext.texImage2D()}.
     *
     * @param contextWebGL - The WebGL context.
     * @param target - A GLenum specifying the binding point (target) of the active texture.
     * @param level - A GLint specifying the level of detail. Level 0 is the base image level and level n is the nth mipmap reduction level.
     * @param internalformat - A GLenum specifying the color components in the texture.
     * @param format - A GLenum specifying the format of the texel data.
     * @param type - A GLenum specifying the data type of the texel data.
     */
    texImage2D(contextWebGL: WebGLRenderingContext, target: GLenum, level: GLint, internalformat: GLint, format: GLenum, type: GLenum): boolean;
}

/**
 * The cast API.
 *
 * @public
 */
export declare interface Cast extends EventDispatcher<CastEventMap> {
    /**
     * Whether the player is connected with a casting device.
     */
    casting: boolean;
    /**
     * The Airplay integration API.
     *
     * @remarks
     * <br/> - Only available with the feature `'airplay'`.
     */
    airplay?: AirPlay;
    /**
     * The Chromecast integration API.
     *
     * @remarks
     * <br/> - Only available with the feature `'chromecast'`.
     */
    chromecast?: Chromecast;
}

/**
 * The global cast API.
 *
 * @public
 */
declare const cast_2: GlobalCast;
export { cast_2 as cast }

/**
 * Describes the configuration of the Cast integrations.
 *
 * @public
 */
export declare interface CastConfiguration {
    /**
     * The Chromecast configuration.
     *
     * @defaultValue A {@link ChromecastConfiguration} with default values.
     */
    chromecast?: ChromecastConfiguration;
    /**
     * The join strategy of the player.
     *
     * @defaultValue `'manual'`
     */
    strategy?: JoinStrategy;
}

/**
 * The events fired by the {@link Cast | cast API}.
 *
 * @public
 */
export declare interface CastEventMap {
    /**
     * Fired when {@link Cast.casting} changes.
     */
    castingchange: Event_2<'castingchange'>;
}

/**
 * The state of a casting process, represented by a value from the following list:
 * <br/> - `'unavailable'`: No available cast devices.
 * <br/> - `'available'`: Cast device available, but the player is not connected.
 * <br/> - `'connecting'`: Cast device available and the player is connecting.
 * <br/> - `'connected'`: Cast device available and the player is connected.
 *
 * @public
 */
export declare type CastState = 'unavailable' | 'available' | 'connecting' | 'connected';

/**
 * Fires when the cast state changes.
 *
 * @public
 */
export declare interface CastStateChangeEvent extends Event_2<'statechange'> {
    /**
     * The new cast state.
     */
    readonly state: CastState;
}

/**
 * A request for a certificate.
 *
 * @public
 */
export declare type CertificateRequest = ContentProtectionRequest;

/**
 * The response of a certificate request.
 * @public
 */
export declare interface CertificateResponse extends ContentProtectionResponse {
    /**
     * The request for which the response is being returned.
     */
    request: CertificateRequest;
}

/**
 * The Chromecast API.
 *
 * @public
 */
export declare interface Chromecast extends VendorCast, EventDispatcher<ChromecastEventMap> {
    /**
     * The last error that occurred during casting, if any.
     */
    error: ChromecastError | undefined;
    /**
     * The name of the Chromecast device that the player is casting to, if any.
     */
    receiverName: string | undefined;
    /**
     * The source of the active casting session, if any.
     */
    source: SourceDescription | undefined;
    /**
     * Join an active casting session.
     */
    join(): void;
    /**
     * Leave the active casting session.
     *
     * @remarks
     * <br/> - Does not stop the session when other devices are connected.
     * <br/> - Use {@link VendorCast.stop} to fully stop the session.
     */
    leave(): void;
    /**
     * {@inheritDoc EventDispatcher.addEventListener}
     */
    addEventListener<TType extends StringKeyOf<ChromecastEventMap>>(type: TType | TType[], listener: EventListener_2<ChromecastEventMap[TType]>): void;
    /**
     * {@inheritDoc EventDispatcher.removeEventListener}
     */
    removeEventListener<TType extends StringKeyOf<ChromecastEventMap>>(type: TType | TType[], listener: EventListener_2<ChromecastEventMap[TType]>): void;
}

/**
 * Describes the configuration of the Chromecast integration.
 *
 * @public
 */
export declare interface ChromecastConfiguration {
    /**
     * The identifier of a custom Chromecast receiver app.
     *
     * @defaultValue The default THEOplayer receiver app.
     */
    appID?: string;
}

/**
 * An error that occurred while casting or attempting to cast to Chromecast.
 *
 * @public
 */
export declare interface ChromecastError {
    /**
     * The error code of the error.
     */
    errorCode: ChromecastErrorCode;
    /**
     * The human-readable description of the error.
     */
    description: string;
}

/**
 * The chromecast error code, represented by a value from the following list:
 * <br/> - `'CANCEL'`: The operation was canceled by the user.
 * <br/> - `'TIMEOUT'`: The operation timed out.
 * <br/> - `'API_NOT_INITIALIZED'`: The API is not initialized.
 * <br/> - `'INVALID_PARAMETER'`: The parameters to the operation were not valid.
 * <br/> - `'EXTENSION_NOT_COMPATIBLE'`: The API script is not compatible with the installed Cast extension.
 * <br/> - `'EXTENSION_MISSING'`: The Cast extension is not available.
 * <br/> - `'RECEIVER_UNAVAILABLE'`: No receiver was compatible with the session request.
 * <br/> - `'SESSION_ERROR'`: A session could not be created, or a session was invalid.
 * <br/> - `'CHANNEL_ERROR'`: A channel to the receiver is not available.
 * <br/> - `'LOAD_MEDIA_FAILED'`: Load media failed.
 *
 * @remarks
 * <br/> - The error codes correspond to the error codes documented in the {@link https://developers.google.com/cast/docs/reference/chrome/chrome.cast.html#.ErrorCode | Chromecast API reference}.
 *
 * @public
 */
export declare type ChromecastErrorCode = 'CANCEL' | 'TIMEOUT' | 'API_NOT_INITIALIZED' | 'INVALID_PARAMETER' | 'EXTENSION_NOT_COMPATIBLE' | 'EXTENSION_MISSING' | 'RECEIVER_UNAVAILABLE' | 'SESSION_ERROR' | 'CHANNEL_ERROR' | 'LOAD_MEDIA_FAILED';

/**
 * Fired when an error occurs while casting or trying to cast.
 *
 * @public
 */
export declare interface ChromecastErrorEvent extends Event_2<'error'> {
    /**
     * The error that occurred.
     */
    readonly error: ChromecastError;
}

/**
 * The events fired by the Chromecast API.
 *
 * @public
 */
export declare interface ChromecastEventMap extends VendorCastEventMap {
    /**
     * Fired when an error occurs while casting or trying to cast.
     */
    error: ChromecastErrorEvent;
}

/**
 * Describes the metatadata used by Chromecast.
 *
 * @remarks
 * <br/> - Available since v2.21.0.
 *
 * @public
 */
export declare interface ChromecastMetadataDescription extends MetadataDescription {
    /**
     * List of content images for the current source.
     *
     * @remarks
     * <br/> - The string must be a valid URL.
     * <br/> - Multiple images can be specified for multiple resolutions.
     */
    readonly images?: string[] | ChromecastMetadataImage[];
    /**
     * The release date of the current source.
     *
     * @remarks
     * <br/> - The format is "YYYY-MM-DD".
     */
    readonly releaseDate?: string;
    /**
     * The release year of the current source.
     *
     * @deprecated Superseded by {@link ChromecastMetadataDescription.releaseDate}.
     */
    readonly releaseYear?: number;
    /**
     * The subtitle of the current source.
     *
     * @remarks
     * <br/> - This should be a short explanation about the content.
     */
    readonly subtitle?: string;
    /**
     * The metadata type of the current source.
     *
     * @defaultValue `'generic'`
     */
    readonly type?: ChromecastMetadataType;
}

/**
 * Describes the metadata of a Chromecast image.
 *
 * @remarks
 * <br/> - Available since v2.21.0.
 *
 * @public
 */
export declare interface ChromecastMetadataImage {
    /**
     * The URL of the image.
     */
    readonly src: string;
    /**
     * The width of the image, in pixels.
     */
    readonly width?: number;
    /**
     * The height of the image, in pixels.
     */
    readonly height?: number;
}

/**
 * The Chromecast's metadata type, represented by a value from the following list:
 * <br/> - `'movie'`
 * <br/> - `'audio'`
 * <br/> - `'tv-show'`
 * <br/> - `'generic'`
 *
 * @public
 */
export declare type ChromecastMetadataType = 'movie' | 'audio' | 'tv-show' | 'generic';

/**
 * The player API.
 *
 * @public
 */
export declare class ChromelessPlayer implements EventDispatcher<PlayerEventMap> {
    constructor(element: HTMLElement, configuration?: PlayerConfiguration);
    /**
     * The adaptive bitrate configuration.
     */
    abr: ABRConfiguration;
    /**
     * List of audio tracks of the current source.
     */
    audioTracks: MediaTrackList;
    /**
     * The analytics API.
     */
    readonly analytics?: Analytics;
    /**
     * Whether the player should immediately start playback after source change.
     *
     * @remarks
     * <br/> - To autoplay with sound on certain platforms, {@link ChromelessPlayer.prepareWithUserAction} must be called at least once.
     * <br/> - To autoplay without sound, {@link PlayerConfiguration.mutedAutoplay} must be configured.
     */
    autoplay: boolean;
    /**
     * Returns a TimeRanges object that represents the ranges of the media resource that the player has buffered.
     */
    buffered: TimeRanges;
    /**
     * The clip API.
     */
    readonly clip: Clip;
    /**
     * The current playback position of the media, as a timestamp.
     *
     * @remarks
     * <br/> - The relation between {@link ChromelessPlayer.currentProgramDateTime} and {@link ChromelessPlayer.currentTime} is determined by the manifest.
     */
    currentProgramDateTime: Date | null;
    /**
     * The current playback position of the media, in seconds.
     */
    currentTime: number;
    /**
     * The duration of the media, in seconds.
     *
     * @remarks
     * <br/> - On source change, duration becomes available after {@link ChromelessPlayer.readyState} is at least `1` (HAVE_METADATA).
     */
    duration: number;
    /**
     * The HTML element containing the player.
     */
    element: HTMLElement;
    /**
     * Whether playback of the media is ended.
     *
     * @remarks
     * <br/> - Playback is ended when the current playback position is at the end of the media, and the player does not {@link ChromelessPlayer.loop}.
     */
    ended: boolean;
    /**
     * The last error that occurred for the current source, if any.
     *
     * @deprecated use {@link ChromelessPlayer.errorObject} instead
     */
    error: MediaError_2 | undefined;
    /**
     * The last error that occurred for the current source, if any.
     *
     * @remarks
     * <br/> - This will equal the {@link ErrorEvent.errorObject} property from the last {@link ErrorEvent}.
     */
    errorObject: THEOplayerError | undefined;
    /**
     * Whether playback of the media is looped.
     *
     * @remarks
     * <br/> - When playback is looped, upon reaching the end of the media, playback immediately continues at the start of the media.
     * <br/> - Looped media is never {@link ChromelessPlayer.ended}.
     */
    loop: boolean;
    /**
     * The current source which describes desired playback of a media resource.
     *
     * @remarks
     * <br/> - Changing source might {@link ChromelessPlayer.preload} and {@link ChromelessPlayer.autoplay}.
     * <br/> - Changing source will {@link ChromelessPlayer.stop} the previous source.
     */
    source: SourceDescription | undefined;
    /**
     * The current URL of the media resource.
     *
     * @remarks
     * <br/> - Prefer {@link ChromelessPlayer.source} instead.
     */
    src: string | undefined;
    /**
     * Whether audio is muted.
     *
     * @remarks
     * <br/> - This affects capabilities of {@link ChromelessPlayer.autoplay}.
     */
    muted: boolean;
    /**
     * The metrics API.
     */
    readonly metrics: Metrics;
    /**
     * Whether the player is paused.
     */
    paused: boolean;
    /**
     * The playback rate of the media.
     *
     * @example
     * <br/> - `playbackRate = 0.70` will slow down the playback rate of the media by 30%.
     * <br/> - `playbackRate = 1.25` will speed up the playback rate of the media by 25%.
     *
     * @remarks
     * <br/> - Playback rate is represented by a number where `1` is default playback speed.
     * <br/> - Playback rate must be a positive number.
     * <br/> - It is recommended that you limit the range to between 0.5 and 4.
     */
    playbackRate: number;
    /**
     * Returns a TimeRanges object that represents the ranges of the media resource that the player has played.
     */
    played: TimeRanges;
    /**
     * The poster of the current source.
     *
     * @remarks
     * <br/> - An empty string (`''`) clears the current poster.
     * <br/> - The {@link SourceConfiguration.poster} has priority over this poster.
     */
    poster: string;
    /**
     * The preload setting of the player.
     */
    preload: PreloadType;
    /**
     * The ready state of the player, represented by a value from the following list:
     * <br/> - `0` (HAVE_NOTHING): The player has no information about the duration of its source.
     * <br/> - `1` (HAVE_METADATA): The player has information about the duration of its source.
     * <br/> - `2` (HAVE_CURRENT_DATA): The player has its current frame in its buffer.
     * <br/> - `3` (HAVE_FUTURE_DATA): The player has enough data for immediate playback.
     * <br/> - `4` (HAVE_ENOUGH_DATA): The player has enough data for continuous playback.
     *
     * @remarks
     * <br/> - See the {@link https://html.spec.whatwg.org/multipage/media.html#ready-states | HTML Media Specification}
     */
    readyState: number;
    /**
     * Returns a TimeRanges object that represents the ranges of the media resource that are seekable by the player.
     *
     * @remarks
     * <br/> - On source change, seekable becomes available after {@link ChromelessPlayer.readyState} is at least `1`.
     */
    seekable: TimeRanges;
    /**
     * Whether the player is seeking.
     */
    seeking: boolean;
    /**
     * List of text tracks of the current source.
     */
    textTracks: TextTracksList;
    /**
     * The text track style API.
     *
     */
    readonly textTrackStyle: TextTrackStyle;
    /**
     * Unique ID of the player.
     */
    uid: number;
    /**
     * The height of the active video rendition, in pixels.
     */
    videoHeight: number;
    /**
     * List of video tracks of the current source.
     */
    videoTracks: MediaTrackList;
    /**
     * The width of the active video rendition, in pixels.
     */
    videoWidth: number;
    /**
     * The volume of the audio.
     *
     * @example
     * <br/> - `volume = 0.7` will reduce the audio volume of the media by 30%.
     *
     * @remarks
     * <br/> - Volume is represented by a floating point number between `0.0` and `1.0`.
     */
    volume: number;
    /**
     * The canvas of the player.
     */
    readonly canvas: Canvas;
    /**
     * The network API.
     */
    readonly network: Network;
    /**
     * The presentation API.
     */
    readonly presentation: Presentation;
    /**
     * Destroy the player.
     *
     * @remarks
     * <br/> - Available since v2.26.
     * <br/> - All resources associated with the current source are released.
     * <br/> - All resources associated with the player are released.
     * <br/> - The player can no longer be used.
     */
    destroy(): void;
    /**
     * Start or resume playback.
     */
    play(): void;
    /**
     * Pause playback.
     */
    pause(): void;
    /**
     * Stop playback.
     *
     * @remarks
     * <br/> - All resources associated with the current source are released.
     * <br/> - The player can be reused by setting a new {@link ChromelessPlayer.source}.
     */
    stop(): void;
    /**
     * Prepare the player to {@link ChromelessPlayer.autoplay} on platforms where autoplay is restricted without user action.
     *
     * @remarks
     * <br/> - Any invocation must happen on user action.
     * <br/> - Affected platforms include all mobile platforms and Safari 11+.
     */
    prepareWithUserAction(): void;
    /**
     * Set current source which describes desired playback of a media resource.
     *
     * @deprecated Superseded by {@link ChromelessPlayer.source}.
     */
    setSource(sourceDescription: SourceDescription | undefined): void;
    /**
     * {@inheritDoc EventDispatcher.addEventListener}
     */
    addEventListener<TType extends StringKeyOf<PlayerEventMap>>(type: TType | TType[], listener: EventListener_2<PlayerEventMap[TType]>): void;
    /**
     * {@inheritDoc EventDispatcher.removeEventListener}
     */
    removeEventListener<TType extends StringKeyOf<PlayerEventMap>>(type: TType | TType[], listener: EventListener_2<PlayerEventMap[TType]>): void;
    /**
     * The web audio API.
     *
     * @remarks
     * <br/> - Only available with the feature `'webaudio'`.
     */
    readonly audio?: WebAudio;
    /**
     * The ads API.
     *
     * @remarks
     * <br/> - Only available with the feature `'ads'`.
     */
    readonly ads?: Ads;
    /**
     * The Imagine API.
     *
     * @remarks
     * <br/> - Only available with the feature `'imagine'`.
     */
    imagine?: Imagine;
    /**
     * The cast API.
     *
     * @remarks
     * <br/> - Only available with the feature `'airplay'` or `'chromecast'`.
     */
    readonly cast?: Cast;
    /**
     * The related content API.
     *
     * @remarks
     * <br/> - Only available with the feature `'relatedcontent'`.
     */
    readonly related?: RelatedContent;
    /**
     * The VR API.
     *
     * @remarks
     * <br/> - Only available with the feature `'vr'`.
     */
    readonly vr?: VR;
    /**
     * The visibility API.
     *
     * @remarks
     * <br/> - Only available with the feature `'visibility'`.
     */
    readonly visibility?: Visibility;
    /**
     * The Verizon Media API.
     *
     * @remarks
     * <br/> - Only available with the feature `'verizonmedia'`.
     */
    readonly verizonMedia?: VerizonMedia;
    /**
     * The Yospace API.
     *
     * @remarks
     * <br/> - Only available with the feature `'yospace'`.
     */
    readonly yospace?: Yospace;
    /**
     * The HESP API.
     * @remarks
     * <br/> - Note: This API is in an experimental stage and may be subject to breaking changes.
     * <br/> - Only available with the feature `'hesp'`.
     */
    readonly hesp?: HespApi;
}

/**
 * Describes the ClearKey decryption key.
 *
 * @public
 */
export declare interface ClearkeyDecryptionKey {
    /**
     * The identifier of the key.
     *
     * @remarks
     * <br/> - This is a base64url encoding of the octet sequence containing the key ID.
     * <br/> - See {@link https://www.w3.org/TR/encrypted-media/#clear-key-license-format | Clear Key License Format}.
     */
    id: string;
    /**
     * The value of the key.
     *
     * @remarks
     * <br/> - The base64url encoding of the octet sequence containing the symmetric key value.
     * <br/> - See {@link https://www.w3.org/TR/encrypted-media/#clear-key-license-format | Clear Key License Format}.
     */
    value: string;
}

/**
 * Describes the ClearKey key system configuration.
 *
 * @public
 */
export declare interface ClearkeyKeySystemConfiguration extends KeySystemConfiguration {
    /**
     * List of decryption keys.
     */
    keys?: ClearkeyDecryptionKey[];
}

/**
 * The clip API which can be used to clip the playback window of a source.
 *
 * @public
 */
export declare interface Clip extends EventDispatcher<ClipEventMap> {
    /**
     * The start time of the clip's window, in seconds.
     */
    startTime: number;
    /**
     * The end time of the clip's window, in seconds.
     */
    endTime: number;
}

/**
 * The events fired by the {@link Clip | clip API}.
 *
 * @public
 */
export declare interface ClipEventMap {
    /**
     * Fired when the {@link Clip.startTime} or {@link Clip.endTime} changed.
     */
    change: Event_2<'change'>;
}

/**
 * Describes the configuration of the Comcast DRM integration.
 *
 * @example
 * ```
 * const drmConfiguration = {
 *     integration : 'comcast',
 *     fairplay: {
 *         certificateURL: 'yourComcastCertificateUrl',
 *         licenseAcquisitionURL: 'yourComcastLicenseAcquisitionURL'
 *     }
 * }
 * ```
 *
 * @public
 */
export declare interface ComcastDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: ComcastIntegrationID;
    /**
     * The Comcast Authorization Token.
     *
     * @remarks
     * <br/> - This token is required and will be attached to the license request's header.
     * <br/> - The token is valid for a limited amount of time.
     */
    token: string;
    /**
     * The identifier of the Comcast account.
     */
    accountId: string;
    /**
     * The PID of the media for which the license is being requested.
     */
    releasePid: string;
}

/**
 * The identifier of the Comcast integration.
 *
 * @public
 */
export declare type ComcastIntegrationID = 'comcast';

/**
 * Utils that serve common use cases. For example encoding and decoding a base64 string to Uint8Array and vice versa.
 *
 * @public
 */
export declare interface CommonUtils {
    readonly base64: Base64Util;
}

/**
 * Represents a companion ad which is displayed near the video player.
 *
 * @public
 */
export declare interface CompanionAd {
    /**
     * The identifier of the element in which the companion ad should be appended, if available.
     *
     * @remarks
     * <br/> Only available for Google DAI and THEO ads if provided in the VAST.
     */
    adSlotId?: string;
    /**
     * The alternative description for the ad.
     *
     * @remarks
     * <br/> - Returns value as reported in the VAST StaticResource. If not specified, it returns an empty string.
     * <br/> - Returns an empty string for THEO ads if not available.
     * <br/> - Returns an empty string for Google IMA / Google DAI integrations.
     */
    altText: string;
    /**
     * The content of the ad, as HTML.
     *
     * @remarks
     * <br/> - Available for StaticResource and HTMLResource in THEO ad system.
     * <br/> - Available in the DAI ad system.
     */
    contentHTML: string;
    /**
     * The website of the advertisement.
     *
     * @remarks
     * <br/> - Only available for StaticResource if specified by the VAST. Otherwise returns an empty string.
     */
    clickThrough?: string;
    /**
     * The height of the ad, in pixels.
     *
     * @remarks
     * <br/> - Only available for IMA ad system and THEO ad system.
     */
    height: number;
    /**
     * The URI of the ad content as specified in the VAST file.
     *
     * @remarks
     * <br/> - Only available in the THEO ad system for StaticResource. Otherwise returns an empty string.
     */
    resourceURI: string;
    /**
     * The width of the ad, in pixels.
     *
     * @remarks
     * <br/> - Only available for IMA ad system and THEO ad system.
     */
    width: number;
}

/**
 * Describes the configuration of the Conax DRM integration.
 *
 * @example
 * example for DASH with Widevine and PlayReady
 * ```
 * const dashDrmConfiguration = {
 *     integration : 'conax',
 *     token : 'yourConaxToken',
 *     deviceId : 'YourConaxDeviceId'
 * }
 * ```
 *
 * @example
 * Example for HLS
 * ```
 * const hlsDrmConfiguration = {
 *     integration : 'conax',
 *     fairplay: {
 *        certificateURL: 'yourConaxCertificateURL',
 *     },
 *     token : 'yourConaxToken',
 *     deviceId : 'YourConaxDeviceId'
 * }
 * ```
 *
 * @public
 */
export declare interface ConaxDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: ConaxIntegrationID;
    /**
     * An Optional Authorization Token used to configure the Conax Classic model.
     *
     * @remarks
     * <br/> - This token which will be attached to the license request (custom data) is retrieved.
     * <br/> - The token is valid for a limited time and can only be used once.
     * <br/> - Usually this will be a call to the portal that is integrated with Contego.
     */
    token?: string;
    /**
     * An optional identifier of the Conax Device used to configure the Conax Classic model.
     *
     * @remarks
     * <br/> - This id will be added to the OTT Account. This is done every time the video is started to simplify the example, adding the same device twice will not result in any changes.
     * <br/> - The portal will usually handle adding a device to an account.
     */
    deviceId?: string;
}

/**
 * The identifier of the Conax integration.
 *
 * @public
 */
export declare type ConaxIntegrationID = 'conax';

/**
 * An error related to content protection.
 *
 * @public
 */
export declare interface ContentProtectionError extends THEOplayerError {
    /**
     * {@inheritDoc THEOplayerError.code}
     */
    readonly code: ContentProtectionErrorCode;
    /**
     * The URL that was used in the request.
     *
     * @remarks
     * <br/> - Only available when {@link ContentProtectionError.code} is {@link ErrorCode.CONTENT_PROTECTION_CERTIFICATE_ERROR} or {@link ErrorCode.CONTENT_PROTECTION_LICENSE_ERROR}.
     */
    readonly url?: string;
    /**
     * The status code from the HTTP response.
     *
     * @remarks
     * <br/> - Only available when {@link ContentProtectionError.code} is {@link ErrorCode.CONTENT_PROTECTION_CERTIFICATE_ERROR} or {@link ErrorCode.CONTENT_PROTECTION_LICENSE_ERROR}.
     */
    readonly status?: number;
    /**
     * The status text from the HTTP response.
     *
     * @remarks
     * <br/> - Only available when {@link ContentProtectionError.code} is {@link ErrorCode.CONTENT_PROTECTION_CERTIFICATE_ERROR} or {@link ErrorCode.CONTENT_PROTECTION_LICENSE_ERROR}.
     */
    readonly statusText?: string;
    /**
     * The body contained in the HTTP response.
     *
     * @remarks
     * <br/> - Only available when {@link ContentProtectionError.code} is {@link ErrorCode.CONTENT_PROTECTION_CERTIFICATE_ERROR} or {@link ErrorCode.CONTENT_PROTECTION_LICENSE_ERROR}.
     */
    readonly response?: string;
    /**
     * The internal error code from the CDM.
     *
     * @remarks
     * <br/> - Only available when {@link ContentProtectionError.code} is {@link ErrorCode.CONTENT_PROTECTION_INTERNAL_ERROR}.
     */
    readonly systemCode?: number;
}

/**
 * An error code whose category is `ErrorCategory.CONTENT_PROTECTION`.
 *
 * @public
 */
export declare type ContentProtectionErrorCode = ErrorCode.CONTENT_PROTECTION_ERROR | ErrorCode.CONTENT_PROTECTION_NOT_SUPPORTED | ErrorCode.CONTENT_PROTECTION_CONFIGURATION_MISSING | ErrorCode.CONTENT_PROTECTION_CONFIGURATION_INVALID | ErrorCode.CONTENT_PROTECTION_INITIALIZATION_INVALID | ErrorCode.CONTENT_PROTECTION_CERTIFICATE_ERROR | ErrorCode.CONTENT_PROTECTION_CERTIFICATE_INVALID | ErrorCode.CONTENT_PROTECTION_LICENSE_ERROR | ErrorCode.CONTENT_PROTECTION_LICENSE_INVALID | ErrorCode.CONTENT_PROTECTION_KEY_EXPIRED | ErrorCode.CONTENT_PROTECTION_KEY_MISSING | ErrorCode.CONTENT_PROTECTION_OUTPUT_RESTRICTED | ErrorCode.CONTENT_PROTECTION_INTERNAL_ERROR;

/**
 * Fired when an error related to content protection occurs.
 *
 * @public
 */
export declare interface ContentProtectionErrorEvent extends Event_2<'contentprotectionerror'> {
    /**
     * The error that occurred.
     *
     * @deprecated use {@link ContentProtectionErrorEvent.errorObject | errorObject.message} instead
     */
    error: string;
    /**
     * An error object containing additional information about the error.
     */
    errorObject: ContentProtectionError;
    /**
     * @deprecated use {@link ContentProtectionError.url | errorObject.url} instead
     */
    readonly licenseAcquisitionURL?: string;
    /**
     * @deprecated use {@link ContentProtectionError.status | errorObject.status} instead
     */
    readonly status?: number;
    /**
     * @deprecated use {@link ContentProtectionError.statusText | errorObject.statusText} instead
     */
    readonly statusText?: string;
    /**
     * @deprecated use {@link ContentProtectionError.response | errorObject.response} instead
     */
    readonly licenseAcquisitionMessage?: string;
    /**
     * @deprecated use {@link ContentProtectionError.systemCode | errorObject.systemCode} instead
     */
    readonly systemCode?: number;
}

/**
 * This ContentProtectionIntegration defines some methods to alter license and certificate requests and responses.
 *
 * @public
 */
export declare interface ContentProtectionIntegration {
    /**
     * Handler which will be called when a HTTP request for a new certificate is about to be sent.
     *
     * @remarks
     * If a valid certificate was provided as part of the {@link KeySystemConfiguration.certificate}, this handler will not be called.
     * The handler must return either a request or a raw certificate. When a (possibly modified) request is returned,
     * the player will send that request instead of the original request. When a raw certificate is returned,
     * the request is skipped entirely and the certificate is used directly. If no handler is provided, the player sends the original request.
     *
     * For example, an integration may want to “wrap” the request body in a different format (e.g. JSON or XML) for
     * certain DRM vendors, or add additional authentication tokens to the request.
     * Alternatively, an integration may want to send the HTTP request using its own network stack,
     * and return the final certificate response to the player.
     *
     * @param request - The {@link CertificateRequest} that is about to be sent.
     */
    onCertificateRequest?(request: CertificateRequest): MaybeAsync<Partial<CertificateRequest> | BufferSource_2>;
    /**
     * Handler which will be called when a HTTP request for a certificate returns a response.
     *
     * @remarks
     * The handler will be called regardless of the HTTP status code on the response (i.e. also for unsuccessful statuses outside of the 200-299 range).
     * The handler must return the raw certificate, in a manner suitable for further processing by the CDM.
     * If no handler is provided, the player uses the response body as raw certificate, but only if the response’s status indicates success.
     *
     * For example, an integration may want to “unwrap” a wrapped JSON or XML response body, turning it into a raw certificate.
     *
     * @param response - The {@link CertificateResponse} that was returned from the certificate request.
     */
    onCertificateResponse?(response: CertificateResponse): MaybeAsync<BufferSource_2>;
    /**
     * Handler which will be called when a HTTP request for a new license is about to be sent.
     *
     * @remarks
     * The handler must return either a request or a raw license. When a (possibly modified) request is returned,
     * the player will send that request instead of the original request. When a raw license is returned,
     * the request is skipped entirely and the license is used directly. If no handler is provided, the player sends the original request.
     *
     * For example, an integration may want to “wrap” the request body in a different format (e.g. JSON or XML) for certain DRM vendors,
     * or add additional authentication tokens to the request. Alternatively, an integration may want to send the HTTP request using its own network stack,
     * and return the final license response to the player.
     *
     * @param request - The {@link LicenseRequest} that is about to be sent.
     */
    onLicenseRequest?(request: LicenseRequest): MaybeAsync<Partial<LicenseRequest> | BufferSource_2>;
    /**
     * Handler which will be called when a HTTP request for a license returns an response.
     *
     * @remarks
     * The handler will be called regardless of the HTTP status code on the response (i.e. also for unsuccessful statuses outside of the 200-299 range).
     * The handler must return the raw license, in a manner suitable for further processing by the CDM.
     * If no handler is provided, the player uses the response body as raw license, but only if the response’s status indicates success.
     *
     * For example, an integration may want to “unwrap” a wrapped JSON or XML response body, turning it into a raw license.
     *
     * @param response - The {@link LicenseResponse} that was returned from the license request.
     */
    onLicenseResponse?(response: LicenseResponse): MaybeAsync<BufferSource_2>;
    /**
     * A function to extract the Fairplay content ID from the key URI, as given by the URI attribute of the `#EXT-X-KEY` tag in the HLS playlist (m3u8).
     *
     * @remarks
     * In order to start a Fairplay license request, the player must provide the initialization data, the content ID and the certificate to the CDM.
     * The content ID is usually contained in the key URI in some vendor-specific way, for example in the host name (e.g. `skd://123456789`)
     * or in the URL query (e.g. `skd://vendor?123456789`). This function should extract this content ID from the key URI.
     * This method is required only for Fairplay integrations. It is ignored for other key systems.
     *
     * @param skdUrl - The key URI.
     */
    extractFairplayContentId?(skdUrl: string): MaybeAsync<string>;
}

/**
 * Factory pattern to create {@link ContentProtectionIntegration}s.
 *
 * @public
 */
export declare interface ContentProtectionIntegrationFactory {
    /**
     * Build a new {@link ContentProtectionIntegration} based on the given {@link DRMConfiguration}.
     *
     * @param configuration - The {@link DRMConfiguration} of the currently loading source.
     */
    build(configuration: DRMConfiguration): ContentProtectionIntegration;
}

/**
 * A request, either for a certificate or a license.
 * @public
 */
export declare interface ContentProtectionRequest {
    /**
     * The URL for the certificate server. By default, this will equal the certificate URL configured in the
     * `{@link KeySystemConfiguration}`.
     */
    url: string;
    /**
     * The method of the HTTP request, for example: GET, POST or PUT.
     *
     * @remarks
     * <br/> - Will be equal to GET for Fairplay certificate requests and POST for Widevine certificate requests.
     * <br/> - Will be equal to POST for all license requests.
     */
    method: string;
    /**
     * The HTTP request headers to be sent to the server.
     */
    headers: {
        [headerName: string]: string;
    };
    /**
     * The body of the certificate request.
     *
     * @remarks
     * <br/> - For GET requests (such as with Fairplay), the body will be empty (null).
     * <br/> - For POST requests (such as with Widevine): the body will contain the two bytes in an array as specified in the certificate request protocol.
     */
    body: Uint8Array | null;
    /**
     * Whether the player is allowed to use credentials for cross-origin requests.
     */
    useCredentials: boolean;
}

/**
 * The content protection's subtype, represented by a value from the following list:
 * <br/> - `'fairplay-license'`
 * <br/> - `'fairplay-certificate'`
 * <br/> - `'widevine-license'`
 * <br/> - `'widevine-certificate'`
 * <br/> - `'playready-license'`
 * <br/> - `'clearkey-license'`
 * <br/> - `'aes128-key'`
 *
 * @public
 */
export declare type ContentProtectionRequestSubType = 'fairplay-license' | 'fairplay-certificate' | 'widevine-license' | 'widevine-certificate' | 'playready-license' | 'clearkey-license' | 'aes128-key';

/**
 * The response, either of a license or for a certificate request.
 * @public
 */
export declare interface ContentProtectionResponse {
    /**
     * The request for which the response is being returned.
     */
    request: ContentProtectionRequest;
    /**
     * The URL from which the response was returned. This might have been redirected transparently.
     */
    url: string;
    /**
     * The status code as returned in the HTTP response.
     */
    status: number;
    /**
     * The status text as returned in the HTTP response.
     */
    statusText: string;
    /**
     * The HTTP headers as returned by the server.
     *
     * @remarks
     * <br/> - On web not all headers might be shown due to Cross Origin Resource Sharing restrictions.
     */
    headers: {
        [headerName: string]: string;
    };
    /**
     * The body of the response.
     */
    body: Uint8Array;
}

/**
 * The Conviva API.
 *
 * @public
 */
declare interface Conviva_2 {
    /**
     * The Conviva client used by the player.
     *
     * @remarks
     * <br/> - Available since v2.31.2.
     * <br/> - For more information, consult the Conviva SDK documentation.
     */
    readonly client: any;
    /**
     * The session key of the active Conviva session, if any.
     *
     * @remarks
     * <br/> - Available since v2.31.2.
     * <br/> - For more information, consult the Conviva SDK documentation.
     */
    readonly contentSessionKey: number | undefined;
    /**
     * Create a Conviva session.
     *
     * @remarks
     * <br/> - This should only be used together with {@link ConvivaConfiguration.manualSessionControl}.
     * <br/> - For more information, consult the Conviva SDK documentation about `Client.createSession`.
     */
    createSession(): void;
    /**
     * Clean up a Conviva session.
     *
     * @remarks
     * <br/> - This should only be used together with {@link ConvivaConfiguration.manualSessionControl}.
     * <br/> - For more information, consult the Conviva SDK documentation about `Client.cleanupSession`.
     */
    cleanupSession(): void;
}
export { Conviva_2 as Conviva }

/**
 * The identifier of the Conviva integration.
 *
 * @public
 */
export declare type ConvivaAnalyticsIntegrationID = 'conviva';

/**
 * Describes the configuration of the Conviva integration.
 *
 * @remarks
 * <br/> - Available since v2.14.4.
 *
 * @public
 */
export declare interface ConvivaConfiguration extends AnalyticsDescription {
    /**
     * {@inheritDoc AnalyticsDescription.integration}
     */
    integration: ConvivaAnalyticsIntegrationID;
    /**
     * The customer key.
     */
    customerKey: string;
    /**
     * The interval at which metrics are reported, in seconds.
     */
    heartbeatInterval?: number;
    /**
     * The URL of your Conviva gateway.
     *
     * @remarks
     * <br/> - When not filled in, no gateway will be used.
     */
    gatewayUrl?: string;
    /**
     * The metadata which will be sent to Conviva.
     */
    contentMetadata: ConvivaContentMetadata;
    /**
     * Whether the player should not handle sessions automatically.
     *
     * @remarks
     * <br/> - This should be used if you manually want to {@link Conviva.createSession | create} and {@link Conviva.cleanupSession | cleanup} sessions.
     *
     * @defaultValue `false`
     */
    manualSessionControl?: boolean;
}

/**
 * Describes the content's metadata.
 *
 * @remarks
 * <br/> - Available since v2.14.4.
 *
 * @public
 */
export declare interface ConvivaContentMetadata {
    /**
     * The name of the asset.
     */
    assetName: string;
    /**
     * Whether a live asset is being tracked.
     *
     * @remarks
     * <br/> - `false` refers to a VOD stream.
     * <br/> - If this property is omitted, `'UNKNOWN'` will be reported to Conviva.
     */
    live?: boolean;
    /**
     * The default bitrate of the asset, in kpbs.
     *
     * @remarks
     * <br/> - If this property is omitted, it will not be reported to Conviva.
     */
    defaultBitrateKbps?: number;
    /**
     * The default resource.
     *
     * @remarks
     * <br/> - If this property is omitted, it will not be reported to Conviva.
     */
    defaultResource?: string;
    /**
     * The duration of the asset.
     *
     * @remarks
     * <br/> - If this property is omitted, it will not be reported to Conviva.
     */
    duration?: number;
    /**
     * The encoded frame rate of the asset.
     *
     * @remarks
     * <br/> - If this property is omitted, it will not be reported to Conviva.
     */
    encodedFrameRate?: number;
    /**
     * The application name.
     *
     * @defaultValue `'THEOplayer'`
     */
    applicationName?: string;
    /**
     * The identifier of the viewer.
     *
     * @defaultValue A randomly generated identifier.
     */
    viewerId?: string;
    /**
     * A record of Conviva tags.
     */
    custom?: object;
}

/**
 * The cross-origin setting of a source, represented by a value from the following list:
 * <br/> - `'anonymous'`: CORS requests will have the credentials flag set to 'same-origin'.
 * <br/> - `'use-credentials'`: CORS requests will have the credentials flag set to 'include'.
 * <br/> - `''`: Setting the empty string is the same as `'anonymous'`
 *
 * @remarks
 * <br/> - See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes | The crossorigin attribute: Requesting CORS access to content}
 *
 * @public
 */
export declare type CrossOriginSetting = '' | 'anonymous' | 'use-credentials';

/**
 * Fired when the current source, which is chosen from {@link SourceDescription.sources | ChromelessPlayer.source.sources}, changes.
 *
 * @public
 */
export declare interface CurrentSourceChangeEvent extends Event_2<'currentsourcechange'> {
    /**
     * The player's new current source.
     */
    readonly currentSource: TypedSource | undefined;
}

/**
 * The type of the stream requested from Google DAI, represented by a value from the following list:
 * <br/> - `'live'`: The requested stream is a live stream.
 * <br/> - `'vod'`: The requested stream is a video-on-demand stream.
 *
 * @public
 */
export declare type DAIAvailabilityType = 'vod' | 'live';

/**
 * Represents a configuration for controlling playback of an MPEG-DASH stream.
 *
 * @remarks
 * <br/> - Available since v2.79.0.
 *
 * @public
 */
export declare interface DashPlaybackConfiguration {
    /**
     * Whether to seamlessly switch between DASH periods.
     *
     * @remarks
     * The player supports two strategies for handling a switch between two periods in an MPEG-DASH stream:
     * <br/> - <strong>Seamless</strong>: Once the player is done buffering the current period, it immediately starts buffering the next period.
     *         This requires that the current period and the next period have compatible codecs and content protection, or that the platform
     *         supports buffering different codecs in a single player. Because the next period is preloaded ahead of time, this makes the actual
     *         switch between periods (almost) completely seamless.
     * <br/> - <strong>Hard</strong>: The player waits until playback reaches the end of the current period before buffering and playing the next
     *         period. Because the buffering is not done ahead of time, this may result in a noticeable stall at the start of the next period.
     *         However, this strategy does not require any special platform support, so it works on any platform or device.
     *
     * By default, the player will automatically choose between a seamless or a hard period switch based on the codecs and content protection of
     * the two periods, and the support information reported by the platform. However, if you notice that the player makes an incorrect decision
     * on certain streams or platforms, you can use this option to override its behavior as a stopgap solution. (You should still report this
     * problem to THEOplayer support, so we can improve the player's default behavior and you can remove this override.)
     *
     * @defaultValue `'auto'`
     */
    useSeamlessPeriodSwitch?: SeamlessPeriodSwitchStrategy;
}

/**
 * @public
 */
export declare interface DataEvent<TType extends string, DataType> extends Event_2<TType> {
    readonly data: DataType;
}

/**
 * Represents a cue of a HLS date range metadata text track.
 *
 * @public
 */
export declare interface DateRangeCue extends TextTrackCue_2 {
    /**
     * The class of the date range cue.
     *
     * @remarks
     * <br/> - The class is a client-defined string specifying a set of attributes with associated value semantics.
     */
    class: string | undefined;
    /**
     * The playback position at which the date range cue becomes active, as a Date.
     */
    startDate: Date;
    /**
     * The playback position at which the date range cue becomes inactive, as a Date.
     */
    endDate: Date | undefined;
    /**
     * The duration of the date range cue, in seconds.
     */
    duration: number | undefined;
    /**
     * The planned duration of the date range cue, in seconds.
     *
     * @remarks
     * <br/> - This is used when the exact duration is not known yet.
     */
    plannedDuration: number | undefined;
    /**
     * Whether end-on-next is enabled for the date range cue.
     *
     * @remarks
     * <br/> - End-on-next results in the {@link DateRangeCue.endDate} of the date range cue becoming equal to the {@link DateRangeCue.startDate} of the next date range cue with the same {@link DateRangeCue."class"}, once it is known.
     */
    endOnNext: boolean;
    /**
     * The SCTE 'cmd' splice_info_section of the date range cue.
     */
    scte35Cmd: ArrayBuffer | undefined;
    /**
     * The SCTE 'out' splice_info_section of the date range cue.
     */
    scte35Out: ArrayBuffer | undefined;
    /**
     * The SCTE 'in' splice_info_section of the date range cue.
     */
    scte35In: ArrayBuffer | undefined;
    /**
     * The custom attributes of the date range cue.
     *
     * @remarks
     * <br/> - The attribute name in the record does not include the 'X-' prefix present in the manifest.
     */
    customAttributes: Record<string, string | number | ArrayBuffer>;
}

/**
 * The delivery type of the ad content file, represented by a value from the following list:
 * <br/> - `'progressive'`: Delivered through progressive download protocols (e.g. HTTP).
 * <br/> - `'streaming'`: Delivered through streaming download protocols.
 *
 * @remarks
 * <br/> - `'streaming'` is currently not supported.
 *
 * @public
 */
export declare type DeliveryType = 'progressive' | 'streaming';

/**
 * Describes the configuration of the Titanium DRM integration with device-based authentication.
 *
 * @public
 */
export declare interface DeviceBasedTitaniumDRMConfiguration extends TitaniumDRMConfiguration {
    /**
     * The account name.
     */
    accountName: string;
    /**
     * The customer name.
     */
    customerName: string;
    /**
     * The friendly name of this customer.
     */
    friendlyName: string;
    /**
     * The identifier of the portal.
     */
    portalId: string;
    /**
     * The authentication token.
     *
     * @remarks
     * <br/> - This is a JSON web token provided by the Titanium Secure Token Server.
     */
    authToken?: undefined;
}

/**
 * Fired when the dimensions of the HTML element changes.
 *
 * @public
 */
export declare interface DimensionChangeEvent extends Event_2<'dimensionchange'> {
    /**
     * The current width of the player's HTML element, in pixels.
     */
    readonly width: number;
    /**
     * The current height of the player's HTML element, in pixels.
     */
    readonly height: number;
}

/**
 * Fired when the {@link VR.direction} changes.
 *
 * @public
 */
export declare type DirectionChangeEvent = Event_2<'directionchange'>;

/**
 * Describes the configuration of the DRM.
 *
 * @public
 */
export declare interface DRMConfiguration {
    /**
     * The identifier of the DRM integration.
     */
    integration?: string;
    /**
     * The configuration of the FairPlay key system.
     */
    fairplay?: FairPlayKeySystemConfiguration;
    /**
     * The configuration of the PlayReady key system.
     */
    playready?: PlayReadyKeySystemConfiguration;
    /**
     * The configuration of the Widevine key system.
     */
    widevine?: WidevineKeySystemConfiguration;
    /**
     * The configuration of the ClearKey key system.
     */
    clearkey?: ClearkeyKeySystemConfiguration;
    /**
     * The configuration of the AES key system.
     */
    aes128?: AES128KeySystemConfiguration;
    /**
     * An object of key/value pairs which can be used to pass in specific parameters related to a source into a
     * {@link ContentProtectionIntegration}.
     */
    integrationParameters?: {
        [parameterName: string]: any;
    };
    /**
     * An ordered list of URNs of key systems as specified by https://dashif.org/identifiers/content_protection/, or one of the following identifiers:
     *
     * `"widevine"` alias for `"urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"`
     * `"fairplay"` alias for `"urn:uuid:94ce86fb-07bb-4b43-adb8-93d2fa968ca2"`
     * `"playready"` alias for `"urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95"`
     *
     * The first key system in this list which is supported on the given platform will be used for playback.
     *
     * Default value is ['widevine', 'playready', 'fairplay'].
     */
    preferredKeySystems?: Array<KeySystemId | string>;
}

/**
 * A function which processes DRM data.
 *
 * @public
 */
export declare type DRMProcessor = (arrayBuffer: ArrayBuffer) => ArrayBuffer;

/**
 * Describes the configuration of the DRM Today DRM integration.
 *
 * @public
 */
export declare interface DRMTodayDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: DRMTodayIntegrationID;
    /**
     * The DRM Today Authorization Token.
     *
     * @remarks
     * <br/> - This attribute is required when you use the User Authentication Callback flow to make the license request.
     */
    token?: string;
    /**
     * The identifier of the user.
     *
     * @remarks
     * <br/> - This attribute is required when you use the User Authentication Callback flow to make the license request.
     */
    userId?: string;
    /**
     * The identifier of the session.
     *
     * @remarks
     * <br/> - This attribute is required when you use the User Authentication Callback flow to make the license request.
     */
    sessionId?: string;
    /**
     * The identifier of the merchant
     *
     * @remarks
     * <br/> - This attribute is required when you use the User Authentication Callback flow to make the license request.
     */
    merchant?: string;
}

/**
 * The identifier of the DRM Today integration.
 *
 * @public
 */
export declare type DRMTodayIntegrationID = 'drmtoday';

/**
 * Fired when `ChromelessPlayer.duration` changes.
 *
 * @public
 */
export declare interface DurationChangeEvent extends Event_2<'durationchange'> {
    /**
     * The player's new duration.
     */
    readonly duration: number;
}

/**
 * The style of the edge, represented by a value from the following list:
 * <br/> - `'none'`
 * <br/> - `'dropshadow'`
 * <br/> - `'raised'`
 * <br/> - `'depressed'`
 * <br/> - `'uniform'`
 *
 * @public
 */
export declare type EdgeStyle = 'none' | 'dropshadow' | 'raised' | 'depressed' | 'uniform';

/**
 * Fired when the player's source is cleared.
 *
 * @public
 */
export declare interface EmptiedEvent extends Event_2<'emptied'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}

/**
 * Represents a cue of an emsg metadata text track.
 *
 * @public
 */
export declare interface EmsgCue extends TextTrackCue_2 {
    /**
     * The schemeIDURI of the cue.
     */
    schemeIDURI: string;
    /**
     * The SCTE 35 PID (Program Identifier) of the cue.
     */
    value: string;
    /**
     * The emsg identifier of the cue.
     *
     * @remarks
     * <br/> - The identifier is unique within the scope of the period.
     */
    emsgID: number;
}

/**
 * Fired when the player encounters key system initialization data in the media data.
 *
 * @public
 */
export declare interface EncryptedEvent extends Event_2<'encrypted'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
    /**
     * The type of the initialization data.
     */
    readonly initDataType: string;
    /**
     * The initialization data.
     */
    readonly initData: ArrayBuffer;
}

/**
 * Fired when playback has stopped because the end of the media resource was reached.
 *
 * @public
 */
export declare interface EndedEvent extends Event_2<'ended'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}

/**
 * The category of an error.
 *
 * @public
 */
export declare enum ErrorCategory {
    /**
     * This category clusters all errors related to the configuration.
     */
    CONFIGURATION = 1,
    /**
     * This category clusters all errors related to the license.
     */
    LICENSE = 2,
    /**
     * This category clusters all errors related to the source.
     */
    SOURCE = 3,
    /**
     * This category clusters all errors related to the manifest.
     */
    MANIFEST = 4,
    /**
     * This category clusters all errors related to the media.
     */
    MEDIA = 5,
    /**
     * This category clusters all errors related to the network.
     */
    NETWORK = 6,
    /**
     * This category clusters all errors related to the content protection.
     */
    CONTENT_PROTECTION = 7,
    /**
     * This category clusters all errors related to the subtitles.
     */
    SUBTITLE = 8,
    /**
     * This category clusters all errors related to VR.
     */
    VR = 9,
    /**
     * This category clusters all errors related to ads.
     */
    AD = 10,
    /**
     * This category clusters all errors related to fullscreen.
     */
    FULLSCREEN = 11
}

/**
 * @public
 */
export declare namespace ErrorCategory {
    /**
     * Determine the `ErrorCategory` of the given {@link ErrorCode}.
     *
     * @param code - The {@link ErrorCode} to determine the `ErrorCategory` of.
     */
    export function fromCode(code: ErrorCode): ErrorCategory;
}

/**
 * A code that indicates the type of error that has occurred.
 *
 * @public
 */
export declare enum ErrorCode {
    /**
     * The configuration provided is invalid.
     */
    CONFIGURATION_ERROR = 1000,
    /**
     * The license provided is invalid.
     */
    LICENSE_ERROR = 2000,
    /**
     * The provided license does not contain the current domain.
     */
    LICENSE_INVALID_DOMAIN = 2001,
    /**
     * The current source is not allowed in the license provided.
     */
    LICENSE_INVALID_SOURCE = 2002,
    /**
     * The license has expired.
     */
    LICENSE_EXPIRED = 2003,
    /**
     * The source provided is not valid.
     */
    SOURCE_INVALID = 3000,
    /**
     * The provided source is not supported.
     */
    SOURCE_NOT_SUPPORTED = 3001,
    /**
     * The manifest could not be loaded.
     */
    MANIFEST_LOAD_ERROR = 4000,
    /**
     * An Error related to Cross-origin resource sharing (CORS).
     *
     * @remarks
     * <br/> - See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS | Cross-Origin Resource Sharing (CORS)}.
     */
    MANIFEST_CORS_ERROR = 4001,
    /**
     * The manifest could not be parsed.
     */
    MANIFEST_PARSE_ERROR = 4002,
    /**
     * The media is not supported.
     */
    MEDIA_NOT_SUPPORTED = 5000,
    /**
     * The media could not be loaded.
     */
    MEDIA_LOAD_ERROR = 5001,
    /**
     * The media could not be decoded.
     */
    MEDIA_DECODE_ERROR = 5002,
    /**
     * An error related to playback through AVPlayer in the iOS or tvOS SDK.
     */
    MEDIA_AVPLAYER_ERROR = 5003,
    /**
     * The fetching process for the media resource was aborted by the user agent at the user's request.
     */
    MEDIA_ABORTED = 5004,
    /**
     * An error related to network has been detected.
     */
    NETWORK_ERROR = 6000,
    /**
     * The network has timed out.
     */
    NETWORK_TIMEOUT = 6001,
    /**
     * An error related to the content protection.
     */
    CONTENT_PROTECTION_ERROR = 7000,
    /**
     * The DRM provided is not supported on this platform.
     */
    CONTENT_PROTECTION_NOT_SUPPORTED = 7001,
    /**
     * The media is DRM protected, but no content protection configuration was provided.
     */
    CONTENT_PROTECTION_CONFIGURATION_MISSING = 7002,
    /**
     * The content protection configuration is invalid.
     */
    CONTENT_PROTECTION_CONFIGURATION_INVALID = 7003,
    /**
     * The DRM initialization data could not be parsed.
     */
    CONTENT_PROTECTION_INITIALIZATION_INVALID = 7004,
    /**
     * The content protection's certificate could not be loaded.
     */
    CONTENT_PROTECTION_CERTIFICATE_ERROR = 7005,
    /**
     * The content protection's certificate is invalid.
     */
    CONTENT_PROTECTION_CERTIFICATE_INVALID = 7006,
    /**
     * The content protection's license could not be loaded.
     */
    CONTENT_PROTECTION_LICENSE_ERROR = 7007,
    /**
     * The content protection's license is invalid.
     */
    CONTENT_PROTECTION_LICENSE_INVALID = 7008,
    /**
     * The content protection's key has expired.
     */
    CONTENT_PROTECTION_KEY_EXPIRED = 7009,
    /**
     * The content protection's key is missing.
     */
    CONTENT_PROTECTION_KEY_MISSING = 7010,
    /**
     * All qualities require HDCP, but the current output does not fulfill HDCP requirements.
     */
    CONTENT_PROTECTION_OUTPUT_RESTRICTED = 7011,
    /**
     * Something went wrong in the internal logic of the content protection system.
     */
    CONTENT_PROTECTION_INTERNAL_ERROR = 7012,
    /**
     * Loading subtitles has failed.
     */
    SUBTITLE_LOAD_ERROR = 8000,
    /**
     * Loading subtitles has failed due to CORS.
     *
     * @remarks
     * <br/> - See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS | Cross-Origin Resource Sharing (CORS)}.
     */
    SUBTITLE_CORS_ERROR = 8001,
    /**
     * Parsing subtitles has failed.
     */
    SUBTITLE_PARSE_ERROR = 8002,
    /**
     * This error occurs when VR is not supported on the current platform.
     */
    VR_PLATFORM_UNSUPPORTED = 9000,
    /**
     * Changing the presentation to VR was not possible.
     */
    VR_PRESENTATION_ERROR = 9001,
    /**
     * Something went wrong with an ad.
     */
    AD_ERROR = 10000,
    /**
     * An ad blocker has been detected.
     */
    AD_BLOCKER_DETECTED = 10001,
    /**
     * Changing the presentation to fullscreen was not possible.
     */
    FULLSCREEN_ERROR = 11000
}

/**
 * Fired when an error occurs.
 *
 * @public
 */
declare interface ErrorEvent_2 extends Event_2<'error'> {
    /**
     * The error that occurred.
     *
     * @deprecated use {@link ErrorEvent.errorObject | errorObject.message} instead
     */
    error: string;
    /**
     * An error object containing additional information about the error.
     */
    errorObject: THEOplayerError;
}
export { ErrorEvent_2 as ErrorEvent }

/**
 * @public
 */
export declare type ErrorType = string;

/**
 * Fired when an event occurs.
 *
 * @public
 */
declare interface Event_2<TType extends string = string> {
    /**
     * The type of the event.
     */
    type: TType;
    /**
     * The creation date of the event.
     */
    date: Date;
}
export { Event_2 as Event }

/**
 * Dispatches events that are fired.
 *
 * @public
 */
export declare interface EventDispatcher<TEventMap extends EventMap<StringKeyOf<TEventMap>>> {
    /**
     * Add the given listener for the given event type(s).
     *
     * @param type - The type of the event.
     * @param listener - The callback which is executed when the event occurs.
     */
    addEventListener<TType extends StringKeyOf<TEventMap>>(type: TType | TType[], listener: EventListener_2<TEventMap[TType]>): void;
    /**
     * Remove the given listener for the given event type(s).
     *
     * @param type - The type of the event.
     * @param listener - The callback which will be removed.
     */
    removeEventListener<TType extends StringKeyOf<TEventMap>>(type: TType | TType[], listener: EventListener_2<TEventMap[TType]>): void;
}

/**
 * List of generic items which can dispatch events.
 *
 * @public
 */
export declare interface EventedList<T, M extends EventMap<StringKeyOf<M>>> extends List<T>, EventDispatcher<M> {
}

/**
 * The function to be executed when an event occurred.
 *
 * @public
 */
declare type EventListener_2<TEvent extends Event_2> = (event: TEvent) => void;
export { EventListener_2 as EventListener }

/**
 * A record used to map events.
 * Each entry contains an event name with associated event interface.
 *
 * @example
 * ```
 * {
 *   'statechange': StateChangeEvent,
 *   'error': ErrorEvent
 * }
 * ```
 *
 * @public
 */
export declare type EventMap<TType extends string> = {
    [type in TType]: Event_2;
};

/**
 * Represents a cue of an Event Stream metadata text track.
 *
 * @public
 */
export declare interface EventStreamCue extends TextTrackCue_2 {
    /**
     * The attributes of the cue.
     *
     * @remarks
     * <br/> - The attributes are parsed from the XML tags in the manifest, where the tag names are the keys and the values are the contents of the respective tags.
     */
    attributes: {
        [attributeName: string]: string;
    };
    /**
     * The identifier of the event.
     */
    eventID: string;
}

/**
 * Describes the configuration of the ExpressPlay DRM integration.
 *
 * @public
 */
export declare interface ExpressPlayDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: ExpressPlayIntegrationID;
}

/**
 * The identifier of the ExpressPlay integration.
 *
 * @public
 */
export declare type ExpressPlayIntegrationID = 'expressplay';

/**
 * Describes the configuration of the Ezdrm DRM integration.
 *
 * @example
 * ```
 * const drmConfiguration = {
 *      integration : 'ezdrm',
 *      fairplay: {
 *          certificateURL: 'yourEzdrmCertificateUrl',
 *          licenseAcquisitionURL: 'yourEzdrmLicenseAcquisitionURL'
 *      }
 * }
 * ```
 *
 * @public
 */
export declare interface EzdrmDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: EzdrmIntegrationID;
}

/**
 * The identifier of the Ezdrm integration.
 *
 * @public
 */
export declare type EzdrmIntegrationID = 'ezdrm';

/**
 * Describes the FairPlay key system configuration.
 *
 * @public
 */
export declare interface FairPlayKeySystemConfiguration extends KeySystemConfiguration {
    /**
     * The URL of the certificate.
     */
    certificateURL?: string;
}

/**
 * The features included in the THEOplayer SDK.
 *
 * @public
 */
export declare const features: string;

/**
 * @public
 */
export declare interface FirstResponseLabel extends MetricLabel {
    readonly uri: string;
    readonly type: HespRequestType;
}

/**
 * @public
 */
export declare interface FirstResponseMetric extends Metric {
    labelData: FirstResponseLabel;
}

/**
 * Describes a FreeWheel ad break request.
 *
 * @remarks
 * <br/> - Available since v2.42.0.
 *
 * @public
 */
export declare interface FreeWheelAdDescription extends AdDescription {
    /**
     * The integration of this ad break.
     */
    integration: 'freewheel';
    /**
     * The FreeWheel ad server URL.
     */
    adServerUrl: string;
    /**
     * The duration of the asset, in seconds.
     *
     * @remarks
     * <br/> - Optional for live assets.
     */
    assetDuration?: number;
    /**
     * The identifier of the asset.
     *
     * @remarks
     * <br/> - Generated by FreeWheel CMS when an asset is uploaded.
     */
    assetId?: string;
    /**
     * The network identifier which is associated with a FreeWheel customer.
     */
    networkId: number;
    /**
     * The server side configuration profile.
     *
     * @remarks
     * <br/> - Used to indicate desired player capabilities.
     */
    profile: string;
    /**
     * The identifier of the video player's location.
     */
    siteSectionId?: string;
    /**
     * List of cue points.
     *
     * @remarks
     * <br/> - Not available in all FreeWheel modes.
     */
    cuePoints?: FreeWheelCue[];
    /**
     * A record of query string parameters added to the FreeWheel ad break request.
     * Each entry contains the parameter name with associated value.
     */
    customData?: Record<string, string>;
}

/**
 * The possible ad unit types, represented by a value from the following list:
 * <br/> - `'preroll'`: The linear ad will play before the content started.
 * <br/> - `'midroll'`: The linear ad will play at a time offset during the content.
 * <br/> - `'postroll'`: The linear ad will play after the content ended.
 * <br/> - `'overlay'`: The non-linear ad.
 *
 * @public
 */
export declare type FreeWheelAdUnitType = 'preroll' | 'midroll' | 'postroll' | 'overlay';

/**
 * Represents a FreeWheel cue.
 *
 * @public
 */
export declare interface FreeWheelCue {
    /**
     * The ad unit type.
     */
    adUnit: FreeWheelAdUnitType;
    /**
     * Offset after which the ad break will start, in seconds.
     */
    timeOffset: number;
}

/**
 * Represents a geographical location.
 *
 * @public
 */
export declare interface Geo {
    /**
     * The latitude of this location.
     */
    readonly lat: number;
    /**
     * The longitude of this location.
     */
    readonly lon: number;
}

/**
 * The global cast API.
 *
 * @public
 */
export declare interface GlobalCast {
    /**
     * The global Chromecast integration API.
     *
     * @remarks
     * <br/> - Only available with the feature `'chromecast'`.
     */
    chromecast?: GlobalChromecast;
}

/**
 * The global Chromecast API.
 *
 * @public
 */
export declare interface GlobalChromecast {
    /**
     * Initialize the Chromecast framework.
     *
     * @remarks
     * <br/> - If this method is not called, then the first created THEOplayer instance will automatically initialize the Chromecast framework.
     *
     * @param configuration - Describes Chromecast specific options.
     */
    initialize(configuration?: ChromecastConfiguration): PromiseLike<void>;
    /**
     * Start a casting session without a source.
     *
     * @remarks
     * <br/> - The Chromecast framework must be {@link GlobalChromecast.initialize | initialized} before starting a session.
     */
    startSession(): PromiseLike<void>;
    /**
     * Stop the active casting session.
     */
    endSession(): void;
}

/**
 * Represents a configuration for server-side ad insertion with the Google DAI pre-integration.
 *
 * @remarks
 * <br/> - Available since v2.30.0.
 *
 * @public
 */
export declare interface GoogleDAIConfiguration extends ServerSideAdInsertionConfiguration {
    /**
     * The type of the requested stream.
     */
    readonly availabilityType?: DAIAvailabilityType;
    /**
     * The identifier for the SSAI pre-integration.
     */
    integration: GoogleDAISSAIIntegrationID;
    /**
     * The authorization token for the stream request.
     *
     * @remarks
     * <br/> - If present, this token is used instead of the API key for stricter content authorization.
     * <br/> - The publisher can control individual content streams authorizations based on this token.
     */
    authToken?: string;
    /**
     * The API key for the stream request.
     *
     * @remarks
     * <br/> - This key is used to verify applications that are attempting to access the content.
     * <br/> - This key is configured through the Google Ad Manager UI.
     */
    apiKey: string;
    /**
     * The ad tag parameters added to stream request.
     *
     * @remarks
     * <br/> - Each entry contains the parameter name with associated value.
     *
     * Valid parameters:
     * <br/> - {@link https://support.google.com/admanager/answer/7320899 | Supply targeting parameters to your stream}
     * <br/> - {@link https://support.google.com/admanager/answer/7320898 | Override stream variant parameters}
     */
    adTagParameters?: Record<string, string>;
    /**
     * The identifier for a stream activity monitor session.
     */
    streamActivityMonitorID?: string;
}

/**
 * Represents a configuration for server-side ad insertion with the Google DAI pre-integration for a Live media stream.
 *
 * @remarks
 * <br/> - Available since v2.30.0.
 *
 * @public
 */
export declare interface GoogleDAILiveConfiguration extends GoogleDAIConfiguration {
    /**
     * The type of the requested stream.
     */
    readonly availabilityType: 'live';
    /**
     * The identifier for the video content source for live streams.
     *
     * @remarks
     * <br/> - This property is required for live streams.
     * <br/> - The asset key can be found in the Google Ad Manager UI.
     */
    assetKey: string;
}

/**
 * The identifier of the Google DAI integration.
 *
 * @public
 */
export declare type GoogleDAISSAIIntegrationID = 'google-dai';

/**
 * Represents a media resource with a Google DAI server-side ad insertion request.
 *
 * @public
 */
export declare interface GoogleDAITypedSource extends TypedSource {
    /**
     * The content type (MIME type) of the media resource, represented by a value from the following list:
     * <br/> - `'application/dash+xml'`: The media resource is an MPEG-DASH stream.
     * <br/> - `'application/x-mpegURL'` or `'application/vnd.apple.mpegurl'`: The media resource is an HLS stream.
     */
    type: string;
    ssai: GoogleDAIVodConfiguration | GoogleDAILiveConfiguration;
}

/**
 * Represents a configuration for server-side ad insertion with the Google DAI pre-integration for a VOD media stream.
 *
 * @remarks
 * <br/> - Available since v2.30.0.
 *
 * @public
 */
export declare interface GoogleDAIVodConfiguration extends GoogleDAIConfiguration {
    /**
     * The type of the requested stream.
     */
    readonly availabilityType: 'vod';
    /**
     * The identifier for the publisher content for on-demand streams.
     *
     * @remarks
     * <br/> - The publisher content comes from a CMS.
     * <br/> - This property is required for on-demand streams.
     */
    contentSourceID: string;
    /**
     * The identifier for the video content source for on-demand streams.
     *
     * @remarks
     * <br/> - This property is required for on-demand streams.
     */
    videoID: string;
}

/**
 * Represents a Google IMA creative compliant to the VAST specification.
 *
 * @remarks
 * <br/> - Available since v2.60.0.
 *
 * @public
 */
export declare interface GoogleImaAd extends Ad {
    /**
     * The source ad server information included in the ad response.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    adSystem: string | undefined;
    /**
     * The bitrate of the currently playing creative as listed in the VAST response or 0.
     */
    readonly bitrate: number;
    /**
     * The identifier of the selected creative for the ad.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    creativeId: string | undefined;
    /**
     * Record of custom parameters for the ad at the time of ad trafficking.
     * Each entry contains a parameter name with associated value.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    traffickingParameters: {
        [parameterKey: string]: string;
    } | undefined;
    /**
     * Return title of the advertisement.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    title: string | undefined;
    /**
     * The custom parameters for the ad at the time of ad trafficking, as a string.
     *
     * @remarks
     * <br/> - A parsed version is available as {@link GoogleImaAd.traffickingParameters}.
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    traffickingParametersString: string | undefined;
    /**
     * List of wrapper ad identifiers as specified in the VAST response.
     */
    wrapperAdIds: string[];
    /**
     * List of wrapper ad systems as specified in the VAST response.
     */
    wrapperAdSystems: string[];
    /**
     * List of wrapper creative identifiers.
     *
     * @remarks
     * <br/> - Starts with the first wrapper ad.
     */
    wrapperCreativeIds: string[];
    /**
     * The url of the chosen media file.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    mediaUrl: string | undefined;
    /**
     * The content type of the ad.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     * <br/> - For linear ads, the content type is only going to be available after the `'adbegin'` event, when the media file is selected.
     */
    contentType: string | undefined;
    /**
     * The identifier of the API framework needed to execute the ad.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     * <br/> - This corresponds with the apiFramework specified in vast.
     */
    apiFramework: string | undefined;
}

/**
 * The HESP API.
 * @remarks
 * <br/> - Note: This API is in an experimental stage and may be subject to breaking changes.
 * <br/> - Only available with the feature `'hesp'`.
 *
 * @public
 */
export declare interface HespApi extends EventDispatcher<HespApiEventMap> {
    /**
     * Seeks the player to the live point.
     * Will resolve when the player loads the source from the live point.
     * @remarks
     * <br/> - Only works during HESP playback.
     */
    goLive(): Promise<void>;
    /**
     * True if the HESP playback is in live mode.
     */
    readonly isLive: boolean;
    /**
     * Can be set to change the latency of the player.
     * A HespLatencyConfiguration object which gives latency configuration of the player.
     */
    latency: HespLatencyConfiguration;
    /**
     * The `currentTime` equivalent of the latest frame generated on the HESP server.
     * This can be `undefined` if no suitable estimate is available.
     * This value should be accurate up to the largest of a frame duration or a RTT.
     */
    readonly currentServerLiveTime: number | undefined;
    /**
     * The current latency measured between the `currentServerLiveTime` and client's `currentTime`.
     * This can be `undefined` if no `currentServerLiveTime` is available.
     * This value should be accurate up to the largest of a frame duration or a RTT.
     */
    readonly currentLatency: number | undefined;
    /**
     * Returns the manifest for the current HESP source.
     * @remarks
     * <br/> - Undefined if no HESP source is configured.
     */
    readonly manifest: Object | undefined;
    /**
     * A HespMetricsApi object which gives player metrics.
     * @remarks
     * <br/> - Undefined if no HESP source is configured.
     */
    readonly metrics: HespMetricsApi | undefined;
}

/**
 * The events fired by the {@link HespApi}.
 * @remarks
 * <br/> - Note: This API is in an experimental stage and may be subject to breaking changes.
 * <br/> - Only available with the feature `'hesp'`.
 * <br/> - Only available when an HESP source is playing.
 *
 * @public
 */
export declare interface HespApiEventMap {
    /**
     * Fired when a new analytic sample is available.
     */
    analytic: DataEvent<'analytic', Analytic>;
    /**
     * Fired when the player enters the HESP live playback mode.
     */
    golive: Event_2<'golive'>;
    /**
     * Fired when the player exits the HESP live playback mode, e.g. when going into DVR playback mode.
     */
    nogolive: Event_2<'nogolive'>;
    /**
     * Fired whenever the player buffer changes.
     */
    bufferedchange: Event_2<'bufferedchange'>;
    /**
     * Fired when video playback is disabled.
     */
    disablevideo: Event_2<'disablevideo'>;
    /**
     * Fired when video playback is enabled.
     */
    enablevideo: Event_2<'enablevideo'>;
    /**
     * Fired when the video element fires a seeking event.
     *
     * @remarks
     * <br/> - Only applies to iOS Safari.
     */
    nativeseeking: Event_2<'nativeseeking'>;
    /**
     * Fired when the video element fires a seeked event.
     *
     * @remarks
     * <br/> - Only applies to iOS Safari.
     */
    nativeseeked: Event_2<'nativeseeked'>;
}

/**
 * A latency configuration object for managing the live offset of the player.
 * The buffer end is seen as the live point, so the live offset is defined as the difference between the buffer end and the current time.
 * @remarks
 * <br/> - Note: This API is in an experimental stage and may be subject to breaking changes.
 * <br/> - Only available with the feature `'hesp'`.
 * <br/> - Only applies to HESP streams.
 *
 * @public
 */
export declare interface HespLatencyConfiguration {
    /**
     * The start of the target live window.
     * If the live offset becomes smaller than this value, the player will slow down.
     */
    readonly windowStart: number;
    /**
     * The live offset that the player will aim for. When correcting the offset by tuning the playbackRate,
     * the player will stop correcting when it reaches this value.
     */
    readonly target: number;
    /**
     * The end of the target live window.
     * If the live offset becomes higher than this value, the player will speed up.
     */
    readonly windowEnd: number;
    /**
     * The live offset at which the player will automatically trigger a live seek.
     */
    readonly maxOffset: number;
    /**
     * The latency offset the player will target when performing an ABR quality switch. To ensure a smooth
     * quality switch, the player will build up buffer by temporarily shifting the latency configuration
     * to the value configured here.
     */
    readonly targetAbrOffset: number;
}

/**
 * @public
 */
export declare type HespMediaType = 'audio' | 'video' | 'metadata';

/**
 * HESP metrics.
 * @remarks
 * <br/> - Note: This API is in an experimental stage and may be subject to breaking changes.
 * <br/> - Only available with the feature `'hesp'`.
 * <br/> - Only applies to HESP streams.
 *
 * @public
 */
export declare interface HespMetricMap {
    totalTimePlayed: TotalTimePlayedMetric;
    totalTimeStalled: ActiveTrackLabeledMetric;
    totalTimePaused: UnlabeledMetric;
    numberOfStalls: UnlabeledMetric;
    numberOfWifiSleeps: UnlabeledMetric;
    numberOfPlayPauseToggle: UnlabeledMetric;
    numberOfAbrChanges: QualityChangeMetric;
    qualityActive: ActiveTrackLabeledMetric;
    numberOfErrors: TypedMetric<ErrorType>;
    numberOfLiveSeeks: UnlabeledMetric;
    totalTimeSeeking: TypedMetric<SeekReason>;
    droppedVideoFrames: ActiveTrackLabeledMetric;
    totalVideoFrames: ActiveTrackLabeledMetric;
    timeToFirstFrame: UnlabeledMetric;
    timeToFirstResponse: FirstResponseMetric;
    timeToGoLive: HistogramMetric;
    numberOfImpressions: StreamLabeledMetric;
    numberOfRateChanges: UnlabeledMetric;
    segmentIntervals: HistogramTrackLabeledMetric;
}

/**
 * The names of HESP metrics.
 * @remarks
 * <br/> - Note: This API is in an experimental stage and may be subject to breaking changes.
 * <br/> - Only available with the feature `'hesp'`.
 * <br/> - Only applies to HESP streams.
 *
 * @public
 */
export declare type HespMetricName = StringKeyOf<HespMetricMap>;

/**
 * An object with {@link HespMetricName} as key and {@link Metric} as value.
 * @remarks
 * <br/> - Note: This API is in an experimental stage and may be subject to breaking changes.
 * <br/> - Only available with the feature `'hesp'`.
 * <br/> - Only applies to HESP streams.
 *
 * @public
 */
export declare type HespMetricsApi = {
    readonly [name in HespMetricName]: Array<HespMetricMap[name]>;
};

/**
 * @public
 */
export declare type HespRequestType = 'manifest' | 'stream' | 'keyframe';

/**
 * Specific source configuration for an HESP media resource.
 * @remarks
 * <br/> - Note: This API is in an experimental stage and may be subject to breaking changes.
 * <br/> - Only available with the feature `'hesp'`.
 * <br/> - Only applicable when configuring an HESP source.
 *
 * @public
 */
export declare interface HespSourceConfiguration {
    /**
     * The major version of the HESP manifest being configured.
     */
    manifestMajorVersion?: number;
}

/**
 * Specific {@link TypedSource} variant for an HESP media resource.
 * @remarks
 * <br/> - Note: This API is in an experimental stage and may be subject to breaking changes.
 * <br/> - Only available with the feature `'hesp'`.
 * <br/> - Only applicable when configuring an HESP source.
 *
 * @public
 */
export declare interface HespTypedSource extends TypedSource {
    type: 'application/vnd.theo.hesp+json';
    /**
     * Specific source configuration for an HESP media resource.
     * @remarks
     * <br/> - Note: This API is in an experimental stage and may be subject to breaking changes.
     * <br/> - Only available with the feature `'hesp'`.
     * <br/> - Only applicable when configuring an HESP source.
     */
    hesp?: HespSourceConfiguration;
}

/**
 * @public
 */
export declare interface HistogramLabel extends MetricLabel {
    readonly upperBound: number;
    readonly lowerBound: number;
}

/**
 * @public
 */
export declare interface HistogramMetric extends Metric {
    readonly labelData: HistogramLabel;
}

/**
 * @public
 */
export declare interface HistogramTrackLabeledMetric extends Metric {
    readonly labelData: HistogramLabel & TrackInfoLabel;
}

/**
 * The strategy for aligning HLS discontinuities, represented by a value from the following list:
 * <br/> - `'playlist'`: The first segment after a discontinuity is aligned with the segment's start time according to the HLS playlist,
 *                       i.e. the sum of the `#EXTINF` durations preceding the segment.
 *                       This ensures that the media time is synchronized with the playlist time, allowing for frame-accurate seeking across
 *                       discontinuities. However, if the `#EXTINF` durations from the playlist do not closely match the actual durations
 *                       from the media segments, then this might lead to overlap or gaps at a discontinuity, which can result in glitches or skips
 *                       during playback.
 * <br/> - `'media'`: The first segment after a discontinuity is aligned with the last media frame of the previous discontinuity.
 *                    This ensures that there is no overlap or gap at a discontinuity, resulting in smooth playback.
 *                    However, this may lead to drift between the playlist time and the actual media time, which can result in less accurate seeking.
 * <br/> - `'auto'`: The player aligns discontinuities using the `'playlist'` strategy for VOD and event streams,
 *                   and using the `'media'` strategy for live and DVR streams.
 *                   This is the default.
 *
 * @remarks
 * <br/> - See {@link HlsPlaybackConfiguration.discontinuityAlignment}.
 *
 * @public
 */
export declare type HlsDiscontinuityAlignment = 'auto' | 'playlist' | 'media';

/**
 * Represents a configuration for controlling playback of an MPEG-DASH stream.
 *
 * @remarks
 * <br/> - Available since v2.82.0.
 *
 * @public
 */
export declare interface HlsPlaybackConfiguration {
    /**
     * The strategy for aligning HLS discontinuities.
     *
     * @defaultValue `'auto'`
     */
    discontinuityAlignment?: HlsDiscontinuityAlignment;
}

/**
 * Record of HTTP headers.
 * Each entry contains the header name and its associated value.
 *
 * @public
 */
export declare interface HTTPHeaders {
    [headerName: string]: string;
}

/**
 * Represents an attached picture ID3 frame.
 *
 * @public
 */
export declare interface ID3AttachedPicture extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'APIC' | 'PIC';
    /**
     * The mime type of the attached picture.
     */
    mimeType: string;
    /**
     * The type of the attached picture.
     *
     * @remarks
     * <br/> - See section 4.14 of {@link http://id3.org/id3v2.4.0-frames | id3v2.4.0-frames - ID3.org}.
     */
    pictureType: number;
    /**
     * The description of the attached picture.
     */
    description: string;
    /**
     * The data of the attached picture.
     *
     * @remarks
     * <br/> - If {@link ID3AttachedPicture.mimeType} is `'-->'` the data is an URL for a picture resource as a string. Otherwise the data is an ArrayBuffer.
     */
    data: string | ArrayBuffer;
}

/**
 * Represents a generic ID3 frame.
 *
 * @public
 */
export declare interface ID3BaseFrame {
    /**
     * The identifier of the frame.
     *
     * @remarks
     * <br/> - See {@link http://id3.org/id3v2.4.0-frames | id3v2.4.0-frames - ID3.org}.
     */
    id: string;
}

/**
 * Represents a comments ID3 frame.
 *
 * @public
 */
export declare interface ID3Comments extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'COMM' | 'COM';
    /**
     * The language of the comments.
     */
    language: string;
    /**
     * The description of the comments.
     */
    description: string;
    /**
     * The content of the comments.
     */
    text: string;
}

/**
 * Represents a commercial ID3 frame.
 *
 * @public
 */
export declare interface ID3CommercialFrame extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'COMR';
    /**
     * The price of the product.
     */
    price: string;
    /**
     * The expiration date of the offer.
     *
     * @remarks
     * <br/> - The format of this property is `'YYYYMMDD'`
     */
    validUntil: string;
    /**
     * The contact URL for the product.
     */
    contactURL: string;
    /**
     * The delivery method of the product, represented by a value from the following list:
     * <br/> - `0`: Other
     * <br/> - `1`: Standard CD album with other songs
     * <br/> - `2`: Compressed audio on CD
     * <br/> - `3`: File over the Internet
     * <br/> - `4`: Stream over the Internet
     * <br/> - `5`: As note sheets
     * <br/> - `6`: As note sheets in a book with other sheets
     * <br/> - `7`: Music on other media
     * <br/> - `8`: Non-musical merchandise
     */
    receivedAs: number;
    /**
     * The name of the seller of the product.
     */
    nameOfSeller: string;
    /**
     * The description of the product.
     */
    description: string;
    /**
     * The mime type of the company logo.
     *
     * @remarks
     * <br/> - This mime type is applicable on the data in {@link ID3CommercialFrame.sellerLogo}.
     * <br/> - Only `'image/png'` and `'image/jpeg'` are allowed.
     */
    pictureMimeType?: string;
    /**
     * The data for the company logo.
     */
    sellerLogo?: ArrayBuffer;
}

/**
 * Represents a cue of an ID3 metadata text track.
 *
 * @public
 */
export declare interface ID3Cue extends TextTrackCue_2 {
    /**
     * The content of the cue.
     */
    readonly content: ID3Frame;
}

/**
 * The possible types of an ID3 frame.
 *
 * @public
 */
export declare type ID3Frame = ID3Unknown | ID3AttachedPicture | ID3GenericEncapsulatedObject | ID3Comments | ID3CommercialFrame | ID3InvolvedPeopleList | ID3PositionSynchronisationFrame | ID3PrivateFrame | ID3SynchronizedLyricsText | ID3Text | ID3UserDefinedText | ID3UniqueFileIdentifier | ID3TermsOfUse | ID3UnsynchronisedLyricsTextTranscription | ID3UrlLink | ID3UserDefinedUrlLink | ID3Yospace;

/**
 * Represents a general encapsulated object ID3 frame.
 *
 * @public
 */
export declare interface ID3GenericEncapsulatedObject extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'GEOB' | 'GEO';
    /**
     * The mime type of the encapsulated object.
     */
    mimeType: string;
    /**
     * The file name of the encapsulated object.
     */
    fileName: string;
    /**
     * The description of the encapsulated object.
     */
    description: string;
    /**
     * The data of the encapsulated object.
     */
    data: ArrayBuffer;
}

/**
 * Represents an involved people list ID3 frame.
 *
 * @public
 */
export declare interface ID3InvolvedPeopleList extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'IPLS' | 'IPL';
    /**
     * List of the involved people.
     */
    entries: Array<{
        involvement: string;
        involvee: string;
    }>;
}

/**
 * Represents an position synchronisation ID3 frame.
 *
 * @public
 */
export declare interface ID3PositionSynchronisationFrame extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'POSS';
    /**
     * The format of the timestamp, represented by a value from the following list:
     * <br/> - `1`: Absolute time, 32 bit sized, in MPEG frames.
     * <br/> - `2`: Absolute time, 32 bit sized, in milliseconds.
     */
    format: number;
    /**
     * The timestamp of the frame.
     */
    position: number;
}

/**
 * Represents a private ID3 frame.
 *
 * @public
 */
export declare interface ID3PrivateFrame extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'PRIV';
    /**
     * The identifier of the owner.
     */
    ownerIdentifier: string;
    /**
     * The data of the frame.
     */
    data: ArrayBuffer;
}

/**
 * Represents a synchronised lyrics/text ID3 frame.
 *
 * @public
 */
export declare interface ID3SynchronizedLyricsText extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'SYLT' | 'SLT';
    /**
     * The language of the lyrics/text.
     */
    language: string;
    /**
     * The format of the timestamp, represented by a value from the following list:
     * <br/> - `1`: Absolute time, 32 bit sized, in MPEG frames.
     * <br/> - `2`: Absolute time, 32 bit sized, in milliseconds.
     */
    format: number;
    /**
     * The content type of the frame, represented by a value from the following list:
     * <br/> - `0`: The frame contains other data.
     * <br/> - `1`: The frame contains lyrics.
     * <br/> - `2`: The frame contains text transcription.
     * <br/> - `3`: The frame contains a movement/part name (e.g. "Adagio").
     * <br/> - `4`: The frame contains an events (e.g. "Don Quijote enters the stage").
     * <br/> - `5`: The frame contains a chord (e.g. "Bb F Fsus").
     * <br/> - `6`: The frame contains trivia/'pop up' information.
     * <br/> - `7`: The frame contains URLs to webpages.
     * <br/> - `8`: The frame contains URLs to images.
     */
    contentType: number;
    /**
     * The description of the lyrics/text.
     */
    description: string;
    /**
     * List of lyrics/text.
     */
    entries: Array<{
        text: string;
        timestamp: number;
    }>;
}

/**
 * Represents a terms of use ID3 frame.
 *
 * @public
 */
export declare interface ID3TermsOfUse extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'USER';
    /**
     * The language of the terms of use.
     */
    language: string;
    /**
     * The content of the terms of use.
     */
    text: string;
}

/**
 * Represents a text information ID3 frame.
 *
 * @public
 */
export declare interface ID3Text extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     *
     * @remarks
     * <br/> - Applicable values are "T000" to "TZZZ" and "T00" to "TZZ", excluding "TXX" and "TXXX".
     */
    id: string;
    /**
     * The content of the text.
     */
    text: string;
}

/**
 * Represents a unique file identifier ID3 frame.
 *
 * @public
 */
export declare interface ID3UniqueFileIdentifier extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'UFID' | 'UFI';
    /**
     * The identifier of the owner of the file.
     */
    ownerIdentifier: string;
    /**
     * The identifier of the file.
     */
    identifier: ArrayBuffer;
}

/**
 * Represents an unknown ID3 frame.
 *
 * @public
 */
export declare interface ID3Unknown extends ID3BaseFrame {
    /**
     * The raw data of the frame.
     */
    data: ArrayBuffer | undefined;
}

/**
 * Represents a unsynchronised lyrics/text transcription ID3 frame.
 *
 * @public
 */
export declare interface ID3UnsynchronisedLyricsTextTranscription extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'USLT' | 'ULT';
    /**
     * The language of the lyrics/text.
     */
    language: string;
    /**
     * The description of the lyrics/text.
     */
    description: string;
    /**
     * The content of the lyrics/text.
     */
    text: string;
}

/**
 * Represents a URL link ID3 frame.
 *
 * @public
 */
export declare interface ID3UrlLink extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     *
     * @remarks
     * <br/> - Applicable values are "W000" to "WZZZ" and "W00" to "WZZ", excluding "WXX" and "WXXX".
     */
    id: string;
    /**
     * The URL.
     */
    url: string;
}

/**
 * Represents a used defined text ID3 frame.
 *
 * @public
 */
export declare interface ID3UserDefinedText extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'TXXX' | 'TXX';
    /**
     * The description of the text.
     */
    description: string;
    /**
     * The content of the text.
     */
    text: string;
}

/**
 * Represents a user defined URL link ID3 frame.
 *
 * @public
 */
export declare interface ID3UserDefinedUrlLink extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: 'WXXX' | 'WXX';
    /**
     * The description of the URL.
     */
    description: string;
    /**
     * The URL.
     */
    url: string;
}

/**
 * Represents a Yospace ID3 frame.
 *
 * @public
 */
export declare interface ID3Yospace extends ID3BaseFrame {
    /**
     * The identifier of the frame.
     */
    id: YospaceId;
    /**
     * The content of the frame.
     */
    text: string;
}

/**
 * Describes a Google IMA ad break request.
 *
 * @public
 */
export declare interface IMAAdDescription extends AdDescription {
    /**
     * The integration of this ad break.
     */
    integration: 'google-ima';
    /**
     * The source of the ad
     *
     * @remarks
     * <br/> - VAST, VMAP and VPAID are supported.
     */
    sources: string | AdSource;
}

/**
 * The Imagine API.
 *
 * @public
 */
export declare interface Imagine extends EventDispatcher<ImagineEventMap> {
    /**
     * Whether an Imagine ad is playing.
     */
    readonly playing: boolean;
}

/**
 * The events fired by the {@link Imagine | Imagine API}.
 *
 * @public
 */
export declare interface ImagineEventMap {
    /**
     * Fired when the ad starts.
     */
    start: ImagineTrackingEvent;
    /**
     * Fired when the ad reaches the first quartile.
     */
    firstquartile: ImagineTrackingEvent;
    /**
     * Fired when the ad reaches the mid point.
     */
    midpoint: ImagineTrackingEvent;
    /**
     * Fired when the ad reaches the third quartile.
     */
    thirdquartile: ImagineTrackingEvent;
    /**
     * Fired when the ad is completed.
     */
    complete: ImagineTrackingEvent;
    /**
     * Fired when the ad pauses.
     */
    pause: ImagineTrackingEvent;
    /**
     * Fired when the ad resumes.
     */
    resume: ImagineTrackingEvent;
}

/**
 * Describes the SSAI configuration of the Imagine integration.
 *
 * @public
 */
export declare interface ImagineServerSideAdInsertionConfiguration extends ServerSideAdInsertionConfiguration {
    /**
     * {@inheritDoc ServerSideAdInsertionConfiguration.integration}
     */
    integration: ImagineSSAIIntegrationID;
}

/**
 * The identifier of the Imagine integration.
 *
 * @public
 */
export declare type ImagineSSAIIntegrationID = 'imagine';

/**
 * Fired when an event related to the Imagine integration occurs.
 *
 * @public
 */
export declare interface ImagineTrackingEvent extends Event_2<'start' | 'firstquartile' | 'midpoint' | 'thirdquartile' | 'complete' | 'pause' | 'resume'> {
}

/**
 * Describes a source of the Imagine integration.
 *
 * @public
 */
export declare interface ImagineTypedSource extends TypedSource {
    ssai: ImagineServerSideAdInsertionConfiguration;
}

/**
 * Represents an intercepted HTTP request which can be modified.
 *
 * @public
 */
export declare interface InterceptableRequest extends Request_2 {
    /**
     * Whether the request is closed.
     *
     * @remarks
     * <br/> - Request is closed by {@link InterceptableRequest.redirect} and {@link InterceptableRequest.respondWith}.
     */
    readonly closed: boolean;
    /**
     * Replaces the original request with the provided request.
     *
     * @remarks
     * <br/> - Invocation closes the request.
     * <br/> - Invocation while the request is closed will throw an error.
     *
     * @param request - A {@link RequestInit} or a string which is shorthand for {@link RequestInit.url}.
     */
    redirect(request: RequestLike): void;
    /**
     * Immediately respond with the provided response.
     *
     * @remarks
     * <br/> - Invocation closes the request.
     * <br/> - Invocation while the request is closed will throw an error.
     * <br/> - The original request will not be performed.
     *
     * @param response - A {@link ResponseInit}.
     */
    respondWith(response: ResponseLike): void;
    /**
     * Wait until the given callback is done before closing and executing this request.
     *
     * @remarks
     * <br/> - The first argument of the callback is a `done` function, which must be called to resolve the callback.
     * <br/> - Alternatively, the callback can return a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise| `PromiseLike`}.
     * <br/> - Invocation of the `done` function closes the request.
     * <br/> - Invocation while the request is closed will throw an error.
     *
     * @param fn - A {@link WaitUntilCallback}
     */
    waitUntil(fn: WaitUntilCallback): void;
    /**
     * Wait until the given promise is resolved before closing and executing this request.
     *
     * @remarks
     * <br/> - Resolution of the promise closes the request.
     * <br/> - Invocation while the request is closed will throw an error.
     * <br/> - This is equivalent to:
     * ```
     * request.waitUntil(function (done) {
     *   promise.then(function () {
     *     done();
     *   }).catch(function (error) {
     *     done(error);
     *   });
     * })
     * ```
     *
     * @param promise - A {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise| `PromiseLike`}.
     */
    waitUntil(promise: PromiseLike<any>): void;
}

/**
 * Represents an intercepted HTTP response which can be modified.
 *
 * @public
 */
export declare interface InterceptableResponse {
    /**
     * The response's request.
     */
    readonly request: Request_2;
    /**
     * The response's url.
     *
     * @remarks
     * <br/> - This can differ from the {@link InterceptableResponse.request | `request.url`} when redirected.
     */
    readonly url: string;
    /**
     * The response's status code.
     */
    readonly status: number;
    /**
     * The response's status text.
     */
    readonly statusText: string;
    /**
     * The response's HTTP headers.
     */
    readonly headers: HTTPHeaders;
    /**
     * The response's body.
     */
    readonly body: ResponseBody;
    /**
     * Whether the response is closed.
     *
     * @remarks
     * <br/> - Response is closed by {@link InterceptableResponse.respondWith}.
     */
    readonly closed: boolean;
    /**
     * Replaces the original response with the provided response.
     *
     * @remarks
     * <br/> - Invocation closes the response.
     * <br/> - Invocation while the response is closed will throw an error.
     *
     * @param response - A {@link ResponseLike}.
     */
    respondWith(response: ResponseLike): void;
    /**
     * Wait until the given callback is done before closing this response.
     *
     * @remarks
     * <br/> - The first argument of the callback is a `done` function, which must be called to resolve the callback.
     * <br/> - Invocation of the `done` function closes the response.
     * <br/> - Invocation while the response is closed will throw an error.
     *
     * @param fn - A {@link WaitUntilCallback}
     */
    waitUntil(fn: WaitUntilCallback): void;
    /**
     * Wait until the given promise is resolved before closing this response.
     *
     * @remarks
     * <br/> - Resolution of the promise closes the response.
     * <br/> - Invocation while the response is closed will throw an error.
     * <br/> - This is equivalent to:
     * ```
     * response.waitUntil(function (done) {
     *   promise.then(function () {
     *     done();
     *   }).catch(function (error) {
     *     done(error);
     *   });
     * })
     * ```
     *
     * @param promise - {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise| `PromiseLike`}.
     */
    waitUntil(promise: PromiseLike<any>): void;
}

/**
 * Describes the configuration of the Irdeto DRM integration.
 *
 * @example
 * ```
 * const drmConfiguration = {
 *     integration : 'irdeto',
 *     fairplay: {
 *         certificateURL: 'yourIrdetoCertificateUrl',
 *         licenseAcquisitionURL: 'yourIrdetoLicenseAcquisitionURL'
 *     }
 *     crmId: 'yourIrdetoCrmId',
 *     accountId: 'yourIrdetoCrmId',
 *     contentId: 'yourIrdetokeyId',
 *     accountId: 'yourIrdetoCrmId',
 *     applicationId: 'yourIrdeotApplicationId',
 * }
 * ```
 *
 * @public
 */
export declare interface IrdetoDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: IrdetoIntegrationID;
    /**
     * The identifier of the CRM.
     *
     * @remarks
     * <br/> - This ID will be added for license URL requests.
     */
    crmId: string;
    /**
     * The identifier of the Irdeto account.
     */
    accountId: string;
    /**
     * The identifier of the content.
     */
    contentId: string;
    /**
     * The identifier of the key.
     *
     * @remarks
     * <br/> - It must be present for FairPlay.
     */
    keyId?: string;
    /**
     * The identifier of the application.
     *
     * @remarks
     * <br/> - It must be present for FairPlay.
     */
    applicationId?: string;
    /**
     * The identifier of the session.
     *
     * @remarks
     * <br/> - It must be present for registered user flow parameters.
     * <br/> - This is not mandatory in case of free open streams.
     */
    sessionId?: string;
    /**
     * The ticket for registered user flows.
     *
     * @remarks
     * <br/> - It must be present for registered user flow parameters.
     * <br/> - This is not mandatory in case of free open streams.
     */
    ticket?: string;
}

/**
 * The identifier of the Irdeto integration.
 *
 * @public
 */
export declare type IrdetoIntegrationID = 'irdeto';

/**
 * The join strategy, represented by a value from the following list:
 * <br/> - `'auto'` : The player will automatically join a cast session if one exists when play is called. Otherwise it will prompt the user with all available devices.
 * <br/> - `'manual'` : The player will take over an existing session if there is one and the cast button is clicked. Otherwise it will prompt the user with all available devices.
 * <br/> - `'disabled'` : The player is not affected by cast sessions and is not castable.
 *
 * @public
 */
export declare type JoinStrategy = 'auto' | 'manual' | 'disabled';

/**
 * @public
 */
export declare interface KeyFrameLabel extends MetricLabel {
    readonly keyFrame: boolean;
}

/**
 * Describes the configuration of the KeyOS DRM integration
 *
 * @example
 * Basic example
 * ```
 * const drmConfiguration = {
 *     integration : 'keyos',
 *     customdata : 'PEtleU9T...blhNTD4='
 * }
 * ```
 *
 * @example
 * Advanced example
 * ```
 * const drmConfiguration = {
 *     integration : 'keyos',
 *     customdata : 'PEtleU9T...blhNTD4=',
 *     playready : {
 *         licenseAcquisitionURL : 'customplayready.url',
 *         customdata : 'CUSTOM...='
 *     }
 * }
 * ```
 *
 * @public
 */
export declare interface KeyOSDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: KeyOSIntegrationID;
    /**
     * The custom data for the licence acquisition request.
     *
     * @remarks
     * <br/> - This attribute is required if it is not specified in the separate {@link KeyOSKeySystemConfiguration} for Widevine and PlayReady.
     * <br/> - The value of this attribute should be the value of the customData header that you want to send with license requests to the KeyOS license server.
     * <br/> - In most cases this will be the base64 encoded KeyOS authentication XML.
     */
    customdata?: string;
    /**
     * The configuration of the PlayReady key system.
     */
    playready?: KeyOSKeySystemConfiguration;
    /**
     * The configuration of the Widevine key system.
     */
    widevine?: KeyOSKeySystemConfiguration;
    /**
     * The configuration of the FairPlay key system.
     */
    fairplay?: KeyOSFairplayKeySystemConfiguration;
}

/**
 * Describes the KeyOS FairPlay key system configuration.
 *
 * @public
 */
export declare interface KeyOSFairplayKeySystemConfiguration extends FairPlayKeySystemConfiguration {
    /**
     * The custom data for the licence acquisition request.
     */
    customdata?: string;
}

/**
 * The identifier of the KeyOS integration.
 *
 * @public
 */
export declare type KeyOSIntegrationID = 'keyos';

/**
 * Describes the KeyOS key system configuration.
 *
 * @public
 */
export declare interface KeyOSKeySystemConfiguration extends KeySystemConfiguration {
    /**
     * The custom data for the licence acquisition request.
     */
    customdata?: string;
}

/**
 * Describes the key system configuration.
 *
 * @public
 */
export declare interface KeySystemConfiguration {
    /**
     * Property to indicate whether the ability to persist state is required. This includes session data and any other type of state. The player will forward this information to the CDM when requesting access to the media key system.
     *
     * Available values are:
     * - "required": This will instruct the player to make the key sessions persistent.
     * - "optional": Choice of making use of a persistent key session is up to the player.
     * - "not-allowed": A temporary key session will be used.
     */
    persistentState?: 'required' | 'optional' | 'not-allowed';
    /**
     * Used to indicate if media key sessions can be shared across different instances, for example different browser profiles, player instances or applications. The player will forward this information to the CDM when requesting access to the media key system.
     * Available values are:
     * - “required”
     * - “optional”
     * - “not-allowed”
     */
    distinctiveIdentifier?: 'required' | 'optional' | 'not-allowed';
    /**
     * Allows to configure the robustness level required for audio data. The robustness level can be used to define the DRM security level. If the security level requested is not available on the platform, playback will fail.
     *
     * Following values are supported for Widevine:
     * - "": Lowest security level
     * - "SW_SECURE_CRYPTO": Secure decryption in software is required. This matches Widevine L3.
     * - "SW_SECURE_DECODE": Media data is to be decoded securely in software. This matches Widevine L3.
     * - "HW_SECURE_CRYPTO": Secure decryption in hardware is required. This matches Widevine L2.
     * - "HW_SECURE_DECODE": Media data is to be decoded securely in hardware. This matches Widevine L1.
     * - "HW_SECURE_ALL": The media pipeline must be decrypted and decoded securely in hardware. This matches Widevine L1.
     */
    audioRobustness?: string;
    /**
     * Allows to configure the robustness level required for video data. The robustness level can be used to define the DRM security level. If the security level requested is not available on the platform, playback will fail.
     *
     * Following values are supported for Widevine:
     *
     * - "": Lowest security level
     * - "SW_SECURE_CRYPTO": Secure decryption in software is required. This matches Widevine L3.
     * - "SW_SECURE_DECODE": Media data is to be decoded securely in software. This matches Widevine L3.
     * - "HW_SECURE_CRYPTO": Secure decryption in hardware is required. This matches Widevine L2.
     * - "HW_SECURE_DECODE": Media data is to be decoded securely in hardware. This matches Widevine L1.
     * - "HW_SECURE_ALL": The media pipeline must be decrypted and decoded securely in hardware. This matches Widevine L1.
     */
    videoRobustness?: string;
    /**
     * The licence acquisition URL.
     *
     * @remarks
     * <br/> - If provided, the player will send license requests for the intended DRM scheme to the provided value.
     * <br/> - If not provided, the player will use the default license acquisition URLs.
     */
    licenseAcquisitionURL?: string;
    
    /**
     * Record of HTTP headers for the licence acquisition request.
     * Each entry contains a header name with associated value.
     */
    headers?: {
        [headerName: string]: string;
    };
    /**
     * Whether the player is allowed to use credentials for cross-origin requests.
     *
     * @remarks
     * <br/> - Credentials are cookies, authorization headers or TLS client certificates.
     *
     * @defaultValue `false`
     */
    useCredentials?: boolean;
    /**
     * Record of query parameters for the licence acquisition request.
     * Each entry contains a query parameter name with associated value.
     */
    queryParameters?: {
        [key: string]: any;
    };
    /**
     * The certificate for the key system. This can be either an ArrayBuffer or Uint8Array containing the raw certificate bytes or a base64-encoded variant of this.
     */
    certificate?: BufferSource_2 | string;
    /**
     * Process the certificate's request.
     *
     * @deprecated Please use {@link registerContentProtectionIntegration} and {@link ContentProtectionIntegration.onCertificateRequest} instead.
     */
    certificateRequestProcessor?: DRMProcessor;
    /**
     * Process the certificate's response.
     *
     * @deprecated Please use {@link registerContentProtectionIntegration} and {@link ContentProtectionIntegration.onCertificateResponse} instead.
     */
    certificateResponseProcessor?: DRMProcessor;
    /**
     * Process the license's request.
     *
     * @deprecated Please use {@link registerContentProtectionIntegration} and {@link ContentProtectionIntegration.onLicenseRequest} instead.
     */
    licenseRequestProcessor?: DRMProcessor;
    /**
     * Process the license's response.
     *
     * @deprecated Please use {@link registerContentProtectionIntegration} and {@link ContentProtectionIntegration.onLicenseResponse} instead.
     */
    licenseResponseProcessor?: DRMProcessor;
}

/**
 * The id of a key system. Possible values are 'widevine', 'fairplay' and 'playready'.
 *
 * @public
 */
export declare type KeySystemId = 'widevine' | 'fairplay' | 'playready';

/**
 * A request for a license.
 * @public
 */
export declare interface LicenseRequest extends ContentProtectionRequest {
    /**
     * The SKD URL (for example skd://fb64ba7c5bd34bf188cf9ba76ab8370e) as extracted from the #EXT-X-KEY tag in the HLS playlist.
     *
     * @remarks
     * <br/> - Only available for Fairplay license requests. The value will be `undefined` otherwise.
     */
    fairplaySkdUrl: string | undefined;
}

/**
 * The response of a license request.
 * @public
 */
export declare interface LicenseResponse extends ContentProtectionResponse {
    /**
     * The request for which the response is being returned.
     */
    request: LicenseRequest;
}

/**
 * The type of the licence, represented by a value from the following list:
 * <br/> - `'temporary'`
 * <br/> - `'persistent'`
 *
 * @public
 */
export declare type LicenseType = 'temporary' | 'persistent';

/**
 * Represents a linear ad in the VAST specification.
 *
 * @public
 */
export declare interface LinearAd extends Ad {
    /**
     * The duration of the ad, in seconds.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    duration: number;
    /**
     * List of media files which contain metadata about ad video files.
     */
    mediaFiles: MediaFile[];
}

/**
 * List of generic items.
 *
 * @public
 */
export declare interface List<T> extends Array<T> {
    /**
     * The number of items in the list.
     */
    length: number;
    /**
     * Returns the object representing the nth item in the list.
     * @param index - The index of the item to retrieve.
     */
    item(index: number): T | undefined;
    /**
     * The object representing the nth in the list.
     */
    [index: number]: T;
}

/**
 * Fired when the player can render the media data at the current playback position for the first time.
 *
 * @public
 */
export declare interface LoadedDataEvent extends Event_2<'loadeddata'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}

/**
 * Fired when the player determines the duration and dimensions of the media resource.
 *
 * @public
 */
export declare interface LoadedMetadataEvent extends Event_2<'loadedmetadata'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}

/**
 * A synchronous or asynchronous return type
 *
 * @public
 */
export declare type MaybeAsync<T> = T | PromiseLike<T>;

/**
 * A {@link NetworkEstimator} that allows measuring the current network state.
 *
 * @public
 */
export declare interface MeasurableNetworkEstimator extends NetworkEstimator {
    /**
     * Creates a new {@link RequestMeasurer} instance for a given HTTP request URI.
     * @param request - The URI of the measured HTTP request.
     */
    createMeasurer(request: Request_2): RequestMeasurer | undefined;
}

/**
 * Thrown when a media error occurs.
 *
 * @public
 */
declare interface MediaError_2 extends Error {
    /**
     * The code of the error.
     */
    readonly code: MediaErrorCode;
    /**
     * The cause of the error, if any.
     */
    readonly cause?: string;
    /**
     * The key system specific error code, if any.
     */
    readonly systemCode?: number;
}
export { MediaError_2 as MediaError }

/**
 * The media error code, represented by a value from the following list:
 * <br/> - `1` - ABORTED: The fetching of the associated resource was aborted by the user's request.
 * <br/> - `2` - NETWORK: Some kind of network error occurred which prevented the media from being successfully fetched, despite having previously been available.
 * <br/> - `3` - DECODE: Despite having previously been determined to be usable, an error occurred while trying to decode the media resource, resulting in an error.
 * <br/> - `4` - SRC_NOT_SUPPORTED: The associated resource or media provider object (such as a MediaStream) has been found to be unsuitable.
 * <br/> - `5` - ENCRYPTED: Some kind of digital rights management error occurred.
 * <br/> - `6` - LICENSE_INVALID: The player's license was determined to be invalid.
 * <br/> - `7` - ADVERTISEMENT_ERROR: Some kind of advertisement related error occurred.
 *
 * @public
 */
export declare type MediaErrorCode = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Represents metadata of an media file with ad content.
 *
 * @remarks
 * <br/> - This metadata is retrieved from the VAST file.
 *
 * @public
 */
export declare interface MediaFile {
    /**
     * The delivery type of the video file.
     */
    delivery: DeliveryType;
    /**
     * The MIME type for the file container.
     */
    type: string;
    /**
     * The native width of the video file, in pixels.
     */
    width: number;
    /**
     * The native height of the video file, in pixels.
     */
    height: number;
    /**
     * The URI of the VAST content.
     */
    contentURL: string;
}

/**
 * Describes the configuration of the Media Melon integration.
 *
 * @public
 */
export declare interface MediaMelonConfiguration {
    /**
     * The identifier of the Media Melon customer.
     *
     * @remarks
     * <br/> - This id should be obtained through Media Melon.
     */
    customerID: string;
    /**
     * The domain name of the content owner.
     *
     * @remarks
     * <br/> - When omitted, will not be reported to Media Melon.
     * <br/> - It should be used to categorize analytics based on a group or application (e.g. resellers).
     */
    domainName?: string;
    /**
     * Your player solution's name.
     *
     * @remarks
     * <br/> - It can be a custom name, or `'THEOplayer'`.
     */
    playerName: string;
    /**
     * The identifier of the subscriber.
     *
     * @remarks
     * <br/> - When omitted, will not be reported to Media Melon.
     */
    subscriberID?: string;
}

/**
 * Represents a media track (audio or video) of a media resource.
 *
 * @public
 */
export declare interface MediaTrack extends Track, EventDispatcher<MediaTrackEventMap> {
    /**
     * Whether the track is enabled.
     *
     * @remarks
     * <br/> - Only one track of the same type (e.g. video) can be enabled at the same time.
     * <br/> - Enabling a track will disable all other tracks of the same type.
     * <br/> - Disabling a track will not enable a different track of the same type.
     */
    enabled: boolean;
    /**
     * The identifier of the media track.
     *
     * @remarks
     * <br/> - This identifier can be used to distinguish between related tracks, e.g. tracks in the same list.
     */
    readonly id: string;
    /**
     * A unique identifier of the media track.
     *
     * @remarks
     * <br/> - This identifier is unique across tracks of a THEOplayer instance and can be used to distinguish between tracks.
     * <br/> - This identifier is a randomly generated number.
     */
    readonly uid: number;
    /**
     * The kind of the media track, represented by a value from the following list:
     * <br/> - `'main'`: The track is the default track for playback
     * <br/> - `'alternative'`: The track is not the default track for playback
     */
    readonly kind: string;
    /**
     * The label of the media track.
     */
    label: string;
    /**
     * The language of the media track.
     */
    readonly language: string;
    /**
     * The active quality of the media track, i.e. the quality that is currently being played.
     */
    readonly activeQuality: Quality | undefined;
    /**
     * The qualities of the media track.
     */
    readonly qualities: QualityList;
    /**
     * One or more desired qualities of the media track.
     *
     * @remarks
     * <br/> - If desired qualities are present, the Adaptive Bitrate mechanism of the player will limit itself to these qualities.
     * <br/> - If one desired quality is present, the Adaptive Bitrate mechanism of the player will be disabled and the desired quality will be played back.
     */
    targetQuality: Quality | Quality[] | undefined;
    /**
     * {@inheritDoc EventDispatcher.addEventListener}
     */
    addEventListener<TType extends StringKeyOf<MediaTrackEventMap>>(type: TType | TType[], listener: EventListener_2<MediaTrackEventMap[TType]>): void;
    /**
     * {@inheritDoc EventDispatcher.removeEventListener}
     */
    removeEventListener<TType extends StringKeyOf<MediaTrackEventMap>>(type: TType | TType[], listener: EventListener_2<MediaTrackEventMap[TType]>): void;
}

/**
 * The events fired by a {@link MediaTrack}.
 *
 * @public
 */
export declare interface MediaTrackEventMap extends TrackEventMap {
    /**
     * Fired when the media track's {@link MediaTrack.activeQuality | active quality} changes.
     */
    activequalitychanged: QualityEvent<'activequalitychanged'>;
    /**
     * Fired when the media track's {@link MediaTrack.targetQuality | target quality} changes.
     */
    targetqualitychanged: TargetQualityChangedEvent;
    /**
     * Fired when a quality of the track becomes unavailable.
     *
     * @remarks
     * <br/> - A Quality can become unavailable due to a DRM restriction (e.g. HDCP).
     */
    qualityunavailable: QualityEvent<'qualityunavailable'>;
}

/**
 * List of media tracks.
 *
 * @public
 */
export declare interface MediaTrackList extends TrackList<MediaTrack> {
    /**
     * The number of media tracks in the list.
     */
    readonly length: number;
    /**
     * Return the media track at the requested index in the list.
     *
     * @param index - A `number` representing the index of a media track in the list.
     * @returns The media track with index `index` in the list.
     */
    item(index: number): MediaTrack;
    /**
     * Index signature to get the media track at the requested index in the list.
     */
    readonly [index: number]: MediaTrack;
}

/**
 * The media's type, represented by a value from the following list:
 * <br/> - `'audio'`
 * <br/> - `'video'`
 * <br/> - `'text'`
 * <br/> - `'image'`
 * <br/> - Empty string (`''`) when the media type is unknown
 *
 * @public
 */
export declare type MediaType = '' | 'audio' | 'video' | 'text' | 'image';

/**
 * Describes the metadata of a Chromecast source.
 *
 * @remarks
 * <br/> - Available since v2.21.0.
 *
 * @public
 */
export declare interface MetadataDescription {
    [metadataKey: string]: any;
    /**
     * The title of the content.
     */
    readonly title?: string;
}

/**
 * @public
 */
export declare interface Metric<MN extends HespMetricName = HespMetricName> {
    /**
     * A metric name which will be one of {@link HespMetricName}.
     */
    readonly name: MN;
    /**
     * The value of metric.
     */
    readonly value: number;
    /**
     * A label data as an additional information of Metric.
     */
    readonly labelData: MetricLabel;
}

/**
 * @public
 */
export declare interface MetricLabel {
    [key: string]: string | number | boolean;
}

/**
 * The metrics API which can be used to gather information related to the quality-of-service and video playback experience.
 *
 * @remarks
 * <br/> - Available since v2.46.0.
 *
 * @public
 */
export declare interface Metrics {
    /**
     * The total number of video frames that could not be decoded.
     *
     * @remarks
     * <br/> - This value resets on a source change.
     */
    corruptedVideoFrames: number;
    /**
     * The total number of dropped video frames.
     *
     * @remarks
     * <br/> - This value resets on a source change.
     */
    droppedVideoFrames: number;
    /**
     * The bandwidth in bits per second estimated to be currently available as used for ABR decisions.
     */
    currentBandwidthEstimate: number;
    /**
     * The total bytes received in response to all media segments since loading the current source.
     *
     * @remarks
     * <br/> - This value is currently available only for DASH.
     */
    totalBytesLoaded: number;
    /**
     * The total number of audio and video segments in the buffer.
     *
     * @remarks
     * <br/> - This value is currently available only for DASH.
     */
    bufferedSegments: BufferedSegments;
}

/**
 * The identifier of the Moat integration.
 *
 * @public
 */
export declare type MoatAnalyticsIntegrationID = 'moat';

/**
 * Describes configuration of the Moat integration.
 *
 * @remarks
 * <br/> - Available since v2.27.0.
 *
 * @public
 */
export declare interface MoatConfiguration extends AnalyticsDescription {
    /**
     * {@inheritDoc AnalyticsDescription.integration}
     */
    integration: MoatAnalyticsIntegrationID;
    /**
     * The Moat partner code.
     */
    partnerCode: string;
}

/**
 * The muted autoplay policy of a player.
 * <br/> - `'none'`: Disallow muted autoplay. If the player is requested to autoplay while unmuted, and the platform does not support unmuted autoplay, the player will not start playback.
 * <br/> - `'all'`: Allow muted autoplay. If the player is requested to autoplay while unmuted, and the platform supports muted autoplay, the player will start muted playback.
 * <br/> - `'content'`: Allow muted autoplay only for the main content. Disallow muted autoplay for e.g. advertisements. (Not yet supported.)
 *
 * @public
 */
export declare type MutedAutoplayConfiguration = 'none' | 'all' | 'content';

declare interface NativeTimeRanges {
    readonly length: number;
    start(index: number): number;
    end(index: number): number;
}

/**
 * The network API.
 *
 * @remarks
 * <br/> - Available since v2.21.0.
 *
 * @public
 */
export declare interface Network extends EventDispatcher<NetworkEventMap>, NetworkInterceptorController, NetworkEstimatorController {
    /**
     * Whether the stream is online.
     */
    readonly online: boolean;
}

/**
 * Provides estimates on the current network state.
 *
 * @public
 */
export declare interface NetworkEstimator {
    /**
     * The estimated network bandwidth in bit/s.
     */
    readonly bandwidth: number;
    /**
     * The estimated HTTP request round trip time.
     */
    readonly roundTripTime: number;
}

/**
 * Network estimator API which can be used to get or set the active `MeasurableNetworkEstimator`.
 *
 * @remarks
 * <br/> - EXPERIMENTAL: Setting an external `MeasurableNetworkEstimator` implementation will only affect playback
 * of HLS streams where`lowLatency: true` has been set on the `TypedSource`.
 *
 * @public
 */
export declare interface NetworkEstimatorController {
    /**
     * Returns the active `MeasurableNetworkEstimator`. An internal implementation is provided by default.
     */
    readonly estimator: NetworkEstimator;
    /**
     * Set a `MeasurableNetworkEstimator` implementation for internal use by the player.
     */
    setEstimator(estimator: MeasurableNetworkEstimator | undefined): void;
}

/**
 * The events fired by the {@link Network | network API}.
 *
 * @public
 */
export declare interface NetworkEventMap {
    /**
     * Fired when the manifest is online.
     */
    online: Event_2<'online'>;
    /**
     * Fired when the manifest is offline.
     */
    offline: Event_2<'offline'>;
}

/**
 * Network interceptor API which can be used to intercept network requests and responses.
 *
 * @remarks
 * <br/> - Request interceptors will be executed in the order they were added.
 * <br/> - {@link InterceptableRequest.respondWith} can be called at most once, otherwise an error will be thrown.
 *
 * @public
 */
export declare interface NetworkInterceptorController {
    /**
     * Add a request interceptor.
     *
     * @param interceptor - A {@link RequestInterceptor}
     */
    addRequestInterceptor(interceptor: RequestInterceptor): void;
    /**
     * Remove a request interceptor.
     *
     * @param interceptor - A {@link RequestInterceptor}
     */
    removeRequestInterceptor(interceptor: RequestInterceptor): void;
    /**
     *
     * Add a response interceptor.
     *
     * @param interceptor - A {@link ResponseInterceptor}
     */
    addResponseInterceptor(interceptor: ResponseInterceptor): void;
    /**
     * Remove a response interceptor.
     *
     * @param interceptor - A {@link ResponseInterceptor}
     */
    removeResponseInterceptor(interceptor: ResponseInterceptor): void;
}

/**
 * A Node-style asynchronous callback.
 *
 * After all asynchronous work is done, the callback *must* call `done`, optionally passing an error argument.
 *
 * @public
 */
export declare type NodeStyleVoidCallback = (done: (error?: any) => void) => void;

/**
 * Represents a non-linear ad in the VAST specification.
 *
 * @public
 */
export declare interface NonLinearAd extends Ad {
    /**
     * The alternative description for the ad.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    altText: string | undefined;
    /**
     * The website of the ad.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    clickThrough: string | undefined;
    /**
     * The HTML-string with the content of the ad.
     *
     * @remarks
     * <br/> - Available when the {@link Ad.readyState} is `'ready'`.
     */
    contentHTML: string | undefined;
}

/**
 * Fired when `ChromelessPlayer.paused` changes to `true`.
 *
 * @public
 */
export declare interface PauseEvent extends Event_2<'pause'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}

/**
 * Describes the configuration of the picture-in-picture feature.
 *
 * @public
 */
export declare interface PiPConfiguration {
    /**
     * The corner in which the player should be shown while in picture-in-picture.
     *
     * @defaultValue `'bottom-right'`
     */
    position?: PiPPosition;
    /**
     * The maximum percentage of the original player position that should be visible to enable picture-in-picture automatically.
     *
     * @remarks
     * <br/> - If not configured, picture-in-picture can only be activated by calling {@link Presentation.requestMode} with the `'picture-in-picture'` argument.
     *
     * @defaultValue `undefined`
     */
    visibility?: number | undefined;
    /**
     * Whether the presentation mode should be retained on source changes.
     *
     * @defaultValue `false`
     */
    retainPresentationModeOnSourceChange?: boolean;
}

/**
 * The picture-in-picture position, represented by a value from the following list:
 * <br/> - `'top-left'`
 * <br/> - `'top-right'`
 * <br/> - `'bottom-left'`
 * <br/> - `'bottom-right'`
 *
 * @public
 */
export declare type PiPPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * @public
 */
export declare interface PlayBackRateLabel {
    readonly playbackRate: number;
}

/**
 * The player API extended with UI functionality.
 *
 * @remarks
 * <br/> - Only available with the feature `'ui'`.
 *
 * @public
 */
export declare class Player extends ChromelessPlayer {
    constructor(element: HTMLElement, configuration?: UIPlayerConfiguration);
    /**
     * Whether the player controls are visible.
     */
    controls: boolean;
    /**
     * The Video.js player on which the UI is built.
     */
    readonly ui: videojs.Player;
    /**
     * The presentation mode of the player.
     *
     * @deprecated Superseded by {@link Presentation.currentMode} and {@link Presentation.requestMode}.
     *
     * @defaultValue `'inline'`
     */
    presentationMode?: PresentationMode;
    /**
     * The related content UI API.
     *
     * @remarks
     * <br/> - Only available with the feature `'relatedcontent'`.
     */
    readonly related?: UIRelatedContent;
    /**
     * The social sharing UI API.
     *
     * @remarks
     * <br/> - Only available with the feature `'social'`.
     */
    readonly social?: SocialSharing;
    /**
     * The up next UI API.
     *
     * @remarks
     * <br/> - Only available with the feature `'upnext'`.
     */
    readonly upnext?: UpNextManager;
}

/**
 * Describes a player's configuration.
 *
 * @public
 */
export declare interface PlayerConfiguration {
    
    /**
     * The directory in which the THEOplayer library worker files are located.
     * These worker files are theoplayer.d.js, theoplayer.e.js, theoplayer.p.js.
     *
     * @remarks
     * <br/> - This parameter is required when using a HLS source and has no default.
     *
     * @example
     * `'/lib/theoplayer/'`
     */
    libraryLocation?: string;
    /**
     * Whether THEOplayer will be used in an iframe.
     *
     * @defaultValue `false`
     */
    isEmbeddable?: boolean;
    /**
     * The muted autoplay policy.
     *
     * @remarks
     * <br/> - The muted autoplay policy is impacted by this property and {@link SourceConfiguration.mutedAutoplay}.
     *
     * @defaultValue `'none'`.
     */
    mutedAutoplay?: MutedAutoplayConfiguration;
    /**
     * Whether the native video element's fullscreen should be used whenever THEOplayer's fullscreen is unsupported.
     *
     * @remarks
     * <br/> - Available since 2.21.0.
     * <br/> - It should be considered for older Android devices and iOS.
     * <br/> - It is limited to the platform's controls, custom UI and interactions are not possible.
     * <br/> - Together with the Google IMA integration, media preloading is unavailable on iOS devices.
     * <br/> - Together with the Google IMA integration, the current time is set to the live point when returning to the content after an ad.
     *
     * @defaultValue `false`
     */
    allowNativeFullscreen?: boolean;
    /**
     * Whether mixed HTTP/HTTPS content is allowed.
     *
     * @remarks
     * <br/> - Available since 2.22.0.
     * <br/> - By default, the player assumes that it cannot load HTTP URLs when inside a HTTPS page because of {@link https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content | mixed content restrictions}. Therefore, the player will automatically convert HTTP URLs to HTTPS before loading them.
     * <br/> - When this option is set to true, the player may assume that mixed content is allowed on the current platform, and will not automatically convert HTTP URLs to HTTPS.
     *
     * @defaultValue `false`
     */
    allowMixedContent?: boolean;
    /**
     * Whether volume preferences will be persisted across player sessions.
     *
     * @remarks
     * Available since 2.27.0.
     *
     * @defaultValue `false`
     */
    persistVolume?: boolean;
    /**
     * The offset in seconds used to determine the live point.
     * This live point is the end of the manifest minus the provided offset.
     *
     * @remarks
     * <br/> - Available since v2.35.0.
     *
     * @defaultValue Three times the target duration of a segment, as specified by the manifest.
     */
    liveOffset?: number;
    /**
     * Whether date ranges will be parsed from HLS manifests.
     *
     * @remarks
     * Available since 2.61.
     *
     * @defaultValue `false`
     */
    hlsDateRange?: boolean;
    /**
     * The ads configuration for the player.
     */
    ads?: AdsConfiguration;
    /**
     * List of analytics configurations for the player.
     *
     * @remarks
     * Multiple integrations can be enabled at once.
     */
    analytics?: AnalyticsDescription[];
    /**
     * The cast configuration for the player.
     */
    cast?: CastConfiguration;
    /**
     * The Verizon Media configuration for the player.
     */
    verizonMedia?: VerizonMediaConfiguration;
    /**
     * Whether `playbackRate` is retained across sources. When `false`, `playbackRate` will be reset to 1 on each source change.
     * Defaults to `false`.
     */
    retainPlaybackRateOnSourceChange?: boolean;
    /**
     * The license for the player
     */
    license?: string;
    /**
     * The url to fetch the license for the player
     */
    licenseUrl?: string;
}

/**
 * The events fired by the {@link ChromelessPlayer}.
 *
 * @public
 */
export declare interface PlayerEventMap {
    /**
     * Fired when {@link ChromelessPlayer.source} changes.
     */
    sourcechange: SourceChangeEvent;
    /**
     * Fired when the current source, which is chosen from {@link SourceDescription.sources | ChromelessPlayer.source.sources}, changes.
     */
    currentsourcechange: CurrentSourceChangeEvent;
    /**
     * Fired when {@link ChromelessPlayer.paused} changes to `false`.
     *
     * @remarks
     * <br/> - Either fired after the play() method has returned, or when the {@link ChromelessPlayer.autoplay} attribute has caused playback to begin.
     */
    play: PlayEvent;
    /**
     * Fired when {@link ChromelessPlayer.paused} changes to `true`.
     *
     * @remarks
     * <br/> - Fired after the `pause()` method has returned.
     */
    pause: PauseEvent;
    /**
     * Fired when {@link ChromelessPlayer.seeking} changes to `true`, and the player has started seeking to a new position.
     */
    seeking: SeekingEvent;
    /**
     * Fired when {@link ChromelessPlayer.seeking} changes to `false` after the current playback position was changed.
     */
    seeked: SeekedEvent;
    /**
     * Fired when the current playback position changed as part of normal playback or in an especially interesting way, for example discontinuously.
     */
    timeupdate: TimeUpdateEvent;
    /**
     * Fired when playback has stopped because the end of the media resource was reached.
     */
    ended: EndedEvent;
    /**
     * Fired when playback is ready to start after having been paused or delayed due to lack of media data.
     */
    playing: PlayingEvent;
    /**
     * Fired when playback has stopped because the next frame is not available, but the player expects that frame to become available in due course.
     */
    waiting: WaitingEvent;
    /**
     * Fired when {@link ChromelessPlayer.readyState} changes.
     */
    readystatechange: ReadyStateChangeEvent;
    /**
     * Fired when the player determines the duration and dimensions of the media resource.
     *
     * @remarks
     * <br/> - See {@link https://html.spec.whatwg.org/multipage/media.html#mediaevents:dom-media-readystate | HTML media - network state events}.
     * <br/> - The {@link ChromelessPlayer.seekable | seekable range} should be available as soon as the {@link ChromelessPlayer.duration | duration} is known. However, certain browsers (e.g. Safari) do not make it available until the `loadeddata` event is fired.
     */
    loadedmetadata: LoadedMetadataEvent;
    /**
     * Fired when the player can render the media data at the current playback position for the first time.
     *
     * @remarks
     * <br/> - See {@link https://html.spec.whatwg.org/multipage/media.html#mediaevents:dom-media-readystate | HTML media - network state events}.
     */
    loadeddata: LoadedDataEvent;
    /**
     * Fired when the player can resume playback of the media data.
     *
     * @remarks
     * <br/> - In comparison to `canplaythrough`, the player estimates that if playback were to be started now, the media resource could not be rendered at the current playback rate up to its end without having to stop for further buffering of content.
     * <br/> - See {@link https://html.spec.whatwg.org/multipage/media.html#mediaevents:dom-media-readystate | HTML media - network state events}.
     */
    canplay: CanPlayEvent;
    /**
     * Fired when the player can resume playback of the media data and buffering is unlikely.
     *
     * @remarks
     * <br/> - In comparison to `canplay`, the player estimates that if playback were to be started now, the media resource could be rendered at the current playback rate all the way to its end without having to stop for further buffering.
     * <br/> - See {@link https://html.spec.whatwg.org/multipage/media.html#mediaevents:dom-media-readystate | HTML media - network state events}.
     */
    canplaythrough: CanPlayThroughEvent;
    /**
     * Fired when the player starts loading the manifest.
     *
     * @remarks
     * <br/> - See {@link https://html.spec.whatwg.org/multipage/media.html#mediaevents:dom-media-networkstate | HTML media - network state events}.
     */
    loadstart: Event_2<'loadstart'>;
    /**
     * Fired when the player loaded media data.
     *
     * @remarks
     * <br/> - For DASH streams, the event is fired every 350ms or for every byte received whichever is least frequent.
     * <br/> - See {@link https://html.spec.whatwg.org/multipage/media.html#mediaevents:dom-media-networkstate | HTML media - network state events}.
     */
    progress: ProgressEvent_2;
    /**
     * Fired when the player's source is cleared.
     *
     * @remarks
     * <br/> - See {@link https://html.spec.whatwg.org/multipage/media.html#mediaevents:dom-media-networkstate | HTML media - network state events}.
     */
    emptied: EmptiedEvent;
    /**
     * Fired when {@link ChromelessPlayer.duration} changes.
     *
     * @remarks
     * <br/> - Fired after {@link ChromelessPlayer.readyState} has loaded metadata, or when the last segment is appended and there is a mismatch with the original duration.
     */
    durationchange: DurationChangeEvent;
    /**
     * Fired when {@link ChromelessPlayer.volume} changes.
     */
    volumechange: VolumeChangeEvent;
    /**
     * Fired when the current representation changes.
     */
    representationchange: RepresentationChangeEvent;
    /**
     * Fired when {@link ChromelessPlayer.playbackRate} changes.
     */
    ratechange: RateChangeEvent;
    /**
     * Fired when the dimensions of the HTML element changes.
     *
     * @remarks
     * <br/> - See {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect | Element.getBoundingClientRect()}.
     */
    dimensionchange: DimensionChangeEvent;
    /**
     * Fired when either {@link ChromelessPlayer.videoWidth} or {@link ChromelessPlayer.videoHeight} changes.
     */
    resize: Event_2<'resize'>;
    /**
     * Fired when the manifest is updated.
     */
    manifestupdate: Event_2<'manifestupdate'>;
    /**
     * Fired when a segment can not be found.
     *
     * @remarks
     * <br/> - Only fired on DASH streams.
     */
    segmentnotfound: Event_2<'segmentnotfound'>;
    /**
     * Fired when the player encounters key system initialization data in the media data.
     *
     * @remarks
     * <br/> - See {@link https://www.w3.org/TR/encrypted-media/#dom-evt-encrypted | Encrypted Media Extensions}.
     */
    encrypted: EncryptedEvent;
    /**
     * Fired when the key is usable for decryption.
     *
     * @remarks
     * <br/> - A key is `usable` if the CDM is certain the key can decrypt one or more blocks of media data.
     * <br/> - See {@link https://www.w3.org/TR/encrypted-media/#usable-for-decryption | Encrypted Media Extension - usable for decryption}.
     */
    contentprotectionsuccess: Event_2<'contentprotectionsuccess'>;
    /**
     * Fired when an error related to content protection occurs.
     */
    contentprotectionerror: ContentProtectionErrorEvent;
    /**
     * Fired when an {@link ChromelessPlayer.error | error} occurs.
     */
    error: ErrorEvent_2;
    /**
     * Fired when the the player is destroyed.
     *
     * @remarks
     * <br/> - Available since v2.33.3.
     */
    destroy: Event_2<'destroy'>;
}

/**
 * List of players.
 *
 * @public
 */
export declare interface PlayerList extends Array<ChromelessPlayer> {
    /**
     * Length of the list.
     */
    length: number;
    [index: number]: ChromelessPlayer;
    /**
     * Return the player with corresponding UID, if any.
     *
     * @param UID - The UID of the requested player.
     * @returns The player with the given `UID`, if any.
     */
    getPlayerByUID(UID: number): ChromelessPlayer | undefined;
}

/**
 * List of players.
 *
 * @public
 */
export declare const players: PlayerList;

/**
 * The player suite version of the THEOplayer SDK.
 *
 * @public
 */
export declare const playerSuiteVersion: string;

/**
 * Fired when `ChromelessPlayer.paused` changes to `false`.
 *
 * @public
 */
export declare interface PlayEvent extends Event_2<'play'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}

/**
 * Fired when playback is ready to start after having been paused or delayed due to lack of media data.
 *
 * @public
 */
export declare interface PlayingEvent extends Event_2<'playing'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}

/**
 * Describes the PlayReady key system configuration.
 *
 * @public
 */
export declare interface PlayReadyKeySystemConfiguration extends KeySystemConfiguration {
    /**
     * Custom data which will be passed to the CDM.
     */
    customData?: string;
}

/**
 * The preload type of the player, represented by a value from the following list:
 * <br/> - `'none'`: The player will not load anything on source change.
 * <br/> - `'metadata'`: The player will immediately load metadata on source change.
 * <br/> - `'auto'`: The player will immediately load metadata and media on source change.
 *
 * @remarks
 * <br/> - `'metadata'` loads enough resources to be able determine the {@link ChromelessPlayer.duration}.
 * <br/> - `'auto'` loads media up to {@link ABRConfiguration.targetBuffer}.
 *
 * @public
 */
export declare type PreloadType = 'none' | 'metadata' | 'auto' | '';

/**
 * The presentation API.
 *
 * @public
 */
export declare interface Presentation extends EventDispatcher<PresentationEventMap> {
    /**
     * The active presentation mode of the player.
     *
     * @defaultValue `'inline'`
     */
    readonly currentMode: PresentationMode;
    /**
     * Change the presentation mode of the player.
     *
     * @param mode - The requested presentation mode.
     */
    requestMode(mode: PresentationMode): void;
    /**
     * Whether the player supports the provided presentation mode.
     *
     * @param mode - The presentation mode to verify.
     * @returns Whether the player supports `mode`.
     */
    supportsMode(mode: PresentationMode): boolean;
}

/**
 * The events fired by the {@link Presentation | presentation API}.
 *
 * @public
 */
export declare interface PresentationEventMap {
    /**
     * {@inheritDoc PresentationModeChangeEvent}
     */
    presentationmodechange: PresentationModeChangeEvent;
    /**
     * {@inheritDoc ErrorEvent}
     */
    error: ErrorEvent_2;
}

/**
 * The presentation mode of the player, represented by a value from the following list:
 * <br/> - `'inline'`: The player is shown in its original location on the page.
 * <br/> - `'fullscreen'`: The player fills the entire screen.
 * <br/> - `'picture-in-picture'`: The player is shown on top of the page (see {@link PiPConfiguration} for more options).
 *
 * @public
 */
export declare type PresentationMode = 'inline' | 'fullscreen' | 'picture-in-picture';

/**
 * Fired when the presentation mode changes.
 *
 * @public
 */
export declare interface PresentationModeChangeEvent extends Event_2<'presentationmodechange'> {
    /**
     * The new presentation mode.
     */
    readonly presentationMode: PresentationMode;
}

/**
 * Fired when the player loaded media data.
 *
 * @public
 */
declare interface ProgressEvent_2 extends Event_2<'progress'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}
export { ProgressEvent_2 as ProgressEvent }

/**
 * Represents a quality of a media track.
 *
 * @public
 */
export declare interface Quality extends EventDispatcher<QualityEventMap> {
    /**
     * The average bandwidth of the quality.
     */
    readonly averageBandwidth?: number;
    /**
     * The required bandwidth for the quality.
     */
    readonly bandwidth: number;
    /**
     * The codecs of the quality.
     *
     * @remarks
     * <br/> - These are represented as a string containing the codecs as defined by the manifest.
     */
    readonly codecs: string;
    /**
     * The identifier for this quality.
     */
    readonly id: number;
    /**
     * The name of the quality.
     */
    readonly name: string;
    /**
     * The label of the quality.
     */
    label: string;
    /**
     * Whether the quality is available.
     *
     * @remarks
     * <br/> - A quality can be unavailable due to a DRM restriction (e.g. HDCP).
     */
    readonly available: boolean;
}

/**
 * @public
 */
export declare interface QualityChangeMetric extends Metric {
    labelData: ReasonLabel;
}

/**
 * @public
 */
export declare type QualityChangeReason = 'automatic' | 'manual';

/**
 * An quality-related event fired by a {@link MediaTrack}.
 *
 * @public
 */
export declare interface QualityEvent<TType extends string> extends Event_2<TType> {
    /**
     * The quality.
     */
    readonly quality: Quality;
}

/**
 * The events fired by a {@link Quality}.
 *
 * @public
 */
export declare interface QualityEventMap {
    /**
     * {@inheritDoc UpdateQualityEvent}
     */
    update: UpdateQualityEvent;
}

/**
 * List of qualities.
 *
 * @public
 */
export declare interface QualityList extends Array<Quality> {
    /**
     * Index signature to get the quality at the requested index in the list.
     */
    [index: number]: Quality;
    /**
     * Return the quality at the requested index in the list.
     *
     * @param index - A `number` representing the index of a quality in the list.
     * @returns The quality with index `index` in the list.
     */
    item(index: number): Quality;
}

/**
 * Fired when `ChromelessPlayer.playbackRate` changes.
 *
 * @public
 */
export declare interface RateChangeEvent extends Event_2<'ratechange'> {
    /**
     * The player's new playback rate.
     */
    readonly playbackRate: number;
}

/**
 * Fired when `ChromelessPlayer.readyState` changes.
 *
 * @public
 */
export declare interface ReadyStateChangeEvent extends Event_2<'readystatechange'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
    /**
     * The player's new ready state.
     */
    readonly readyState: number;
}

/**
 * @public
 */
export declare interface ReasonLabel extends MetricLabel {
    reason: QualityChangeReason;
}

/**
 * Register a content protection integration
 *
 * @param integrationId - An id of the integration. The {@link ContentProtectionIntegrationFactory} will be used when the
 * {@link DRMConfiguration.integration} property of the source is set to this id.
 * @param keySystem - The {@link KeySystemId} for which the {@link ContentProtectionIntegrationFactory} should be used.
 * @param integrationFactory - Factory that will construct a {@link ContentProtectionIntegration}.
 *
 * @remarks
 * This function allows for registering a {@link ContentProtectionIntegrationFactory} for a specific integrationId and keySystem. If a source is
 * set with the {@link DRMConfiguration.integration} property set to this id, on a platform where the player will use the keySystem that corresponds
 * with the given {@link KeySystemId}, this {@link ContentProtectionIntegrationFactory} will be used to construct a
 * {@link ContentProtectionIntegration} based on the {@link DRMConfiguration}. This {@link ContentProtectionIntegration} allows for altering license
 * and certificate requests and responses.
 *
 * @public
 */
export declare function registerContentProtectionIntegration(integrationId: string, keySystem: KeySystemId, integrationFactory: ContentProtectionIntegrationFactory): void;

/**
 * Fired when {@link RelatedContent.sources} changes.
 *
 * @public
 */
export declare type RelatedChangeEvent = Event_2<'relatedchange'>;

/**
 * The related content API.
 *
 * @remarks
 * <br/> - Available since v2.14.2.
 *
 * @public
 */
export declare interface RelatedContent extends EventDispatcher<RelatedContentEventMap> {
    /**
     * List of related content sources.
     */
    sources: RelatedContentSource[];
}

/**
 * The events fired by the {@link RelatedContent | related content API}.
 *
 * @public
 */
export declare interface RelatedContentEventMap {
    /**
     * {@inheritDoc RelatedChangeEvent}
     */
    relatedchange: RelatedChangeEvent;
}

/**
 * Represents a related content source.
 *
 * @remarks
 * <br/> - Available since v2.14.2.
 *
 * @public
 */
export declare interface RelatedContentSource {
    /**
     * The duration of the related content source.
     */
    duration?: string;
    /**
     * The image of the related content source.
     */
    image: string;
    /**
     * The target URL for the related content source.
     *
     * @remarks
     * <br/> - Mutually exclusive with {@link RelatedContentSource.source}.
     * <br/> - Required if {@link RelatedContentSource.source} is not present.
     */
    link?: string;
    /**
     * The source description of the related content source.
     *
     * @remarks
     * <br/> - Mutually exclusive with {@link RelatedContentSource.link}.
     * <br/> - Required if {@link RelatedContentSource.link} is not present.
     */
    source?: SourceDescription;
    /**
     * The title of the related content source.
     */
    title?: string;
}

/**
 * Fired when the related content panel is hidden.
 *
 * @public
 */
export declare type RelatedHideEvent = Event_2<'hide'>;

/**
 * Fired when the related content panel is shown.
 *
 * @public
 */
export declare type RelatedShowEvent = Event_2<'show'>;

/**
 * Fired when a caching task is removed.
 *
 * @public
 */
export declare interface RemoveCachingTaskEvent extends Event_2<'removetask'> {
    /**
     * The task which has been removed.
     */
    readonly task: CachingTask;
}

/**
 * Represents a DASH representation.
 *
 * @public
 */
export declare interface Representation {
    /**
     * The identifier for the representation.
     */
    id: string;
    /**
     * The type of the representation, represented by a value from the following list:
     * <br/> - `'audio'`
     * <br/> - `'video'`
     * <br/> - `'text'`
     * <br/> - `'image'`
     * <br/> - `'unknown'`
     */
    type: string;
    /**
     * The required bandwidth for the representation, in bits per second.
     */
    bandwidth: number;
    /**
     * The video height of the representation, in pixels.
     */
    height: number;
    /**
     * The video width of the representation, in pixels.
     */
    width: number;
    /**
     * The framerate of the representation, in frames per seconds.
     */
    frameRate: number;
    /**
     * The audio sampling rate of the representation, in Hertz.
     *
     * @remarks
     * <br/> - Either a single value or a list of two values corresponding to the minimum and maximum sampling rate.
     */
    audioSamplingRate: number | [number, number];
}

/**
 * Fired when the current representation changes.
 *
 * @public
 */
export declare interface RepresentationChangeEvent extends Event_2<'representationchange'> {
    /**
     * The player's current representation.
     */
    readonly representation: Representation | undefined;
    /**
     * The player's previous representation.
     */
    readonly previousRepresentation: Representation | undefined;
}

/**
 * Represents an HTTP request.
 *
 * @public
 */
declare interface Request_2 {
    /**
     * The request's URL.
     */
    readonly url: string;
    /**
     * The request's HTTP method.
     */
    readonly method: RequestMethod;
    /**
     * The request's HTTP headers.
     */
    readonly headers: HTTPHeaders;
    /**
     * The request's body.
     */
    readonly body: RequestBody;
    /**
     * Whether the player is allowed to use credentials for cross-origin requests.
     */
    readonly useCredentials: boolean;
    /**
     * The request's type.
     */
    readonly type: RequestType;
    /**
     * The request's subtype.
     */
    readonly subType: RequestSubType;
    /**
     * The request's media type.
     */
    readonly mediaType: MediaType;
    /**
     * The request's response type.
     */
    readonly responseType: ResponseType_2;
}
export { Request_2 as Request }

/**
 * The possible types of an HTTP request body.
 *
 * @public
 */
export declare type RequestBody = ArrayBuffer | ArrayBufferView | string | null;

/**
 * Contains network request properties used to modify an HTTP request.
 *
 * @public
 */
declare interface RequestInit_2 {
    /**
     * The request's URL.
     *
     * @defaultValue The original request's URL.
     */
    url?: string;
    /**
     * The request's HTTP method.
     *
     * @defaultValue The original request's HTTP method.
     */
    method?: RequestMethod;
    /**
     * The request's HTTP headers.
     *
     * @defaultValue The original request's HTTP headers.
     */
    headers?: HTTPHeaders;
    /**
     * The request's body.
     *
     * @defaultValue The original request's body.
     */
    body?: RequestBody;
    /**
     * Whether the player is allowed to use credentials for cross-origin requests.
     *
     * @remarks
     * <br/> - Credentials are cookies, authorization headers or TLS client certificates.
     *
     * @defaultValue The original request's `useCredentials` value.
     */
    useCredentials?: boolean;
    /**
     * The request's type.
     *
     * @defaultValue The original request's type.
     */
    type?: RequestType;
    /**
     * The request's subtype.
     *
     * @defaultValue The original request's subtype.
     */
    subType?: RequestSubType;
    /**
     * The request's media type.
     *
     * @defaultValue The original request's media type.
     */
    mediaType?: MediaType;
    /**
     * The request's response type.
     *
     * @defaultValue The original request's response type.
     */
    responseType?: ResponseType_2;
}
export { RequestInit_2 as RequestInit }

/**
 * The RequestInterceptor is a function that accepts a Request object as its argument and can return a promise. If it returns a promise then the request waits until the promise is resolved.
 *
 * @public
 */
export declare type RequestInterceptor = (request: InterceptableRequest) => void | PromiseLike<void>;

/**
 * The possible types representing an HTTP request.
 *
 * @public
 */
export declare type RequestLike = string | RequestInit_2;

/**
 * Measures network metrics of an HTTP request and the associated HTTP response.
 *
 * @public
 */
export declare interface RequestMeasurer {
    /**
     * Marks the start time in milliseconds of a new HTTP request.
     * This method should only be called once.
     *
     * @param timestamp - The start time in milliseconds.
     */
    markRequestStart(timestamp: number): void;
    /**
     * Marks the start time in milliseconds of the HTTP response of the HTTP request.
     * This is the time at which the first byte of the HTTP response is received.
     * This method should only be called once and after `markRequestStart` has been called.
     *
     * @param timestamp - The start time in milliseconds.
     */
    markResponseStart(timestamp: number): void;
    /**
     * Marks the time in milliseconds at which new data is received as part of the current HTTP response.
     * This method should only be called after `markResponseStart` has been called.
     *
     * @param timestamp - The data reception time in milliseconds.
     * @param data - the Uint8Array of the received bytes.
     */
    markResponseData(timestamp: number, data: Uint8Array): void;
    /**
     * Marks the end time in milliseconds of the HTTP response.
     * This methods should only be called once after `markResponseStart` or `markResponseData`.
     *
     * @param timestamp - The end time in milliseconds.
     */
    markResponseEnd(timestamp: number): void;
}

/**
 * The request's type, represented by a value from the following list:
 * <br/> - `'GET'`
 * <br/> - `'HEAD'`
 * <br/> - `'POST'`
 * <br/> - `'PUT'`
 * <br/> - `'DELETE'`
 * <br/> - `'OPTIONS'`
 *
 * @public
 */
export declare type RequestMethod = 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT';

/**
 * The request's subtype, represented by a value from the following list:
 * <br/> - `'initialization-segment'`
 * <br/> - Any value of {@link ContentProtectionRequestSubType}
 *
 * @public
 */
export declare type RequestSubType = '' | 'initialization-segment' | ContentProtectionRequestSubType;

/**
 * The request's type, represented by a value from the following list:
 * <br/> - `'manifest'`
 * <br/> - `'segment'`
 * <br/> - `'content-protection'`
 *
 * @public
 */
export declare type RequestType = '' | 'manifest' | 'segment' | 'content-protection';

/**
 * The possible types of an HTTP response body.
 *
 * @public
 */
export declare type ResponseBody = ArrayBuffer | object | string | null;

/**
 * Contains network response properties used to modify an HTTP response.
 *
 * @public
 */
declare interface ResponseInit_2 {
    /**
     * The response's URL.
     *
     * @defaultValue The original response's URL.
     */
    url?: string;
    /**
     * The response's status code.
     *
     * @defaultValue The original response's status code.
     */
    status?: number;
    /**
     * The response's status text.
     *
     * @defaultValue The original response's status text.
     */
    statusText?: string;
    /**
     * The response's HTTP headers.
     *
     * @defaultValue The original response's HTTP headers.
     */
    headers?: HTTPHeaders;
    /**
     * The response's body.
     *
     * @defaultValue The original response's body.
     */
    body?: ResponseBody;
}
export { ResponseInit_2 as ResponseInit }

/**
 * The ResponseInterceptor is a function that accepts a Response object as its argument and can return a promise. If it returns a promise then the response waits until the promise is resolved.
 *
 * @public
 */
export declare type ResponseInterceptor = (response: InterceptableResponse) => void | PromiseLike<void>;

/**
 * The possible types representing an HTTP response.
 *
 * @public
 */
export declare type ResponseLike = ResponseInit_2;

/**
 * The response's type, represented by a value from the following list:
 * <br/> - `'arraybuffer'`
 * <br/> - `'json'`
 * <br/> - `'stream'`
 * <br/> - `'text'`
 *
 * @public
 */
declare type ResponseType_2 = 'arraybuffer' | 'json' | 'stream' | 'text';
export { ResponseType_2 as ResponseType }

/**
 * The strategy for period switches (see {@link DashPlaybackConfiguration.useSeamlessPeriodSwitch}), represented by a value from the following list:
 * <br/> - `'auto'`: The player uses seamless switches if the platform supports it, and hard switches otherwise.
 *                   This is the default.
 * <br/> - `'never'`: The player never uses a seamless switch, and always uses a hard switch.
 *                    Use this if you notice that the player is attempting but failing to preload the next period on the current platform.
 * <br/> - `'always'`: The player always uses a seamless switch, and never uses a hard switch.
 *                     Use this if you notice that the player never preloads the next period, even though you know that the current platform
 *                     should support it.
 *
 * @public
 */
export declare type SeamlessPeriodSwitchStrategy = 'auto' | 'always' | 'never';

/**
 * Fired when `ChromelessPlayer.seeking` changes to `false` after the current playback position was changed.
 *
 * @public
 */
export declare interface SeekedEvent extends Event_2<'seeked'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}

/**
 * Fired when `ChromelessPlayer.seeking` changes to `true`, and the player has started seeking to a new position.
 *
 * @public
 */
export declare interface SeekingEvent extends Event_2<'seeking'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}

/**
 * @public
 */
export declare type SeekReason = 'user' | 'golive' | 'init';

/**
 * @public
 */
export declare interface SegmentReceiveIntervalData {
    time: number;
    mediaType: HespMediaType;
}

/**
 * Represents a configuration for server-side ad insertion (SSAI).
 *
 * @remarks
 * <br/> - Available since v2.12.0.
 *
 * @public
 */
export declare interface ServerSideAdInsertionConfiguration {
    /**
     * The identifier for the SSAI integration.
     */
    integration: SSAIIntegrationId;
}

/**
 * The strategy of the action after skipping ads, represented by a value from the following list:
 * <br/> - `'play-all'`: Plays all the ad breaks skipped due to a seek.
 * <br/> - `'play-none'`: Plays none of the ad breaks skipped due to a seek.
 * <br/> - `'play-last'`: Plays the last ad break skipped due to a seek.
 *
 * @public
 */
export declare type SkippedAdStrategy = 'play-all' | 'play-none' | 'play-last';

/**
 * Describes the configuration of the Media Melon SmartSight integration.
 *
 * @remarks
 * <br/> - Available since v2.33.2.
 *
 * @public
 */
export declare interface SmartSightConfiguration extends AnalyticsDescription, MediaMelonConfiguration {
    /**
     * {@inheritDoc AnalyticsDescription.integration}
     */
    integration: SmartSightIntegrationID;
}

/**
 * The identifier of the Media Melon SmartSight integration.
 *
 * @public
 */
export declare type SmartSightIntegrationID = 'smartsight';

/**
 * The social sharing API which can supplement the UI with a social sharing panel.
 *
 * @remarks
 * <br/> - Available since v2.14.5.
 *
 * @public
 */
export declare interface SocialSharing {
    /**
     * Whether the social sharing panel is showing.
     */
    showing: boolean;
    /**
     * List of social sharing items which can be shown.
     */
    items: SocialSharingItem[];
    /**
     * The URL that will be shared.
     */
    url: string;
    /**
     * Show the social sharing panel.
     */
    show(): void;
    /**
     * Hide the social sharing panel.
     */
    hide(): void;
}

/**
 * Represents a social media to which the player can share content.
 *
 * @remarks
 * <br/> - Available since v2.14.5.
 *
 * @public
 */
export declare interface SocialSharingItem {
    /**
     * The icon which is displayed as a clickable sharing option.
     *
     * @remarks
     * <br/> - It cannot be combined with {@link SocialSharingItem.text}.
     */
    icon?: string;
    /**
     * The label of the clickable sharing option.
     *
     * @remarks
     * <br/> - For example, to add the title.
     */
    label?: string;
    /**
     * The URL that will be shared.
     *
     * @remarks
     * <br/> - Overrides {@link SocialSharing.url}.
     * <br/> - This can also be a string with the `<URL>` token. The token will be replaced by {@link SocialSharing.url}.
     * <br/> - It can not be combined with {@link SocialSharingItem.text}.
     *
     * @defaultValue {@link SocialSharing.url} if present, else `location.href`.
     */
    src: string;
    /**
     * The text which is displayed as a clickable sharing option.
     *
     * @remarks
     * <br/> - For example, to add embed codes.
     * <br/> - It cannot be combined with {@link SocialSharingItem.icon} or {@link SocialSharingItem.src}.
     */
    text?: string;
}

/**
 * Represents a media resource.
 *
 * @remarks
 * <br/> - Can be a string value representing the URL of a media resource, a {@link TypedSource} or a {@link VerizonMediaSource}.
 *
 * @public
 */
export declare type Source = string | TypedSource | VerizonMediaSource;

/**
 * Fired when `ChromelessPlayer.source` changes.
 *
 * @public
 */
export declare interface SourceChangeEvent extends Event_2<'sourcechange'> {
    /**
     * The player's new source.
     */
    readonly source: SourceDescription | undefined;
}

/**
 * Describes the configuration of a player's source.
 *
 * @public
 */
export declare interface SourceConfiguration {
    /**
     * List of {@link AdDescription}s to be queued for playback.
     */
    ads?: AdDescription[];
    /**
     * Whether the player should be blocked when an ad-related error occurs.
     *
     * @remarks
     * <br/> - A blocked player is not usable anymore. This has the same effect as invoking {@link ChromelessPlayer.destroy}.
     *
     * @defaultValue `false`
     */
    blockContentIfAdError?: boolean;
    /**
     * Content protection configuration.
     */
    contentProtection?: DRMConfiguration;
    /**
     * {@inheritDoc SourceConfiguration.contentProtection}
     * @deprecated Superseded by {@link SourceConfiguration.contentProtection}.
     */
    drm?: DRMConfiguration;
    /**
     * The poster of the media source.
     *
     * @remarks
     * <br/> - An empty string (`''`) clears the current poster.
     * <br/> - This poster has priority over {@link ChromelessPlayer.poster}.
     */
    poster?: string;
    /**
     * List of text tracks to be side-loaded with the media source.
     *
     * @remarks
     * <br/> - A source change will reset side-loaded text tracks.
     */
    textTracks?: TextTrackDescription[];
    /**
     * Virtual reality configuration.
     */
    vr?: VRConfiguration;
    /**
     * List of {@link AnalyticsDescription}s to configure analytics integrations for the media source.
     */
    analytics?: AnalyticsDescription[];
    /**
     * The muted autoplay policy.
     *
     * @remarks
     * <br/> - The muted autoplay policy is impacted by this property and {@link PlayerConfiguration.mutedAutoplay}.
     *
     * @defaultValue `'none'`
     */
    mutedAutoplay?: MutedAutoplayConfiguration;
    /**
     * The URL of a time server used by the player to synchronise the time in DASH sources.
     *
     * @remarks
     * <br/> - The time server should return time in ISO-8601 format.
     * <br/> - Overrides the time server provided the DASH manifest's `<UTCTiming>`.
     * <br/> - All sources will use the time server. Alternatively, for one source use {@link BaseSource.timeServer}.
     */
    timeServer?: string;
    /**
     * Chromecast metadata configuration.
     *
     * @remarks
     * <br/> - Available since v2.21.0.
     */
    metadata?: ChromecastMetadataDescription;
    /**
     * Whether segments in a HLS manifest should be represented by cues in a metadata text track.
     *
     * @deprecated Do not use this feature without consulting THEO Technologies.
     */
    manifestMetadataTrack?: boolean;
}

/**
 * Describes the configuration of a player's source.
 *
 * @public
 */
export declare interface SourceDescription extends SourceConfiguration {
    /**
     * One or more media resources for playback.
     *
     * @remarks
     * <br/> - Multiple media sources should be used to increase platform compatibility. See examples below for important use cases.
     * <br/> - The player will try each source in the provided order.
     *
     * @example
     * In this example, the player will first try to play the DASH source.
     * This might fail if the browser does not support the {@link https://www.widevine.com/ | Widevine} or {@link https://www.microsoft.com/playready/ | PlayReady} CDM, for example on Safari.
     * In that case, the player will try to play the HLS source instead.
     *
     * ```
     * [{
     *   src: 'dash-source-with-drm.mpd'
     *   contentProtection: {
     *     widevine: {
     *       licenseAcquisitionURL: 'https://license.company.com/wv'
     *     },
     *     playready: {
     *       licenseAcquisitionURL: 'https://license.company.com/pr'
     *     }
     *   }
     * },{
     *   src: 'hls-source-with-drm.m3u8',
     *   contentProtection: {
     *     fairplay: {
     *       certificateURL: 'https://license.company.com/fp'
     *     }
     *   }
     * }]
     * ```
     *
     * @example
     * In this example, the player will first try to play the DASH source.
     * This might fail if the browser does not support the {@link https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API | Media Source Extensions API}.
     * In that case, the player will try to play the MP4 source instead, though without features such as adaptive bitrate switching.
     *
     * ```
     * [{
     *   src: 'source.mpd'
     * },{
     *   src: 'source.mp4'
     * }]
     * ```
     */
    sources?: Sources;
}

/**
 * The integration identifier of a source specific to a pre-integration, represented by a value from the following list:
 * <br/> - `'verizon-media'`: The source is a {@link VerizonMediaSource}
 *
 * @public
 */
export declare type SourceIntegrationId = 'verizon-media';

/**
 * A media resource or list of media resources.
 *
 * @remarks
 * <br/> - The order of sources when using a list determines their priority when attempting playback.
 *
 * @public
 */
export declare type Sources = Source | Source[];

/**
 * Describes a SpotX ad break request.
 *
 * @remarks
 * <br/> - Available since v2.13.0.
 *
 * @example
 * ```
 * {
 *     integration: 'spotx',
 *     id: 123456,
 *     cacheBuster: true,
 *     app: {
 *         bundle: 'com.exampleapps.example',
 *         name: 'My CTV App'
 *     },
 *     device: {
 *         ifa: '38400000-8cf0-11bd-b23e-10b96e40000d',
 *         ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
 *         geo: {
 *             lat: -24.378528,
 *             lon: -128.325119
 *         },
 *         dnt: 1,
 *         lmt: 1,
 *     },
 *     custom: {
 *         category: ['category1', 'category2'],
 *         somekey: 'somevalue'
 *     }
 *     user: {
 *         yob: 1984,
 *         gender: 'm'
 *     }
 * }
 * ```
 *
 * @public
 */
export declare interface SpotXAdDescription extends AdDescription {
    /**
     * The identifier of the ad break requested from SpotX.
     */
    id: number | string;
    /**
     * The maximum duration of the ad, in seconds.
     *
     * @defaultValue No maximum duration.
     */
    maximumAdDuration?: number | string;
    /**
     * The URL of the content page.
     */
    contentPageUrl?: string;
    /**
     * The IP address of the viewer.
     */
    ipAddress?: string;
    /**
     * Whether the ad break request should contain a cache buster.
     *
     * @remarks
     * <br/> - A cache buster adds a query parameter 'cb' with a random value to circumvent browser caching mechanisms.
     */
    cacheBuster?: boolean;
    /**
     * A source URL which contains the location of ad resources to be scheduled.
     *
     * @remarks
     * <br/> - This will override the generated URL.
     */
    sources?: string;
    /**
     * A record of query string parameters added to the SpotX ad break request.
     * Each entry contains the parameter name with associated value.
     *
     * @remarks
     * <br/> - Available since v2.38.0.
     */
    queryParameters?: SpotxQueryParameter;
    /**
     * Custom SpotX data.
     *
     * @deprecated Superseded by {@link SpotXAdDescription.queryParameters | queryParameters.custom}.
     */
    custom?: SpotxData;
    /**
     * Application specific SpotX data.
     *
     * @deprecated Superseded by {@link SpotXAdDescription.queryParameters | queryParameters.app}.
     */
    app?: SpotxData;
    /**
     * Device specific SpotX data.
     *
     * @deprecated Superseded by {@link SpotXAdDescription.queryParameters | queryParameters.device}.
     */
    device?: SpotxData;
    /**
     * User specific SpotX data.
     *
     * @deprecated Superseded by {@link SpotXAdDescription.queryParameters | queryParameters.user}.
     */
    user?: SpotxData;
}

/**
 * A record of SpotX query string parameters.
 * Each entry contains the parameter name with associated value.
 *
 * @public
 */
export declare interface SpotxData {
    [key: string]: string | number | boolean | string[] | Geo;
}

/**
 * A record of SpotX query string parameters which can be a nested structure.
 * Each entry contains the parameter name with associated value.
 *
 * @public
 */
export declare interface SpotxQueryParameter {
    [key: string]: string | number | boolean | string[] | Geo | SpotxData | SpotxData[];
}

/**
 * The identifier of a server-side ad insertion pre-integration, represented by a value from the following list:
 * <br/> - `'yospace'`: The configuration with this identifier is a {@link YospaceServerSideAdInsertionConfiguration}
 * <br/> - `'google-dai'`: The configuration with this identifier is a {@link GoogleDAIConfiguration}
 * <br/> - `'imagine'`: The configuration with this identifier is a {@link ImagineServerSideAdInsertionConfiguration}
 *
 * @public
 */
export declare type SSAIIntegrationId = YospaceSSAIIntegrationID | GoogleDAISSAIIntegrationID | ImagineSSAIIntegrationID;

/**
 * Fired when the {@link VR.state} changes.
 *
 * @public
 */
export declare type StateChangeEvent = Event_2<'statechange'>;

/**
 * Fired when the {@link VR.stereo} changes.
 *
 * @public
 */
export declare type StereoChangeEvent = Event_2<'stereochange'>;

/**
 * @public
 */
export declare interface StreamLabeledMetric extends Metric {
    readonly labelData: BaseUriLabel;
}

/**
 * The identifier of the Stream One integration.
 *
 * @public
 */
export declare type StreamOneAnalyticsIntegrationID = 'streamone';

/**
 * Describes the configuration of the Stream One integration.
 *
 * @remarks
 * <br/> - Available since v2.32.0.
 *
 * @public
 */
export declare interface StreamOneConfiguration extends AnalyticsDescription {
    /**
     * {@inheritDoc AnalyticsDescription.integration}
     */
    integration: StreamOneAnalyticsIntegrationID;
    /**
     * The identifier of the StreamOne account.
     */
    accountID: string;
    /**
     * The identifier of the StreamOne content item.
     */
    itemID: string;
    /**
     * The title of the StreamOne content item.
     */
    itemTitle: string;
}

/**
 * Helper type to extract string keys from type objects.
 *
 * @public
 */
export declare type StringKeyOf<T> = Extract<keyof T, string>;

/**
 * Record of style properties.
 * Each entry contains the style property name with associated value.
 *
 * @public
 */
export declare type StylePropertyRecord = Record<string, string>;

/**
 * Fired when the media track's {@link MediaTrack.targetQuality | target quality} changes.
 *
 * @public
 */
export declare interface TargetQualityChangedEvent extends Event_2<'targetqualitychanged'> {
    /**
     * The new target quality.
     */
    readonly quality: Quality | undefined;
    /**
     * The new target qualities.
     */
    readonly qualities: Quality[];
}

/**
 * Represents a text track of a media resource.
 *
 * @public
 */
declare interface TextTrack_2 extends Track, EventDispatcher<TextTrackEventMap_2> {
    /**
     * The kind of the text track, represented by a value from the following list:
     * <br/> - `'subtitles'`: The track contains subtitles.
     * <br/> - `'captions'`: The track contains closed captions, a translation of dialogue and sound effects.
     * <br/> - `'descriptions'`: The track contains descriptions, a textual description of the video.
     * <br/> - `'chapters'`: The track contains chapter titles.
     * <br/> - `'metadata'`: The track contains metadata. This track will not serve display purposes.
     */
    readonly kind: string;
    /**
     * The label of the text track.
     */
    label: string;
    /**
     * The language of the text track.
     */
    readonly language: string;
    /**
     * The identifier of the text track.
     *
     * @remarks
     * <br/> - This identifier can be used to distinguish between related tracks, e.g. tracks in the same list.
     */
    readonly id: string;
    /**
     * A unique identifier of the text track.
     *
     * @remarks
     * <br/> - This identifier is unique across tracks of a THEOplayer instance and can be used to distinguish between tracks.
     * <br/> - This identifier is a randomly generated number.
     */
    readonly uid: number;
    /**
     * The in-band metadata track dispatch type of the text track.
     */
    readonly inBandMetadataTrackDispatchType: string;
    /**
     * The mode of the text track, represented by a value from the following list:
     * <br/> - `'disabled'`: The track is disabled.
     * <br/> - `'hidden'`: The track is hidden.
     * <br/> - `'showing'`: The track is showing.
     *
     * @remarks
     * <br/> - A disabled track is not displayed and exposes no active cues, nor fires cue events.
     * <br/> - A hidden track is not displayed but exposes active cues and fires cue events.
     * <br/> - A showing track is displayed, exposes active cues and fires cue events.
     */
    mode: string;
    /**
     * The ready state of the text track.
     */
    readonly readyState: TextTrackReadyState;
    /**
     * The content type of the text track.
     */
    readonly type: TextTrackType;
    /**
     * The list of cues of the track.
     *
     * @remarks
     * <br/> - If the {@link TextTrack.mode} is `'disabled'`, this property is `null`.
     */
    readonly cues: TextTrackCueList_2 | null;
    /**
     * The list of active cues of the track.
     *
     * @remarks
     * <br/> - A cue is active if the current playback position falls within the time bounds of the cue.
     * <br/> - This list dynamically updates based on the current playback position.
     * <br/> - If the {@link TextTrack.mode} is `'disabled'`, this property is `null`.
     */
    readonly activeCues: TextTrackCueList_2 | null;
    /**
     * The source of the text track.
     */
    readonly src: string;
    /**
     * {@inheritDoc EventDispatcher.addEventListener}
     */
    addEventListener<TType extends StringKeyOf<TextTrackEventMap_2>>(type: TType | TType[], listener: EventListener_2<TextTrackEventMap_2[TType]>): void;
    /**
     * {@inheritDoc EventDispatcher.removeEventListener}
     */
    removeEventListener<TType extends StringKeyOf<TextTrackEventMap_2>>(type: TType | TType[], listener: EventListener_2<TextTrackEventMap_2[TType]>): void;
}
export { TextTrack_2 as TextTrack }

/**
 * Represents a cue of a text track.
 *
 * @public
 */
declare interface TextTrackCue_2 extends EventDispatcher<TextTrackCueEventMap_2> {
    /**
     * The text track of the cue.
     */
    track: TextTrack_2;
    /**
     * The identifier of the cue.
     */
    id: string;
    /**
     * The playback position at which the cue becomes active, in seconds.
     */
    startTime: number;
    /**
     * The playback position at which the cue becomes inactive, in seconds.
     */
    endTime: number;
    /**
     * The content of the cue.
     *
     * @remarks
     * The content differs depending on the {@link TextTrackCue.track}'s {@link TextTrack."type" | type }:
     * <br/> - `'emsg'`: Content is a Uint8Array representing the binary message data from the `emsg` box.
     * <br/> - `'eventstream'`: Content is the value of the `messageData` attribute which was specified in the manifest.
     * <br/> - `'ttml'`: Content is an intermediate TTML document’s body element. This is a view of a TTML document where all nodes in the document are active during the cue’s startTime and endTime. As a result, all begin, dur and end properties have been removed. TTML Styles, Regions and Metadata are stored in cue.styles, cue.regions, cue.metadata respectively. Combining those properties with the given content should suffice to render a TTML cue.
     * <br/> - `'webvtt'`: Content is the cue text in raw unparsed form.
     */
    content: any;
}
export { TextTrackCue_2 as TextTrackCue }

/**
 * The events fired by the {@link TextTrackCue}.
 *
 * @public
 */
declare interface TextTrackCueEventMap_2 {
    /**
     * Fired when the cue is entered.
     */
    enter: Event_2<'enter'>;
    /**
     * Fired when the cue is exited.
     */
    exit: Event_2<'exit'>;
    /**
     * Fired when the cue is updated.
     */
    update: Event_2<'update'>;
}
export { TextTrackCueEventMap_2 as TextTrackCueEventMap }

/**
 * List of text track cues.
 *
 * @public
 */
declare interface TextTrackCueList_2 extends ReadonlyArray<TextTrackCue_2> {
    /**
     * The number of text track cues in the list.
     */
    readonly length: number;
    /**
     * Return the text track cue at the requested index in the list.
     *
     * @param index - A `number` representing the index of a text track cue in the list.
     * @returns The text track cue with index `index` in the list.
     */
    item(index: number): TextTrackCue_2;
    /**
     * Index signature to get the text track cue at the requested index in the list.
     */
    readonly [index: number]: TextTrackCue_2;
}
export { TextTrackCueList_2 as TextTrackCueList }

/**
 * Describes the configuration of a side-loaded text track.
 *
 * @public
 */
export declare interface TextTrackDescription {
    /**
     * Whether the text track should be enabled by default.
     *
     * @remarks
     * <br/> - Only one text track per {@link TextTrack.kind} may be marked as default.
     *
     * @defaultValue `false`
     */
    default?: boolean;
    /**
     * The kind of the text track, represented by a value from the following list:
     * <br/> - `'subtitles'`: The track provides subtitles, used to display subtitles in a video.
     * <br/> - `'captions'`: The track provides a translation of dialogue and sound effects (suitable for users with a hearing impairment).
     * <br/> - `'descriptions'`: The track provides a textual description of the video (suitable for users with a vision impairment).
     * <br/> - `'chapters'`: The track provides chapter titles (suitable for navigating the media resource).
     * <br/> - `'metadata'`: The track provides content used by scripts and is not visible for users.
     *
     * @remarks
     * <br/> -  If an unrecognized value is provided, the player will interpret it as `'metadata'`.
     *
     * @defaultValue `'subtitles'`
     */
    kind?: string;
    /**
     * The format of the track, represented by a value from the following list:
     * <br/> - `'srt'`
     * <br/> - `'ttml'`
     * <br/> - `'webvtt'`
     * <br/> - `'emsg'`
     * <br/> - `'eventstream'`
     * <br/> - `'id3'`
     * <br/> - `'cea608'`
     * <br/> - `'daterange'`
     *
     * @defaultValue `''`
     */
    format?: string;
    /**
     * The source URL of the text track.
     */
    src: string;
    /**
     * The language of the text track.
     */
    srclang?: string;
    /**
     * A label for the text track.
     *
     * @remarks
     * <br/> - This will be used as an identifier on the player API and in the UI.
     */
    label?: string;
    
}

/**
 * An error thrown by a text track.
 *
 * @public
 */
export declare interface TextTrackError extends THEOplayerError {
    /**
     * {@inheritDoc THEOplayerError.code}
     */
    readonly code: TextTrackErrorCode;
    /**
     * The URL of the (sideloaded) text track.
     */
    readonly url: string;
    /**
     * The status code from the HTTP response.
     */
    readonly status: number;
}

/**
 * An error code whose category is `ErrorCategory.SUBTITLE`.
 *
 * @public
 */
export declare type TextTrackErrorCode = ErrorCode.SUBTITLE_LOAD_ERROR | ErrorCode.SUBTITLE_CORS_ERROR | ErrorCode.SUBTITLE_PARSE_ERROR;

/**
 * An error event fired by a {@link TextTrack}.
 *
 * @public
 */
export declare interface TextTrackErrorEvent extends ErrorEvent_2 {
    /**
     * {@inheritDoc ErrorEvent.errorObject}
     */
    readonly errorObject: TextTrackError;
}

/**
 * The events fired by a {@link TextTrack}.
 *
 * @public
 */
declare interface TextTrackEventMap_2 extends TrackEventMap {
    /**
     * Fired when a cue is added to the track.
     */
    addcue: Event_2<'addcue'>;
    /**
     * Fired when a cue of the track is removed.
     */
    removecue: Event_2<'removecue'>;
    /**
     * Fired when a cue of the track enters.
     */
    entercue: Event_2<'entercue'>;
    /**
     * Fired when a cue of the track exits.
     */
    exitcue: Event_2<'exitcue'>;
    /**
     * Fired when a cue of the track changes.
     */
    cuechange: Event_2<'cuechange'>;
    /**
     * Fired when the text track's {@link TextTrack.readyState | ready state} changes.
     */
    readystatechange: Event_2<'readystatechange'>;
    /**
     * Fired when the text track's {@link TextTrack."type" | type} changes.
     */
    typechange: Event_2<'typechange'>;
    /**
     * Fired when an error occurred while loading or parsing the track.
     */
    error: TextTrackErrorEvent;
}
export { TextTrackEventMap_2 as TextTrackEventMap }

/**
 * The ready state of a text track, represented by a value from the following list:
 * <br/> - `0`: Indicates that the text track's cues have not been obtained.
 * <br/> - `1`: The text track is loading. Further cues might still be added to the track by the parser.
 * <br/> - `2`: The text track has been loaded with no fatal errors.
 * <br/> - `3`: An error occurred obtaining the cues for the track. Some or all of the cues are likely missing and will not be obtained.
 *
 * @public
 */
export declare type TextTrackReadyState = 0 | 1 | 2 | 3;

/**
 * List of text tracks.
 *
 * @public
 */
export declare interface TextTracksList extends TrackList<TextTrack_2> {
    /**
     * The number of text tracks in the list.
     */
    readonly length: number;
    /**
     * Return the text track at the requested index in the list.
     *
     * @param index - A `number` representing the index of a text track in the list.
     * @returns The text track with index `index` in the list.
     */
    item(index: number): TextTrack_2;
    /**
     * Index signature to get the text track at the requested index in the list.
     */
    readonly [index: number]: TextTrack_2;
}

/**
 * The text track style API.
 *
 * @remarks
 * <br/> - Available since v2.27.4.
 *
 * @public
 */
export declare interface TextTrackStyle extends EventDispatcher<TextTrackStyleEventMap> {
    /**
     * The font family for the text track.
     */
    fontFamily: string | undefined;
    /**
     * The font color for the text track.
     */
    fontColor: string | undefined;
    /**
     * The font size for the text track.
     *
     * @remarks
     * Can be a percentage value such as '50%', '75%', '100%', '150%' or '200%'.
     */
    fontSize: string | undefined;
    /**
     * The background color for the text track.
     */
    backgroundColor: string | undefined;
    /**
     * The window color for the text track.
     */
    windowColor: string | undefined;
    /**
     * The edge style of the text, represented by a value from the following list:
     * <br/> - `'none'`
     * <br/> - `'dropshadow'`
     * <br/> - `'raised'`
     * <br/> - `'depressed'`
     * <br/> - `'uniform`
     */
    edgeStyle: EdgeStyle | undefined;
}

/**
 * Events fired by the {@link TextTrackStyle | TextTrackStyle API}.
 *
 * @public
 */
export declare interface TextTrackStyleEventMap {
    /**
     * Fired when any of the {@link TextTrackStyle | TextTrackStyle's properties} changes.
     */
    change: Event_2<'change'>;
}

/**
 * The content type of a text track, represented by a value from the following list:
 * <br/> - `'srt'`: The track contains SRT (SubRip Text) content.
 * <br/> - `'ttml'`: The track contains TTML (Timed Text Markup Language) content.
 * <br/> - `'webvtt'`: The track contains WebVTT (Web Video Text Tracks) content.
 * <br/> - `'emsg'`: The track contains emsg (Event Message) content.
 * <br/> - `'eventstream'`: The track contains Event Stream content.
 * <br/> - `'id3'`: The track contains ID3 content.
 * <br/> - `'cea608'`: The track contains CEA608 content.
 * <br/> - `'daterange'`: The track contains HLS EXT-X-DATERANGE content.
 * <br/> - `''`: The type of the track contents is unknown.
 *
 * @public
 */
export declare type TextTrackType = 'srt' | 'ttml' | 'webvtt' | 'emsg' | 'eventstream' | 'id3' | 'cea608' | 'daterange' | '';

/**
 * Describes an ad break request.
 *
 * @public
 */
export declare interface THEOplayerAdDescription extends AdDescription {
    /**
     * The source of the ad
     *
     * @remarks
     * <br/> - Only supports VAST and VMAP.
     */
    sources: string | AdSource;
    /**
     * Offset after which the ad break can be skipped.
     *
     * @remarks
     * <br/> - A timestamp which is not in the playback window will result in the ad break not being started.
     * <br/> - VMAP resources will ignore this value as they contain an internal offset.
     *
     * Possible formats:
     * <br/> - A number for the offset in seconds.
     * <br/> - `'start'` for a preroll.
     * <br/> - `'end'` for a postroll.
     * <br/> - `'HH:MM:SS.mmm'` for a timestamp in the playback window.
     * <br/> - A percentage string (XX%) for a proportion of the content duration.
     *
     * @defaultValue `'start'`
     */
    skipOffset?: string | number;
}

/**
 * An error that is thrown by THEOplayer.
 *
 * @public
 */
export declare interface THEOplayerError extends Error {
    /**
     * An {@link ErrorCode} that indicates the type of error that has occurred.
     */
    readonly code: ErrorCode;
    /**
     * An `ErrorCategory` that indicates the category of the error that has occurred.
     *
     * @remarks
     * <br/> - Equivalent to `ErrorCategory.fromCode(error.code)`
     */
    readonly category: ErrorCategory;
    /**
     * The underlying cause of this error, if known.
     */
    readonly cause: Error | undefined;
}

/**
 * Represents the resolution of a Verizon Media thumbnail.
 *
 * @public
 */
export declare interface ThumbnailResolution {
    /**
     * The width of the thumbnail, in pixels.
     */
    width?: number;
    /**
     * The prefix of the thumbnail.
     */
    prefix: string;
    /**
     * The requested width, in pixels.
     *
     * @remarks
     * <br/> - This can differ from the actual width because images are not stretched.
     */
    bw: number;
    /**
     * The requested height, in pixels.
     *
     * @remarks
     * <br/> - This can differ from the actual width because images are not stretched.
     */
    bh: number;
    /**
     * The height of the thumbnail, in pixels.
     */
    height?: number;
}

/**
 * Fired when the current playback position changed as part of normal playback or in an especially interesting way, for example discontinuously.
 *
 * @public
 */
export declare interface TimeUpdateEvent extends Event_2<'timeupdate'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
    /**
     * The player's current program date time.
     */
    readonly currentProgramDateTime: Date | undefined;
}

/**
 * Describes the configuration of the Titanium DRM integration.
 *
 * @example
 * ```
 * const drmConfiguration = {
 *     integration : 'keyos',
 *     playready: {
 *     licenseAcquisitionURL: 'yourTitaniumPlayReadyLicenseAcquisitionURL'
 *     },
 *     widevine: {
 *     licenseAcquisitionURL: 'yourTitaniumWidevineLicenseAcquisitionURL'
 *     },
 *     accountName: 'yourTitaniumAccountName',
 *     customerName: 'yourTitaniumCustomerName',
 *     friendlyName: 'yourTitaniumFriendlyName',
 *     portalId: 'yourTitaniumPortalId'
 * }
 * ```
 *
 * @public
 */
export declare interface TitaniumDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: TitaniumIntegrationID;
    /**
     * The version of Titanium, represented by a value from the following list:
     * <br/> - `'2'`
     * <br/> - `'3'`
     *
     * @remarks
     * Only version 2 and 3 are supported.
     *
     * @defaultValue `'2'`.
     */
    version?: '2' | '3';
    /**
     * The account name.
     *
     * @remarks
     * <br/> - Required when doing device-based authentication.
     */
    accountName?: string;
    /**
     * The customer name.
     *
     * @remarks
     * <br/> - Required when doing device-based authentication.
     */
    customerName?: string;
    /**
     * The friendly name of the customer.
     *
     * @remarks
     * <br/> - Required when doing device-based authentication.
     */
    friendlyName?: string;
    /**
     * The identifier of the portal.
     *
     * @remarks
     * <br/> - Required when doing device-based authentication.
     */
    portalId?: string;
    /**
     * The authentication token.
     *
     * @remarks
     * <br/> - This is a JSON web token provided by the Titanium Secure Token Server.
     * <br/> - Required when doing token-based authentication.
     */
    authToken?: string;
}

/**
 * The identifier of the Titanium integration.
 *
 * @public
 */
export declare type TitaniumIntegrationID = 'titanium';

/**
 * Describes the configuration of the Titanium DRM integration with token-based authentication.
 *
 * @public
 */
export declare interface TokenBasedTitaniumDRMConfiguration extends TitaniumDRMConfiguration {
    /**
     * The account name.
     */
    accountName?: undefined;
    /**
     * The customer name.
     */
    customerName?: undefined;
    /**
     * The friendly name of this customer.
     */
    friendlyName?: undefined;
    /**
     * The identifier of the portal.
     */
    portalId?: undefined;
    /**
     * The authentication token.
     *
     * @remarks
     * <br/> - This is a JSON web token provided by the Titanium Secure Token Server.
     */
    authToken: string;
}

/**
 * @public
 */
export declare interface TotalTimePlayedMetric extends ActiveTrackLabeledMetric {
    readonly labelData: ActiveTrackInfoLabel & MetricLabel & PlayBackRateLabel;
}

/**
 * Represents a track of a media resource.
 *
 * @remarks
 * <br/> - A specific track type (e.g. {@link TextTrack}) will always be used.
 *
 * @public
 */
export declare interface Track extends EventDispatcher<TrackEventMap> {
    /**
     * The kind of the track.
     *
     * @remarks
     * <br/> - The values for this property depend on the specific type of the track.
     */
    kind: string;
    /**
     * The identifier of the track.
     *
     * @remarks
     * <br/> - This identifier can be used to distinguish between related tracks, e.g. tracks in the same list.
     */
    id: string;
    /**
     * A unique identifier of the track.
     *
     * @remarks
     * <br/> - This identifier is unique across tracks of a THEOplayer instance and can be used to distinguish between tracks.
     * <br/> - This identifier is a randomly generated number.
     */
    uid: number;
    /**
     * The label of the track.
     */
    label: string;
    /**
     * The language of the track.
     */
    language: string;
}

/**
 * @public
 */
export declare interface TrackBytesDownloadedData {
    date: Date;
    newBytes: number;
    trackInfo: TrackInfoLabel;
}

/**
 * The events fired by a {@link Track}.
 *
 * @public
 */
export declare interface TrackEventMap {
    /**
     * Fired when a media track's {@link MediaTrack.enabled | enabled} or a text track's {@link TextTrack.mode | mode} changes.
     */
    change: Event_2<'change'>;
    /**
     * Fired when the track updates.
     *
     * @remarks
     * <br/> - A track might update because a change propagated from a remote player (e.g. Chromecast).
     */
    update: Event_2<'update'>;
}

/**
 * @public
 */
export declare interface TrackInfoLabel extends MetricLabel {
    readonly mediaType: HespMediaType;
    readonly switchingSetId: string;
    readonly trackId: string;
}

/**
 * List of tracks.
 *
 * @public
 */
export declare interface TrackList<TTrack extends Track> extends ReadonlyArray<TTrack>, EventDispatcher<TrackListEventMap> {
    /**
     * The number of tracks in the list.
     */
    readonly length: number;
    /**
     * Return the track at the requested index in the list.
     *
     * @param index - A `number` representing the index of a track in the list.
     * @returns The track with index `index` in the list.
     */
    item(index: number): TTrack;
    /**
     * Index signature to get the track at the requested index in the list.
     */
    readonly [index: number]: TTrack;
}

/**
 * The events fired by a {@link TrackList}.
 *
 * @public
 */
export declare interface TrackListEventMap {
    /**
     * Fired when a track is added.
     */
    addtrack: Event_2<'addtrack'>;
    /**
     * Fired when a track is removed.
     */
    removetrack: Event_2<'removetrack'>;
    /**
     * Fired when a track is activated or deactivated.
     */
    change: Event_2<'change'>;
}

/**
 * Represents a cue of a TTML text track.
 *
 * @public
 */
export declare interface TTMLCue extends TextTrackCue_2 {
    /**
     * The content of the cue.
     *
     * @remarks
     * <br/> - The content is an intermediate TTML document’s body element. This is a view of a TTML document where all nodes in the document are active during the cue’s startTime and endTime. As a result, all begin, dur and end properties have been removed. TTML Styles, Regions and Metadata are stored in cue.styles, cue.regions, cue.metadata respectively. Combining those properties with the given content should suffice to render a TTML cue.
     */
    content: any;
    /**
     * A record of styles for the cue.
     * Each entry contains all style properties for a style id.
     */
    styles: Record<string, StylePropertyRecord>;
    /**
     * A record of style for the cue.
     * Each entry contains all style properties for a region id.
     */
    regions: Record<string, StylePropertyRecord>;
    /**
     * The `<metadata>` Element of the corresponding TTML document.
     */
    metadata: any;
}

/**
 * @public
 */
export declare interface TypedMetric<T extends string> extends Metric {
    labelData: TypeLabel<T>;
}

/**
 * Represents a media resource characterized by a URL to the resource and optionally information about the resource.
 *
 * @public
 */
export declare interface TypedSource extends BaseSource {
    /**
     * The source URL of the media resource.
     *
     * @remarks
     * <br/> - Required if the `ssai` property is absent.
     * <br/> - Available since v2.4.0.
     */
    src?: string;
    /**
     * The content type (MIME type) of the media resource, represented by a value from the following list:
     * <br/> - `'application/dash+xml'`: The media resource is an MPEG-DASH stream.
     * <br/> - `'application/x-mpegURL'` or `'application/vnd.apple.mpegurl'`: The media resource is an HLS stream.
     * <br/> - `'video/mp4'`, `'video/webm'` and other formats: The media resource should use native HTML5 playback if supported by the browser.
     * <br/> - `'application/vnd.theo.hesp+json'`: The media resource is an HESP stream.
     *
     * @remarks
     * <br/> - Available since v2.4.0.
     */
    type?: string;
    /**
     * The content protection parameters for the media resource.
     *
     * @remarks
     * <br/> - Available since v2.15.0.
     */
    contentProtection?: DRMConfiguration;
    /**
     * The content protection parameters for the media resource.
     *
     * @deprecated Superseded by {@link TypedSource.contentProtection}.
     */
    drm?: DRMConfiguration;
    /**
     * The Server-side Ad Insertion parameters for the media resource.
     *
     * @remarks
     * <br/> - Available since v2.12.0.
     */
    ssai?: ServerSideAdInsertionConfiguration;
    
}

/**
 * @public
 */
export declare interface TypeLabel<T extends string> extends MetricLabel {
    type: T;
}

/**
 * Describes the UI configuration of the player.
 *
 * @public
 */
export declare interface UIConfiguration {
    /**
     * The width of the player.
     *
     * @remarks
     * Possible formats
     * <br/> - A number as the amount of pixels.
     * <br/> - A percentage string (XX%).
     */
    width?: number | string;
    /**
     * The height of the player.
     *
     * @remarks
     * Possible formats
     * <br/> - A number as the amount of pixels.
     * <br/> - A percentage string (XX%).
     */
    height?: number | string;
    /**
     * Whether the UI of the player is responsive.
     *
     * @defaultValue `false`
     */
    fluid?: boolean;
    /**
     * The language which is used for localization.
     *
     * @remarks
     * <br/> - This can be a {@link UILanguage | language map}.
     * <br/> - Otherwise it can be a language code which is the key to a {@link UILanguage | language map} in {@link UIConfiguration.languages}.
     *
     * @example
     * Localize statically to one language.
     * ```
     * ui: {
     *   language: {
     *     "Play": "Reproducir",
     *     "Pause": "Pausa",
     *     "Current Time": "Tiempo actual",
     *     // [...]
     *   }
     * }
     * ```
     *
     * @example
     * Localize dynamically to one of multiple languages.
     * ```
     * ui: {
     *   language: 'es',
     *   languages: {
     *     "es": {
     *       "Play": "Reproducir",
     *       "Pause": "Pausa",
     *       "Current Time": "Tiempo actual",
     *       // [...]
     *     },
     *     "fr": {
     *       // [...]
     *     }
     *   }
     * }
     * ```
     */
    language?: string | UILanguage;
    /**
     * A record used to localize to multiple languages.
     * Each entry contains a language code with associated {@link UILanguage | language map}.
     */
    languages?: Record<string, UILanguage>;
}

/**
 *  A record used to map localization.
 *  Each entry contains a translation of an English string.
 *
 * @public
 */
export declare type UILanguage = Record<string, string>;

/**
 * Describes the UI related configuration of the player.
 *
 * @public
 */
export declare interface UIPlayerConfiguration extends PlayerConfiguration {
    /**
     * The user interface configuration.
     */
    ui?: UIConfiguration;
    /**
     * The picture-in-picture configuration.
     */
    pip?: PiPConfiguration;
    /**
     * @deprecated use ui.width
     */
    width?: number | string;
    /**
     * @deprecated use ui.height
     */
    height?: number | string;
    /**
     * @deprecated use ui.fluid
     */
    fluid?: boolean;
}

/**
 * The related content UI API which can be used to toggle UI components.
 *
 * @remarks
 * <br/> - Available since v2.14.2.
 *
 * @public
 */
export declare interface UIRelatedContent extends RelatedContent, EventDispatcher<UIRelatedContentEventMap> {
    /**
     * Whether the related content menu is showing.
     */
    showing: boolean;
    /**
     * Show the related content menu.
     */
    show(): void;
    /**
     * Hides the related content menu.
     */
    hide(): void;
    /**
     * {@inheritDoc EventDispatcher.addEventListener}
     */
    addEventListener<TType extends StringKeyOf<UIRelatedContentEventMap>>(type: TType | TType[], listener: EventListener_2<UIRelatedContentEventMap[TType]>): void;
    /**
     * {@inheritDoc EventDispatcher.removeEventListener}
     */
    removeEventListener<TType extends StringKeyOf<UIRelatedContentEventMap>>(type: TType | TType[], listener: EventListener_2<UIRelatedContentEventMap[TType]>): void;
}

/**
 * The events fired by the {@link UIRelatedContent | related content API (with ui)}.
 *
 * @public
 */
export declare interface UIRelatedContentEventMap extends RelatedContentEventMap {
    /**
     * {@inheritDoc RelatedShowEvent}
     */
    show: RelatedShowEvent;
    /**
     * {@inheritDoc RelatedHideEvent}
     */
    hide: RelatedHideEvent;
}

/**
 * Represents the information regarding the universal identifier of an ad.
 *
 * @public
 */
export declare interface UniversalAdId {
    /**
     * The registry associated with cataloging the UniversalAdId of the selected creative for the ad.
     *
     * @remarks
     * <br/> - Returns the registry value, or "unknown" if unavailable.
     */
    adIdRegistry: string;
    /**
     * The UniversalAdId of the selected creative for the ad.
     *
     * @remarks
     * <br/> - Returns the id value or "unknown" if unavailable.
     */
    adIdValue: string;
}

/**
 * @public
 */
export declare interface UnlabeledMetric extends Metric {
    readonly labelData: Exclude<{}, MetricLabel>;
}

/**
 * Fired when the quality updates.
 *
 * @public
 */
export declare interface UpdateQualityEvent extends Event_2<'update'> {
    /**
     * The quality which has been updated.
     */
    readonly quality: Quality;
}

/**
 * Describes the configuration of the Uplynk DRM integration.
 *
 * @example
 * ```
 * const drmConfiguration = {
 *     integration : 'uplynk',
 *     fairplay: {
 *          certificateURL: 'yourCertificateAcquisitionURL'
 *     },
 * }
 * ```
 *
 * @public
 */
export declare interface UplynkDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: UplynkIntegrationID;
}

/**
 * The identifier of the Uplynk integration.
 *
 * @public
 */
export declare type UplynkIntegrationID = 'uplynk';

/**
 * A bar which displays the up next source.
 *
 * @remarks
 * <br/> - The bar should be shown briefly before the current content ends.
 * <br/> - The bar covers a small part of the player.
 * <br/> - Available since v2.15.
 *
 * @public
 */
export declare interface UpNextBar {
    /**
     * Whether the bar is showing.
     */
    showing: boolean;
    /**
     * The offset, from the end of the video, after which the bar is shown.
     *
     * @remarks
     * Possible formats:
     * <br/> - A number or "number" for the offset in seconds.
     * <br/> - Percentage string (XX%) for a proportion of the duration.
     *
     * @defaultValue `10`
     */
    offset?: string | number;
    /**
     * Show the bar.
     */
    show(): void;
    /**
     * Hide the bar.
     */
    hide(): void;
}

/**
 * The up next API.
 *
 * @remarks
 * <br/> - Available since v2.15.0.
 *
 * @public
 */
export declare interface UpNextManager {
    /**
     * The up next source.
     */
    source: UpNextSource | undefined;
    /**
     * The up next bar UI component.
     * The bar property can be used to get or set an UpNextBar that contains information on the up next bar that
     * will be shown, such as the offset from which the up next bar will be displayed.
     */
    bar: UpNextBar;
    /**
     * The up next panel UI component.
     *
     * The panel property can be used to get or set an UpNextPanel that contains information on the up next panel that
     * will be shown at the end of the video, such as the duration of the countdown.
     */
    panel: UpNextPanel;
    /**
     * Transition to the page of the {@link UpNextManager.source}.
     */
    next(): void;
}

/**
 * A panel which displays the up next source.
 *
 * @remarks
 * <br/> - The panel should be shown after the current source has ended.
 * <br/> - The panel covers the entire player.
 * <br/> - Available since v2.15.
 *
 * @public
 */
export declare interface UpNextPanel {
    /**
     * Whether the panel is showing.
     */
    showing: boolean;
    /**
     * The countdown after which the up next source is started.
     *
     * @remarks
     * <br/> - Countdown starts from the moment the panel is shown.
     *
     * Possible formats:
     * <br/> - number or "number": the countdown will be number seconds.
     * <br/> - Infinity: no countdown will happen, only the play button will appear to go to the video that is up next.
     *
     * @defaultValue `10`
     */
    countdownDuration?: string | number;
    /**
     * Whether the panel should be shown after the current source has ended.
     *
     * @defaultValue `true`
     */
    showUpNextPanel?: boolean;
    /**
     * Show the panel.
     */
    show(): void;
    /**
     * Hide the panel.
     */
    hide(): void;
}

/**
 * Describes an up next source.
 *
 * @remarks
 * <br/> - Available since v2.15.
 *
 * @public
 */
export declare interface UpNextSource {
    /**
     * The URL to the thumbnail of the source.
     */
    image: string;
    /**
     * The title of the source.
     */
    title?: string;
    /**
     * The URL of the source.
     */
    link: string;
    /**
     * The duration of the source.
     */
    duration?: string;
}

/**
 * Utils that serve common use cases. For example encoding and decoding a base64 string to Uint8Array and vice versa.
 * @public
 */
export declare const utils: CommonUtils;

/**
 * Common API for all cast integrations.
 *
 * @public
 */
export declare interface VendorCast extends EventDispatcher<VendorCastEventMap> {
    /**
     * Whether the player is casting.
     */
    casting: boolean;
    /**
     * The state of the casting process.
     */
    state: CastState;
    /**
     * Start a casting session with the player's source.
     *
     * @remarks
     * <br/> - A native browser pop-up will prompt to choose a casting target device.
     */
    start(): void;
    /**
     * Stop the active casting session.
     */
    stop(): void;
}

/**
 * The events fired by the common vendor APIs.
 *
 * @public
 */
export declare interface VendorCastEventMap {
    /**
     * Fired when the {@link VendorCast.state | state} changes.
     */
    statechange: CastStateChangeEvent;
}

/**
 * Describes the configuration of the Veramatrix DRM integration.
 *
 * @example
 * ```
 * const drmConfiguration = {
 *     integration : 'verimatrix',
 *     fairplay: {
 *          licenseAcquisitionURL: 'yourLicenseAcquisitionURL',
 *          certificateURL: 'yourCertificateURL'
 *     }
 * }
 * ```
 *
 * @public
 */
export declare interface VerimatrixDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: VerimatrixIntegrationID;
}

/**
 * The identifier of the Verimatrix integration.
 *
 * @public
 */
export declare type VerimatrixIntegrationID = 'verimatrix';

/**
 * The Verizon Media API.
 *
 * @remarks
 * <br/> - Only available with the feature 'verizonmedia'.
 *
 * @public
 */
export declare interface VerizonMedia extends EventDispatcher<VerizonMediaEventMap> {
    /**
     * The Verizon Media SSAI API.
     */
    readonly ads: VerizonMediaAds;
    /**
     * List of Verizon Media assets.
     */
    readonly assets: VerizonMediaAssetList;
}

/**
 * Represents a Verizon Media ad.
 *
 * @public
 */
export declare interface VerizonMediaAd extends EventDispatcher<VerizonMediaAdEventMap> {
    /**
     * The start time of the ad, in seconds.
     */
    readonly startTime: number;
    /**
     * The end time of the ad, in seconds.
     */
    readonly endTime: number;
    /**
     * The duration of the ad, in seconds.
     */
    readonly duration: number;
    /**
     * The API framework, if any.
     *
     * @remarks
     * <br/> - If the value is 'VPAID', then the ad is a VPAID ad.
     * <br/> - Otherwise the ad is an Uplynk CMS asset.
     */
    readonly apiFramework: string | undefined;
    /**
     * The identifier of the creative.
     *
     * @remarks
     * <br/> - Either a VPAID URL if the API framework is `'VPAID'`.
     * <br/> - Otherwise an asset ID from the Uplynk CMS.
     */
    readonly creative: string;
    /**
     * The creative's mime type.
     *
     * @remarks
     * <br/> - Either 'application/javascript' if the API framework is `'VPAID'`.
     * <br/> - Otherwise 'uplynk/m3u8'.
     */
    readonly mimeType: string;
    /**
     * The width of the ad, in pixels.
     *
     * @remarks
     * <br/> - Returns `0` when this is not a companion.
     */
    readonly width: number;
    /**
     * The height of the ad, in pixels.
     *
     * @remarks
     * <br/> - Returns `0` when this is not a companion.
     */
    readonly height: number;
    /**
     * A record of all VAST 3.0 tracking events for this ad.
     * Each entry contains all related tracking URLs.
     */
    readonly events: Record<string, string[]>;
    /**
     * List of companion ads of the ad.
     */
    readonly companions: ReadonlyArray<VerizonMediaAd>;
    /**
     * List of VAST extensions returned by the ad server.
     */
    readonly extensions: ReadonlyArray<object>;
    /**
     * Record of FreeWheel-defined creative parameters.
     * Each entry contains the parameter name together with the associated value.
     */
    readonly freeWheelParameters: Record<string, string>;
}

/**
 * Fired when an ad begins.
 *
 * @public
 */
export declare interface VerizonMediaAdBeginEvent extends Event_2<'adbegin'> {
    /**
     * The ad which began.
     */
    readonly ad: VerizonMediaAd;
}

/**
 * Represents a Verizon Media ad.
 *
 * @public
 */
export declare interface VerizonMediaAdBreak extends EventDispatcher<VerizonMediaAdBreakEventMap> {
    /**
     * The start time of the ad break, in seconds.
     */
    readonly startTime: number;
    /**
     * The end time of the ad break, in seconds.
     *
     * @remarks
     * <br/> - For channels it can return `undefined` when the end time has not yet been signaled.
     */
    readonly endTime: number | undefined;
    /**
     * The duration of the ad break, in seconds.
     *
     * @remarks
     * <br/> - For channels it can return `undefined` when the duration has not yet been signaled.
     */
    readonly duration: number | undefined;
    /**
     * List of ads in the ad break.
     */
    readonly ads: VerizonMediaAdList;
    /**
     * Offset after which the ad break may be skipped, in seconds.
     *
     * @remarks
     * If the offset is -1, the ad is unskippable.
     * If the offset is 0, the ad is immediately skippable.
     * Otherwise it must be a positive number indicating the offset.
     * Skipping the ad in live streams is unsupported.
     *
     * @example
     * To be able to skip the first ad after 10 seconds use: `10`.
     *
     * @defaultValue The {@link VerizonMediaConfiguration.defaultSkipOffset}.
     */
    skipOffset: number;
}

/**
 * Fired when the ad break begins.
 *
 * @public
 */
export declare interface VerizonMediaAdBreakBeginEvent extends Event_2<'adbreakbegin'> {
    /**
     * The ad break which began.
     */
    readonly adBreak: VerizonMediaAdBreak;
}

/**
 * Fired when the ad break ends.
 *
 * @public
 */
export declare interface VerizonMediaAdBreakEndEvent extends Event_2<'adbreakend'> {
    /**
     * The ad break which ended.
     */
    readonly adBreak: VerizonMediaAdBreak;
}

/**
 * The events fired by the {@link VerizonMediaAdBreak}.
 *
 * @public
 */
export declare interface VerizonMediaAdBreakEventMap {
    /**
     * {@inheritDoc VerizonMediaAdBreakBeginEvent}
     */
    adbreakbegin: VerizonMediaAdBreakBeginEvent;
    /**
     * {@inheritDoc VerizonMediaAdBreakEndEvent}
     */
    adbreakend: VerizonMediaAdBreakEndEvent;
    /**
     * {@inheritDoc VerizonMediaAdBreakSkipEvent}
     */
    adbreakskip: VerizonMediaAdBreakSkipEvent;
    /**
     * {@inheritDoc VerizonMediaUpdateAdBreakEvent}
     */
    updateadbreak: VerizonMediaUpdateAdBreakEvent;
}

/**
 * List with Verizon Media ad breaks.
 *
 * @public
 */
export declare interface VerizonMediaAdBreakList extends EventedList<VerizonMediaAdBreak, VerizonMediaAdBreakListEventMap> {
}

/**
 * The events fired by the {@link VerizonMediaAdBreakList}.
 *
 * @public
 */
export declare interface VerizonMediaAdBreakListEventMap {
    /**
     * {@inheritDoc VerizonMediaAddAdBreakEvent}
     */
    addadbreak: VerizonMediaAddAdBreakEvent;
    /**
     * {@inheritDoc VerizonMediaRemoveAdBreakEvent}
     */
    removeadbreak: VerizonMediaRemoveAdBreakEvent;
}

/**
 * Fired when the ad break is skipped.
 *
 * @public
 */
export declare interface VerizonMediaAdBreakSkipEvent extends Event_2<'adbreakskip'> {
    /**
     * The ad break which has been skipped.
     */
    readonly adBreak: VerizonMediaAdBreak;
}

/**
 * Fired when the ad is completed.
 *
 * @public
 */
export declare interface VerizonMediaAdCompleteEvent extends Event_2<'adcomplete'> {
    /**
     * The ad which has progressed.
     */
    readonly ad: VerizonMediaAd;
}

/**
 * Fired when the ad break is added.
 *
 * @public
 */
export declare interface VerizonMediaAddAdBreakEvent extends Event_2<'addadbreak'> {
    /**
     * The ad break which has been added.
     */
    readonly adBreak: VerizonMediaAdBreak;
}

/**
 * Fired when an asset is added.
 *
 * @public
 */
export declare interface VerizonMediaAddAssetEvent extends Event_2<'addasset'> {
    /**
     * The asset which has been added.
     */
    readonly asset: VerizonMediaAsset;
}

/**
 * Fired when the ad ends.
 *
 * @public
 */
export declare interface VerizonMediaAdEndEvent extends Event_2<'adend'> {
    /**
     * The ad which has ended.
     */
    readonly ad: VerizonMediaAd;
}

/**
 * The events fired by the {@link VerizonMediaAd}.
 *
 * @public
 */
export declare interface VerizonMediaAdEventMap {
    /**
     * {@inheritDoc VerizonMediaAdBeginEvent}
     */
    adbegin: VerizonMediaAdBeginEvent;
    /**
     * {@inheritDoc VerizonMediaAdEndEvent}
     */
    adend: VerizonMediaAdEndEvent;
    /**
     * {@inheritDoc VerizonMediaAdFirstQuartileEvent}
     */
    adfirstquartile: VerizonMediaAdFirstQuartileEvent;
    /**
     * {@inheritDoc VerizonMediaAdMidpointEvent}
     */
    admidpoint: VerizonMediaAdMidpointEvent;
    /**
     * {@inheritDoc VerizonMediaAdThirdQuartileEvent}
     */
    adthirdquartile: VerizonMediaAdThirdQuartileEvent;
    /**
     * {@inheritDoc VerizonMediaAdCompleteEvent}
     */
    adcomplete: VerizonMediaAdCompleteEvent;
}

/**
 * Fired when the ad reaches the first quartile.
 *
 * @public
 */
export declare interface VerizonMediaAdFirstQuartileEvent extends Event_2<'adfirstquartile'> {
    /**
     * The ad which has progressed.
     */
    readonly ad: VerizonMediaAd;
}

/**
 * List of Verizon Media ads.
 *
 * @public
 */
export declare interface VerizonMediaAdList extends EventedList<VerizonMediaAd, VerizonMediaAdListEventMap> {
}

/**
 * Events fired by the {@link VerizonMediaAdList}.
 *
 * @public
 */
export declare interface VerizonMediaAdListEventMap {
    /**
     *{@inheritDoc VerizonMediaRemoveAdEvent}
     */
    removead: VerizonMediaRemoveAdEvent;
}

/**
 * Fired when the ad reaches the mid point.
 *
 * @public
 */
export declare interface VerizonMediaAdMidpointEvent extends Event_2<'admidpoint'> {
    /**
     * The ad which has progressed.
     */
    readonly ad: VerizonMediaAd;
}

/**
 * The Verizon Media ads API.
 *
 * @public
 */
export declare interface VerizonMediaAds {
    /**
     * List of ad breaks.
     */
    readonly adBreaks: VerizonMediaAdBreakList;
    /**
     * The currently playing ad break.
     */
    readonly currentAdBreak: VerizonMediaAdBreak | undefined;
    /**
     * The currently playing ads.
     *
     * @remarks
     * <br/> - These will always be part of the {@link VerizonMediaAds.currentAdBreak | current ad break}.
     */
    readonly currentAds: VerizonMediaAdList;
    /**
     * Seek to the end of the ad if it is skippable.
     *
     * @remarks
     * <br/> - The ad is skippable when it is currently playing and the ad break's offset is reached.
     */
    skip(): void;
}

/**
 * Fired when the ad reaches the third quartile.
 *
 * @public
 */
export declare interface VerizonMediaAdThirdQuartileEvent extends Event_2<'adthirdquartile'> {
    /**
     * The ad which has progressed.
     */
    readonly ad: VerizonMediaAd;
}

/**
 * Represents a Verizon Media asset.
 *
 * @public
 */
export declare interface VerizonMediaAsset {
    /**
     * The start time of the asset, in seconds.
     */
    startTime: number;
    /**
     * The end time of the asset, in seconds.
     *
     * @remarks
     * <br> - The end time is the sum of {@link VerizonMediaAsset.startTime}, {@link VerizonMediaAsset.duration} and the {@link VerizonMediaAdBreak.duration} of the ad breaks scheduled during the asset.
     */
    endTime: number;
    /**
     * The duration of the asset, in seconds.
     */
    duration: number;
    /**
     * Whether the asset is audio only.
     */
    audioOnly: boolean;
    /**
     * List of boundaries of the asset.
     *
     * @remarks
     * <br/> - See {@link https://docs.vdms.com/video/#Setup/Boundaries-Setup-Playback.htm | Boundaries}
     */
    boundaryDetails: Boundary[] | undefined;
    /**
     * Whether an error occurred with the asset.
     */
    error: boolean;
    /**
     * The tv-rating of the asset, represented by a value from the following list:
     * <br/> - `-1`: Not Available.
     * <br/> - `0`: Not Rated.
     * <br/> - `1`: TV-Y.
     * <br/> - `2`: TV-Y7.
     * <br/> - `3`: TV-G.
     * <br/> - `4`: TV-PG.
     * <br/> - `5`: TV-14.
     * <br/> - `6`: TV-MA.
     * <br/> - `7`: Not Rated.
     */
    tvRating: number;
    /**
     * The number of slices available for the asset.
     */
    maxSlice: number;
    /**
     * The prefix URL to the thumbnails.
     */
    thumbPrefix: string;
    /**
     * The average slice duration, in seconds.
     */
    sliceDuration: number;
    /**
     * The movie rating of the asset, represented by a value from the following list:
     * <br/> - `-1`: Not Available.
     * <br/> - `0`: Not Applicable.
     * <br/> - `1`: G.
     * <br/> - `2`: PG.
     * <br/> - `3`: PG-13.
     * <br/> - `4`: R.
     * <br/> - `5`: NC-17.
     * <br/> - `6`: X.
     * <br/> - `7`: Not Rated.
     */
    movieRating: number;
    /**
     * The identifier of the owner.
     */
    ownerId: string;
    /**
     * The metadata attached to the asset.
     *
     * @remarks
     * <br/> - Metadata may be added via the CMS.
     */
    metadata: object;
    /**
     * The available bitrates of the asset.
     */
    rates: number[];
    /**
     * List of thumbnail resolutions of the asset.
     */
    thumbnailResolutions: ThumbnailResolution[];
    /**
     * The poster URL.
     */
    posterUrl: string;
    /**
     * The default poster URL created for the asset.
     */
    defaultPosterUrl: string;
    /**
     * The description of the asset.
     */
    description: string;
    /**
     * Whether the asset contains adult language.
     */
    hasAdultLanguage: boolean;
    /**
     * Whether the asset contains sexual situations.
     */
    hasSexualSituations: boolean;
    /**
     * Whether the asset contains violence.
     */
    hasViolence: boolean;
    /**
     * Whether the asset contains drug situations.
     */
    hasDrugSituations: boolean;
    /**
     * The identifier of the external source.
     */
    externalId: string;
    /**
     * Whether the asset is an ad.
     */
    isAd: boolean;
    /**
     * The identifier of the asset.
     */
    assetId: string;
}

/**
 * The events fired by the {@link VerizonMediaAssetList}.
 *
 * @public
 */
export declare interface VerizonMediaAssetEventMap {
    /**
     * {@inheritDoc VerizonMediaAddAssetEvent}
     */
    addasset: VerizonMediaAddAssetEvent;
    /**
     * {@inheritDoc VerizonMediaRemoveAssetEvent}
     */
    removeasset: VerizonMediaRemoveAssetEvent;
}

/**
 * Represents a unique asset identifier for a Verizon Media asset.
 *
 * @remarks
 * <br/> - This asset identifier determines a unique asset on the Verizon Media Platform.
 *
 * @public
 */
export declare type VerizonMediaAssetId = string;

/**
 * Represents a Verizon Media Asset Info Response.
 *
 * @remarks
 * <br/> - See {@link https://docs.vdms.com/video/#Develop/AssetInfo.htm%3FTocPath%3DDevelop%7CClient%2520(Media%2520Player)%7C_____1 | Asset Info}.
 *
 * @public
 */
export declare interface VerizonMediaAssetInfoResponse {
    /**
     * A flag indicating if the asset is audio only.
     */
    audio_only: number;
    /**
     * List of objects which contain information for the boundaries for the asset.
     */
    boundary_details: Boundary[] | undefined;
    /**
     * Whether an error occurred.
     *
     * @remarks
     * <br/> - False if `0`, true otherwise.
     */
    error: number;
    /**
     * The tv-rating of the asset, represented by a value from the following list:
     * <br/> - `-1`: Not Available.
     * <br/> - `0`: Not Rated.
     * <br/> - `1`: TV-Y.
     * <br/> - `2`: TV-Y7.
     * <br/> - `3`: TV-G.
     * <br/> - `4`: TV-PG.
     * <br/> - `5`: TV-14.
     * <br/> - `6`: TV-MA.
     * <br/> - `7`: Not Rated.
     */
    tv_rating: VerizonMediaAssetTvRating;
    /**
     * The number of slices available for the asset.
     */
    max_slice: number;
    /**
     * The prefix URL to the thumbnails.
     */
    thumb_prefix: string;
    /**
     * The average slice duration.
     */
    slice_dur: number;
    /**
     * The movie rating of the asset, represented by a value from the following list:
     * <br/> - `-1`: Not Available.
     * <br/> - `0`: Not Applicable.
     * <br/> - `1`: G.
     * <br/> - `2`: PG.
     * <br/> - `3`: PG-13.
     * <br/> - `4`: R.
     * <br/> - `5`: NC-17.
     * <br/> - `6`: X.
     * <br/> - `7`: Not Rated.
     */
    movie_rating: VerizonMediaAssetMovieRating;
    /**
     * The identifier of the owner.
     */
    owner: string;
    /**
     * The metadata attached to the asset.
     *
     * @remarks
     * <br/> - Metadata may be added via the CMS.
     */
    meta: object;
    /**
     * The available bitrates of the asset.
     */
    rates: number[];
    /**
     * List of thumbnail resolutions of the asset.
     */
    thumbs: ThumbnailResolution[];
    /**
     * The poster URL of the asset.
     */
    poster_url: string;
    /**
     * The duration of the asset.
     */
    duration: number;
    /**
     * The default poster URL created for the asset.
     */
    readonly default_poster_url: string;
    /**
     * The description of the asset.
     */
    desc: string;
    /**
     * The ratings for the asset, as bitwise flags.
     *
     * @remarks
     * These available flags are the following:
     * <br/> - D: Drug-related themes are present
     * <br/> - V: Violence is present
     * <br/> - S: Sexual situations are present
     * <br/> - L: Adult Language is present
     *
     * This number is a bitwise number to indicate if one or more of these values are present.
     * <br/> - [D][V][S][L] - 0: No rating flag.
     * <br/> - [D][V][S][L] - 1: Language flag.
     * <br/> - [D][V][S][L] - 2: Sex flag.
     * <br/> - [D][V][S][L] - 4: Violence flag.
     * <br/> - [D][V][S][L] - 8: Drugs flag.
     * <br/> - [D][V][S][L] - 15: All flags are on.
     */
    rating_flags: number;
    /**
     * The identifier of the external source.
     */
    external_id: string;
    /**
     * Whether the asset is an ad.
     *
     * @remarks
     * <br/> - False if `0`, true otherwise
     */
    is_ad: number;
    /**
     * The identifier of the asset.
     */
    asset: string;
}

/**
 * Fired when an asset info response is received.
 *
 * @public
 */
export declare interface VerizonMediaAssetInfoResponseEvent extends Event_2<'assetinforesponse'> {
    /**
     * The response which has been received.
     */
    readonly response: VerizonMediaAssetInfoResponse;
}

/**
 * List of Verizon Media assets.
 *
 * @public
 */
export declare interface VerizonMediaAssetList extends EventedList<VerizonMediaAsset, VerizonMediaAssetEventMap> {
}

/**
 * The movie rating of an asset, represented by a value from the following list:
 * <br/> - `-1` (NOT_AVAILABLE)
 * <br/> - `0` (NOT_APPLICABLE)
 * <br/> - `1` (G)
 * <br/> - `2` (PG)
 * <br/> - `3` (PG_13)
 * <br/> - `4` (R)
 * <br/> - `5` (NC_17)
 * <br/> - `6` (X)
 * <br/> - `7` (NOT_RATED)
 *
 * @public
 */
export declare type VerizonMediaAssetMovieRating = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * The TV rating of an asset, represented by a value from the following list:
 * <br/> - `-1` (NOT_AVAILABLE)
 * <br/> - `0` (NOT_APPLICABLE)
 * <br/> - `1` (TV_Y)
 * <br/> - `2` (TV_Y7)
 * <br/> - `3` (TV_G)
 * <br/> - `4` (TV_PG)
 * <br/> - `5` (TV_14)
 * <br/> - `6` (TV_MA)
 * <br/> - `7` (NOT_RATED)
 *
 * @remarks
 * In the online documentation the value for 0 is also "NOT RATED". Since this is counter-intuitive, we have assumed
 * this to be erronous and have modeled this according to the Movie Ratings, with 0 being "NOT APPLICABLE".
 *
 * @public
 */
export declare type VerizonMediaAssetTvRating = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * The type of an asset on the Verizon Media Platform, represented by a value from the following list:
 * <br/> - `'asset'`: A Video-on-demand content asset.
 * <br/> - `'channel'`: A Live content channel.
 * <br/> - `'event'`: A Live event.
 *
 * @public
 */
export declare type VerizonMediaAssetType = 'asset' | 'channel' | 'event';

/**
 * Describes the configuration of the Verizon Media integration.
 *
 * @public
 */
export declare interface VerizonMediaConfiguration {
    /**
     * The offset after which an ad break may be skipped, in seconds.
     *
     * @remarks
     * If the offset is -1, the ad is unskippable.
     * If the offset is 0, the ad is immediately skippable.
     * Otherwise it must be a positive number indicating the offset.
     *
     * @defaultValue `-1`
     */
    defaultSkipOffset?: number;
    /**
     * The ad skip strategy which is used when seeking over ads.
     *
     * @defaultValue `'play-none'`.
     */
    onSeekOverAd?: SkippedAdStrategy;
    /**
     * The Verizon Media UI configuration.
     *
     * @remarks
     * Only available with the features `'verizonmedia'` and `'ui'`.
     */
    ui?: VerizonMediaUiConfiguration;
}

/**
 * The events fired by the {@link VerizonMedia | Verizon Media API}.
 *
 * @public
 */
export declare interface VerizonMediaEventMap {
    /**
     * {@inheritDoc VerizonMediaPreplayResponseEvent}
     */
    preplayresponse: VerizonMediaPreplayResponseEvent;
    /**
     * {@inheritDoc VerizonMediaAssetInfoResponseEvent}
     */
    assetinforesponse: VerizonMediaAssetInfoResponseEvent;
    /**
     * {@inheritDoc VerizonMediaPingResponseEvent}
     */
    pingresponse: VerizonMediaPingResponseEvent;
    /**
     * {@inheritDoc VerizonMediaPingErrorEvent}
     */
    pingerror: VerizonMediaPingErrorEvent;
}

/**
 * Represents a combination of user identifier and one or more external identifiers for Verizon Media assets.
 *
 * @remarks
 * <br/> - Each combination of the user identifier and external identifier determines a unique asset on the Verizon Media Platform.
 *
 * @public
 */
export declare interface VerizonMediaExternalId {
    /**
     * The user identifier for the asset(s).
     */
    userId: string;
    /**
     * The external identifier(s) for the asset(s).
     */
    externalId: string | string[];
}

/**
 * Describes the configuration of Verizon Media Ping features.
 *
 * @public
 */
export declare interface VerizonMediaPingConfiguration {
    /**
     * Whether to increase the accuracy of ad events by passing the current playback time in Ping requests.
     *
     * @remarks
     * <br/> - Only available when {@link VerizonMediaSource.assetType} is `'asset'`.
     *
     * @defaultValue `false`
     *
     */
    adImpressions?: boolean;
    /**
     * Whether to enable FreeWheel's Video View by Callback feature to send content impressions to the FreeWheel server.
     *
     * @remarks
     * <br/> - Only available when {@link VerizonMediaSource.assetType} is `'asset'`.
     *
     * @defaultValue `false`
     */
    freeWheelVideoViews?: boolean;
    /**
     * Whether to request information about upcoming ad breaks in the Ping responses.
     *
     * @remarks
     * <br/> - This feature will update the exposed ads found on {@link VerizonMedia.ads | player.verizonMedia.ads }.
     * <br/> - Only available when {@link VerizonMediaSource.assetType} is `'event'` or `'channel'`.
     *
     * @defaultValue `true` if {@link VerizonMediaSource.assetType} is `'event'` or `'channel'`, otherwise `false`.
     */
    linearAdData?: boolean;
}

/**
 * Fired when an error or invalid response is received from the Ping API.
 *
 * @public
 */
export declare interface VerizonMediaPingErrorEvent extends Event_2<'pingerror'> {
    /**
     * The error message.
     */
    readonly error: string;
}

/**
 * Represents a Verizon Media Ping response.
 *
 * @remarks
 * <br/> - See {@link https://docs.vdms.com/video/#Develop/Pingv2.htm%3FTocPath%3DDevelop%7CClient%2520(Media%2520Player)%7C_____3 | Ping API (Version 2)}.
 *
 * @public
 */
export declare interface VerizonMediaPingResponse {
    /**
     * The playback position at which the next ping request must be made, in seconds.
     *
     * @remarks
     * <br/> - Ping requests should stop after receiving `-1`.
     */
    next_time: number;
    /**
     * The live ad information.
     */
    ads?: VerizonMediaResponseLiveAds;
    /**
     * Whether {@link VerizonMediaAds.currentAdBreak} is ending.
     *
     * @remarks
     * <br/> - False if `0`, true otherwise.
     */
    currentBreakEnd?: number;
    /**
     * List of VAST extensions returned by the ad server.
     */
    extensions?: object[];
    /**
     * The last error that occurred, if any.
     */
    error?: string;
}

/**
 * Fired when a Ping response is received.
 *
 * @public
 */
export declare interface VerizonMediaPingResponseEvent extends Event_2<'pingresponse'> {
    /**
     * The response which has been received.
     */
    readonly response: VerizonMediaPingResponse;
}

/**
 * Represents a Verizon Media Preplay base response.
 *
 * @public
 */
export declare interface VerizonMediaPreplayBaseResponse {
    /**
     * The response type of the request.
     */
    type: VerizonMediaPreplayResponseType;
    /**
     * The manifest's URL.
     */
    playURL: string;
    /**
     * The zone prefix for the viewer's session.
     *
     * @remarks
     * <br/> - Use this prefix when submitting playback or API requests for this session.
     *
     * @example
     * E.g. 'https://content-ause2.uplynk.com/'
     */
    prefix: string;
    /**
     * The identifier of the viewer's session.
     */
    sid: string;
    /**
     * The content protection information.
     *
     * @remarks
     * <br/> - Currently, this only contains the Fairplay certificate URL.
     * <br/> - Widevine will default to 'https://content.uplynk.com/wv'.
     * <br/> - Playready will default to 'https://content.uplynk.com/pr'.
     */
    drm?: VerizonMediaResponseDrm;
}

/**
 * Represents a Verizon Media Preplay response for live assets.
 *
 * @public
 */
export declare interface VerizonMediaPreplayLiveResponse extends VerizonMediaPreplayBaseResponse {
    /**
     * The response type of the request.
     */
    type: VerizonMediaPreplayResponseType.LIVE;
}

/**
 * Type of a Verizon Media Preplay response.
 *
 * @public
 */
export declare type VerizonMediaPreplayResponse = VerizonMediaPreplayVodResponse | VerizonMediaPreplayLiveResponse;

/**
 * Fired when a Preplay response is received.
 *
 * @public
 */
export declare interface VerizonMediaPreplayResponseEvent extends Event_2<'preplayresponse'> {
    /**
     * The response which has been received.
     */
    readonly response: VerizonMediaPreplayResponse;
}

/**
 * The response type of the Verizon Media Preplay request, represented by a value from the following list:
 * <br/> - `'vod'`
 * <br/> - `'live'`
 *
 * @public
 */
export declare enum VerizonMediaPreplayResponseType {
    VOD = "vod",
    LIVE = "live"
}

/**
 * Represents a Verizon Media Preplay response for VOD assets.
 *
 * @public
 */
export declare interface VerizonMediaPreplayVodResponse extends VerizonMediaPreplayBaseResponse {
    /**
     * The response type of the request.
     */
    type: VerizonMediaPreplayResponseType.VOD;
    /**
     * The advertisement information.
     */
    ads: VerizonMediaResponseVodAds;
    /**
     * The URL to the interstitial information
     *
     * @remarks
     * <br/> - This file is a XML.
     * <br/> - This parameter reports `null` when ads are not found.
     * <br/> - It should only be used on Apple TV.
     */
    interstitialURL: string | null | undefined;
}

/**
 * Fired when the ad break is removed.
 *
 * @public
 */
export declare interface VerizonMediaRemoveAdBreakEvent extends Event_2<'removeadbreak'> {
    /**
     * The ad break which has been removed.
     */
    readonly adBreak: VerizonMediaAdBreak;
}

/**
 * Fired when the ad is removed.
 *
 * @public
 */
export declare interface VerizonMediaRemoveAdEvent extends Event_2<'removead'> {
    readonly ad: VerizonMediaAd;
}

/**
 * Fired when an asset is removed.
 *
 * @public
 */
export declare interface VerizonMediaRemoveAssetEvent extends Event_2<'removeasset'> {
    /**
     * The asset which has been removed.
     */
    readonly asset: VerizonMediaAsset;
}

/**
 * Represents a Verizon Media DRM response.
 *
 * @public
 */
export declare interface VerizonMediaResponseDrm {
    /**
     * The Fairplay certificate URL.
     */
    fairplayCertificateURL?: string;
    /**
     * The Widevine certificate URL.
     */
    widevineLicenseURL?: string;
    /**
     * The PlayReady certificate URL.
     */
    playreadyLicenseURL?: string;
}

/**
 * Represents a Verizon Media response with live ads.
 *
 * @public
 */
export declare interface VerizonMediaResponseLiveAd {
    /**
     * Identifier for the ad.
     */
    ad_id: string;
    /**
     * The API framework, if any.
     *
     * @remarks
     * <br/> - If the value is 'VPAID', then the ad is a VPAID ad.
     * <br/> - Otherwise the ad is an Uplynk CMS asset.
     */
    apiFramework: string | null;
    /**
     * List of companion ads of the ad.
     */
    companions: VerizonMediaResponseLiveAd[];
    /**
     * The creative identifier.
     *
     * @remarks
     * <br/> - Either a VPAID URL if the API framework is `'VPAID'`.
     * <br/> - Otherwise an asset ID from the Uplynk CMS.
     */
    creative: string;
    /**
     * The duration of the ad, in seconds.
     */
    duration: number;
    /**
     * The creative's mime type.
     *
     * @remarks
     * <br/> - Either 'application/javascript' if the API framework is `'VPAID'`.
     * <br/> - Otherwise 'uplynk/m3u8'.
     */
    mimeType: string;
    /**
     * The height of the ad, in pixels.
     *
     * @remarks
     * <br/> - Returns `0` when this is not a companion.
     */
    height: number;
    /**
     * The width of the ad, in pixels.
     *
     * @remarks
     * <br/> - Returns `0` when this is not a companion.
     */
    width: number;
    /**
     * List of VAST extensions returned by the ad server.
     */
    extensions?: object[];
    /**
     * Record of FreeWheel-defined creative parameters.
     * Each entry contains the parameter name together with the associated value.
     */
    fw_parameters?: Record<string, string>;
}

/**
 * Represents a Verizon Media response for live ad breaks.
 *
 * @public
 */
export declare interface VerizonMediaResponseLiveAdBreak {
    /**
     * The identifier of the ad break.
     */
    breakId: string;
    /**
     * List of ad information.
     */
    ads: VerizonMediaResponseLiveAd[];
    /**
     * The type of the ad break.
     */
    type: 'linear' | 'nonlinear';
    /**
     * The position of the ad break, represented by a value from the following list:
     * <br/> - `'preroll'`: Ad break that plays before the content.
     * <br/> - `'midroll'`: Ad break that plays during the content.
     * <br/> - `'postroll'`: Ad break that plays after the content.
     * <br/> - `'pause'`: Ad break that should be shown when the player is paused.
     * <br/> - `'overlay'`: Non-linear ad break that is shown over the player.
     * <br/> - `''`: Unknown ad break position.
     */
    position: 'preroll' | 'midroll' | 'postroll' | 'pause' | 'overlay' | '';
    /**
     * The time offset of the ad break, in seconds.
     */
    timeOffset: number;
    /**
     * The duration of the ad break, in seconds.
     */
    duration: number;
    /**
     * The height of the ads in the ad break, in pixels.
     *
     * @remarks
     * <br/> - Each ad can override this value.
     */
    height?: number;
    /**
     * The width of the ads in the ad break, in pixels.
     *
     * @remarks
     * <br/> - Each ad can override this value.
     */
    width?: number;
    /**
     * A record of all VAST 3.0 tracking events for this ad.
     * Each entry contains an event name with associated tracking URLs.
     */
    events: Record<string, string[]>;
}

/**
 * Represents a Verizon Media response with advertisement information for live assets.
 *
 * @public
 */
export declare interface VerizonMediaResponseLiveAds {
    /**
     * List of ad break information.
     *
     * @remarks
     * <br/> - This includes both linear and non-linear ads.
     */
    breaks: VerizonMediaResponseLiveAdBreak[];
}

/**
 * The Verizon Media response with ad information for VOD assets.
 *
 * @public
 */
export declare interface VerizonMediaResponseVodAd {
    /**
     * The duration of the ad, in seconds.
     */
    duration: number;
    /**
     * The API framework, if any.
     *
     * @remarks
     * <br/> - If the value is 'VPAID', then the ad is a VPAID ad.
     * <br/> - Otherwise the ad is an Uplynk CMS asset.
     */
    apiFramework: string | null;
    /**
     * The creative identifier.
     *
     * @remarks
     * <br/> - Either a VPAID URL if the API framework is `'VPAID'`.
     * <br/> - Otherwise an asset ID from the Uplynk CMS.
     */
    creative: string;
    /**
     * The creative's mime type.
     *
     * @remarks
     * <br/> - Either 'application/javascript' if the API framework is `'VPAID'`.
     * <br/> - Otherwise 'uplynk/m3u8'.
     */
    mimeType: string;
    /**
     * The width of the ad, in pixels.
     *
     * @remarks
     * <br/> - Returns `0` when this is not a companion.
     */
    width: number;
    /**
     * The height of the ad, in pixels.
     *
     * @remarks
     * <br/> - Returns `0` when this is not a companion.
     */
    height: number;
    /**
     * List of companion ads of the ad.
     */
    companions: VerizonMediaResponseVodAd[];
    /**
     * List of VAST extensions returned by the ad server.
     */
    extensions?: object[];
    /**
     * Record of FreeWheel-defined creative parameters.
     * Each entry contains the parameter name together with the associated value.
     */
    fw_parameters?: Record<string, string>;
    /**
     * A record of all VAST 3.0 tracking events for the ad.
     * Each entry contains an event name with associated tracking URLs.
     */
    events: Record<string, string[]>;
}

/**
 * Represents a Verizon Media response with ad break information for VOD assets.
 *
 * @public
 */
export declare interface VerizonMediaResponseVodAdBreak {
    /**
     * The type of the ad break.
     */
    type: 'linear' | 'nonlinear';
    /**
     * The position of the ad break, represented by a value from the following list:
     * <br/> - `'preroll'`: Ad break that plays before the content.
     * <br/> - `'midroll'`: Ad break that plays during the content.
     * <br/> - `'postroll'`: Ad break that plays after the content.
     * <br/> - `'pause'`: Ad break that should be shown when the player is paused.
     * <br/> - `'overlay'`: Non-linear ad break that is shown over the player.
     * <br/> - `''`: Unknown ad break position.
     */
    position: 'preroll' | 'midroll' | 'postroll' | 'pause' | 'overlay' | '';
    /**
     * The time offset of the ad break, in seconds.
     */
    timeOffset: number;
    /**
     * The duration of the ad break, in seconds.
     */
    duration: number;
    /**
     * List of ad information.
     */
    ads: VerizonMediaResponseVodAd[];
    /**
     * A record of all VAST 3.0 tracking events for the ad break.
     * Each entry contains an event name with associated tracking URLs.
     */
    events: Record<string, string[]>;
}

/**
 * Represents the offset of a Verizon Media ad break.
 *
 * @public
 */
export declare interface VerizonMediaResponseVodAdBreakOffset {
    /**
     * The index of the ad break in the ads.breaks array.
     */
    index: number;
    /**
     * The time offset of the ad break, in seconds.
     */
    timeOffset: number;
}

/**
 * Represents a Verizon Media response with a placeholder for an ad for VOD assets.
 *
 * @remarks
 * A placeholder is an ad which
 * <br/> - is a short blank video for non-video ads (e.g. VPAID ads).
 * <br/> - is a system asset which is potentially subject to change.
 *
 * @public
 */
export declare interface VerizonMediaResponseVodAdPlaceholder {
    /**
     * The index of the placeholder's ad break in the `ads.breaks` array.
     */
    breaksIndex: number;
    /**
     * The index of the placeholder in the `ads.breaks.ads` array.
     */
    adsIndex: number;
    /**
     * The start time of the placeholder, in seconds.
     */
    startTime: number;
    /**
     * The end time of the placeholder, in seconds.
     */
    endTime: number;
}

/**
 * Represents a Verizon Media response with advertisement information for VOD assets.
 *
 * @public
 */
export declare interface VerizonMediaResponseVodAds {
    /**
     * List of ad break information.
     *
     * @remarks
     * <br/> - This includes both linear and non-linear ads.
     */
    breaks: VerizonMediaResponseVodAdBreak[];
    /**
     * List of ad break offset information.
     */
    breakOffsets: VerizonMediaResponseVodAdBreakOffset[];
    /**
     * List of placeholder offset information.
     */
    placeholderOffsets: VerizonMediaResponseVodAdPlaceholder[];
}

/**
 * Represents a media resource which is found on the Verizon Media Platform.
 *
 * @public
 */
export declare interface VerizonMediaSource extends BaseSource {
    /**
     * The integration ID of the source.
     */
    integration: 'verizon-media';
    /**
     * One or multiple asset identifiers for the source.
     *
     * @remarks
     * <br/> - The order of a list of asset identifiers is the order their corresponding assets will be played in.
     */
    id: VerizonMediaAssetId | VerizonMediaAssetId[] | VerizonMediaExternalId;
    /**
     * The query string parameters added to Verizon Media Preplay requests.
     *
     * @remarks
     * Each entry contains the parameter name with associated value.
     *
     * Valid parameters:
     * <br/> - {@link https://docs.vdms.com/video/#Develop/Preplayv2.htm | Uplynk Preplay parameters}
     * <br/> - {@link https://docs.vdms.com/video/#AdIntegration/AOL-One-Video.htm | Uplynk ads with AOL One Video parameters}
     * <br/> - {@link https://docs.vdms.com/video/#AdIntegration/DoubleClick.htm | Uplynk ads with Doubleclick parameters}
     * <br/> - {@link https://docs.vdms.com/video/#AdIntegration/Freewheel.htm | Uplynk ads with FreeWheel parameters}
     */
    preplayParameters?: Record<string, string> | Array<[string, string]>;
    /**
     * The query string parameters added to Verizon Media playback URL requests.
     *
     * @remarks
     * Each entry contains the parameter name with associated value.
     *
     * Valid parameters:
     * <br/> - {@link https://docs.vdms.com/video/#Setup/Customizing-Playback.htm | Uplynk Playback Customization parameters}
     * <br/> - {@link https://docs.vdms.com/video/#Setup/Playback-URLs.htm | Uplynk Tokens parameters}
     */
    playbackUrlParameters?: Record<string, string>;
    /**
     * The asset content type of the source.
     *
     * @defaultValue `'asset'`
     */
    assetType?: VerizonMediaAssetType;
    /**
     * Whether the assets of the source are content protected.
     *
     * @defaultValue `false`
     */
    contentProtected?: boolean;
    /**
     * The Ping API feature configuration of the source.
     *
     * @remarks
     * <br/> - A configuration with all features disabled will prevent Ping requests being sent.
     *
     * @defaultValue
     * A configuration with all features `false` except for `linearAdData`, which will be `true` if {@link VerizonMediaSource.assetType} is
     * `'channel'` or `'event'` and `false` otherwise.
     */
    ping?: VerizonMediaPingConfiguration;
    /**
     * Whether asset info will be fetched from the Verizon Media Asset Info API and exposed on the player API.
     *
     * @remarks
     * <br/> - This feature is only available if {@link VerizonMediaSource.assetType} is `'asset'`
     *
     * @defaultValue `true` if {@link VerizonMediaSource.assetType} is `'asset'` and `false` otherwise
     */
    assetInfo?: boolean;
}

/**
 * Describes the UI configuration of the Verizon Media integration.
 *
 * @public
 */
export declare interface VerizonMediaUiConfiguration {
    /**
     * Whether an up next content countdown is shown on the UI.
     *
     * @remarks
     * <br/> - This countdown starts ten seconds before the up next asset starts.
     *
     * @defaultValue `true`
     */
    contentNotification?: boolean;
    /**
     * Whether an ad break skip button is shown on the UI.
     *
     * @remarks
     * <br/> - When unskippable, a banner with countdown is shown instead.
     *
     * @defaultValue `true`
     */
    adNotification?: boolean;
    /**
     * Whether the seek bar is supplemented with asset dividers on the UI.
     *
     * @defaultValue `true`
     */
    assetMarkers?: boolean;
    /**
     * Whether the seek bar is supplemented with marked areas in which ad breaks are present on the UI.
     *
     * @defaultValue `true`
     */
    adBreakMarkers?: boolean;
}

/**
 * Fired when the ad break is updated.
 *
 * @public
 */
export declare interface VerizonMediaUpdateAdBreakEvent extends Event_2<'updateadbreak'> {
    /**
     * The ad break which has been updated.
     */
    readonly adBreak: VerizonMediaAdBreak;
}

/**
 * The version of the THEOplayer SDK.
 *
 * @public
 */
export declare const version: string;

/**
 * The bundled Video.js library, based on version 5.x.
 *
 * @remarks
 * <br/> - See {@link https://docs.videojs.com/ | documentation}.
 *
 * @public
 */
export declare namespace videojs {
    /**
     * An instance of a player UI.
     *
     * @remarks
     * <br/> - See {@link https://docs.videojs.com/player | documentation}.
     *
     * @public
     */
    export interface Player {
    }
}

/**
 * Represents a quality of a video track.
 *
 * @public
 */
export declare interface VideoQuality extends Quality {
    /**
     * The video height of the video quality, in pixels.
     */
    readonly height: number;
    /**
     * The video width of the video quality, in pixels.
     */
    readonly width: number;
    /**
     * The framerate of the video quality.
     */
    readonly frameRate: number;
    /**
     * The timestamp of the first frame of the video quality, in seconds.
     */
    readonly firstFrame: number;
}

/**
 * Describes the configuration of the Vimond DRM integration.
 *
 * @public
 */
export declare interface VimondDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: VimondIntegrationID;
}

/**
 * The identifier of the Vimond integration.
 *
 * @public
 */
export declare type VimondIntegrationID = 'vimond';

/**
 * The visibility API.
 *
 * @public
 */
export declare interface Visibility {
    /**
     * Whether the {@link Visibility.ratio} of visible pixels is exceeded.
     */
    readonly visible: boolean;
    /**
     * The ratio of pixels of the player that are within the viewport.
     */
    readonly ratio: number;
    /**
     * The threshold that the ratio must exceed for the player to be visible.
     *
     * @remarks
     * <br/> - This number is in the range of [0, 1].
     */
    visibleThreshold: number;
    /**
     * Add a visibility observer to monitor the player.
     *
     * @remarks
     * <br/> - The callback is triggered every time the ratio of visible pixels crosses a threshold, and receives the ratio of visible pixels as first argument.
     * <br/> - The list of thresholds is evenly distributed between 0 and 1, with the distance between every two consecutive thresholds determined by the given step.
     *
     * @param step - The step between every threshold. This number is in the range of ]0, 1].
     * @param callback - The callback to be triggered every time a threshold is crossed.
     * @returns A new visibility observer.
     */
    addObserver(step: number, callback: VisibilityObserverCallback): VisibilityObserver;
    /**
     * Remove a visibility observer.
     *
     * The observer will stop monitoring player visibility,
     * and will no longer trigger its callback.
     *
     * @param observer - The observer to remove.
     */
    removeObserver(observer: VisibilityObserver): void;
}

/**
 * Represents a visibility observer.
 *
 * @public
 */
export declare interface VisibilityObserver {
    /**
     * The ratio of pixels of the player that are within the viewport.
     *
     * @remarks
     * <br/> - This value is updated every time an observed threshold is crossed. It is accurate up to the size of this observer's step.
     */
    readonly ratio: number;
    /**
     * List of thresholds which are monitored by the observer.
     */
    readonly thresholds: ReadonlyArray<number>;
}

/**
 * A callback for a visibility observer.
 *
 * @param ratio - Describes the ratio of visible pixels of the player.
 *
 * @public
 */
export declare type VisibilityObserverCallback = (ratio: number) => void;

/**
 * An promise-returning asynchronous callback.
 *
 * The callback *must* return a promise that resolves (or rejects) after all asynchronous work is done.
 *
 * @public
 */
export declare type VoidPromiseCallback = () => PromiseLike<void>;

/**
 * Fired when `ChromelessPlayer.volume` changes.
 *
 * @public
 */
export declare interface VolumeChangeEvent extends Event_2<'volumechange'> {
    /**
     * The player's new volume.
     */
    readonly volume: number;
}

/**
 * The iframe policies for VPAID ads, represented by a value from the following list:
 * <br/> - `'enabled'`: Ads will load in a cross domain iframe. This disables access to the site via JavaScript. Ads that require a friendly iframe will fail to play.
 * <br/> - `'insecure'`: Ads will load in a friendly iframe. This allows access to the site via JavaScript.
 * <br/> - `'disabled'`: Ads will error when requested.
 *
 * @public
 */
export declare type VPAIDMode = 'enabled' | 'insecure' | 'disabled';

/**
 * The virtual reality API which allows you to control the display of 360° VR videos.
 *
 * @remarks
 * <br/> - See {@link VRConfiguration} to configure a source.
 * <br/> - The player utilises the {@link Canvas | Canvas API} internally to render 360° content and is restricted to the same limitations.
 * <br/> - To access `devicemotion` events on mobile devices, a page needs to be served over https on modern browsers.
 * <br/> - To access `devicemotion` events on Safari for iOS 13+ you need to request user permission using the {@link https://www.w3.org/TR/orientation-event/#dom-devicemotionevent-requestpermission | DeviceMotionEvent.requestPermission API}
 * <br/> - iPhone support requires iOS 10: On iOS 9 and lower, iPhone forces HTML5 video to play in fullscreen. As a result, the canvas used by THEOplayer VR will not be visible during playback, since it will be behind the fullscreen video. iPhone users must upgrade to iOS 10 or higher for the full VR experience. Note that iPad is unaffected: VR is supported even on iOS 9 and lower.
 * <br/> - Cross-origin iframes on iOS: iOS blocks cross-origin iframes from accessing `devicemotion` events {@link https://bugs.webkit.org/show_bug.cgi?id=152299 | WebKit bug #152299}. As a result, when using THEOplayer inside a cross-origin iframe, the player cannot rotate the VR display to align with the device's physical orientation. Fortunately, this can be worked around by listening for `devicemotion` events on the top frame and forwarding them as messages to the iframe. THEOplayer will automatically handle these messages as if they were native `devicemotion` events:
 *
 * @example
 * ```
 * const playerIframe = document.querySelector('iframe');
 * window.addEventListener('devicemotion', function (event) {
 *    playerIframe.contentWindow.postMessage({
 *        type : 'devicemotion',
 *        deviceMotionEvent : {
 *            acceleration : event.acceleration,
 *            accelerationIncludingGravity : event.accelerationIncludingGravity,
 *            interval : event.interval,
 *            rotationRate : event.rotationRate,
 *            timeStamp : event.timeStamp
 *        }
 *    }, '*');
 * });
 * ```
 *
 * @public
 */
export declare interface VR extends EventDispatcher<VREventMap> {
    /**
     * Whether stereo mode is enabled.
     *
     * @remarks
     * <br/> - Setting it to `true` renders the video in VR.
     *
     * @defaultValue `false`
     */
    stereo: boolean;
    /**
     * The viewing direction.
     */
    direction: VRDirection;
    /**
     * The vertical field of view in VR, in degress.
     *
     * @remarks
     * <br/> - It should be a number in the range of [0, 180].
     *
     * @defaultValue `72`
     */
    verticalFOV: number;
    /**
     * Whether the player can present in VR mode.
     */
    readonly canPresentVR: boolean;
    /**
     * The state of the VR feature.
     */
    readonly state: VRState;
}

/**
 * Describes the configuration of the virtual reality feature of a source.
 *
 * @remarks
 * <br/> - Available since v2.12.0.
 * <br/> - See {@link VR | the VR API} to control display of VR videos.
 *
 * @public
 */
export declare interface VRConfiguration {
    /**
     * Whether the source contains 360° video content.
     *
     * @defaultValue `false`
     */
    '360'?: boolean;
    /**
     * The stereoscopic mode of the media.
     *
     * @defaultValue `''`
     */
    stereoMode?: VRStereoMode;
}

/**
 * Represents a direction in the VR feature.
 *
 * @public
 */
export declare interface VRDirection {
    /**
     * The rotational position around the Z-axis.
     *
     * @remarks
     * <br/> - This number is in the range of [-180, 180].
     */
    yaw: number;
    /**
     * The rotational position around the X-axis.
     *
     * @remarks
     * <br/> - This number is in the range of [-180, 180].
     */
    roll: number;
    /**
     * The rotational position around the Y-axis.
     *
     * @remarks
     * <br/> - This number is in the range of [-180, 180].
     */
    pitch: number;
}

/**
 * The events fired by the {@link VR | VR API}.
 *
 * @public
 */
export declare interface VREventMap {
    /**
     * {@inheritDoc DirectionChangeEvent}
     */
    directionchange: DirectionChangeEvent;
    /**
     * {@inheritDoc StateChangeEvent}
     */
    statechange: StateChangeEvent;
    /**
     * {@inheritDoc StereoChangeEvent}
     */
    stereochange: StereoChangeEvent;
    /**
     * {@inheritDoc ErrorEvent}
     */
    error: ErrorEvent_2;
}

/**
 * The state of the VR feature, represented by a value from the following list:
 * <br/> - `'unavailable'`
 * <br/> - `'available'`
 * <br/> - `'presenting'`
 *
 * @public
 */
export declare type VRState = 'unavailable' | 'available' | 'presenting';

/**
 * The stereo mode of the VR integration, represented by a value from the following list:
 * <br/> - `''`: No stereo mode
 * <br/> - `'horizontal'`: The two viewpoints are in a side-by-side layout. The view for the left eye is in the left half of the video frame, the view for the right eye is in the right half of the video frame.
 * <br/> - `'vertical'`: The two viewpoints are in a top-bottom layout. The view for the left eye is in the upper half of the video frame, the view for the right eye is in the lower half of the video frame.
 *
 * @public
 */
export declare type VRStereoMode = '' | 'horizontal' | 'vertical';

/**
 * A WebVTT-defined text alignment, represented by a value from the following list:
 * <br/> - `'start'`: The text of each line is aligned towards the start side of the box.
 * <br/> - `'center'`: The text of each line is aligned at the center of the box.
 * <br/> - `'end'`: The text of each line is aligned towards the end side of the box.
 * <br/> - `'left'`: The text of each line is aligned to the box’s left side for horizontal cues, or top side otherwise.
 * <br/> - `'right'`: The text of each line is aligned to the box’s right side for horizontal cues, or bottom side otherwise.
 *
 * @public
 */
export declare type VTTAlignSetting = 'start' | 'center' | 'end' | 'left' | 'right';

/**
 * A WebVTT-defined writing direction, represented by a value from the following list:
 * <br/> - `''`: Horizontal. A line extends horizontally and is offset vertically from the video viewport’s top edge, with consecutive lines displayed below each other.
 * <br/> - `'rl'`: Vertical right-to-left. A line extends vertically and is offset horizontally from the video viewport’s right edge, with consecutive lines displayed to the left of each other.
 * <br/> - `'lr'`: vertical left-to-right. A line extends vertically and is offset horizontally from the video viewport’s left edge, with consecutive lines displayed to the right of each other.
 *
 * @public
 */
export declare type VTTDirectionSetting = '' | 'rl' | 'lr';

/**
 * A WebVTT-defined line offset, represented by a value from the following list:
 * <br/> - a `number`: The line offset is expressed in a number of text lines or a percentage of the video viewport height or width.
 * <br/> - `'auto'`: The line offset depends on the other showing tracks.
 *
 * @remarks
 * <br/> - The semantics of the `number` variant are dependent on {@link WebVTTCue.snapToLines}.
 *
 * @public
 */
export declare type VTTLine = number | 'auto';

/**
 * A WebVTT-defined line alignment, represented by a value from the following list:
 * <br/> - `'start'`: The cue box's start is aligned at a specified line.
 * <br/> - `'center'`: The cue box's center is aligned at a specified line.
 * <br/> - `'end'`: The cue box's end is aligned at a specified line.
 *
 * @public
 */
export declare type VTTLineAlignSetting = 'start' | 'center' | 'end';

/**
 * A WebVTT-defined position, represented by a value from the following list:
 * <br/> - a number: The position is expressed as a percentage value.
 * <br/> - `'auto'`: The position depends on the text alignment of the cue.
 *
 * @public
 */
export declare type VTTPosition = number | 'auto';

/**
 * A WebVTT-defined position alignment, represented by a value from the following list:
 * <br/> - `'line-left'`: The cue box's start is aligned at a specified position.
 * <br/> - `'center'`: The cue box's center is aligned at a specified position.
 * <br/> - `'line-right'`: The cue box's end is aligned at a specified position.
 * <br/> - `'auto'`: The cue box's alignment is dependent on its text alignment setting.
 *
 * @public
 */
export declare type VTTPositionAlignSetting = 'line-left' | 'center' | 'line-right' | 'auto';

/**
 * A WebVTT-defined region scroll setting, represented by a value from the following list:
 * <br/> - `''`: None. Cues in the region stay fixed at the location they were first painted in.
 * <br/> - `'up'`: Up. Cues in the region will be added at the bottom of the region and push any already displayed cues in the region up until all lines of the new cue are visible in the region.
 *
 * @public
 */
export declare type VTTScrollSetting = '' | /* none */ 'up';

/**
 * Describes the configuration of the Vudrm DRM integration.
 *
 * @example
 * ```
 * var drmConfiguration = {
 *     integration : 'vudrm',
 *     playready: {
 *          licenseAcquisitionURL: 'yourVudrmPlayReadyLicenseAcquisitionURL'
 *     },
 *     widevine: {
 *         licenseAcquisitionURL: 'yourVudrmWidevineLicenseAcquisitionURL'
 *     },
 *     token: 'PEtleU9T...blhNTD4='
 * }
 * ```
 *
 * @public
 */
export declare interface VudrmDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: VudrmIntegrationID;
    /**
     * The authentication token.
     */
    token: string;
    /**
     * The key id.
     *
     * @remarks
     * <br/> - Only mandatory when chromecasting.
     */
    keyId?: string;
}

/**
 * The identifier of the Vudrm integration.
 *
 * @public
 */
export declare type VudrmIntegrationID = 'vudrm';

/**
 * Fired when playback has stopped because the next frame is not available, but the player expects that frame to become available in due course.
 *
 * @public
 */
export declare interface WaitingEvent extends Event_2<'waiting'> {
    /**
     * The player's current time.
     */
    readonly currentTime: number;
}

/**
 * An asynchronous callback to delay a request or response.
 *
 * @public
 */
export declare type WaitUntilCallback = NodeStyleVoidCallback | VoidPromiseCallback;

/**
 * The Web Audio API.
 *
 * @remarks
 * The Web Audio API allows you to reroute the audio output of THEOplayer to a Web Audio context.
 * This is done by providing a Web Audio source node which outputs the player's audio.
 * Using Web Audio allows developers to apply a variety of effects and transformations to the player's audio output,
 * e.g. equalization, volume normalization, ...
 *
 * The way the Web Audio standard was designed has a few consequences.
 *
 * Once the player has created an AudioNode within a given AudioContext,
 * you must connect it to an output node in the graph, directly or indirectly,
 * or the output will be silent. The flow of audio from the created node has to
 * reach an output node, one way or another. Of course, the player's output can
 * pass through an arbitrary number of intermediary nodes before it reaches an output node.
 *
 * Once the player's is rerouted, there is no way back: the audio cannot be released
 * from its AudioContext, as Web Audio specifies no way to release audio resources which are piped through.
 * This means that you cannot change the AudioContext of the output node, nor can you stop piping
 * the player audio to Web Audio. In a well-designed Web Audio setup, this should not matter,
 * as there should be exactly one AudioContext per page, and there should be no need to stop piping to Web Audio.
 *
 * For advertisements, due to technical limitations, not all the audio can be rerouted using Web Audio.
 * Notably, Google IMA ads do not allow their audio to be rerouted, and therefore will not pass through the Web
 * Audio graph as specified by the developer.
 *
 * Available since v2.19.4.
 *
 * @public
 */
export declare interface WebAudio {
    /**
     * Create an AudioNode in the given AudioContext.
     *
     * @remarks
     * <br/> - Audio playback from the player will be re-routed into the processing graph of the AudioContext.
     */
    createAudioSourceNode(audioCtx: AudioContext): AudioNode;
}

/**
 * Represents a cue of a {@link https://www.w3.org/TR/webvtt1/ | WebVTT} text track.
 *
 * @public
 */
export declare interface WebVTTCue extends TextTrackCue_2 {
    /**
     * The text alignment of the cue.
     */
    align: VTTAlignSetting;
    /**
     * The content of the cue in raw unparsed form.
     */
    content: string;
    /**
     * The line offset of the cue.
     */
    line: VTTLine;
    /**
     * The line alignment of the cue.
     */
    lineAlign: VTTLineAlignSetting;
    /**
     * The position of the cue.
     */
    position: VTTPosition;
    /**
     * The position alignment of the cue.
     */
    positionAlign: VTTPositionAlignSetting;
    /**
     * The region of the cue.
     */
    region: WebVTTRegion | null;
    /**
     * Whether snap-to-lines is enabled for the cue.
     *
     * @remarks
     * <br/> - This property indicates whether {@link WebVTTCue.line} is an integer number of lines or a percentage of the dimension of the video.
     */
    snapToLines: boolean;
    /**
     * The size of the cue's box.
     *
     * @remarks
     * <br/> - This property is to be interpreted as a percentage of the video, relative to the cue direction stated by {@link WebVTTCue.vertical}.
     */
    size: number;
    /**
     * The text of the cue in raw unparsed form.
     */
    text: string;
    /**
     * The writing direction of the cue.
     */
    vertical: VTTDirectionSetting;
}

/**
 * Represents a WebVTT region.
 *
 * @public
 */
export declare interface WebVTTRegion {
    /**
     * The identifier of the region.
     */
    readonly id: string;
    /**
     * The number of lines in the region.
     */
    readonly lines: number;
    /**
     * The horizontal coordinate of the anchor point of the region to the viewport, as a percentage of the video width.
     */
    readonly regionAnchorX: number;
    /**
     * The vertical coordinate of the anchor point of the region to the viewport, as a percentage of the video height.
     */
    readonly regionAnchorY: number;
    /**
     * The scroll setting of the region.
     */
    readonly scrollValue: VTTScrollSetting;
    /**
     * The horizontal coordinate of the point of the viewport the anchor point of the region is anchored to, as a percentage of the video width.
     */
    readonly viewportAnchorX: number;
    /**
     * The veritcal coordinate of the point of the viewport the anchor point of the region is anchored to, as a percentage of the video height.
     */
    readonly viewportAnchorY: number;
    /**
     * The width of the region, as a percentage of the video width.
     */
    readonly width: number;
    /**
     * The identifier of the region.
     *
     * @deprecated Superseded by {@link WebVTTRegion.id}.
     */
    readonly identifier: string;
}

/**
 * Describes the Widevine key system configuration.
 *
 * @public
 */
export declare type WidevineKeySystemConfiguration = KeySystemConfiguration;

/**
 * Describes the configuration of the Xstream DRM integration.
 *
 * @example
 * ```
 * const drmConfiguration = {
 *     integration : 'xstream',
 *     sessionId: 'yourSessionId',
 *     streamId: 'yourStreamId'
 *     fairplay: {
 *          licenseAcquisitionURL: 'yourLicenseAcquisitionURL'
 *          certificateURL: 'yourCertificateAcquisitionURL'
 *     },
 * }
 * ```
 *
 * @public
 */
export declare interface XstreamDRMConfiguration extends DRMConfiguration {
    /**
     * {@inheritDoc DRMConfiguration.integration}
     */
    integration: XstreamIntegrationID;
    /**
     * The identifier of the session.
     */
    sessionId: string;
    /**
     * The identifier of the stream.
     */
    streamId: string;
    /**
     * The ticket acquisition URL.
     */
    ticketAcquisitionURL: string;
}

/**
 * The identifier of the Xstream integration.
 *
 * @public
 */
export declare type XstreamIntegrationID = 'xstream';

/**
 * The Yospace API.
 *
 * @remarks
 * <br/> - Available since v2.14.7.
 *
 * @public
 */
export declare interface Yospace extends EventDispatcher<YospaceEventMap> {
    /**
     * The Yospace session.
     *
     * @remarks
     * <br/> - For the full API of this object, see {@link http://demo.yospace.com/SDK/javascript/docs/classes/YSSession.html | YSSession Class - Yospace JavaScript AdManagement SDK} for more information and examples
     */
    readonly session: object;
    /**
     * Register a set of callbacks to the player to the Yospace SDK.
     *
     * @remarks
     * <br/> - These callbacks will be used by the Yospace SDK to provide feedback to the player.
     *
     * @param callbackCollection - The {@link YospaceCallbackObject}
     */
    registerPlayer(callbackCollection: YospaceCallbackObject): void;
}

/**
 * Represents the collection of standard callback functions for a Yospace SessionManager.
 *
 * @remarks
 * <br/> - These callbacks will be used by the Yospace SDK to provide feedback to the player.
 * <br/> - See {@link http://demo.yospace.com/SDK/javascript/docs/classes/YSSessionManager.html#method_registerPlayer | YSSessionManager Class - Yospace JavaScript AdManagement SDK} for more information and examples
 *
 * @public
 */
export declare interface YospaceCallbackObject {
    AdBreakStart: () => void;
    AdvertStart: (mediaID: string) => void;
    AdvertEnd: (mediaID: string) => void;
    AdBreakEnd: () => void;
    InjectVast: () => void;
    UpdateTimeline: (timeline: any) => void;
}

/**
 * The events fired by the {@link Yospace | Yospace API}.
 *
 * @public
 */
export declare interface YospaceEventMap {
    /**
     * Fired when a new Yospace session starts.
     */
    sessionavailable: Event_2<'sessionavailable'>;
}

/**
 * The identifier of a Yospace's ID3 frame, represented by a value from the following list:
 * <br/> - `'YMID'`: This frame contains the media ID of the ad.
 * <br/> - `'YTYP'`: This frame contains the type of metadata.
 * <br/> - `'YSEQ'`: This frame contains the sequence number of the segment.
 * <br/> - `'YDUR'`: This frame contains the offset/duration from the beginning of the segment that contains the metadata.
 * <br/> - `'YSCP'`: This frame contains the customer-specific identifier.
 *
 * @remarks
 * <br/> - The format of type of metadata is 'S', 'M' or 'E', respectively for the start, middle and end.
 * <br/> - The format of sequence number of the segment is 'N:T' where 'N' is the segment number and 'T' is the total count of segments in this ad.
 *
 * @example
 * This is the first segment in an ad which consists out of five segments.
 * ```
 * const yseqFrame = {
 *     id: 'yseq',
 *     text: '1:5'
 * };
 * ```
 *
 * @public
 */
export declare type YospaceId = 'YMID' | 'YTYP' | 'YSEQ' | 'YDUR' | 'YSCP';

/**
 * Represents a configuration for server-side ad insertion with the Yospace pre-integration.
 *
 * @remarks
 * <br/> - Available since v2.14.7.
 *
 * @public
 */
export declare interface YospaceServerSideAdInsertionConfiguration extends ServerSideAdInsertionConfiguration {
    /**
     * The identifier for the SSAI pre-integration.
     */
    integration: YospaceSSAIIntegrationID;
    /**
     * The type of the requested stream.
     *
     * @defaultValue `'live'`
     */
    streamType?: YospaceStreamType;
}

/**
 * The identifier of the Yospace integration.
 *
 * @public
 */
export declare type YospaceSSAIIntegrationID = 'yospace';

/**
 * The type of the Yospace stream, represented by a value from the following list:
 * <br/> - `'live'`: The stream is a live stream.
 * <br/> - `'livepause'`: The stream is a live stream with a large DVR window.
 * <br/> - `'nonlinear'`: The stream is a Non-Linear Start-Over stream.
 * <br/> - `'vod'`: The stream is a video-on-demand stream.
 *
 * @public
 */
export declare type YospaceStreamType = 'vod' | 'live' | 'livepause' | 'nonlinear';

/**
 * Represents a media resource with a Yospace server-side ad insertion request.
 *
 * @public
 */
export declare interface YospaceTypedSource extends TypedSource {
    ssai: YospaceServerSideAdInsertionConfiguration;
}

/**
 * The identifier of the Youbora integration.
 *
 * @public
 */
export declare type YouboraAnalyticsIntegrationID = 'youbora';

/**
 * Describes the options of the Youbora integration.
 *
 * @remarks
 * The YouboraOptions object is a dictionary of Youbora options. The THEOplayer Youbora integration is built upon Youbora v6.
 * For a detailed overview of all available properties, please consult the Youbora options documentation page:
 * See {@link http://developer.nicepeopleatwork.com/plugins/general/setting-youbora-options/ | Setting Youbora options}
 *
 * Make sure to load the Youbora library with the THEOplayer adapter before initializing the player with YouboraOptions
 * See {@link http://developer.nicepeopleatwork.com/plugins/integration/js-browser/theo-player-2-v6/ | THEOplayer 2 v6}
 *
 * Note: the integration automatically tracks these content related properties:
 * <br/> - content.duration
 * <br/> - content.resource
 * <br/> - content.isLive
 * <br/> - content.rendition
 *
 * Available since v2.21.2.
 *
 * @public
 */
export declare interface YouboraOptions extends AnalyticsDescription {
    /**
     * {@inheritDoc AnalyticsDescription.integration}
     */
    integration: YouboraAnalyticsIntegrationID;
    /**
     * An entry which contains a Youbora option with associated value.
     */
    [key: string]: string | {
        [key: string]: string;
    };
}

export { }
export as namespace THEOplayer;
