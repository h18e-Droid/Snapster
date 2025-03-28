import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import nextPlugin from "@next/eslint-plugin-next"

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] // Применять ко всем JS/TS файлам
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser // Глобальные переменные для браузера
      }
    }
  },
  pluginJs.configs.recommended, // Базовые рекомендованные правила ESLint
  ...tseslint.configs.recommended, // Рекомендованные правила для TypeScript
  pluginReact.configs.flat.recommended, // Рекомендованные правила для React
  {
    // Ручная настройка правил из next/core-web-vitals
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      ...nextPlugin.configs.recommended.rules, // Рекомендованные правила Next.js
      ...nextPlugin.configs["core-web-vitals"].rules // Правила Core Web Vitals
    }
  }
]
