export function getRandomWindowPosition() {
  // Want to get the Window to appear in a random position inside of the browser window
  if (typeof window === "undefined") return { x: 0, y: 0 }

  // Get the window width and height
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  let x = Math.random() * windowWidth - 300
  let y = Math.random() * windowHeight - 300

  // Make sure the window doesn't go off the screen
  if (x < 0) {
    x = 0
  }
  if (y < 0) {
    y = 0
  }

  return { x, y }
}

export function changeWindowPosition(
  name: string,
  windowPosition: string[],
  handleSetWindowPosition: (newWindowPosition: string[]) => void
) {
  // When a window is clicked, it should be brought to the front
  // This function will change the order of the windows in the windowPosition array
  const newWindowPosition = windowPosition.filter((w) => w !== name)
  newWindowPosition.push(name)
  handleSetWindowPosition(newWindowPosition)
}
