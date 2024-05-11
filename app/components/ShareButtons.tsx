type ShareButtonsType = {
  quote: string
  author: string
}

export default function ShareButtons({ quote, author }: ShareButtonsType) {
  return (
    <div className="text-right mt-2 space-x-2">
      <a
        href={`https://twitter.com/intent/tweet?text="${quote}"${"  - "}${author}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Tweet</button>
      </a>
      <a
        href={`mailto:?subject=I%20thought%20you%20might%20like%20this%20quote&body="${quote}"${"  - "}${author}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Email</button>
      </a>
    </div>
  )
}
