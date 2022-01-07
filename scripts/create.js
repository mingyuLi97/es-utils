/*
 * @Description: 创建一个新的方法
 * @Author: 李明宇
 * @Date: 2022-01-07 22:19:52
 */
const prompts = require('prompts');
const fs = require('fs');
const path = require('path');

const SRC_PATH = path.resolve(__dirname, '../src');
const TEST_PATH = path.resolve(__dirname, '../test');

const utils = fs.readdirSync(SRC_PATH);
console.log(utils);
(async function () {
  const { name, description } = await prompts([
    {
      type: 'text',
      message: 'please input util name:',
      name: 'name',
      validate: function (val) {
        if (!val) {
          return '❌ name is empty!';
        }
        if (utils.includes(val)) {
          return '❌ name is already exist!';
        }
        return true;
      }
    },
    {
      type: 'text',
      message: 'please describe this util:',
      name: 'description',
      initial: ''
    }
  ]);
  const newPath = path.resolve(SRC_PATH, name);
  // src 下创建文件夹
  fs.mkdirSync(newPath);

  writeFileByList([
    {
      path: path.resolve(newPath, 'index.ts'),
      content: `/*\n* @Description: ${description}\n* @Author: 李明宇\n*/`
    },
    {
      path: path.resolve(newPath, 'README.md'),
      content: `# ${name}\n\n> ${description}`
    },
    {
      path: path.resolve(TEST_PATH, `${name}.test.ts`),
      content: `import {} from '../src/${name}';\ntest('测试 ${name} 功能', () => {});`
    }
  ]);
})();

function writeFileByList(arr) {
  arr.forEach(({ path, content }) => {
    fs.writeFileSync(path, content);
    console.log(`Write file success: ${path}`);
  });
}
