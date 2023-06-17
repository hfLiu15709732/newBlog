/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [
  //   {type: 'autogenerated', dirName: 'tutorial-basics/easy', },
  //   {type: 'autogenerated', dirName: 'tutorial-basics/mid'},
  // ],

  // But you can create a sidebar manually
  
  // tutorialSidebar: [
  //   {
  //     type: 'category',
  //     label: 'Tutorial',
  //     items: ['tutorial-basics/create-a-document'],
  //   },
  //   {
  //     type: 'category',
  //     label: 'twoSider',
  //     items: ['tutorial-extras/translate-your-site'],
  //   },
  // ],
  frontSidebar: [
    'FrontEnd/intro',
   {
       type: 'category',
       label: 'HTML5/CSS3基础',
       items: [{type: 'autogenerated', dirName: 'FrontEnd/H5C3', }],
    },
    {
      type: 'category',
      label: 'JS基础',
      items: [{type: 'autogenerated', dirName: 'FrontEnd/JS-Weak', }],
   },
   {
    type: 'category',
    label: 'JS进阶',
    items: [{type: 'autogenerated', dirName: 'FrontEnd/JS-Strong', }],
    },
    {
      type: 'category',
      label: 'Node基础',
      items: [{type: 'autogenerated', dirName: 'FrontEnd/Node-Weak', }],
    },
    {
      type: 'category',
      label: '前端工程化准备',
      items: [{type: 'autogenerated', dirName: 'FrontEnd/Prj-Pre', }],
      },
      {
        type: 'category',
        label: 'MVVM框架',
        items: [
          {
            type: 'category',
            label: 'React学习',
            items: [{type: 'autogenerated', dirName: 'FrontEnd/Mvvm/React', }],
          },
          {
            type: 'category',
            label: '建设中',
            items: [{type: 'autogenerated', dirName: 'FrontEnd/Mvvm/other', }],
          },
        ],
      },
      {
        type: 'category',
        label: '工程化深入',
        items: [{type: 'autogenerated', dirName: 'FrontEnd/Prj-Deep', }],
      },
      {
          type: 'category',
          label: '大前端开发',
          items: [
            {
              type: 'category',
              label: '服务端方向',
              items: [{type: 'autogenerated', dirName: 'FrontEnd/FrontEnd-Wider/server', }],
            },
            {
              type: 'category',
              label: '小程序方向',
              items: [{type: 'autogenerated', dirName: 'FrontEnd/FrontEnd-Wider/mini_app', }],
            },
            {
              type: 'category',
              label: '移动端方向',
              items: [{type: 'autogenerated', dirName: 'FrontEnd/FrontEnd-Wider/mobile',}],
            },
          ],
      },
      // {
      //   type: 'link',
      //   label: '学校课程',
      //   href: '/docs/school/intro',
      // },
      // {
      //   type: 'link',
      //   label: '技术&项目',
      //   href: '/docs/Tech/intro',
      // },
      // {
      //   type: 'link',
      //   label: '网站日志',
      //   href: '/blog',
      // },
    
  ],

  schoolSidebar: [
    'school/intro',
    {
        type: 'category',
        label: '大学物理',
        items: [{type: 'autogenerated', dirName: 'school/physics', }],
     },
     {
       type: 'category',
       label: '数据库',
       items: [{type: 'autogenerated', dirName: 'school/dataBase'},],
    },
    {
      type: 'category',
      label: '数电-模电',
      items: [{type: 'autogenerated', dirName: 'school/circuit'},],
   },
   {
      type: 'category',
      label: '政治课程',
      items: [{type: 'autogenerated', dirName: 'school/politics'},],
    },
    {
      type: 'category',
      label: '计算机网络',
      items: [{type: 'autogenerated', dirName: 'school/csNet'},],
    },
    {
      type: 'category',
      label: 'JAVA程序设计',
      items: [{type: 'autogenerated', dirName: 'school/java'},],
    },
  ],
  techSidebar: [
    'Tech/intro',
    {
        type: 'category',
        label: '尚未建设',
        items: [{type: 'autogenerated', dirName: 'Tech/circuit', }],
     },
     {
       type: 'category',
       label: '施工中',
       items: [{type: 'autogenerated', dirName: 'Tech/csNet'},],
    },

  ],
};

module.exports = sidebars;
