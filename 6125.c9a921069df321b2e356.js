(self.webpackChunk=self.webpackChunk||[]).push([[6125],{6125:e=>{e.exports='<p>In this guide, we\'ll dive into some of the best practices and utilities for building a production site or application.</p> <blockquote class="tip"> <p>This walkthrough stems from <a href="/guides/tree-shaking">Tree Shaking</a> and <a href="/guides/development">Development</a>. Please ensure you are familiar with the concepts/setup introduced in those guides before continuing on.</p> </blockquote> <h2 id="setup">Setup<a href="#setup" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>The goals of <em>development</em> and <em>production</em> builds differ greatly. In <em>development</em>, we want strong source mapping and a localhost server with live reloading or hot module replacement. In <em>production</em>, our goals shift to a focus on minified bundles, lighter weight source maps, and optimized assets to improve load time. With this logical separation at hand, we typically recommend writing <strong>separate webpack configurations</strong> for each environment.</p> <p>While we will separate the <em>production</em> and <em>development</em> specific bits out, note that we\'ll still maintain a "common" configuration to keep things DRY. In order to merge these configurations together, we\'ll use a utility called <a href="https://github.com/survivejs/webpack-merge"><code>webpack-merge</code></a>. With the "common" configuration in place, we won\'t have to duplicate code within the environment-specific configurations.</p> <p>Let\'s start by installing <code>webpack-merge</code> and splitting out the bits we\'ve already worked on in previous guides:</p> <pre><code class="hljs language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save-dev webpack-merge</code></pre> <p><strong>project</strong></p> <pre><code class="hljs language-diff"><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> webpack-demo\n</span><span class="token prefix unchanged"> </span><span class="token line"> |- package.json\n</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> |- webpack.config.js\n</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> |- webpack.common.js\n</span><span class="token prefix inserted">+</span><span class="token line"> |- webpack.dev.js\n</span><span class="token prefix inserted">+</span><span class="token line"> |- webpack.prod.js\n</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> |- /dist\n</span><span class="token prefix unchanged"> </span><span class="token line"> |- /src\n</span><span class="token prefix unchanged"> </span><span class="token line">   |- index.js\n</span><span class="token prefix unchanged"> </span><span class="token line">   |- math.js\n</span><span class="token prefix unchanged"> </span><span class="token line"> |- /node_modules</span></span></code></pre> <p><strong>webpack.common.js</strong></p> <pre><code class="hljs language-diff"><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> const path = require(\'path\');\n</span><span class="token prefix inserted">+</span><span class="token line"> const { CleanWebpackPlugin } = require(\'clean-webpack-plugin\');\n</span><span class="token prefix inserted">+</span><span class="token line"> const HtmlWebpackPlugin = require(\'html-webpack-plugin\');\n</span><span class="token prefix inserted">+</span><span class="token line">\n</span><span class="token prefix inserted">+</span><span class="token line"> module.exports = {\n</span><span class="token prefix inserted">+</span><span class="token line">   entry: {\n</span><span class="token prefix inserted">+</span><span class="token line">     app: \'./src/index.js\',\n</span><span class="token prefix inserted">+</span><span class="token line">   },\n</span><span class="token prefix inserted">+</span><span class="token line">   plugins: [\n</span><span class="token prefix inserted">+</span><span class="token line">     // new CleanWebpackPlugin([\'dist/*\']) for &#x3C; v2 versions of CleanWebpackPlugin\n</span><span class="token prefix inserted">+</span><span class="token line">     new CleanWebpackPlugin(),\n</span><span class="token prefix inserted">+</span><span class="token line">     new HtmlWebpackPlugin({\n</span><span class="token prefix inserted">+</span><span class="token line">       title: \'Production\',\n</span><span class="token prefix inserted">+</span><span class="token line">     }),\n</span><span class="token prefix inserted">+</span><span class="token line">   ],\n</span><span class="token prefix inserted">+</span><span class="token line">   output: {\n</span><span class="token prefix inserted">+</span><span class="token line">     filename: \'[name].bundle.js\',\n</span><span class="token prefix inserted">+</span><span class="token line">     path: path.resolve(__dirname, \'dist\'),\n</span><span class="token prefix inserted">+</span><span class="token line">   },\n</span><span class="token prefix inserted">+</span><span class="token line"> };</span></span></code></pre> <p><strong>webpack.dev.js</strong></p> <pre><code class="hljs language-diff"><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> const { merge } = require(\'webpack-merge\');\n</span><span class="token prefix inserted">+</span><span class="token line"> const common = require(\'./webpack.common.js\');\n</span><span class="token prefix inserted">+</span><span class="token line">\n</span><span class="token prefix inserted">+</span><span class="token line"> module.exports = merge(common, {\n</span><span class="token prefix inserted">+</span><span class="token line">   mode: \'development\',\n</span><span class="token prefix inserted">+</span><span class="token line">   devtool: \'inline-source-map\',\n</span><span class="token prefix inserted">+</span><span class="token line">   devServer: {\n</span><span class="token prefix inserted">+</span><span class="token line">     contentBase: \'./dist\',\n</span><span class="token prefix inserted">+</span><span class="token line">   },\n</span><span class="token prefix inserted">+</span><span class="token line"> });</span></span></code></pre> <p><strong>webpack.prod.js</strong></p> <pre><code class="hljs language-diff"><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> const { merge } = require(\'webpack-merge\');\n</span><span class="token prefix inserted">+</span><span class="token line"> const common = require(\'./webpack.common.js\');\n</span><span class="token prefix inserted">+</span><span class="token line">\n</span><span class="token prefix inserted">+</span><span class="token line"> module.exports = merge(common, {\n</span><span class="token prefix inserted">+</span><span class="token line">   mode: \'production\',\n</span><span class="token prefix inserted">+</span><span class="token line"> });</span></span></code></pre> <p>In <code>webpack.common.js</code>, we now have setup our <code>entry</code> and <code>output</code> configuration and we\'ve included any plugins that are required for both environments. In <code>webpack.dev.js</code>, we\'ve set <code>mode</code> to <code>development</code>. Also, we\'ve added the recommended <code>devtool</code> for that environment (strong source mapping), as well as our simple <code>devServer</code> configuration. Finally, in <code>webpack.prod.js</code>,<code>mode</code> is set to <code>production</code> which loads <a href="/plugins/terser-webpack-plugin/"><code>TerserPlugin</code></a>, which was first introduced by the <a href="/guides/tree-shaking/">tree shaking</a> guide.</p> <p>Note the use of <code>merge()</code> calls in the environment-specific configurations to include our common configuration in <code>webpack.dev.js</code> and <code>webpack.prod.js</code>. The <code>webpack-merge</code> tool offers a variety of advanced features for merging but for our use case we won\'t need any of that.</p> <h2 id="npm-scripts">NPM Scripts<a href="#npm-scripts" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>Now, let\'s modify our npm scripts to use the new configuration files. For the <code>start</code> script, which runs <code>webpack-dev-server</code>, we will use <code>webpack.dev.js</code>, and for the <code>build</code> script, which runs <code>webpack</code> to create a production build, we will use <code>webpack.prod.js</code>:</p> <p><strong>package.json</strong></p> <pre><code class="hljs language-diff"><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> {\n</span><span class="token prefix unchanged"> </span><span class="token line">   "name": "development",\n</span><span class="token prefix unchanged"> </span><span class="token line">   "version": "1.0.0",\n</span><span class="token prefix unchanged"> </span><span class="token line">   "description": "",\n</span><span class="token prefix unchanged"> </span><span class="token line">   "main": "src/index.js",\n</span><span class="token prefix unchanged"> </span><span class="token line">   "scripts": {\n</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">     "start": "webpack serve --open",\n</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     "start": "webpack serve --open --config webpack.dev.js",\n</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">     "build": "webpack"\n</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">     "build": "webpack --config webpack.prod.js"\n</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   },\n</span><span class="token prefix unchanged"> </span><span class="token line">   "keywords": [],\n</span><span class="token prefix unchanged"> </span><span class="token line">   "author": "",\n</span><span class="token prefix unchanged"> </span><span class="token line">   "license": "ISC",\n</span><span class="token prefix unchanged"> </span><span class="token line">   "devDependencies": {\n</span><span class="token prefix unchanged"> </span><span class="token line">     "clean-webpack-plugin": "^0.1.17",\n</span><span class="token prefix unchanged"> </span><span class="token line">     "css-loader": "^0.28.4",\n</span><span class="token prefix unchanged"> </span><span class="token line">     "csv-loader": "^2.1.1",\n</span><span class="token prefix unchanged"> </span><span class="token line">     "express": "^4.15.3",\n</span><span class="token prefix unchanged"> </span><span class="token line">     "file-loader": "^0.11.2",\n</span><span class="token prefix unchanged"> </span><span class="token line">     "html-webpack-plugin": "^2.29.0",\n</span><span class="token prefix unchanged"> </span><span class="token line">     "style-loader": "^0.18.2",\n</span><span class="token prefix unchanged"> </span><span class="token line">     "webpack": "^4.30.0",\n</span><span class="token prefix unchanged"> </span><span class="token line">     "webpack-dev-middleware": "^1.12.0",\n</span><span class="token prefix unchanged"> </span><span class="token line">     "webpack-dev-server": "^2.9.1",\n</span><span class="token prefix unchanged"> </span><span class="token line">     "webpack-merge": "^4.1.0",\n</span><span class="token prefix unchanged"> </span><span class="token line">     "xml-loader": "^1.2.1"\n</span><span class="token prefix unchanged"> </span><span class="token line">   }\n</span><span class="token prefix unchanged"> </span><span class="token line"> }</span></span></code></pre> <p>Feel free to run those scripts and see how the output changes as we continue adding to our <em>production</em> configuration.</p> <h2 id="specify-the-mode">Specify the Mode<a href="#specify-the-mode" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>Many libraries will key off the <code>process.env.NODE_ENV</code> variable to determine what should be included in the library. For example, when <code>process.env.NODE_ENV</code> is not set to <code>\'production\'</code> some libraries may add additional logging and testing to make debugging easier. However, with <code>process.env.NODE_ENV</code> set to <code>\'production\'</code> they might drop or add significant portions of code to optimize how things run for your actual users. Since webpack v4, specifying <a href="/configuration/mode/"><code>mode</code></a> automatically configures <a href="/plugins/define-plugin"><code>DefinePlugin</code></a> for you:</p> <p><strong>webpack.prod.js</strong></p> <pre><code class="hljs language-diff"><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const { merge } = require(\'webpack-merge\');\n</span><span class="token prefix unchanged"> </span><span class="token line"> const common = require(\'./webpack.common.js\');\n</span></span>\n<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = merge(common, {\n</span><span class="token prefix unchanged"> </span><span class="token line">   mode: \'production\',\n</span><span class="token prefix unchanged"> </span><span class="token line"> });</span></span></code></pre> <blockquote class="tip"> <p>Technically, <code>NODE_ENV</code> is a system environment variable that Node.js exposes into running scripts. It is used by convention to determine dev-vs-prod behavior by server tools, build scripts, and client-side libraries. Contrary to expectations, <code>process.env.NODE_ENV</code> is not set to <code>\'production\'</code> <strong>within</strong> the build script <code>webpack.config.js</code>, see <a href="https://github.com/webpack/webpack/issues/2537">#2537</a>. Thus, conditionals like <code>process.env.NODE_ENV === \'production\' ? \'[name].[contenthash].bundle.js\' : \'[name].bundle.js\'</code> within webpack configurations do not work as expected.</p> </blockquote> <p>If you\'re using a library like <a href="https://reactjs.org/"><code>react</code></a>, you should actually see a significant drop in bundle size after adding <code>DefinePlugin</code>. Also, note that any of our local <code>/src</code> code can key off of this as well, so the following check would be valid:</p> <p><strong>src/index.js</strong></p> <pre><code class="hljs language-diff"><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> import { cube } from \'./math.js\';\n</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">\n</span><span class="token prefix inserted">+</span><span class="token line"> if (process.env.NODE_ENV !== \'production\') {\n</span><span class="token prefix inserted">+</span><span class="token line">   console.log(\'Looks like we are in development mode!\');\n</span><span class="token prefix inserted">+</span><span class="token line"> }\n</span></span>\n<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> function component() {\n</span><span class="token prefix unchanged"> </span><span class="token line">   const element = document.createElement(\'pre\');\n</span></span>\n<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   element.innerHTML = [\n</span><span class="token prefix unchanged"> </span><span class="token line">     \'Hello webpack!\',\n</span><span class="token prefix unchanged"> </span><span class="token line">     \'5 cubed is equal to \' + cube(5)\n</span><span class="token prefix unchanged"> </span><span class="token line">   ].join(\'\\n\\n\');\n</span></span>\n<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   return element;\n</span><span class="token prefix unchanged"> </span><span class="token line"> }\n</span></span>\n<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> document.body.appendChild(component());</span></span></code></pre> <h2 id="minification">Minification<a href="#minification" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>webpack v4+ will minify your code by default in <a href="/configuration/mode/#mode-production"><code>production mode</code></a>.</p> <p>Note that while the <a href="/plugins/terser-webpack-plugin/"><code>TerserPlugin</code></a> is a great place to start for minification and being used by default, there are other options out there:</p> <ul> <li><a href="https://github.com/webpack-contrib/closure-webpack-plugin"><code>ClosureWebpackPlugin</code></a></li> </ul> <p>If you decide to try another minification plugin, just make sure your new choice also drops dead code as described in the <a href="/guides/tree-shaking">tree shaking</a> guide and provide it as the <a href="/configuration/optimization/#optimizationminimizer"><code>optimization.minimizer</code></a>.</p> <h2 id="source-mapping">Source Mapping<a href="#source-mapping" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>We encourage you to have source maps enabled in production, as they are useful for debugging as well as running benchmark tests. That said, you should choose one with a fairly quick build speed that\'s recommended for production use (see <a href="/configuration/devtool"><code>devtool</code></a>). For this guide, we\'ll use the <code>source-map</code> option in the <em>production</em> as opposed to the <code>inline-source-map</code> we used in the <em>development</em>:</p> <p><strong>webpack.prod.js</strong></p> <pre><code class="hljs language-diff"><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> const { merge } = require(\'webpack-merge\');\n</span><span class="token prefix unchanged"> </span><span class="token line"> const common = require(\'./webpack.common.js\');\n</span></span>\n<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> module.exports = merge(common, {\n</span><span class="token prefix unchanged"> </span><span class="token line">   mode: \'production\',\n</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   devtool: \'source-map\',\n</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> });</span></span></code></pre> <blockquote class="tip"> <p>Avoid <code>inline-***</code> and <code>eval-***</code> use in production as they can increase bundle size and reduce the overall performance.</p> </blockquote> <h2 id="minimize-css">Minimize CSS<a href="#minimize-css" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>It is crucial to minimize your CSS for production. Please see the <a href="/plugins/mini-css-extract-plugin/#minimizing-for-production">Minimizing for Production</a> section.</p> <h2 id="cli-alternatives">CLI Alternatives<a href="#cli-alternatives" aria-hidden="true" tabindex="-1"><span class="header-link"></span></a></h2> <p>Some of what has been described above can also be achieved by using the command line. For example, the <code>--optimize-minimize</code> flag will include the <code>TerserPlugin</code> behind the scenes. The <code>--define process.env.NODE_ENV="\'production\'"</code> will do the same for the <code>DefinePlugin</code> instance described above. And, <code>webpack -p</code> will automatically invoke both those flags and thus the plugins to be included.</p> <p>While these shorthand methods are nice, we usually recommend just using the configuration as it\'s better to understand exactly what is being done for you in both cases. The configuration also gives you more control on fine-tuning other options within both plugins.</p> '}}]);