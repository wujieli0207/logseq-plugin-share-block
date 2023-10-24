import { IAppProps } from '#/global'
import { RouterEnum } from './enum/global-enum'
import Share from '@/views/share'

const App: React.FC<IAppProps> = (props) => {
  const { block, router = RouterEnum.SHARE } = props

  return (
    <div className="flex items-center justify-center w-screen h-screen text-white">
      <div
        className="fixed top-0 left-0 w-screen h-screen"
        onClick={() => logseq.hideMainUI()}
      ></div>
      <div className="z-0">
        {router === RouterEnum.SHARE && <Share block={block} />}
      </div>
    </div>
  )
}

export default App
