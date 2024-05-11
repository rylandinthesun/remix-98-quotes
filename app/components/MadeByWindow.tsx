import Window from "./Window"

type MadeByWindowProps = {
  zIndex: number
  changePosition: () => void
  closeWindow: () => void
}

export default function MadeByWindow({
  zIndex,
  changePosition,
  closeWindow,
}: MadeByWindowProps) {
  return (
    <Window
      title=""
      width={400}
      y={475}
      zIndex={zIndex}
      changePosition={changePosition}
      closeWindow={closeWindow}
      body={
        <>
          <h1 className="text-base mb-2 flex items-center space-x-1">
            <img
              src="https://win98icons.alexmeub.com/icons/png/utopia_smiley.png"
              alt="Windows 98 smiley face"
              className="mr-1"
            />
            Made by{" "}
            <a
              href="https://rylandoehlers.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Ryland Oehlers
            </a>
          </h1>
        </>
      }
    />
  )
}
