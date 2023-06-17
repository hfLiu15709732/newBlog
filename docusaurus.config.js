// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '峰哥博客',
  tagline: '计算机技能学习网站',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://newblog.hfliu.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'hfLiuX', // Usually your GitHub org/user name.
  projectName: 'https://github.com/hfLiu15709732', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN"],
    // locales: ["zh-CN", "en"],
    localeConfigs: {
      "zh-CN": {
        label: "中文",
      },
    },
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsed: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/hfLiu15709732',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/hfLiu15709732',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    (
      {

      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '峰哥博客',
        logo: {
          alt: '峰哥博客',
          src: 'img/logo.svg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          {
            type: 'docSidebar',
            sidebarId: 'frontSidebar',
            position: 'left',
            label: '大前端开发',
          },
          {
            type: 'docSidebar',
            sidebarId: 'schoolSidebar',
            position: 'left',
            label: '学校课程',
          },
          {
            type: 'docSidebar',
            sidebarId: 'techSidebar',
            position: 'left',
            label: '技术/项目',
          },
          {to: '/blog', label: '网站建设日志', position: 'left'},
          {
            href: 'https://github.com/hfLiu15709732',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://beta.chatmindai.net/home',
            label: 'ChatMind-AI',
            position: 'right',
          },
          {
            href: 'https://www.docusaurus.io/zh-CN',
            label: 'Docusaurus',
            position: 'right',
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '博客文档',
            items: [
              {
                label: '大前端开发',
                to: '/docs/FrontEnd/intro',
              },
              {
                label: '学校课程',
                to: '/docs/school/intro',
              },
              {
                label: '技术/项目分享',
                to: '/docs/school/intro',
              },
            ],
          },
          {
            title: '友链连接',
            items: [
              {
                label: 'ChatMind-AI',
                href: 'https://beta.chatmindai.net/home',
              },
              {
                label: '作者GitHub',
                href: 'https://github.com/hfLiu15709732',
              },
              {
                label: 'Docusaurus文档',
                href: 'https://www.docusaurus.io/zh-CN',
              },
            ],
          },
          {
            title: '更多精彩',
            items: [
              {
                label: '老博客',
                href:"https://blog.hfliu.com/",
              },
            ],
          },
        ],
        copyright: `<div><a href="https://beian.miit.gov.cn/">津ICP备2023000487号</a></div><div>Copyright&nbsp;2023&nbsp;&nbsp;&nbsp;hfLiu.com&nbsp;版权所有</div>`,
      },
      prism: {
        darkTheme: darkCodeTheme,
        theme: lightCodeTheme,
        additionalLanguages: ['powershell','csharp.js','java.js','css.js','cpp.js','bash.js','sql.js'],

      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
      },
    }),
};

module.exports = config;
