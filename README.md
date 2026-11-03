# QQcord CF Worker

<h3 align="right">——Fuck Tencent</h3>

基于 Cloudflare Workers 的轻量级文件反向代理，为 [QQcord](https://github.com/AkademiyaEdu/qqcord-fuck-tencent) 提供文件分发服务。

仅代理 `/file/` 路径下的请求，自动跟随上游 HTTP 重定向，并将最终响应返回给客户端。

## 一键部署

[![部署到 Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/AkademiyaEdu/qqcord-cf-worker-fuck-tencent)

点击后按照页面提示完成部署。

部署时必须设置 `UPSTREAM_HOSTNAME`，填写自己的上游服务器域名，例如：

```text
files.example.com
```

若不配置 Worker 将报错 `503 Upstream not configured`
