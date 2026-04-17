import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
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
  const [showModal, setShowModal] = useState(true)
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(true)
  const [openedManually, setOpenedManually] = useState(false)

  const pages = useMemo(() => {
    const pageOrder = [1, ...Array.from({ length: TOTAL_PAGES - 2 }, (_, index) => index + 3), 2]

    return pageOrder.map((pageNumber, index) => ({
      id: index + 1,
      sourcePage: pageNumber,
      imageSrc: `/images/pages/${pageNumber}.png`,
    }))
  }, [])

  useEffect(() => {
    if (!showModal) {
      return
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpening(false)
      })
    })

    if (openedManually) {
      return
    }

    const timer = window.setTimeout(() => {
      setIsClosing(true)
      window.setTimeout(() => {
        setShowModal(false)
        setIsClosing(false)
        setOpenedManually(false)
      }, 300)
    }, 8000)

    return () => window.clearTimeout(timer)
  }, [showModal, openedManually])

  const goToPreviousPage = () => {
    bookRef.current?.pageFlip().flipPrev('top')
  }

  const goToNextPage = () => {
    bookRef.current?.pageFlip().flipNext('top')
  }

  const openModal = () => {
    setIsClosing(false)
    setIsOpening(true)
    setOpenedManually(true)
    setShowModal(true)
  }

  const closeModal = () => {
    setIsClosing(true)
    window.setTimeout(() => {
      setShowModal(false)
      setIsClosing(false)
      setOpenedManually(false)
    }, 300)
  }

  return (
    <>
      {showModal && (
        <div className={`modal-backdrop ${isClosing ? 'is-hidden' : ''}`}>
          <div className="modal-overlay" onClick={closeModal} />
          <div className={`modal-panel ${isClosing || isOpening ? 'is-entering' : ''}`}>
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title-group">
                  <img
                    src="/images/mini-logo.webp"
                    alt="Logo Esparce Paz"
                    className="modal-mini-logo"
                  />
                  <h2>Instrucciones de Uso</h2>
                </div>
                <button type="button" className="modal-close" onClick={closeModal} aria-label="Cerrar">
                  ×
                </button>
              </div>

              <div className="instructions-grid">
                <section className="instruction-block">
                  <h3>
                    <svg viewBox="0 0 640 640" aria-hidden="true">
                      <path d="M128 96C92.7 96 64 124.7 64 160L64 416C64 451.3 92.7 480 128 480L272 480L256 528L184 528C170.7 528 160 538.7 160 552C160 565.3 170.7 576 184 576L456 576C469.3 576 480 565.3 480 552C480 538.7 469.3 528 456 528L384 528L368 480L512 480C547.3 480 576 451.3 576 416L576 160C576 124.7 547.3 96 512 96L128 96zM160 160L480 160C497.7 160 512 174.3 512 192L512 352C512 369.7 497.7 384 480 384L160 384C142.3 384 128 369.7 128 352L128 192C128 174.3 142.3 160 160 160z" />
                    </svg>
                    Escritorio
                  </h3>
                  <ul>
                    <li>
                      <strong>Click izquierdo:</strong> pasar pagina
                    </li>
                    <li>
                      <strong>Click en bordes:</strong> avanzar o retroceder
                    </li>
                  </ul>
                </section>

                <section className="instruction-block">
                  <h3>
                    <svg viewBox="0 0 640 640" aria-hidden="true">
                      <path d="M208 64C172.7 64 144 92.7 144 128L144 512C144 547.3 172.7 576 208 576L432 576C467.3 576 496 547.3 496 512L496 128C496 92.7 467.3 64 432 64L208 64zM280 480L360 480C373.3 480 384 490.7 384 504C384 517.3 373.3 528 360 528L280 528C266.7 528 256 517.3 256 504C256 490.7 266.7 480 280 480z" />
                    </svg>
                    Móvil
                  </h3>
                  <ul>
                    <li>
                      <strong>Desliza:</strong> cambiar de pagina
                    </li>
                    <li>
                      <strong>Toca los botones:</strong> navegar por el libro
                    </li>
                  </ul>
                </section>
              </div>

              <div className="modal-footer">
                <div className="footer-logos">
                  <a href="https://scout.org" target="_blank" rel="noreferrer">
                    <img src="/images/logo-world-scouting.png" alt="World Scouting" />
                  </a>
                  <a href="https://scout.org.co" target="_blank" rel="noreferrer">
                    <img src="/images/logo-scouts-colombia.webp" alt="Scouts de Colombia" />
                  </a>
                  <img src="/images/logo-esparcepaz.webp" alt="Esparce Paz" />
                </div>
                <p>
                  © 2026 Scouts de Colombia
                  <br />
                  Coordinación Nacional de Desarrollo Web
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="app">
        <section className="book-shell">
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
        </section>
      </main>

      <section className="ui-overlay" aria-label="Controles del libro">
        <div className="brand-strip">
          <img src="/images/logos.webp" alt="Logos Scouts de Colombia y Esparce Paz" />
        </div>

        <div className="controls-strip">
          <button
            type="button"
            className="icon-button"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            aria-label="Pagina anterior"
          >
            <svg viewBox="0 0 640 640" aria-hidden="true">
              <path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z" />
            </svg>
          </button>

          <button
            type="button"
            className="icon-button"
            onClick={openModal}
            aria-label="Instrucciones de uso"
          >
            <svg viewBox="0 0 640 640" aria-hidden="true">
              <path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM224 256C224 238.3 238.3 224 256 224L320 224C337.7 224 352 238.3 352 256L352 512L384 512C401.7 512 416 526.3 416 544C416 561.7 401.7 576 384 576L256 576C238.3 576 224 561.7 224 544C224 526.3 238.3 512 256 512L288 512L288 288L256 288C238.3 288 224 273.7 224 256z" />
            </svg>
          </button>

          <button
            type="button"
            className="icon-button"
            onClick={goToNextPage}
            disabled={currentPage === TOTAL_PAGES - 1}
            aria-label="Pagina siguiente"
          >
            <svg viewBox="0 0 640 640" aria-hidden="true">
              <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" />
            </svg>
          </button>
        </div>
      </section>
    </>
  )
}
