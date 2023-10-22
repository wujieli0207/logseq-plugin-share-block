import { RouterEnum } from '@/enum/global-enum'
import { BlockEntity } from '@logseq/libs/dist/LSPlugin.user'

export type GlobalEnv = 'browser' | 'logseq'

export interface IAppProps {
  env: GlobalEnv
  block?: BlockEntity
  router?: RouterEnum
}

// logseq
export type PluginSettingsKeys = 'langCode'
export type PluginSettings = Record<PluginSettingsKeys, string>
