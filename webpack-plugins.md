#### ExtractTextWebpackPlugin
[link](https://github.com/pigcan/blog/issues/9)

>该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
>```js
>plugins: [
>     new ExtractTextPlugin('[name]-[chunkhash].css')
>]
>```
>chunkhash 采用hash无法缓存文件，采用chunkhash修改样式后，名词继续一样，
>采用自带的contenthash则做出改变
>但是contenthash 当同类css发生改变的时候，其变化也会引起，
>使用Git diff dist/12312.js dist/aasdas.js
>查看改变的具体位置
> -/******/       return __webpack_require__(__webpack_require__.s = 75);
> +/******/       return __webpack_require__(__webpack_require__.s = 74);
> webpack给每个文件id，当其中一个id去除后，将会影响其他的文件的Id,-1,则hash改变

#### CommonsChunkPlugin
```js
new webpack.optimize.CommonsChunkPlugin({
  name: 'runtime'
})
```

#### NamedModulesPlugin
