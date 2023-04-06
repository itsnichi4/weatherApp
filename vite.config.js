import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['@babel/polyfill'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.js'),
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: '[name].js',
        // Change the assetFileNames to a separate CSS file name
        assetFileNames: 'styles.css',
      },
    },
  },
  server: {
    watch: true,
  },
  css: {
    modules: true,

    preprocessorOptions: {
      css: {
        // This is where you would specify your loaders for CSS files
        // In this case we're using 'css-loader' and 'style-loader' to handle CSS files
        additionalData: `@import "pico.css";`,
        loaderOptions: {
          css: {
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          less: {
            javascriptEnabled: true,
          },
        },
      },
    },
  },
});