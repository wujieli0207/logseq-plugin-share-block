import { Button } from 'antd'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import { BlockEntity } from '@logseq/libs/dist/LSPlugin.user'
import { generateShareImage, getRenderContent } from './utils'

interface IProps {
  block?: BlockEntity
}

const Share: React.FC<IProps> = (props) => {
  const { t } = useTranslation()

  const { block } = props
  const shareRef = useRef<HTMLDivElement>(null)

  console.log('test', getRenderContent(block!))

  return block ? (
    <div className="m-4">
      <div ref={shareRef} className=" text-black bg-white">
        <Viewer value={getRenderContent(block)} plugins={[gfm()]} />
        {/* <Viewer
          value={`## 概要
- 目标：用于生成 block 的分享图片
- 初步想法
  - 直接通过命令操作，获取当前 block 和下属所有内容，弹出内容分享框
  - 能够做一些简单的样式配置，最后生成分享图片`} 
          plugins={[gfm()]}
        />*/}
      </div>
      <Button
        type="primary"
        className="mt-4"
        onClick={() => generateShareImage(shareRef.current)}
      >
        生成分享图片
      </Button>
    </div>
  ) : (
    <div className="m-4">
      {t('There is no content in the current block. Please check')}
    </div>
  )
}

export default Share
