const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
module.exports.untreefy = function () {
    let src = arguments[0];
    let mode = arguments[1];
    let root = {};
    move(src, mode, root);
    fs.writeFileSync(path.join(mode,'metadata.json'), JSON.stringify(root));
/*JSON.stringify() is an inbuilt function in JSON which allows us to take a JavaScript object or Array and create a 
JSON string out of it*/
}

function move(src, dest, node) {
    let ans = fs.lstatSync(src).isDirectory();
    if (ans == false) {
        let uniqName = uniqid();
        node.isFile = true;
        node.oldName=path.basename(src);
        node.newName= uniqName;
        fs.copyFileSync(src, path.join(dest, uniqName));
    }
    else {
        let children = fs.readdirSync(src);
        node.isFile = false;
        node.name = path.basename(src);
        node.child = []; //child empty array

        for (let i = 0; i < children.length; i++) {
            let chobj = {};
            move(path.join(src, children[i]), dest, chobj);
            node.child.push(chobj);
        }
    }
}