import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  minify: true,
  outDir: '../../dist/server',
  platform: 'node',
  sourcemap: true,
  target: 'esnext',
  tsconfig: './tsconfig.json',
});
