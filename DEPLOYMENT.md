# GitHub Pages 部署说明

- 仓库：`qiaoyiGai/JianXY`。
- 项目源码：本目录中的 `index.html`、`src/`、`public/`、`package.json`、`package-lock.json`、`vite.config.js`。
- 构建命令：`npm run build`。
- 发布目录：`dist/`，不是源码根目录。
- 发布入口：`dist/index.html`，其同层包含 `assets/`、`media/`、`fonts/` 和 `.nojekyll`。
- 预期网址：`https://qiaoyiGai.github.io/JianXY/`，工作流发布成功后才会生效。

## 已完成的发布准备

构建入口中的本地资源全部使用 `./` 相对引用；产物 CSS 使用 `../fonts/`、`../media/`，运行时作品和背景视频使用 `./media/`。字体样式已纳入 Vite 构建。

使用现有 Node 启动静态服务器，挂载到 `/JianXY/`，并禁止根路径资源回退。桌面 1440×900、移动触屏模拟 390×844 验证通过：页面正常渲染、轻量预览和六条高清作品均能播放、首屏高清媒体请求为 0、累计 CLS 为 0、无横向溢出和浏览器运行错误。

证据保存在本地 `preview/pages-playback-check.json` 和 `preview/pages-*-4k.png`，不上传截图与本地审计产物。

## 首次开启

1. 使用具有仓库管理权限的 GitHub 账号完成本地 Git 授权。
2. 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
3. 推送 `main`，查看 **Deploy portfolio to GitHub Pages** 工作流。
4. 工作流成功后，检查公网首页 HTTP 200、非空页面以及视频请求。

本项目不使用 Cloudflare Wrangler，也不会生成 `pages.dev` 域名。
