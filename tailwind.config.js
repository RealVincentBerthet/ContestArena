/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutrals
        'neutral-lightest': '#f1f5fa',
        'neutral-light': '#b9c6d7',
        'neutral': '#859bb9',
        'neutral-dark': '#4c6688',
        'neutral-darkest': '#1e3c63',
        // Dangers
        'danger-lightest': '#ffe4e5',
        'danger-light': '#ff747a',
        'danger': '#d11018',
        'danger-dark': '#bb171b',
        'danger-darkest': '#962123',
        // Warning
        'warning-lightest': '#fff1c8',
        'warning-light': '#fbd579',
        'warning': '#f6bd41',
        'warning-dark': '#ce8d18',
        'warning-darkest': '#9e5e00',
        // Info
        'info-lightest': '#e3f1ff',
        'info-light': '#64b2f5',
        'info': '#1991eb',
        'info-dark': '#1d67b9',
        'info-darkest': '#234987',
        // Success
        'success-lightest': '#e6fff4',
        'success-light': '#7be3bc',
        'success': '#00cd85',
        'success-dark': '#0b8e5f',
        'success-darkest': '#016b42',
        // Paris
        'paris-lightest': '#a7a5c9',
        'paris-light': '#575493',
        'paris': '#2c275f',
        'paris-dark': '#09072e',
        'paris-darkest': '#030322',
        // Linen
        'linen-lightest': '#fdfaf7',
        'linen-light': '#faf5ef',
        'linen': '#f7efe5',
        'linen-dark': '#f4e9da',
        'linen-darkest': '#f0dcc3',
        // Purple rain
        'purple-rain-lightest': '#edebff',
        'purple-rain-light': '#b9b6f1',
        'purple-rain': '#8282dc',
        'purple-rain-dark': '#5745b1',
        'purple-rain-darkest': '#381c80',
      },
    },
  },
  plugins: [],
}
