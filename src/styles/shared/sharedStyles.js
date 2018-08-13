import {StyleSheet, Dimensions} from 'react-native'
const fullHeight = Dimensions.get('window').height
const fullWidth = Dimensions.get('window').width

export const primaryColor = '#FF20B1'
export const secondaryColor = '#707CED'
export const tertiaryColor = '#4EB0E5'
export const white = '#FFF'
export const errorTextColor = '#FF0000'
export const textColor = '#1E1E1E'
export const sectionHeaderColor = '#9DA3B4'
export const backgroundColor = white
export const inputBackgroundColor = '#FAFAFA'
export const helpTextColor = '#666'
export const borderColor = '#DCDCDC'
export const primaryTransparent = 'rgba(255, 34, 178, 0.5)'
export const whiteTransparent = 'rgba(255, 255, 255, 0.10)'

export const globalPaddingTiny = 5
export const globalPaddingSmall = 10
export const globalPadding = 20
export const globalPaddingMedium = 30
export const globalPaddingLarge = 40
export const globalPaddingLarger = 45
export const globalPaddingJumbo = 55
export const globalMarginSmall = 10
export const globalMargin = 20

export const globalFontRegular = 'tt_commons_regular'
export const globalFontSemiBold = 'tt_commons_demibold'
export const globalFontBold = 'tt_commons_bold'
export const globalFontItalic = 'tt_commons_italic'

export const headerFontSize = 26
export const sectionHeaderFontSize = 16
export const bodyFontSize = 15
export const iconFontSize = 18

const SharedStyles = {
  container: {
    backgroundColor: white,
    paddingHorizontal: globalPadding,
    paddingVertical: globalPadding,
    width: fullWidth,
    flexDirection: 'column',
  },
  halfContainer: {
    backgroundColor: white,
    paddingHorizontal: globalPaddingSmall,
    paddingVertical: globalPaddingSmall,
    width: fullWidth / 2,
    flexDirection: 'column',
  },
  halfRowContainer: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: globalPaddingSmall,
    paddingVertical: globalPadding,
    width: fullWidth / 2,
    flexDirection: 'row',
  },
  rowContainer: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: globalPaddingSmall,
    paddingVertical: globalPaddingTiny,
    width: fullWidth - globalPadding,
    flexDirection: 'column',
  },
  paddingVerticalStandard: {
    paddingVertical: globalPadding,
  },
  scrollingContainer: {
    backgroundColor: white,
    paddingHorizontal: globalPaddingSmall,
    paddingVertical: globalPadding,
    paddingBottom: globalPadding,
    width: fullWidth,
  },
  noPaddingScrollingContainer: {
    backgroundColor: white,
    paddingHorizontal: globalPaddingSmall,
    paddingBottom: globalPadding,
    width: fullWidth,
  },
  section: {
    paddingVertical: globalPaddingLarge,
  },
  activeNavigation: {
    backgroundColor: secondaryColor,
  },
  borderBottom: {
    flex: 1,
    flexDirection: 'column',
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: globalPaddingMedium,
    paddingTop: globalPaddingMedium,
  },
  row: {
    paddingVertical: globalPadding,
  },
  paddingTopSmall: {
    paddingTop: globalPaddingSmall,
  },
  paddingVerticalSmall: {
    paddingVertical: globalPaddingSmall,
  },
  paddingBottomJumbo: {
    paddingBottom: globalPaddingJumbo,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: globalMarginSmall,
  },
  button: {
    backgroundColor: primaryColor,
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: secondaryColor,
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: white,
    fontFamily: globalFontSemiBold,
    textAlign: 'center',
  },
  header: {
    backgroundColor: 'transparent',
    fontFamily: globalFontBold,
    fontSize: headerFontSize,
    color: textColor,
  },
  headerLight: {
    backgroundColor: 'transparent',
    color: white,
    fontFamily: globalFontBold,
    fontSize: headerFontSize,
    paddingBottom: globalPadding,
  },
  sectionHeaderContainer: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: globalPaddingSmall,
  },
  lineHeight: {
    paddingBottom: globalPaddingTiny / 2,
  },
  halfColumn: {
    flex: 1 / 2,
  },
  sectionHeader: {
    backgroundColor: 'transparent',
    color: sectionHeaderColor,
    fontFamily: globalFontSemiBold,
    fontSize: sectionHeaderFontSize,
    paddingVertical: globalPaddingSmall,
  },
  bodyText: {
    backgroundColor: 'transparent',
    color: textColor,
    fontFamily: globalFontRegular,
    fontSize: bodyFontSize,
    paddingBottom: globalPaddingSmall,
  },
  bodyTextLight: {
    backgroundColor: 'transparent',
    color: white,
    fontFamily: globalFontRegular,
    fontSize: bodyFontSize,
    paddingBottom: globalPaddingSmall,
  },
  errorText: {
    backgroundColor: 'transparent',
    color: errorTextColor,
    fontFamily: globalFontItalic,
    fontSize: bodyFontSize - 2,
    marginTop: -5,
    paddingBottom: globalPadding,
  },
  helpText: {
    backgroundColor: 'transparent',
    color: helpTextColor,
    fontFamily: globalFontItalic,
    fontSize: bodyFontSize - 2,
    marginTop: -5,
    paddingBottom: globalPaddingTiny,
  },
  iconLinkContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  iconLink: {
    backgroundColor: 'transparent',
    color: primaryColor,
    fontSize: iconFontSize,
    paddingRight: globalPaddingTiny,
    paddingTop: globalPaddingTiny - 2,
  },
  iconLinkText: {
    color: primaryColor,
    fontFamily: globalFontRegular,
    fontSize: bodyFontSize,
  },
  iconLinkStarContainer: {
    backgroundColor: whiteTransparent,
    borderRadius: 100/2,
    height: 45,
    padding: globalPaddingSmall,
    width: 45,
  },
  iconLinkStar: {
    color: white,
    fontSize: headerFontSize,
  },
  iconImageSmall: {
    width: 23,
    height: 23,
    marginRight: globalPaddingTiny,
  },
  priceTagContainer: {
    backgroundColor: white,
    borderRadius: 5,
    padding: globalPaddingTiny,
    width: 50,
  },
  priceTag: {
    color: primaryColor,
    fontFamily: globalFontBold,
    fontSize: bodyFontSize,
    textAlign: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  avatar: {
    height: 45,
    marginLeft: -10,
    width: 45,
  },
  avatarSmall: {
    height: 30,
    marginLeft: -10,
    width: 30,
  },
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...SharedStyles, ...overrides})
}

export default {
  createStyles,
}