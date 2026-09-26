import React, { useEffect, useRef, useState } from 'react'
import useAnimatedContent from './components/AnimatedContent.js'
import HeroVideo from './components/HeroVideo.jsx'

const email = '2320519758@qq.com'
const wechat = 'G18766607768'

const works = [
  {
    number: '01',
    title: '魔女回天票房 · 上篇',
    category: '创新剪辑',
    description: '动画题材的票房话题剪辑。',
    poster: './media/witch-upper.webp',
    video: './media/witch-upper.mp4',
    fullVideo: './media/witch-upper-hq.mp4',
    className: 'wide',
  },
  {
    number: '02',
    title: '光线与色彩练习',
    category: '调色',
    description: '以自然光场景呈现冷暖与层次。',
    poster: './media/color-one.webp',
    video: './media/color-one.mp4',
    fullVideo: './media/color-one-hq.mp4',
    className: 'wide letterbox',
  },
  {
    number: '03',
    title: '金融专业采访',
    category: '拍摄 / 剪辑',
    description: '留学主题人物采访。',
    poster: './media/interview.webp',
    video: './media/interview.mp4',
    fullVideo: './media/interview-hq.mp4',
    className: 'portrait',
  },
  {
    number: '04',
    title: '伦敦留学口播',
    category: '拍摄 / 剪辑',
    description: '留学内容的竖屏口播呈现。',
    poster: './media/london.webp',
    video: './media/london.mp4',
    fullVideo: './media/london-hq.mp4',
    className: 'portrait',
  },
  {
    number: '05',
    title: '古风影像剪辑',
    category: '剪辑',
    description: '人物、节奏与氛围的短片练习。',
    poster: './media/classic.webp',
    video: './media/classic.mp4',
    fullVideo: './media/classic-hq.mp4',
  },
  {
    number: '06',
    title: '自然光调色练习',
    category: '调色',
    description: '以肤色和环境光为重点的画面练习。',
    poster: './media/color-two.webp',
    video: './media/color-two.mp4',
    fullVideo: './media/color-two-hq.mp4',
  },
]

const strengths = [
  { symbol: '✧', number: '01', title: 'AI编导', description: '从创意设定到视觉表达，组织可执行的影像方案。' },
  { symbol: '⌁', number: '02', title: 'IP编导', description: '围绕人物、主题与叙事节奏，建立内容的辨识度。' },
  { symbol: '◌', number: '03', title: '视频剪辑', description: '用镜头顺序、声音与留白，让信息和情绪自然到达。' },
  { symbol: '↗', number: '04', title: '内容运营', description: '把创作放进发布与反馈的过程，持续调整表达。' },
]

