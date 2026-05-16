import { readFileSync } from 'node:fs';
import path from 'node:path';

export function readHtmlBody(relativePath) {
  const filePath = path.join(process.cwd(), relativePath);
  const html = readFileSync(filePath, 'utf8');
  const match = html.match(/<body(?:[^>]*)>([\s\S]*?)<\/body>/i);
  return (match ? match[1] : html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/\s(?:src|href)="(?:\.\/)?(?:index\.html)?#([^\"]*)"/g, ' href="/#$1"')
    .replace(/href="index\.html#harga"/g, 'href="/#harga"')
    .replace(/href="\.\.\/index\.html#harga"/g, 'href="/#harga"')
    .replace(/src="assets\//g, 'src="/assets/')
    .replace(/href="qris\.html\?/g, 'href="/qris?');
}

export function readTextFile(relativePath) {
  return readFileSync(path.join(process.cwd(), relativePath), 'utf8');
}
