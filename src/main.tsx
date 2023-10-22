import '@/styles/index.scss'

import '@logseq/libs'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { IAppProps } from '#/global'
import initCommand from '@/logseq/command.ts'

const isDevelopment = import.meta.env.DEV

if (isDevelopment) {
  renderApp({ env: 'browser' })
} else {
  console.log('=== logseq-plugin-share-block loaded ===')
  logseq.ready(() => {
    initCommand()
  })
}

export function renderApp(props: IAppProps) {
  const { env, router, block } = props

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App env={env} router={router} block={block} />
    </React.StrictMode>
  )

  if (env === 'logseq') {
    logseq.showMainUI()
  }
}
