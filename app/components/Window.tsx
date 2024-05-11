import { ReactNode, useState } from "react"

type WindowType = {
  title: string
  width?: number | string
  closeWindow?: () => void
  changePosition: () => void
  zIndex?: number
  x?: number
  y?: number
  body: ReactNode | string
}

export default function Window({
  title,
  width = "auto",
  closeWindow,
  changePosition,
  zIndex,
  x,
  y,
  body,
}: WindowType) {
  const [windowPosition, setWindowPosition] = useState<{
    x: number | null
    y: number | null
  }>({ x: x ? x : null, y: y ? y : null })

  // when clicking the title bar, the window should be brought to the front and be able to be dragged around
  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    changePosition()
    const startX = event.clientX
    const startY = event.clientY
    let startLeft = windowPosition.x
    let startTop = windowPosition.y

    if (startLeft === null || startTop === null) {
      const rect = event.currentTarget.getBoundingClientRect()
      startLeft = rect.left
      startTop = rect.top
      setWindowPosition({ x: startLeft, y: startTop })
    }

    function handleMouseMove(event: MouseEvent) {
      const newLeft = startLeft && startLeft + event.clientX - startX
      const newTop = startTop && startTop + event.clientY - startY

      setWindowPosition({ x: newLeft, y: newTop })
    }

    function handleMouseUp() {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div
      className="window"
      style={{
        position: "absolute",
        width: typeof width === "number" ? `${width}px` : width,
        maxWidth: "605px",
        left: windowPosition.x ? windowPosition.x : undefined,
        top: windowPosition.y ? windowPosition.y : undefined,
        zIndex: zIndex,
      }}
    >
      <div
        className="title-bar"
        role="button"
        tabIndex={0}
        onMouseDown={handleMouseDown}
      >
        <div className="title-bar-text">{title}</div>
        {!!closeWindow && (
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={closeWindow}></button>
          </div>
        )}
      </div>
      <div className="window-body">
        {typeof body === "string" ? <p>{body}</p> : body}
      </div>
    </div>
  )
}
