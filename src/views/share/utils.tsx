import domtoimage from 'dom-to-image'
import { BlockEntity } from '@logseq/libs/dist/LSPlugin.user'
import i18n from '@/locales'

export async function generateShareImage(ref: HTMLDivElement | null) {
  const { t } = i18n

  // 生成分享图片
  if (ref) {
    try {
      const dataUrl = await domtoimage.toPng(ref)
      console.log('dataUrl: ', dataUrl)

      fetch(dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'share.png'
          a.click()

          window.URL.revokeObjectURL(url)
        })
    } catch (error) {
      console.error(t('Generate share image meet something wrong'), error)
    }
  }
}

export function getRenderContent(block: BlockEntity): string {
  const getContent = (block: BlockEntity, level = 0): string => {
    const indent = '  '.repeat(level) // 每个缩进层级两个空格

    return `${block.content}
${
  block.children && block.children.length > 0
    ? block.children
        .map((subBlock, index) => {
          const isNumberList = block.content.includes(':: number')
          const listTyle = isNumberList ? `${index + 1}. ` : '- '

          return `${indent} ${listTyle}${getContent(
            subBlock as BlockEntity,
            level + 1
          )}`
        })
        .join('')
    : ''
}`
  }

  return `${getContent(block)}`
}

export function loadMarkdownTheme(themeName: string) {
  return import(`../../styles/themes/${themeName}.scss`)
}
