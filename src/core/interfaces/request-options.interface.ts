/**
 * Interface representing options extracted from an HTTP request,
 * used for audit logging purposes.
 *
 * Each property corresponds to a piece of request metadata that can be
 * useful for tracking, analytics, or debugging.
 */
export interface IRequestOptions {
  /** The request path (URL endpoint). */
  path?: string;
  /** Query parameters sent with the request. */
  queryParams?: any;
  /** HTTP response status code. */
  responseStatus?: number;
  /** IP address of the client making the request. */
  ipAddress?: string;
  /** User agent string from the client. */
  userAgent?: string;
  /** Platform or device type (e.g., 'web', 'mobile'). */
  platform?: string;
  /** Timestamp when the request was received (in ms since epoch). */
  timestamp?: number;
  /** Duration of the request in milliseconds. */
  durationMs?: number;
  /** Language code from the request (e.g., 'en', 'fr'). */
  lang: string;
  /** Operating system name. */
  os?: string;
  /** Operating system version. */
  osVersion?: string;
  /** Unique device identifier, if available. */
  deviceId?: string;
  /** Timezone of the client. */
  timezone?: string;
  /** Height of the client viewport in pixels. */
  viewportHeight?: number;
  /** Width of the client viewport in pixels. */
  viewportWidth?: number;
  /** Latitude from client geolocation, if available. */
  latitude?: number;
  /** Longitude from client geolocation, if available. */
  longitude?: number;
  /** Name of the browser. */
  browser?: string;
  /** Version of the browser. */
  browserVersion?: string;
  /** Preferred browser language. */
  browserLanguage?: string;
  /** The current URL accessed by the client. */
  currentUrl?: string;
}
