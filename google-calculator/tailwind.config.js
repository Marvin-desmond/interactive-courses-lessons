const { addDynamicIconSelectors } = require('@iconify/tailwind')

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'complex': '#D9DCE0',
                'basic': '#F0F3F4',
                'highlight': '#4284F3'
            }
        },
    },
    plugins: [
       // Iconify plugin
       addDynamicIconSelectors(),
    ],
}
 
