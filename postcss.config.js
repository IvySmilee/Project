const autoprefixer = require("autoprefixer");
//const  atimport = require("postcss-import");
const  cssnanao =  require("cssnano");
module.exports={
    plugins:[
//      atimport,
        autoprefixer({
             browsers:['>0%']
//           browsers:['last 2 version']
        }),
        cssnanao
    ]
}