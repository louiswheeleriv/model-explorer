/** @type {import('tailwindcss').Config} */

const multiplesOfFive = Array.from({length: 20}, (_, i) => (i + 1) * 5);

module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./app/javascript/**/*.{ts,tsx,js,jsx}",
    "./app/views/**/*.{html,html.erb}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  safelist: [
    'bg-red-500',
    'bg-orange-400',
    'bg-yellow-200',
    'bg-green-400',
    'bg-white-500',
    multiplesOfFive.map((num) => (
      ('w-['+num+'%]')
    ))
  ].flat(),
}

