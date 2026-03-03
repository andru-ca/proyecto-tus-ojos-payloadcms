/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'Nunito Sans Fallback', 'sans-serif'],
        heading: ['Sequel Sans', 'Sequel Sans Fallback', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#002330',
          secondary: '#0F172A',
          accent: '#F97316',
          background: '#F0F5F5',
          btnPrimary: '#007FE8',
        },
        surface: '#F8FAFC',
        muted: '#94A3B8',
      },

      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: { fontSize: '2.5rem' },
              h2: { fontSize: '1.25rem', fontWeight: 600 },
            },
          ],
        },
        md: {
          css: [
            {
              h1: { fontSize: '3.5rem' },
              h2: { fontSize: '1.5rem' },
            },
          ],
        },
      }),
    },
  },
}

export default config
