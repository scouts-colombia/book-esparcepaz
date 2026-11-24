#!/usr/bin/env node
/**
 * Prepara la publicación en Cloudflare Workers (solo archivos estáticos, sin código de
 * servidor) en el formato «Build Output» que publica la CLI `cf`:
 *
 *   npm run build && node scripts/cf-build-output.mjs && cf deploy --prebuilt
 *
 * Copia dist/ a .cloudflare/output/v0/workers/default/assets/ y escribe la configuración
 * del Worker. Con --sin-dominio no asocia el dominio (para probar en workers.dev).
 */
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const NOMBRE = 'book-esparcepaz';
const DOMINIO = 'esparcepaz.scout.org.co';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const salida = path.join(raiz, '.cloudflare', 'output', 'v0');
const worker = path.join(salida, 'workers', 'default');
const conDominio = !process.argv.includes('--sin-dominio');

const config = {
  name: NOMBRE,
  compatibilityDate: '2026-11-17',
  // Las rutas que no existen responden 404, como en Vercel.
  assets: { notFoundHandling: 'none' },
  ...(conDominio && { domains: [DOMINIO] }),
  workersDev: true,
  previewUrls: false,
};

await rm(path.join(raiz, '.cloudflare', 'output'), { recursive: true, force: true });
await mkdir(worker, { recursive: true });
await cp(path.join(raiz, 'dist'), path.join(worker, 'assets'), { recursive: true });
await writeFile(path.join(worker, 'worker.config.json'), JSON.stringify(config, null, 2));
await writeFile(path.join(salida, 'config.json'), JSON.stringify({ buildContext: { isPreview: false, mode: 'production' } }, null, 2));
console.log(`Build Output listo: Worker «${NOMBRE}»${conDominio ? ` en ${DOMINIO}` : ' (sin dominio)'}.`);
