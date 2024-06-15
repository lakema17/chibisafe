import { bundledLanguages, getHighlighter } from 'shiki';

const caddyLang = JSON.parse(fs.readFileSync('caddyfile.tmLanguage.json', 'utf8'))

export const highlighter = await getHighlighter({
	themes: ['github-dark-dimmed'],
	langs: [caddyLang, ...Object.keys(bundledLanguages)],
  langAlias: {
    caddyLang: 'Caddyfile'
  }
});
