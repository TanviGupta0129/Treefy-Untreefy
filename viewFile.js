let fs=require("fs");
let path=require("path");
module.exports.view=function()
{
   let src=arguments[0];
    let mode=arguments[1];
if(mode=="-t"){
    viewAsTree("",src);
}
else if(mode=="-f"){
    viewAsFlatFiles(src);
}
else{
    console.log("Wrong parameter");
}
}
//view as file
function viewAsTree(indent,src)
{
        let ans = fs.lstatSync(src).isDirectory();
        if(ans==false)
        {
            console.log(indent +path.basename(src)+ "*");  //used to get the filename portion of a path to the file
        }
        else{
            // console.log("I am a folder");
            console.log(indent + path.basename(src));
         let children=fs.readdirSync(src);
         for(let i=0;i<children.length;i++)
         {
             let cChPath=path.join(src,children[i]);
             viewAsTree(indent +"\t",cChPath);
         }
        }
        }
        // viewAsTree("","C:\\Users\\User\\Desktop\\Revision\\FACTS\\src");

 //view as flat file
function viewAsFlatFiles(src)
{
        let ans = fs.lstatSync(src).isDirectory(); //fs. Stat object returns several fields and methods to get more details about the file
        if(ans==false)
           {
            console.log(src+ "*");
        }
         else{
                // console.log("I am a folder");
            console.log(src);
            
            let children=fs.readdirSync(src); //fs. readdirSync() method is used to get a list of the names of all files present in a directory
            for(let i=0;i<children.length;i++)
            {
                let cChPath=path.join(src,children[i]);
                viewAsFlatFiles(cChPath);
            }
            }
            }
            // viewAsFlatFiles("","C:\\Users\\User\\Desktop\\Revision\\FACTS\\src");