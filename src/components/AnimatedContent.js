import { useLayoutEffect } from 'react'

// Adapted from React Bits AnimatedContent; create tweens only as content enters view.
export default function useAnimatedContent(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    const elements = Array.from(root.querySelectorAll('.reveal'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const running = new Map()
    let disposed = false
    let animationLibrary
    let context

    function show(element) {
      observer.unobserve(element)
      running.get(element)?.kill()
      running.delete(element)
      element.classList.remove('is-pending', 'is-entering')
      element.classList.add('is-visible')
      element.style.removeProperty('opacity')
      element.style.removeProperty('transform')
    }

    async function reveal(element) {
      observer.unobserve(element)
      animationLibrary ||= import('gsap')
      try {
        const { gsap } = await animationLibrary
        if (disposed) return
        if (reduced.matches || element.classList.contains('is-visible')) {
          show(element)
          return
        }
        context ||= gsap.context(() => {}, root)
        const mobile = window.matchMedia('(max-width: 700px)').matches
        element.classList.remove('is-pending')
        element.classList.add('is-visible', 'is-entering')
        context.add(() => {
          const tween = gsap.fromTo(element, { opacity: 0, y: mobile ? 12 : 18 }, {
            opacity: 1, y: 0, duration: mobile ? .7 : .9,
            delay: mobile ? Math.min(Number(element.dataset.revealDelay || 0), .08) : Number(element.dataset.revealDelay || 0),
            ease: 'power3.out', clearProps: 'opacity,transform', paused: document.hidden,
            onComplete: () => {
              running.delete(element)
              element.classList.remove('is-entering')
            },
          })
          running.set(element, tween)
        })
      } catch {
        if (!disposed) elements.forEach(show)
      }
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target) })
    }, { rootMargin: '0px 0px -60px 0px' })
    elements.forEach(element => {
      if (reduced.matches) show(element)
      else {
        element.classList.add('is-pending')
        observer.observe(element)
      }
    })
    const focus = event => {
      const element = event.target.closest('.reveal')
      if (element) show(element)
    }
    const motionChange = () => { if (reduced.matches) elements.forEach(show) }
    const visibility = () => running.forEach(tween => document.hidden ? tween.pause() : tween.resume())
    root.addEventListener('focusin', focus)
    reduced.addEventListener('change', motionChange)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      disposed = true
      observer.disconnect()
      context?.revert()
      running.clear()
      elements.forEach(element => element.classList.remove('is-pending', 'is-entering', 'is-visible'))
      root.removeEventListener('focusin', focus)
      reduced.removeEventListener('change', motionChange)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [rootRef])
}
