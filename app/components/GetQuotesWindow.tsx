import Window from "./Window"

type GetQuotesWindowProps = {
  zIndex: number
  changePosition: () => void
  handleClickGetQuoteOfTheDay: () => void
  handleClickGetRandomQuote: () => void
  isGetQuoteOfTheDayBtnDisabled: boolean
  isGetRandomQuoteBtnDisabled: boolean
}

export default function GetQuotesWindow({
  zIndex,
  changePosition,
  handleClickGetQuoteOfTheDay,
  handleClickGetRandomQuote,
  isGetQuoteOfTheDayBtnDisabled,
  isGetRandomQuoteBtnDisabled,
}: GetQuotesWindowProps) {
  return (
    <Window
      title="Quotes!!!!"
      width="75%"
      zIndex={zIndex}
      changePosition={changePosition}
      body={
        <>
          <h1 className="text-xl mb-2">Windows 98 Quotes</h1>
          <p className="text-xs">
            Inspirational quotes in the style of Windows 98. Click the buttons
            below to get a random quote or the quote of the day!
          </p>
          <div className="mt-4 text-right space-x-2">
            <button
              disabled={isGetQuoteOfTheDayBtnDisabled}
              onClick={handleClickGetQuoteOfTheDay}
              className="px-3"
            >
              Quote of the day
            </button>
            <button
              type="submit"
              disabled={isGetRandomQuoteBtnDisabled}
              onClick={handleClickGetRandomQuote}
              className="px-3"
            >
              Get a random quote!
            </button>
          </div>
        </>
      }
    />
  )
}
