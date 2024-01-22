import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";

export default [
    {
        input: 'src/AutoTranslate.js',
        output: {
            name: 'browser',
            file: 'dist/browser.js',
            format: 'esm'
        },
        plugins: [
            peerDepsExternal(),
            resolve(),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/env', '@babel/preset-react']
            }),
            commonjs(),
        ],
        external: [
            'react',
            'react-dom',
            'next-i18next',
            'next/router'
        ]
    },
    {
        input: 'src/TranslateRoute.js',
        output: {
            name: 'server',
            file: 'dist/server.js',
            format: 'esm'
        },
        plugins: [
            peerDepsExternal(),
            resolve(),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/env']
            }),
            commonjs(),
        ],
        external: [
            'fs',
            'path',
            'openai-edge'
        ]
    }
];
