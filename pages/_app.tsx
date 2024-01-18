import type { ReactElement, ReactNode } from 'react'

import type { AppProps } from 'next/app'

import type { NextPage } from 'next'
import { RecoilRoot } from 'recoil'

import Header from '@/components/header/Header'

import '@/styles/global.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <RecoilRoot>
        <Header>{page}</Header>
      </RecoilRoot>
    ))

  return getLayout(<Component {...pageProps} />)
}
