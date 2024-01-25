import type { NextraThemeLayoutProps } from 'nextra'
import { DiscordIcon, GitHubIcon } from 'nextra/icons'
import type { ReactElement } from 'react'
import { isValidElement } from 'react'
import { ConfigProvider, ThemeConfigProvider } from '../contexts'
import type { DocsThemeConfig } from '../contexts/theme-config'
import { InnerLayout } from './inner-layout'

const DEFAULT_THEME: DocsThemeConfig = {
  banner: {
    dismissible: true,
    key: 'nextra-banner'
  },
  chat: {
    icon: (
      <>
        <DiscordIcon />
        <span className="_sr-only">Discord</span>
      </>
    )
  },
  darkMode: true,
  docsRepositoryBase: 'https://github.com/shuding/nextra',
  editLink: {
    content: 'Edit this page'
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback'
  },
  footer: {
    content: `MIT ${new Date().getFullYear()} © Nextra.`
  },
  // gitTimestamp: function GitTimestamp({ timestamp }) {
  //   return (
  //     <>
  //       Last updated on{' '}
  //       <time dateTime={timestamp.toISOString()}>
  //         {timestamp.toLocaleDateString('en', {
  //           day: 'numeric',
  //           month: 'long',
  //           year: 'numeric'
  //         })}
  //       </time>
  //     </>
  //   )
  // },
  i18n: [],
  logo: (
    <>
      <span className="_font-extrabold">Nextra</span>
      <span className="_ml-2 max-md:_hidden _font-normal _text-gray-600">
        The Next Docs Builder
      </span>
    </>
  ),
  logoLink: true,
  navigation: true,
  nextThemes: {
    defaultTheme: 'system',
    storageKey: 'theme'
  },
  project: {
    icon: (
      <>
        <GitHubIcon />
        <span className="_sr-only">GitHub</span>
      </>
    )
  },
  search: {
    emptyResult: (
      <span className="_block _select-none _p-8 _text-center _text-sm _text-gray-400">
        No results found.
      </span>
    ),
    error: 'Failed to load search index.',
    loading: 'Loading…',
    placeholder: 'Search documentation…'
  },
  sidebar: {
    defaultMenuCollapseLevel: 2,
    toggleButton: true
  },
  themeSwitch: {
    useOptions: {
      dark: 'Dark',
      light: 'Light',
      system: 'System'
    }
  },
  toc: {
    backToTop: false,
    float: true,
    title: 'On This Page'
  }
}

const DEEP_OBJECT_KEYS = Object.entries(DEFAULT_THEME)
  .map(([key, value]) => {
    const isObject =
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !isValidElement(value)
    if (isObject) {
      return key
    }
  })
  .filter(Boolean)

export function Layout({
  children,
  themeConfig,
  pageOpts
}: NextraThemeLayoutProps): ReactElement {
  const extendedThemeConfig = {
    ...DEFAULT_THEME,
    ...(themeConfig &&
      Object.fromEntries(
        Object.entries(themeConfig).map(([key, value]) => [
          key,
          value && typeof value === 'object' && DEEP_OBJECT_KEYS.includes(key)
            ? // @ts-expect-error -- key has always object value
              { ...DEFAULT_THEME[key], ...value }
            : value
        ])
      ))
  }
  return (
    <ThemeConfigProvider value={extendedThemeConfig}>
      <ConfigProvider value={pageOpts}>
        <InnerLayout>{children}</InnerLayout>
      </ConfigProvider>
    </ThemeConfigProvider>
  )
}
