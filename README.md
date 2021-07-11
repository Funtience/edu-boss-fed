# edu-boss-fed

# 关于 Token 过期的问题

access_token
作用: 获取需要授权的接口数据

expires_in
作用: access_token 过期时间

refresh_token
作用: 刷新获取新的 access_token

为什么 access_token 需要有过期时间以及为什么比较短?
为了安全

方法一:
在请求发起前拦截每个请求, 判断 token 的有效时间是否已经过期, 若已过期, 则将请求挂起, 先刷新 token 后再继续请求
优点: 在请求前拦截, 能节省请求, 省流量
缺点: 需要后端额外提供一个 token 过期时间的字段; 使用本地时间判断, 若本地时间被篡改, 特别是本地时间比服务器时间慢时, 拦截会失败

方法二:
不在请求前拦截, 而是拦截返回后的数据, 先发起请求, 接口返回过期后, 先刷新 token, 再进行一次重试
优点: 不需要额外的 token 过期字段, 不需判断时间
缺点: 会消耗多一次请求, 耗流量

综上, 方法一和方法二优缺点是互补的, 方法一有校验失败的风险(本地时间被篡改时, 当然一般没有用户闲得蛋疼去改本地时间), 方法二更简单粗暴, 等知道服务器已经过期了再重试一次, 只是会耗多一个请求

# 路由中通过 props:true 将 路由 params 参数解耦,可以直接在组建中通过 props 获取

# axios 有一个 onUploadProgress 可以获取上传进度

# 阿里云视频点播
https://help.aliyun.com/document_detail/52204.html?spm=a2c4g.11186623.6.1015.88d05facKP6vyN

# 本地预览跨域可以写一个 node 脚本, 通过 http-proxy-middleware 做一下代理
