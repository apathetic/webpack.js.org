(self.webpackChunk=self.webpackChunk||[]).push([[4967],{4967:a=>{a.exports='<p><a href="https://npmjs.com/package/raw-loader"><img src="https://img.shields.io/npm/v/raw-loader.svg" alt="npm"></a> <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/raw-loader.svg" alt="node"></a> <a href="https://david-dm.org/webpack-contrib/raw-loader"><img src="https://david-dm.org/webpack-contrib/raw-loader.svg" alt="deps"></a> <a href="https://github.com/webpack-contrib/raw-loader/actions"><img src="https://github.com/webpack-contrib/raw-loader/workflows/raw-loader/badge.svg" alt="tests"></a> <a href="https://codecov.io/gh/webpack-contrib/raw-loader"><img src="https://codecov.io/gh/webpack-contrib/raw-loader/branch/master/graph/badge.svg" alt="coverage"></a> <a href="https://gitter.im/webpack/webpack"><img src="https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg" alt="chat"></a> <a href="https://packagephobia.now.sh/result?p=raw-loader"><img src="https://packagephobia.now.sh/badge?p=raw-loader" alt="size"></a></p> <p>A loader for webpack that allows importing files as a String.</p> <h2 id="getting-started">Getting Started<a href="#getting-started" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>To begin, you\'ll need to install <code>raw-loader</code>:</p> <pre><code class="hljs language-console">$ npm install raw-loader --save-dev\n</code></pre> <p>Then add the loader to your <code>webpack</code> config. For example:</p> <p><strong>file.js</strong></p> <pre><code class="hljs language-js"><span class="token keyword">import</span> txt <span class="token keyword">from</span> <span class="token string">\'./file.txt\'</span><span class="token punctuation">;</span></code></pre> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-js"><span class="token comment">// webpack.config.js</span>\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  module<span class="token operator">:</span> <span class="token punctuation">{</span>\n    rules<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> <span class="token regex">/\\.txt$/i</span><span class="token punctuation">,</span>\n        use<span class="token operator">:</span> <span class="token string">\'raw-loader\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <p>And run <code>webpack</code> via your preferred method.</p> <h2 id="options">Options<a href="#options" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <table> <thead> <tr> <th align="center">Name</th> <th align="center">Type</th> <th align="center">Default</th> <th align="left">Description</th> </tr> </thead> <tbody> <tr> <td align="center"><div class="title"><p>Name</p><p>Type</p><p>Default</p><p>Description</p></div><div class="content"><p><strong><a href="#esmodule"><code>esModule</code></a></strong></p><p class="description mobile"><code>{Boolean}</code></p><p></p></div></td> <td align="center" class="description desktop"><code>{Boolean}</code></td> <td align="center"><code>true</code></td> <td align="left">Uses ES modules syntax</td> </tr> </tbody> </table> <h3 id="esmodule"><code>esModule</code><a href="#esmodule" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h3> <p>Type: <code>Boolean</code> Default: <code>true</code></p> <p>By default, <code>raw-loader</code> generates JS modules that use the ES modules syntax. There are some cases in which using ES modules is beneficial, like in the case of <a href="/plugins/module-concatenation-plugin/">module concatenation</a> and <a href="/guides/tree-shaking/">tree shaking</a>.</p> <p>You can enable a CommonJS module syntax using:</p> <p><strong>webpack.config.js</strong></p> <pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  module<span class="token operator">:</span> <span class="token punctuation">{</span>\n    rules<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token operator">:</span> <span class="token regex">/\\.txt$/i</span><span class="token punctuation">,</span>\n        use<span class="token operator">:</span> <span class="token punctuation">[</span>\n          <span class="token punctuation">{</span>\n            loader<span class="token operator">:</span> <span class="token string">\'raw-loader\'</span><span class="token punctuation">,</span>\n            options<span class="token operator">:</span> <span class="token punctuation">{</span>\n              esModule<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre> <h2 id="examples">Examples<a href="#examples" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <h3 id="inline">Inline<a href="#inline" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h3> <pre><code class="hljs language-js"><span class="token keyword">import</span> txt <span class="token keyword">from</span> <span class="token string">\'raw-loader!./file.txt\'</span><span class="token punctuation">;</span></code></pre> <p>Beware, if you already define loader(s) for extension(s) in <code>webpack.config.js</code> you should use:</p> <pre><code class="hljs language-js"><span class="token keyword">import</span> css <span class="token keyword">from</span> <span class="token string">\'!!raw-loader!./file.txt\'</span><span class="token punctuation">;</span> <span class="token comment">// Adding `!!` to a request will disable all loaders specified in the configuration</span></code></pre> <h2 id="contributing">Contributing<a href="#contributing" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>Please take a moment to read our contributing guidelines if you haven\'t yet done so.</p> <p><a href="https://github.com/webpack-contrib/raw-loader/blob/master/.github/CONTRIBUTING.md">CONTRIBUTING</a></p> <h2 id="license">License<a href="#license" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p><a href="https://github.com/webpack-contrib/raw-loader/blob/master/LICENSE">MIT</a></p> '}}]);