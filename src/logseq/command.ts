import { RouterEnum } from '@/enum/global-enum'
import i18n from '@/locales'
import { renderApp } from '@/main'

export default async function initCommand() {
  const { t } = i18n

  const logseqEdit = logseq.Editor
  const logseqApp = logseq.App

  logseqEdit.registerSlashCommand(t('Share current block'), async (e) => {
    console.log('[share-block] current event: ', e)

    logseqEdit
      .getBlock(e.uuid, { includeChildren: true })
      .then(async (block) => {
        console.log('[share-block] current block: ', block)

        if (!block) {
          return logseqApp.UI.showMsg(t('No Content to share'), 'warning')
        }

        const { format } = block

        // only support markdown
        if (format !== 'markdown') {
          return logseqApp.UI.showMsg(
            t('Share block only support markdown'),
            'warning'
          )
        }

        renderApp({
          env: 'logseq',
          router: RouterEnum.SHARE,
          block,
        })
      })
    // const drawingPage = await createDrawing()
    // if (!drawingPage) return
    // logseq.Editor.updateBlock(
    //   uuid,
    //   `{{renderer excalidraw, ${drawingPage.fileName}}}`
    // )
  })
}
