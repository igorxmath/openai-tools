import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            '--tw-prose-body': theme('colors.zinc[100]'),
            '--tw-prose-headings': theme('colors.zinc[100]'),
            '--tw-prose-lead': theme('colors.zinc[300]'),
            '--tw-prose-links': theme('colors.blue[500]'),
            '--tw-prose-bold': theme('colors.zinc[200]'),
            '--tw-prose-counters': theme('colors.zinc[200]'),
            '--tw-prose-bullets': theme('colors.zinc[400]'),
            '--tw-prose-hr': theme('colors.zinc[300]'),
            '--tw-prose-quotes': theme('colors.zinc[200]'),
            '--tw-prose-quote-borders': theme('colors.zinc[300]'),
            '--tw-prose-captions': theme('colors.zinc[200]'),
            '--tw-prose-code': theme('colors.zinc[200]'),
            '--tw-prose-pre-code': theme('colors.zinc[100]'),
            '--tw-prose-pre-bg': theme('colors.zinc[950]'),
            '--tw-prose-th-borders': theme('colors.zinc[300]'),
            '--tw-prose-td-borders': theme('colors.zinc[200]'),
          },
        },
      }),
    },
  },
  plugins: [typography, forms],
} satisfies Config
