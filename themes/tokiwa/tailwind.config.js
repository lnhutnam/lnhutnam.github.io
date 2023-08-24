module.exports = {
  purge: false, //in postcss.config.js
  theme: {
    textIndent: { // defaults to {}
      '1': '1rem',
      '2': '2rem',
    },
    textShadow: { // defaults to {}
      'default': '0 2px 5px rgba(0, 0, 0, 0.5)',
      'lg': '0 2px 10px rgba(0, 0, 0, 0.5)',
    },
    extend: {
      fontFamily: {
        // 'sans': '"Source Han Sans SC", "Source Han Sans CN","Noto Sans CJK SC", "Noto Sans", -apple-system, "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",  "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif',
        'sans': 'LatexFont',
        //For varible font usage sometimes
        // 'serif': '"Source Han Serif CN Variable", "Source Han Serif SC", "Source Han Serif CN","Noto Serif CJK SC", "Songti SC",  STSong, "AR PL New Sung", "AR PL SungtiL GB", NSimSun, SimSun, "TW\-Sung", "WenQuanYi Bitmap Song", "AR PL UMing CN", "AR PL UMing HK", "AR PL UMing TW", "AR PL UMing TW MBE", PMingLiU, MingLiU, serif',
        // 'serif': '"Source Han Serif SC", "Source Han Serif CN","Noto Serif CJK SC", "Songti SC",  STSong, "AR PL New Sung", "AR PL SungtiL GB", NSimSun, SimSun, "TW\-Sung", "WenQuanYi Bitmap Song", "AR PL UMing CN", "AR PL UMing HK", "AR PL UMing TW", "AR PL UMing TW MBE", PMingLiU, MingLiU, serif',
        'serif': 'LatexFont',
        // 'cursive': 'FancyTitleFont,"Source Han Serif SC", "Source Han Serif CN",  "Noto Serif CJK SC", "Songti SC", STSong, "AR PL New Sung", "AR PL SungtiL GB", NSimSun, SimSun, "TW\-Sung", "WenQuanYi Bitmap Song", "AR PL UMing CN", "AR PL UMing HK", "AR PL UMing TW", "AR PL UMing TW MBE", PMingLiU, MingLiU, serif',
        'cursive': 'LatexFont',
        // 'mono': "'Fira Code','Cascadia Code',Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New','Sarasa Mono SC','Noto Sans CJK SC','monospace', monospace"
        'mono': 'LatexFont',
      },

      minHeight: {
        '70vh': '70vh'
      },
      minWidth: {
        '0.7': "70%",
        '0.4': "40%"
      },
      inset: {
        "-1": "-0.25rem"
      },
      flexGrow: {
        "3": 3
      },
      maxHeight: {
        '16': '5rem'
      },
      maxWidth: {
        'xxs': '15em',
        'xxxs': '5rem'
      },
      colors: { // color scheme:
        // https://javisperez.github.io/tailwindcolorshades/#/?blue-stone=085f63&java=49beb7&golden-tainoi=facf5a&eucalyptus=028760&Medium%20Red%20Violet=c64191&tv=1
        'eucalyptus': {
          100: '#E6F3EF',
          200: '#C0E1D7',
          300: '#9ACFBF',
          400: '#4EAB90',
          500: '#028760',
          600: '#027A56',
          700: '#01513A',
          800: '#013D2B',
          900: '#01291D',
        },
        'java': {
          100: '#EDF9F8',
          200: '#D2EFED',
          300: '#B6E5E2',
          400: '#80D2CD',
          500: '#49BEB7',
          600: '#42ABA5',
          700: '#2C726E',
          800: '#215652',
          900: '#163937',
        },
        'golden-tainoi': {
          100: '#FFFAEF',
          200: '#FEF3D6',
          300: '#FDECBD',
          400: '#FCDD8C',
          500: '#FACF5A',
          600: '#E1BA51',
          700: '#967C36',
          800: '#715D29',
          900: '#4B3E1B',
        },
        'medium-red-violet': {
          100: '#F9ECF4',
          200: '#F1D0E4',
          300: '#E8B3D3',
          400: '#D77AB2',
          500: '#C64191',
          600: '#B23B83',
          700: '#772757',
          800: '#591D41',
          900: '#3B142C',
        },
        gray: {  //from tailwindCSS v1.x
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        'fun-blue': {
          '50': '#F2FAFC', 
          '100': '#E1F1F7', 
          '200': '#BBDCED', 
          '300': '#94C3E0', 
          '400': '#5293CC', 
          '500': '#1a5fb4', 
          '600': '#1553A3', 
          '700': '#0E3E87', 
          '800': '#092E6E', 
          '900': '#051E52', 
          '950': '#021136'
        },
        'mariner': {
          50: '#F2FAFC', 
          100: '#E6F6FC', 
          200: '#BFE2F5', 
          300: '#9CD0F0', 
          400: '#5AA4E6', 
          500: '#1c71d8', 
          600: '#1862C4', 
          700: '#104BA3', 
          800: '#0A3682', 
          900: '#062461', 
          950: '#031440'
        },
        'dodger': {
          '50': '#F2FAFC', 
          '100': '#E8F6FC', 
          '200': '#C8E7F7', 
          '300': '#A9D8F5', 
          '400': '#6CAFEB', 
          '500': '#3584e4', 
          '600': '#2B71CC', 
          '700': '#1D56AB', 
          '800': '#133E87', 
          '900': '#0A2966', 
          '950': '#051642'
        },
        'havelock': {
          '50': '#F7FDFF', 
          '100': '#EDF8FC', 
          '200': '#D7EEFA', 
          '300': '#BEE2F7', 
          '400': '#8DC2F0', 
          '500': '#62a0ea', 
          '600': '#5089D4', 
          '700': '#3767B0', 
          '800': '#234A8C', 
          '900': '#143069', 
          '950': '#081945'
        },
        'jordy': {
          '50': '#FAFEFF', 
          '100': '#F5FCFF', 
          '200': '#E6F4FC', 
          '300': '#D4ECFA', 
          '400': '#B7D9F7', 
          '500': '#99c1f1', 
          '600': '#7DA6DB', 
          '700': '#557BB5', 
          '800': '#375891', 
          '900': '#1F396E', 
          '950': '#0D1D47'
        },
      },
    },
  },
  variants: {},
  // plugins: [
  //   require('@tailwindcss/typography'),
  //   // ...
  // ],
  // plugins: [require('tailwindcss-typography')({
  //   // all these options default to the values specified here
  //   ellipsis: true,         // whether to generate ellipsis utilities
  //   hyphens: true,          // whether to generate hyphenation utilities
  //   kerning: true,          // whether to generate kerning utilities
  //   textUnset: true,        // whether to generate utilities to unset text properties
  //   componentPrefix: 'c-',  // the prefix to use for text style classes
  // }),],
}
