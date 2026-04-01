import pkg from './package.json';
import json from '@rollup/plugin-json';

export default [
  {
   input: 'src/slugify.js',
   output: [
      { file: pkg.main, format: 'cjs', exports: 'auto' },
      { file: pkg.module, format: 'esm', exports: 'auto' },
      { file: pkg.unpkg, format: 'umd', exports: 'auto', name: 'slugify' }
   ],
   plugins: [
     json({
       compact: true,
       namedExports: false
     })
   ]
 }
];
