import { forwardRef, useMemo, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'

const TOTAL_PAGES = 44

type FlipCorner = 'top' | 'bottom'

type FlipBookHandle = {
  pageFlip: () => {
    flipPrev: (corner?: FlipCorner) => void
    flipNext: (corner?: FlipCorner) => void
  }
}

type BookPageProps = {
  imageSrc: string
  alt: string
  isCover?: boolean
}

const BookPage = forwardRef<HTMLDivElement, BookPageProps>(function BookPage(
  { imageSrc, alt, isCover = false },
  ref,
) {
  return (
    <div className={`page${isCover ? ' page--cover' : ''}`} ref={ref}>
      <img className="page__image" src={imageSrc} alt={alt} draggable={false} />
    </div>
  )
})

export default function App() {
  const bookRef = useRef<FlipBookHandle | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

  const pages = useMemo(
    () => {
      const pageOrder = [1, ...Array.from({ length: TOTAL_PAGES - 2 }, (_, index) => index + 3), 2]

      return pageOrder.map((pageNumber, index) => ({
        id: index + 1,
        sourcePage: pageNumber,
        imageSrc: `/images/pages/${pageNumber}.png`,
      }))
    },
    [],
  )

  const goToPreviousPage = () => {
    bookRef.current?.pageFlip().flipPrev('top')
  }

  const goToNextPage = () => {
    bookRef.current?.pageFlip().flipNext('top')
  }

  return (
    <main className="app">
      <section className="book-shell">
        <div className="book-copy">
          <p className="eyebrow">Libro interactivo</p>
          <h1>Esparce Paz</h1>
          <p className="book-status">
            Pagina {currentPage + 1} de {TOTAL_PAGES}
          </p>
        </div>

        <div className="book-stage">
          <button
            type="button"
            className="nav-button"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            aria-label="Ir a la pagina anterior"
          >
            Anterior
          </button>

          <div className="book-frame">
            <HTMLFlipBook
              style={{}}
              width={395}
              height={512}
              minWidth={250}
              maxWidth={395}
              minHeight={324}
              maxHeight={512}
              startPage={0}
              size="stretch"
              drawShadow
              flippingTime={900}
              usePortrait
              startZIndex={0}
              autoSize
              maxShadowOpacity={0.35}
              showCover
              mobileScrollSupport={false}
              clickEventForward
              useMouseEvents
              swipeDistance={30}
              showPageCorners
              disableFlipByClick={false}
              className="flip-book"
              ref={bookRef}
              onFlip={(event: { data: number }) => setCurrentPage(event.data)}
            >
              {pages.map((page, index) => (
                <BookPage
                  key={page.id}
                  imageSrc={page.imageSrc}
                  alt={`Esparce Paz - imagen ${page.sourcePage}`}
                  isCover={index === 0 || index === pages.length - 1}
                />
              ))}
            </HTMLFlipBook>
          </div>

          <button
            type="button"
            className="nav-button"
            onClick={goToNextPage}
            disabled={currentPage === TOTAL_PAGES - 1}
            aria-label="Ir a la pagina siguiente"
          >
            Siguiente
          </button>
        </div>
      </section>
    </main>
  )
}
