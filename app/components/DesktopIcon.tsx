type DesktopIconType = {
  name: string
  icon: string
}

export default function DesktopIcon({ name, icon }: DesktopIconType) {
  return (
    <div className="flex flex-col items-center mb-3">
      <img
        src={icon}
        alt={`
        Windows 98 ${name} icon
      `}
      />
      <span className="text-white mt-1 max-w-20 text-center">{name}</span>
    </div>
  )
}
