import ShareButtons from "./ShareButtons"
import Window from "./Window"

type QuoteWindowProps = {
  title: string
  zIndex: number
  changePosition: () => void
  closeWindow: () => void
  xPosition: number
  yPosition: number
  quote: string
  author: string
  isLoadingQuote?: boolean
  statusBarLength?: number
}

export default function QuoteWindow({
  title,
  zIndex,
  changePosition,
  closeWindow,
  xPosition,
  yPosition,
  quote,
  author,
  isLoadingQuote,
  statusBarLength,
}: QuoteWindowProps) {
  return (
    <Window
      title={title}
      width={300}
      zIndex={zIndex}
      changePosition={changePosition}
      closeWindow={closeWindow}
      x={xPosition}
      y={yPosition}
      body={
        <div>
          {isLoadingQuote && statusBarLength ? (
            <div className="flex flex-col justify-center space-y-2">
              <div className="flex items-center space-x-1.5">
                <img
                  src="https://win98icons.alexmeub.com/icons/png/drum_onestick.png"
                  alt="Loading icon"
                />
                <p>Loading random quote...</p>
              </div>
              <div>
                <div className="status-bar">
                  <p className="status-bar-field flex space-x-0.5">
                    {Array.from({ length: statusBarLength }).map((_, i) => (
                      <div
                        key={i}
                        style={{ backgroundColor: "navy" }}
                        className="h-3 w-3"
                      ></div>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <ul className="tree-view">
                <p className="italic">{quote}</p>
                <br />
                <p className="text-right">- {author}</p>
              </ul>
              <ShareButtons quote={quote} author={author} />
            </div>
          )}
        </div>
      }
    />
  )
}
