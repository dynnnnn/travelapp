import * as Font from 'expo-font'

// fonts preloading
export const fontAssets = [
  {
    BandaNova_Book: require('../../assets/fonts/BandaNova-Book.ttf'),
  },
  {
    BandaNova_Book_Italic: require('../../assets/fonts/BandaNova-BookItalic.ttf'),
  },
  {
    BandaNova_Medium: require('../../assets/fonts/BandaNova-Medium.ttf'),
  },
  {
    BandaNova_Medium_Italic: require('../../assets/fonts/BandaNova-MediumItalic.ttf'),
  },
  {
    BandaNova_Bold: require('../../assets/fonts/BandaNova-Bold.ttf'),
  },
  {
    BandaNova_Bold_Italic: require('../../assets/fonts/BandaNova-BoldItalic.ttf'),
  },
].map((x) => Font.loadAsync(x))

const fonts = {
  BandaNova: {
    book: 'BandaNova_Book',
    bookItalic: 'BandaNova_Book_Italic',
    medium: 'BandaNova_Medium',
    mediumItalic: 'BandaNova_Medium_Italic',
    bold: 'BandaNova_Bold',
    boldItalic: 'BandaNova_Bold_Italic',
  },
}

export default fonts