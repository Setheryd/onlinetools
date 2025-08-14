export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import tls from 'node:tls';

function isValidHostname(host) {
  if (!host || host.length > 253) return false;
  const regex = /^(?=.{1,253}$)(?!-)(?:[a-zA-Z0-9-]{0,63}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$/;
  return regex.test(host);
}

function fetchCertificate(host) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(443, host, { servername: host, timeout: 8000 }, () => {
      const cert = socket.getPeerCertificate(true);
      const cipher = socket.getCipher();
      const protocol = socket.getProtocol();
      socket.end();

      resolve({ cert, cipher, protocol });
    });
    socket.on('error', (err) => reject(err));
    socket.on('timeout', () => socket.destroy(new Error('Timeout connecting to host')));
  });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const host = (searchParams.get('host') || '').trim();
  if (!host) return NextResponse.json({ error: 'Missing ?host=' }, { status: 400 });
  if (!isValidHostname(host)) return NextResponse.json({ error: 'Invalid hostname' }, { status: 400 });

  try {
    const startedAt = Date.now();
    const { cert, cipher, protocol } = await fetchCertificate(host);
    const durationMs = Date.now() - startedAt;

    if (!cert || Object.keys(cert).length === 0) {
      return NextResponse.json({ error: 'No certificate presented' }, { status: 502 });
    }

    const now = new Date();
    const validFrom = cert.valid_from ? new Date(cert.valid_from) : null;
    const validTo = cert.valid_to ? new Date(cert.valid_to) : null;
    const daysToExpiry = validTo ? Math.ceil((validTo - now) / (1000*60*60*24)) : null;

    return NextResponse.json({
      host,
      subject: cert.subject || null,
      issuer: cert.issuer || null,
      serialNumber: cert.serialNumber || null,
      valid_from: cert.valid_from || null,
      valid_to: cert.valid_to || null,
      daysToExpiry,
      altNames: cert.subjectaltname || null,
      fingerprint: cert.fingerprint || null,
      fingerprint256: cert.fingerprint256 || null,
      publicKeyAlgorithm: cert.pubkey || null,
      signatureAlgorithm: cert.signatureAlgorithm || null,
      protocol,
      cipher,
      durationMs
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}


