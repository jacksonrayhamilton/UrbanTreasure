import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @font-face {
    font-family: 'Ubuntu';
    src: url('/fonts/ubuntu-b-webfont.woff2') format('woff2'),
         url('/fonts/ubuntu-b-webfont.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url('/fonts/ubuntu-bi-webfont.woff2') format('woff2'),
         url('/fonts/ubuntu-bi-webfont.woff') format('woff');
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url('/fonts/ubuntu-r-webfont.woff2') format('woff2'),
         url('/fonts/ubuntu-r-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url('/fonts/ubuntu-ri-webfont.woff2') format('woff2'),
         url('/fonts/ubuntu-ri-webfont.woff') format('woff');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Ubuntu Mono';
    src: url('/fonts/ubuntumono-r-webfont.woff2') format('woff2'),
         url('/fonts/ubuntumono-r-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`