function SectionHeading({ index, english, title, description }) {
  return (
    <div className="section-heading reveal">
      <div className="section-heading__meta"><span>{index}</span><span className="hairline" /><span>{english}</span></div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

// Adapted from React Bits SpotlightCard for the existing project cards.
let lightMedia
let lightFrame
let pendingLight
function moveCardLight(event) {
  lightMedia ||= window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  if (!lightMedia.matches) return
  pendingLight = { target: event.currentTarget, x: event.clientX, y: event.clientY }
  if (lightFrame) return
  lightFrame = requestAnimationFrame(() => {
    const { target, x, y } = pendingLight
    const surface = target.querySelector('.work-card__copy') || target
    const bounds = surface.getBoundingClientRect()
    target.style.setProperty('--light-x', `${x - bounds.left}px`)
    target.style.setProperty('--light-y', `${y - bounds.top}px`)
    pendingLight = null
    lightFrame = null
  })
}

function WorkCard({ work, onOpen }) {
  const videoRef = useRef(null)

  function playPreview() {
    if (document.hidden || navigator.connection?.saveData || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const video = videoRef.current
    if (!video.getAttribute('src')) video.src = work.video
    video.play().catch(() => {})
  }

  function stopPreview() {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <button className={`work-card glass reveal ${work.className || ''}`} data-reveal-delay={((Number(work.number) - 1) % 2) * .1} type="button" onClick={() => { stopPreview(); onOpen(work) }} onMouseMove={moveCardLight} onMouseEnter={playPreview} onMouseLeave={stopPreview} onFocus={playPreview} onBlur={stopPreview} aria-label={`播放作品：${work.title}`}>
      <div className="work-card__media">
        <img src={work.poster} alt="" loading="lazy" decoding="async" width={work.className === 'portrait' ? 540 : 1280} height={work.className === 'portrait' ? 960 : 720} />
        <video ref={videoRef} muted loop playsInline preload="none" aria-hidden="true" onPlaying={(event) => {
          if (document.hidden || navigator.connection?.saveData || window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.querySelector('dialog[open]') || !event.currentTarget.closest('.work-card').matches(':hover, :focus-within')) event.currentTarget.pause()
          else event.currentTarget.classList.add('is-playing')
        }} onPause={(event) => event.currentTarget.classList.remove('is-playing')} />
        <div className="work-card__media-shade" />
        <span className="work-card__play" aria-hidden="true">▶</span>
      </div>
      <div className="work-card__copy">
        <div>
          <div className="work-card__meta"><span className="work-card__number">{work.number} / 06</span><span className="work-card__category">{work.category}</span></div>
          <h3>{work.title}</h3>
          <p>{work.description}</p>
        </div>
        <span className="work-card__arrow" aria-hidden="true">↗</span>
      </div>
    </button>
  )
}

export default function App() {
  const [activeWork, setActiveWork] = useState(null)
  const [copied, setCopied] = useState(false)
  const [wechatCopied, setWechatCopied] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dialogRef = useRef(null)
  const mainRef = useRef(null)
  const copyTimer = useRef(null)
  const wechatTimer = useRef(null)
  useAnimatedContent(mainRef)

  useEffect(() => {
    let frame
    let previous = false
    const update = () => {
      frame = null
      const next = window.scrollY > 24
      if (next !== previous) { previous = next; setScrolled(next) }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (activeWork) dialogRef.current?.showModal()
  }, [activeWork])

  useEffect(() => {
    const previews = Array.from(mainRef.current.querySelectorAll('.work-card video'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) entry.target.pause()
    }))
    previews.forEach(video => observer.observe(video))
    const pauseHidden = () => {
      if (document.hidden) {
        previews.forEach(video => video.pause())
        dialogRef.current?.querySelector('video')?.pause()
      }
    }
    const pauseReduced = () => { if (reduced.matches) previews.forEach(video => video.pause()) }
    document.addEventListener('visibilitychange', pauseHidden)
    reduced.addEventListener('change', pauseReduced)
    return () => {
      observer.disconnect()
      previews.forEach(video => video.pause())
      cancelAnimationFrame(lightFrame)
      lightFrame = null
      pendingLight = null
      document.removeEventListener('visibilitychange', pauseHidden)
      reduced.removeEventListener('change', pauseReduced)
      clearTimeout(copyTimer.current)
      clearTimeout(wechatTimer.current)
    }
  }, [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      clearTimeout(copyTimer.current)
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  async function copyWechat() {
    try {
      await navigator.clipboard.writeText(wechat)
      setWechatCopied(true)
      clearTimeout(wechatTimer.current)
      wechatTimer.current = window.setTimeout(() => setWechatCopied(false), 2000)
    } catch {
      window.prompt('请复制微信号', wechat)
    }
  }

  function closeDialog() {
    const video = dialogRef.current?.querySelector('video')
    video?.pause()
    dialogRef.current?.close()
    setActiveWork(null)
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="site-header__inner container">
          <a className="brand" href="#top" aria-label="盖怡樵，返回首页"><span className="brand__mark">G<span>·</span>Y</span><span className="brand__name">盖怡樵 <small>PORTFOLIO</small></span></a>
          <nav aria-label="主导航"><a href="#about">关于</a><a href="#works">项目</a><a href="#strengths">优势</a><a href="#contact">联系</a></nav>
          <a className="header-contact" href={`mailto:${email}`}>开始合作 <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <main id="top" ref={mainRef}>
        <section className="hero" aria-labelledby="hero-title">
          <HeroVideo suspended={Boolean(activeWork)} />
          <div className="hero__wash" /><div className="hero__cloud hero__cloud--one" /><div className="hero__cloud hero__cloud--two" /><div className="hero__sun" /><div className="hero__horizon" />
          <div className="hero__content container">
            <p className="eyebrow hero__eyebrow"><span className="eyebrow__line" /> AI / IP WRITER-DIRECTOR</p>
            <h1 id="hero-title">让想象，<br /><em>落在画面里。</em></h1>
            <p className="hero__lead">AI编导 / IP编导<br />从创意、影像到传播，认真对待每一帧表达。</p>
            <div className="hero__actions"><a className="button button--gold" href="#works">浏览作品 <span aria-hidden="true">↗</span></a><a className="text-link" href="#contact">联系我 <span aria-hidden="true">↓</span></a></div>
          </div>
          <div className="hero__bottom container"><span>01 / 05</span><span>SCROLL TO EXPLORE</span><span className="hero__scroll-line" /></div>
        </section>

        <section className="about section-pad" id="about" aria-labelledby="about-title">
          <div className="container about__layout">
            <div className="about__visual reveal">
              <div className="about__portrait glass"><div className="about__portrait-glow" /><span className="about__monogram">GYQ</span><span className="about__portrait-note">肖像照片待补充</span></div>
              <p className="about__visual-caption"><span>✦</span> 编导、内容与视觉之间</p>
            </div>
            <div className="about__content">
              <div className="section-heading reveal"><div className="section-heading__meta"><span>02</span><span className="hairline" /><span>ABOUT ME</span></div><h2 id="about-title">在故事和画面之间，<br />找到属于内容的光。</h2></div>
              <p className="about__intro reveal" data-reveal-delay=".08">你好，我是盖怡樵。我的工作围绕 AI编导与IP编导展开，关注一个想法如何变成能被看见、也值得被记住的内容。</p>
              <p className="about__body reveal" data-reveal-delay=".16">这里收录了剪辑、拍摄与调色作品。关于 AIGC 的更多项目，会随着作品完成继续加入。</p>
              <a className="about__mail reveal" data-reveal-delay=".24" href={`mailto:${email}`}><span className="about__mail-icon">✉</span>{email}<span aria-hidden="true">↗</span></a>
              <div className="stats reveal" data-reveal-delay=".32"><div className="stat"><strong>06</strong><span>精选作品</span></div><div className="stat"><strong>03</strong><span>已收录方向</span></div><div className="stat"><strong>∞</strong><span>继续探索的画面</span></div></div>
            </div>
          </div>
        </section>

        <section className="works section-pad" id="works" aria-labelledby="works-title">
          <div className="container"><SectionHeading index="03" english="VIDEO PORTFOLIO" title={<span id="works-title">视频作品展示区</span>} description="点击卡片观看完整视频，更多作品将陆续更新。" /><div className="works__grid">{works.map((work) => <WorkCard key={work.number} work={work} onOpen={setActiveWork} />)}</div><p className="works__footnote">持续更新，记录每一次创作。</p></div>
        </section>

        <section className="strengths section-pad" id="strengths" aria-labelledby="strengths-title">
          <div className="container"><SectionHeading index="04" english="WHAT I DO" title={<span id="strengths-title">一条完整的创作链路。</span>} description="从想法、制作到发布，让表达更清晰，也更有辨识度。" /><div className="strengths__grid">{strengths.map((item) => <article className="strength-card glass reveal" key={item.number} data-reveal-delay={(Number(item.number) - 1) * .1} onMouseMove={moveCardLight}><div className="strength-card__top"><span className="strength-card__symbol" aria-hidden="true">{item.symbol}</span><span className="strength-card__number">/ {item.number}</span></div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title"><div className="contact__glow" /><div className="contact__stars" /><div className="contact__inner container"><p className="eyebrow contact__eyebrow reveal"><span className="eyebrow__line" /> THE NEXT FRAME</p><h2 id="contact-title" className="reveal" data-reveal-delay=".08">下一段故事，<br /><em>从这里开始。</em></h2><p className="reveal" data-reveal-delay=".16">如果你有一个想法，欢迎聊聊它能如何成为画面。</p><div className="contact__actions reveal" data-reveal-delay=".24"><a className="button button--gold" href={`mailto:${email}`}>联系我 <span aria-hidden="true">↗</span></a><button className="text-link contact__copy" type="button" onClick={copyEmail} title="点击复制邮箱" aria-live="polite"><span className="contact__copy-label"><span aria-hidden={copied}>{`邮箱：${email}`}</span>{copied && <span>已复制邮箱</span>}</span><span aria-hidden="true">⧉</span></button><button className="text-link contact__copy" type="button" onClick={copyWechat} title="点击复制微信号" aria-live="polite"><span className="contact__copy-label"><span aria-hidden={wechatCopied}>{`微信：${wechat}`}</span>{wechatCopied && <span>已复制微信号</span>}</span><span aria-hidden="true">⧉</span></button></div></div><footer className="site-footer container"><span>© {new Date().getFullYear()} 盖怡樵</span><span>AI / IP WRITER-DIRECTOR</span><a href="#top">回到天空 ↑</a></footer></section>
      </main>

      <dialog className="video-dialog" ref={dialogRef} onClose={() => { if (!dialogRef.current?.open) setActiveWork(null) }} onClick={(event) => { if (event.target === dialogRef.current) closeDialog() }}><div className="video-dialog__inner"><div className="video-dialog__head"><div><span>{activeWork?.category}</span><h2>{activeWork?.title}</h2></div><button type="button" onClick={closeDialog} aria-label="关闭视频">×</button></div>{activeWork && <video key={activeWork.fullVideo} src={activeWork.fullVideo} poster={activeWork.poster} style={{ aspectRatio: activeWork.className === 'portrait' ? '9 / 16' : '16 / 9' }} controls autoPlay playsInline />}</div></dialog>
    </>
  )
}
