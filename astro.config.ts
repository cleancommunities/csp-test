import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  compressHTML: false,
  build: {
		inlineStylesheets: `auto`, // Works either way
	},
  experimental: {
    csp: true,
  },
});
