export const prerender = false;
import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';
import type { APIContext } from 'astro';

const handler = makeHandler({ config });

export async function ALL(context: APIContext) {
  const url = new URL(context.request.url);
  const host =
    context.request.headers.get('x-forwarded-host') ||
    context.request.headers.get('host') ||
    url.host;
  const proto =
    context.request.headers.get('x-forwarded-proto') ||
    url.protocol.replace(':', '');

  if (url.host !== host || url.protocol !== proto + ':') {
    const fixedUrl = new URL(context.request.url);
    fixedUrl.host = host;
    fixedUrl.protocol = proto + ':';
    const fixedRequest = new Request(fixedUrl.toString(), context.request);
    return handler({ ...context, request: fixedRequest });
  }

  return handler(context);
}
