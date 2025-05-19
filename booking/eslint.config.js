import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    eslint: { extends: ['eslint:recommended'] },
    typescript: { extends: ['plugin:@typescript-eslint/recommended'] },
  },
})

export default [
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:prettier/recommended'
  ),
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          tabWidth: 2,
          semi: false
        }
      ]
    }
  }
]
