import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IRequestOptions } from '../interfaces';

/**
 * Custom decorator to extract request information and metadata.
 * Returns an object containing details such as path, query params, user agent, platform, device, location, etc.
 *
 * @param _ - Data passed to the decorator (unused)
 * @param ctx - ExecutionContext provided by NestJS
 * @returns IRequestOptions - Object with request metadata
 */
export const RequestInfo = createParamDecorator(
  (_, ctx: ExecutionContext): IRequestOptions => {
    const req = ctx.switchToHttp().getRequest<FastifyRequest>();
    const res = ctx.switchToHttp().getResponse<FastifyReply>();

    // Safely extract headers as strings
    const getHeader = (header: string, fallback = 'unknown') => {
      const value = req.headers[header];
      if (Array.isArray(value)) return value[0] || fallback;
      return value || fallback;
    };

    const userAgent = getHeader('user-agent');
    const platform = getHeader('sec-ch-ua-platform');
    const browser = getHeader('sec-ch-ua', userAgent);

    return {
      path: req.url,
      queryParams: req.query,
      responseStatus: res.statusCode,
      ipAddress: req.ip,
      userAgent: userAgent,
      platform:
        getHeader('sec-ch-ua-platform', '') ||
        getHeader('sec-ch-ua', '') ||
        'unknown',
      deviceId: getHeader('x-device-id'),
      timestamp: Date.now(),
      durationMs: res.getHeader('X-Response-Time') as number | undefined,
      lang: getLang(req),
      os: platform,
      osVersion: 'unknown', // OS version parsing requires additional logic
      timezone: getHeader('x-timezone'),
      viewportHeight: parseInt(getHeader('x-viewport-height', '')) || undefined,
      viewportWidth: parseInt(getHeader('x-viewport-width', '')) || undefined,
      latitude: parseFloat(getHeader('x-latitude', '')) || undefined,
      longitude: parseFloat(getHeader('x-longitude', '')) || undefined,
      browser: browser,
      browserVersion: 'unknown', // Browser version parsing requires additional logic
      browserLanguage: getHeader('accept-language'),
      currentUrl: req.url,
    };
  },
);

/**
 * Extracts the preferred language from the request headers.
 *
 * @param req - The FastifyRequest object containing headers.
 * @returns The language code ('EN' or 'AR') in uppercase. Returns the fallback language if not found.
 *
 * Logic:
 * - Checks the 'Accept-Language' header in the request.
 * - If the header starts with 'en', returns 'EN'; otherwise, returns 'AR'.
 * - If the language is not 'en' or 'ar', returns the fallback language from environment variables or 'AR'.
 */
function getLang(req: FastifyRequest): string {
  // Safely get the language header as a string
  // Safely get the language header as a string
  const acceptLang = req.headers['Accept-Language'];

  const langHeader =
    (Array.isArray(acceptLang) ? acceptLang[0] : acceptLang) || 'ar';

  const language = langHeader.toLowerCase().startsWith('en') ? 'en' : 'ar';

  if (
    language !== undefined &&
    ['ar', 'en'].includes(language.toString().toLowerCase())
  ) {
    return language.toUpperCase();
  }

  // Returns fallback language.
  return (process.env.APP_FALLBACK_LANGUAGE ?? 'ar').toUpperCase();
}
