import cn from 'clsx'
// eslint-disable-next-line no-restricted-imports -- since we don't need newWindow prop
import NextLink from 'next/link'
import { DiscordIcon, GitHubIcon } from 'nextra/icons'
import type { ReactElement, ReactNode } from 'react'
import { Anchor } from '../anchor'
import { ClientNavbar } from './navbar.client'

type NavbarProps = {
  children?: ReactNode
  logoLink?: string | boolean
  logo?: ReactNode
  projectLink?: string
  projectIcon?: ReactNode
  chatLink?: string
  chatIcon?: ReactNode
}

export function Navbar({
  children,
  logoLink = true,
  logo = (
    <>
      <span className="_font-extrabold">Nextra</span>
      <span className="_ms-2 max-md:_hidden _font-normal _text-gray-600">
        The Next Docs Builder
      </span>
    </>
  ),
  projectLink,
  projectIcon = (
    <>
      <GitHubIcon />
      <span className="_sr-only">GitHub</span>
    </>
  ),
  chatLink,
  chatIcon = (
    <>
      <DiscordIcon />
      <span className="_sr-only">Discord</span>
    </>
  )
}: NavbarProps): ReactElement {
  const project = projectLink ? (
    <Anchor href={projectLink} newWindow>
      {projectIcon}
    </Anchor>
  ) : null
  const chat = chatLink ? (
    <Anchor href={chatLink} newWindow>
      {chatIcon}
    </Anchor>
  ) : null

  return (
    <header className="nextra-nav-container _sticky _top-0 _z-20 _w-full _bg-transparent print:_hidden">
      <div className="nextra-nav-container-blur" />
      <nav className="_mx-auto _flex _h-[var(--nextra-navbar-height)] _max-w-[90rem] _items-center _justify-end _gap-4 _pl-[max(env(safe-area-inset-left),1.5rem)] _pr-[max(env(safe-area-inset-right),1.5rem)]">
        {logoLink ? (
          <NextLink
            href={typeof logoLink === 'string' ? logoLink : '/'}
            className="_flex _items-center hover:_opacity-75 _me-auto"
          >
            {logo}
          </NextLink>
        ) : (
          <div className="_flex _items-center _me-auto">{logo}</div>
        )}
        <ClientNavbar project={project} chat={chat}>
          {children}
        </ClientNavbar>
      </nav>
    </header>
  )
}
