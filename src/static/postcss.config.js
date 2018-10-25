// const postcssEasyImport = require('postcss-easy-import');
// const autoprefixer = require('autoprefixer');
//
// module.exports = {
//   plugins: [
//     postcssEasyImport({ prefix: '_' }), // keep this first
//     autoprefixer({ grid: true, flexbox: true, }), // so imports are auto-prefixed too
//   ],
// }


module.exports = function () {
    return {
        plugins: [
            require('precss')({}),
            require('postcss-cssnext')({ browsers: ['> 0.05%', 'IE 7'], cascade: false })
        ]
    }
};
