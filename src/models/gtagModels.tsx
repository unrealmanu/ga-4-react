import GA4React from '../lib/ga4manager';

export type gtagEvent = 'event' | string;
export type gtagAction = 'page_view' | string;
export type gtagCategory = 'ecommerce' | 'engagement' | string;
export type gtagLabel = 'method' | 'search_term' | 'content_type' | string;

/**
 * @desc event accepted params
 * @interface gtagEventConfig
 */
export interface gtagEventConfig {
  event_label?: gtagLabel | string;
  event_category?: gtagCategory | string;
  non_interaction?: boolean;
}

/**
 * @desc pageview accepted params
 * @interface gtagPageView
 */
export interface gtagPageView {
  page_title?: string;
  page_location?: Location | string;
  page_path?: string;
  send_to?: string;
}

/**
 * @desc type of window.gtag
 * @type
 */
export type gtagFunction = (
  event: gtagEvent,
  action: gtagAction,
  data: gtagEventConfig | gtagPageView | object,
  nonInteraction?: boolean
) => {};

/**
 * @desc GA4React interface of main class
 * @interface GA4ReactInterface
 */
export interface GA4ReactInterface extends GA4ReactResolveInterface {
  initialize(): Promise<GA4ReactResolveInterface>;
}

export interface GA4ReactStaticInterface {
  new (): GA4React;
  isInitialized(): boolean;
  getGA4React(): GA4ReactResolveInterface | void;
}

/**
 * @desc on resolve GA4React initial promises, return functino in this interface
 * @interface GA4ReactResolveInterface
 */
export interface GA4ReactResolveInterface {
  pageview(
    path: string | Location,
    location?: string | Location,
    title?: string
  ): any;
  event(
    action: gtagAction,
    label: gtagLabel,
    data: gtagCategory,
    nonInteraction?: boolean
  ): any;
  gtag(...args: any): any;
  ga?(...args: any): any;
}

/**
 * @desc default accepted config
 * @interface GA4Config
 */
export interface GA4Config {
  debug_mode?: boolean;
  send_page_view?: boolean;
  groups?: string;
}

/**
 * @desc options for confgure Ga4Manager during initialization
 * @interface GA4ManagerOptionsInterface
 */
export interface GA4ManagerOptionsInterface {
  nonce?: Array<string>;
}
