import { IAppProps } from '#/global'
import { RouterEnum } from './enum/global-enum'
import Share from '@/views/share'

const App: React.FC<IAppProps> = (props) => {
  const { block, router = RouterEnum.SHARE } = props

  return (
    <div className="w-screen h-screen flex items-center justify-center text-white">
      <div
        className="w-screen h-screen fixed top-0 left-0"
        onClick={() => logseq.hideMainUI()}
      ></div>
      <div className="w-3/4 h-3/4 z-0 bg-white flex flex-col items-center justify-center overflow-scroll">
        {router === RouterEnum.SHARE && <Share block={block} />}
      </div>
    </div>
  )
}

export default App
