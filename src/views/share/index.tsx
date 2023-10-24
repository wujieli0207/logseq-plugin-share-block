import { Button, Form, Select, Switch, Row, Col } from 'antd'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'
import { BlockEntity } from '@logseq/libs/dist/LSPlugin.user'
import { generateShareImage, getRenderContent } from './utils'
import useShareConfig from './hooks/useShareConfig'
import styles from './index.module.scss'

interface IProps {
  block?: BlockEntity
}

interface IShareModel {
  backgroundTheme: string
  markdownTheme: string
  isMobile: boolean
  isShowBanner: boolean
  isShowDate: boolean
}

const Share: React.FC<IProps> = (props) => {
  const { t } = useTranslation()
  const { backgroundConfig, markdownTheme } = useShareConfig()

  const { block } = props

  const shareRef = useRef<HTMLDivElement>(null)
  const [shareModel, setShareModel] = useState<IShareModel>({
    backgroundTheme: '',
    markdownTheme: '',
    isMobile: false,
    isShowBanner: false,
    isShowDate: false,
  })

  function hanldeModelChange(value: string | boolean, key: keyof IShareModel) {
    setShareModel((prev) => ({ ...prev, [key]: value }))
  }

  return block ? (
    <div className="flex flex-col items-center justify-center m-4 overflow-scroll bg-gray-200 w-80-screen h-80-screen">
      <div
        ref={shareRef}
        className={`m-4 text-black bg-white ${
          shareModel.isMobile ? styles['mobile-mode'] : styles['pc-model']
        }`}
      >
        <div className={`m-4 markdown-body ${shareModel.markdownTheme}`}>
          <Markdown>{getRenderContent(block)}</Markdown>
        </div>
      </div>

      <div className="w-3/4 p-4 mx-4 mt-4 bg-white">
        <Form>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label={'背景主题'} name="backgroundTheme">
                <Select
                  value={shareModel.backgroundTheme}
                  options={backgroundConfig}
                  onChange={(value) =>
                    hanldeModelChange(value, 'backgroundTheme')
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={'markdown 主题'} name="markdownTheme">
                <Select
                  value={shareModel.markdownTheme}
                  options={markdownTheme}
                  onChange={(value) =>
                    hanldeModelChange(value, 'markdownTheme')
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={8}>
              <Form.Item label={'移动端'} name="isMobile">
                <Switch
                  checked={shareModel.isMobile}
                  onChange={(value) => hanldeModelChange(value, 'isMobile')}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'头图'} name="isShowBanner">
                <Switch
                  checked={shareModel.isShowBanner}
                  onChange={(value) => hanldeModelChange(value, 'isShowBanner')}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'日期'} name="isShowDate">
                <Switch
                  checked={shareModel.isShowDate}
                  onChange={(value) => hanldeModelChange(value, 'isShowDate')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Button
          type="primary"
          onClick={() => generateShareImage(shareRef.current)}
        >
          生成分享图片
        </Button>
      </div>
    </div>
  ) : (
    <div className="m-4">
      {t('There is no content in the current block. Please check')}
    </div>
  )
}

export default Share
