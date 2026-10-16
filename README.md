# NEON ARCADE

包含手机竖屏小游戏：

- `index.html` — 游戏选择首页
- `tetris.html` — 俄罗斯方块
- `breakout.html` — 打砖块

无依赖，纯 HTML/CSS/JS。

## GitHub Pages 部署

1. 创建公共仓库，例如 `neon-arcade`。
2. 将这三个 HTML 文件以及 `.nojekyll` 上传到仓库根目录并提交到 `main`。
3. 进入仓库 **Settings → Pages**，在 **Build and deployment** 选择 **Deploy from a branch**；选 `main` 和 `/ (root)`，保存。
4. 等 GitHub Pages 完成发布后，访问 `https://<用户名>.github.io/neon-arcade/`。

使用 Safari 打开这个 HTTPS 页面；不要在 iOS 文件 App 的 HTML 预览中运行。