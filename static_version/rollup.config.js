import { rollupPluginHTML } from '@web/rollup-plugin-html';
import {copy} from '@web/rollup-plugin-copy';
import staticCopy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
    input: 'index.js',
    output: {
        dir: './build/',
    },
    preserveEntrySignatures: 'strict',
    onwarn(warning) {
        if (warning.code !== 'THIS_IS_UNDEFINED') {
            console.error(`(!) ${warning.message}`);
        }
    },
    plugins: [
        // Entry point for application build; can specify a glob to build multiple
        // HTML files for non-SPA app
        rollupPluginHTML({
            input: './index.html'
        }),
        // Resolve bare module specifiers to relative paths
        resolve(),
        // Minify JS
        terser({
            ecma: 5,
            module: false,
            warnings: true,
        }),
        // Copy files :
        staticCopy({
            targets: [
                { src: ['./node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff', './node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2'], dest: './build/assets/fonts' },
                { src: ['./favicon.ico'], dest: './build/' }
            ]
        }),
        // Optional: copy any static assets to build directory
        copy({
            patterns: ['assets/**/*'],
        })
    ],
};
