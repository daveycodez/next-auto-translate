import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";

export default [
    {
        input: 'src/index.js',
        output: {
            name: 'index',
            file: 'esm/index.js',
            format: 'esm'
        },
        plugins: [
            peerDepsExternal(),
            resolve(),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/env', '@babel/preset-react'],
                babelHelpers: 'bundled'
            }),
            commonjs(),
        ],
        external: [
            // 'react',
            // 'next-intl'
        ]
    },
    {
        input: 'src/server.js',
        output: {
            name: 'server',
            file: 'esm/server.js',
            format: 'esm'
        },
        plugins: [
            peerDepsExternal(),
            resolve(),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/env'],
                babelHelpers: 'bundled'
            }),
            commonjs(),
        ],
        external: [
            // 'fs',
            //'path',
            // 'openai-edge'
        ]
    }
];
