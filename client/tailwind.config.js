/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Sora', 'sans-serif'],
            },
        },
        screens: {
            'xs': '480px',
            'ss': '620px',
            'sm': '768px',
            'md': '1060px',
            'lg': '1200px',
            'xl': '1700px',
        }
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/theming/themes")["[data-theme=light]"],
                    "primary": "#3ABEF7",
                    "primary-focus": "#18B3F7",
                    "primary-content": "#182730",
                    "secondary": "#9882f8",
                    "secondary-focus": "#7c60f7",
                    "secondary-content": "#1E1E2E",
                    "accent": "#F470B4",
                    "accent-focus": "#F250A3",
                    "accent-content": "#301C25",
                    "base-content": "#11111a",
                    "base-100": "#FFFFFF",
                    "base-200": "#e6e6e6",
                    "base-300": "#cccccc",
                },
                night: {
                    ...require("daisyui/src/theming/themes")["[data-theme=night]"],
                    "primary": "#3ABEF7",
                    "primary-focus": "#18B3F7",
                    "primary-content": "#182730",
                    "secondary": "#9882f8",
                    "secondary-focus": "#7c60f7",
                    "secondary-content": "#1E1E2E",
                    "accent": "#F470B4",
                    "accent-focus": "#F250A3",
                    "accent-content": "#301C25",
                    "base-content": "#FFFFFF",
                    "base-100": "#11111a",
                    "base-200": "#212133",
                    "base-300": "#32324d",
                },
            },
        ],
    },
}

