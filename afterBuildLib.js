const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.join(__dirname, './lib/index.less'))) {

    let indexLess = fs.readFileSync("./lib/index.less");
    const newIndexLess = indexLess.toString().replace(/components\//g, '../lib/components/');

    fs.writeFileSync(
        path.join(process.cwd(), 'dist', 'index.less'),
        newIndexLess,
    );
    console.log('Build ./dist/index.less - done');

}

