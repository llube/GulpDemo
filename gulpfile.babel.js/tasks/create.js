const yargs = require('yargs');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra')
const replace = require('replace');

const argv = yargs.argv;
const moduleName = argv.com;

const templatePath = path.resolve(__dirname, '../templates/component'); // ../ 开头，拼接前面的路径，且不含最后一节路径；
// console.log('模板地址是。。。。',__dirname, templatePath)
module.exports = (cb) => {
  console.log('参数', argv)
  const pathReg = /^[a-zA-Z0-9]+$/g;
  const upModuleName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
  if(!pathReg.test(upModuleName)){
    console.log(chalk`{cyanBright [创建组件]}：{redBright [失败]（组件名称只能包含字母和数字）}`);
    process.exit();
  }
  // console.log(process.cwd()) //会返回 Node.js 进程的当前工作目录。即E:\gulp\my-project
  const modulePath = path.join(process.cwd(), `src/components/${moduleName}`);
  const indexPath = path.join(process.cwd(), 'src/components/index.js');
  console.log(modulePath, indexPath)

  if(fs.existsSync(modulePath)){
    console.log(chalk`{cyanBright [创建组件]}：{redBright [失败]（组件名称已存在）}`);
    process.exit();
  }else{
    try{
      fse.copySync(templatePath, modulePath, {
        filter: (src, dest) => {
          return 1;
        }
      })

      replace({
        regex: "ComponentName",
        replacement: upModuleName,
        paths: [modulePath],
        recursive: true,
        silent: true,
      })
    }catch(err){
      console.log(chalk`{cyanBright [创建组件]}: {redBright [失败]（赋值模板失败）}`);
      process.exit();
    }
  }
  cb();
}