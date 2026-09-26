# 盖怡樵个人作品集

React + Vite 单页作品集，包含首页、个人经历、精选项目、个人优势和联系页。

## 本地预览

在本目录打开 PowerShell：

```powershell
npm run dev
```

然后打开终端显示的地址，默认是 <http://127.0.0.1:5173/>。

如需生成静态网站文件：

```powershell
npm run build
```

生成结果在 `dist` 文件夹。

## GitHub Pages 发布

目标仓库为 `qiaoyiGai/JianXY`。发布目录为 `dist/`，入口是 `dist/index.html`，构建同时包含 `assets/`、`media/` 和 `fonts/`。`vite.config.js` 使用相对 base，支持 `/JianXY/` 项目子路径。

仓库 Settings → Pages 的 Source 设为 GitHub Actions 后，推送到 `main` 会运行 `.github/workflows/deploy-pages.yml`，自动安装项目依赖、构建并发布 `dist/`。正常发布后的地址为 `https://qiaoyiGai.github.io/JianXY/`；应以工作流成功和实际访问验证为准。

`node_modules/`、构建目录、归档素材、本地截图、临时工具和环境变量文件均不上传。后续本地修改需要提交并推送到 GitHub，公网才会更新。

## React Bits 免费组件库

- `components.json` 配置了 `@react-bits` 免费注册表，无需许可证。
- `shadcn` 4.21.0 作为开发依赖安装在本项目内。
- Codex MCP 连接名为 `reactbits`，使用本项目的 CLI，并固定工作目录为 `D:\个人网站\portfolio-site`。
- 新增连接后重启 Codex，让当前任务加载 MCP 工具。可请求“从 React Bits 查询 SpotlightCard 的 JS-CSS 版本”。
- 当前配置用于查询和读取组件源码；加入具体组件时再按该组件需要配置文件路径及依赖。

内容区入场使用 `src/components/AnimatedContent.js` 中基于 React Bits 的 GSAP 适配，统一为一次淡入与轻移。作品与优势卡片的 SpotlightCard 暖光、联系按钮的 GlareHover 掠光位于 `src/sections-reference.css`。手机端缩短入场时间，触屏关闭跟随光，系统减少动态效果设置下直接显示内容。

## 后续修改位置

- 页面文字、作品卡片、邮箱：`src/App.jsx`
- 颜色、排版、布局、动效：`src/style.css`
- 网页视频与封面：`public/media/`

现有六条作品取自 `D:\个人网站` 中的视频，已压缩为网页版本，原始视频保留在原位置。个人姓名和联系邮箱来自 `简历/简历ing.docx`；肖像照片、AIGC 项目素材，以及合作品牌和账号数据尚未提供，因此未填入未经确认的信息。

## 首页视觉素材

当前首屏使用用户提供的 `D:\图片\AIGC用\场景\Loundraw画风\summmer 1 动态.mp4`。桌面网页版本是 `public/media/summer-dusk-hero-4k.mp4`（保留 3844×2160），移动端为 `summer-dusk-hero-mobile.mp4`（1922×1080），静态封面为 `summer-dusk-poster.webp`。原网页视频及 JPG 封面保存在 `archive/performance-originals/`，避免复制进发布目录；六个作品视频保持原有内容。

## 性能与资源加载

- 首屏封面与本地 WOFF2 字体预加载；作品封面使用 WebP、固定媒体尺寸和原生懒加载。
- 背景视频离开视口、页面进入后台或作品弹窗打开时暂停；减少动态效果或浏览器节省流量模式下只显示封面。
- GSAP 按需加载，共享 IntersectionObserver 触发一次入场，不使用 ScrollTrigger 或 scrub。动画只改变 opacity、transform；卸载时回收动画、观察器和监听。
- 作品视频在悬停、键盘聚焦或打开弹窗时才加载；页面后台与离屏预览会暂停。减少动态效果不影响手动打开完整作品。
- 作品卡片的 `video` 指向原有轻量预览，弹窗的 `fullVideo` 指向独立 `*-hq.mp4`。高清版从原始素材直接生成，保留分辨率、帧率，采用 H.264 CRF 18 / slow 和 MP4 faststart；打开作品时才请求。详细规格见 `VIDEO_QUALITY_REPORT.md`。
- Noto Sans SC 保留当前页面字形，Manrope 使用 Latin 字形，两者采用 font-display: optional。未来新增未收录的中文会使用系统字体，应在更新文案时重新生成中文子集。字体许可证位于 `public/fonts/`。
- 检查结果与测量条件见 `PERFORMANCE_REPORT.md`。

上一版首页的原创天空画面 `public/media/hero-scene.png` 及由其制作的 `public/media/hero-sky-loop.mp4` 保留作为历史素材，不再被页面引用。该图片使用内置 imagegen 生成，原提示词如下：

```text
Use case: stylized-concept. Asset type: original widescreen hero artwork for a premium personal film director portfolio website, image only. Create a serene, luminous, cinematic painted landscape with a vast clear blue sky taking roughly the upper 75 percent of the frame, subtle layered cumulus clouds and delicate aerial perspective, a low faraway city horizon and a few very restrained rooftop / railing lines in the lower quarter. A tiny anonymous human figure can stand at the far lower right as a scale cue; no close-up character, no recognizable identity. The LEFT half and central-left sky must remain clean and low-detail for dark website headline text. Soft apricot-gold sunlight enters from the far right near the horizon, with cool blue-lavender shadows and a very slight dusty rose transition. Palette: mist white #EEF5F8, distant pale blue #B9D7E9, sky blue #5E9FD0, warm apricot #F1BF80, restrained dusk blue #203B61. Quiet, open, youthful movie atmosphere, fine environmental detail, layered foreground/midground/distance, polished original digital painting; horizontal 16:9 composition. No text, logos, watermark, lens flare, neon, heavy clouds, trains, excessive decorations, or recognizable characters. Do not imitate or reproduce any existing artist's specific painting or composition.
```
