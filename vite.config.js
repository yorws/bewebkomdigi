import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'; // Pastikan plugin react diimpor

export default defineConfig({
    plugins: [
        laravel({
            // Ini harus menunjuk ke file entry point utama React Anda
            input: 'resources/js/src/main.jsx', // SESUAIKAN PATH INI
            refresh: true,
        }),
        react(), // Mengaktifkan plugin React
    ],
    // Server configuration for development (optional, but good for CORS if needed)
    server: {
        host: 'localhost',
        port: 5173, // Port default Vite
        // Jika Anda menggunakan Homestead/Valet/Laragon dengan domain kustom,
        // Anda mungkin perlu proxy ke Laravel dev server
        // hmr: {
        //     host: 'localhost',
        // },
    },
});