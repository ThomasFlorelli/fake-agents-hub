const BASE = process.env.API_URL || 'http://127.0.0.1:3000';

export function apiUrl(path = '/') {
  return `${BASE.replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}`;
}

export async function request(method: string, path: string, body?: any) {
  const url = apiUrl(path);
  const opts: any = { method, headers: {} };
  if (body !== undefined) {
    opts.headers['content-type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(url, opts);
  const text = await res.text();
  let json: any = undefined;
  try {
    json = text ? JSON.parse(text) : undefined;
  } catch (e) {
    // not JSON
  }
  return { status: res.status, headers: Object.fromEntries(res.headers), body: json, text };
}

export const get = (p: string) => request('GET', p);
export const post = (p: string, b?: any) => request('POST', p, b);
export const put = (p: string, b?: any) => request('PUT', p, b);
export const del = (p: string) => request('DELETE', p);

export async function waitForApi(timeoutMs = 10_000, intervalMs = 500) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await get('/health');
      if (res.status === 200) return true;
    } catch (e) {
      // ignore
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`API did not become ready within ${timeoutMs}ms (API_URL=${BASE})`);
}
