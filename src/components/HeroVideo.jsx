import React, { useEffect, useRef } from 'react'

export default function HeroVideo({ suspended }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = window.matchMedia('(max-width: 700px)')
    const connection = navigator.connection
    let inView = false
    let frame

    function sync() {
      if (reduced.matches || connection?.saveData) {
        video.pause()
        if (video.hasAttribute('src')) {
          video.removeAttribute('src')
          video.load()
        }
        return
      }
      if (document.hidden || !inView || suspended) {
        video.pause()
        return
      }
      const src = `./media/summer-dusk-hero-${mobile.matches ? 'mobile' : '4k'}.mp4`
      if (video.getAttribute('src') !== src) video.src = src
      video.play().catch(() => {})
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(sync)
    })
    observer.observe(video)
    document.addEventListener('visibilitychange', sync)
    reduced.addEventListener('change', sync)
    mobile.addEventListener('change', sync)
    connection?.addEventListener('change', sync)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', sync)
      reduced.removeEventListener('change', sync)
      mobile.removeEventListener('change', sync)
      connection?.removeEventListener('change', sync)
      video.pause()
    }
  }, [suspended])

  return <video ref={videoRef} className="hero__video" muted loop playsInline preload="none" poster="./media/summer-dusk-poster.webp" aria-hidden="true" />
}
