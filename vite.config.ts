import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';
import dts from 'vite-plugin-dts';
import pkg from './package.json';
import postcssPresetEnv from 'postcss-preset-env';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [
            react(),
            dts({
                entryRoot: './lib',
                include: './lib',
                tsconfigPath: './tsconfig.json',
            }) as any,
            visualizer(),
        ],
        resolve: {
            alias: {
                '@': join(__dirname, 'lib'),
            },
        },
        build: {
            cssCodeSplit: true,
            lib: {
                entry: './lib/index.tsx',
                name: pkg.name,
                fileName: pkg.name,
                formats: ['es', 'umd'],
            },
            rollupOptions: {
                external: Object.keys(pkg.devDependencies),
                output: {
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                    },
                },
            },
        },
        css: {
            postcss: {
                plugins: [postcssPresetEnv()],
            },
            preprocessorOptions: {
                scss: {
                    additionalData: `
                    @import './node_modules/bem2/dist/bem.scss';
                    ${env.VITE_NAMESPACE ? `$namespace: ${env.VITE_NAMESPACE};` : ''};
                    $single-picker: ${env.VITE_SINGLE_PICKER};
                    `,
                },
            },
        },
    };
});
