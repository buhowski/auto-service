import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://sto-porshen.pages.dev',
	output: 'static',
	build: {
		inlineStylesheets: 'auto',
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
				},
			},
		},
	},
});
