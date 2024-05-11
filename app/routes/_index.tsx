import { useEffect, useState } from "react"
import { useLoaderData, useRevalidator } from "@remix-run/react"

import GetQuotesWindow from "~/components/GetQuotesWindow"
import QuoteWindow from "~/components/QuoteWindow"
import DesktopIcon from "~/components/DesktopIcon"
import MadeByWindow from "~/components/MadeByWindow"

import { changeWindowPosition, getRandomWindowPosition } from "~/helpers"
import { type MetaFunction } from "@remix-run/node"
import TaskBar from "~/components/TaskBar"

export const meta: MetaFunction = () => {
  return [
    { title: "Windows 98 Quotes" },
    {
      name: "description",
      content:
        "Inspirational quotes from the Windows 98 startup disk. Get a random quote or the quote of the day!",
    },
  ]
}

export const loader = async () => {
  const quoteOfTheDay = await fetch("https://zenquotes.io/api/today").then(
    (res) => res.json()
  )
  const randomQuote = await fetch("https://zenquotes.io/api/random").then(
    (res) => res.json()
  )

  return {
    quoteOfTheDay: quoteOfTheDay[0],
    randomQuote: randomQuote[0],
  }
}

export default function Index() {
  const { quoteOfTheDay, randomQuote } = useLoaderData<typeof loader>()

  const [isShowingQuoteOfTheDay, setIsShowingQuoteOfTheDay] = useState(false)
  const [isShowingRandomQuote, setIsShowingRandomQuote] = useState(false)
  const [isShowingMadeByWindow, setIsShowingMadeByWindow] = useState(false)
  const [windowPosition, setWindowPosition] = useState(["initial"])
  const [statusBarLength, setStatusBarLength] = useState(6)

  const revalidator = useRevalidator()

  useEffect(() => {
    const audio = new Audio("/audio/win98.mp3")

    if (isShowingMadeByWindow) {
      audio.play()
    }
  }, [isShowingMadeByWindow])

  useEffect(() => {
    if (revalidator.state === "loading") {
      // keep adding to length every 100ms until statusBarLength is 19
      const interval = setInterval(() => {
        setStatusBarLength(statusBarLength + 1)
      }, 100)

      if (statusBarLength === 19) {
        clearInterval(interval)
      }

      return () => clearInterval(interval)
    }
    setStatusBarLength(6)
  }, [setStatusBarLength, statusBarLength, revalidator.state])

  const randomWindowPosition = getRandomWindowPosition()

  return (
    <main
      className="bg-[#008080] h-screen justify-center items-center flex relative overflow-x-hidden"
      style={{
        fontFamily: "Pixelated MS Sans Serif, Arial",
      }}
    >
      <div className="absolute top-4 left-4">
        <DesktopIcon
          name="My Computer"
          icon="https://win98icons.alexmeub.com/icons/png/computer_explorer-2.png"
        />
        <DesktopIcon
          name="Documents"
          icon="https://win98icons.alexmeub.com/icons/png/directory_closed-3.png"
        />
        <DesktopIcon
          name="Recycle Bin"
          icon="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-2.png"
        />
      </div>
      <GetQuotesWindow
        zIndex={windowPosition.indexOf("initial")}
        changePosition={() =>
          changeWindowPosition("initial", windowPosition, setWindowPosition)
        }
        handleClickGetQuoteOfTheDay={() => {
          setIsShowingQuoteOfTheDay(true)
          setWindowPosition([...windowPosition, "quoteOfTheDay"])
        }}
        handleClickGetRandomQuote={() => {
          revalidator.revalidate()
          setIsShowingRandomQuote(true)
          setWindowPosition([...windowPosition, "randomQuote"])
        }}
        isGetQuoteOfTheDayBtnDisabled={isShowingQuoteOfTheDay}
        isGetRandomQuoteBtnDisabled={isShowingRandomQuote}
      />
      {isShowingQuoteOfTheDay && quoteOfTheDay && (
        <QuoteWindow
          title="Quote of the day"
          zIndex={windowPosition.indexOf("quoteOfTheDay")}
          changePosition={() =>
            changeWindowPosition(
              "quoteOfTheDay",
              windowPosition,
              setWindowPosition
            )
          }
          closeWindow={() => {
            setIsShowingQuoteOfTheDay(false)
            setWindowPosition(
              windowPosition.filter((w) => w !== "quoteOfTheDay")
            )
          }}
          xPosition={randomWindowPosition.x}
          yPosition={randomWindowPosition.y}
          quote={quoteOfTheDay.q}
          author={quoteOfTheDay.a}
        />
      )}
      {isShowingRandomQuote && randomQuote && (
        <QuoteWindow
          title="Random Quote"
          zIndex={windowPosition.indexOf("randomQuote")}
          changePosition={() =>
            changeWindowPosition(
              "randomQuote",
              windowPosition,
              setWindowPosition
            )
          }
          closeWindow={() => {
            setIsShowingRandomQuote(false)
            setWindowPosition(windowPosition.filter((w) => w !== "randomQuote"))
          }}
          xPosition={randomWindowPosition.x}
          yPosition={randomWindowPosition.y}
          quote={randomQuote.q}
          author={randomQuote.a}
          isLoadingQuote={revalidator.state === "loading"}
          statusBarLength={statusBarLength}
        />
      )}
      {isShowingMadeByWindow && (
        <MadeByWindow
          zIndex={windowPosition.indexOf("madeBy")}
          changePosition={() =>
            changeWindowPosition("madeBy", windowPosition, setWindowPosition)
          }
          closeWindow={() => {
            setIsShowingMadeByWindow(false)
            setWindowPosition(windowPosition.filter((w) => w !== "madeBy"))
          }}
        />
      )}
      <TaskBar
        onClickStart={() => {
          setIsShowingMadeByWindow(true)
          setWindowPosition([...windowPosition, "madeBy"])
        }}
      />
    </main>
  )
}
