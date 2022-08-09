import * as Font from 'expo-font'

// fonts preloading
export const fontAssets = [
  {
    openSans_regular: require('../../assets/fonts/OpenSans-Regular.ttf'),
  },
  {
    openSans_regular_italic: require('../../assets/fonts/OpenSans-Italic.ttf'),
  },
  {
    openSans_semiBold: require('../../assets/fonts/OpenSans-Semibold.ttf'),
  },
  {
    openSans_semiBold_italic: require('../../assets/fonts/.ttf'),
  },
  {
    openSans_bold: require('../../assets/fonts/.ttf'),
  },
  {
    openSans_bold_italic: require('../../assets/fonts/.ttf'),
  },
].map((x) => Font.loadAsync(x))

const fonts = {
  openSan: {
    regular: '',
    regularItalic: '',
    semiBold: '',
    semiBoldItalic: '',
    bold: '',
    boldItalic: '',
  },
}

export default fonts