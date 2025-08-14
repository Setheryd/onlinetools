export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { Resolver } from 'node:dns/promises';

const resolver = new Resolver();

function isValidHostname(name) {
  if (!name || name.length > 253) return false;
  const regex = /^(?=.{1,253}$)(?!-)(?:[a-zA-Z0-9-]{0,63}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$/;
  return regex.test(name);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = (searchParams.get('name') || '').trim();
  const type = ((searchParams.get('type') || 'A').trim()).toUpperCase();

  if (!name) return NextResponse.json({ error: 'Missing ?name=' }, { status: 400 });
  if (!isValidHostname(name)) return NextResponse.json({ error: 'Invalid hostname' }, { status: 400 });

  const supported = new Set(['A','AAAA','CNAME','MX','NS','TXT','SOA','SRV','PTR']);
  if (!supported.has(type)) return NextResponse.json({ error: `Unsupported record type. Use one of ${[...supported].join(', ')}` }, { status: 400 });

  try {
    const startedAt = Date.now();
    const records = await resolver.resolve(name, type);
    const durationMs = Date.now() - startedAt;
    return NextResponse.json({ name, type, records, durationMs });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}


