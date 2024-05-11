type TaskBarProps = {
  onClickStart: () => void
}

export default function TaskBar({ onClickStart }: TaskBarProps) {
  return (
    <footer className="absolute bottom-0 left-0 right-0 text-white window flex space-x-1 !py-1">
      <button
        className="flex items-center min-w-0 px-1.5 py-1.5 ml-0.5"
        onClick={onClickStart}
      >
        <img
          src="https://win98icons.alexmeub.com/icons/png/windows-4.png"
          alt="Windows 98 logo"
        />
        <span className="ml-1 font-bold text-xs px-px text-black">Start</span>
      </button>
    </footer>
  )
}
