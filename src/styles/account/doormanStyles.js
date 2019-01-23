import {
  primaryColor,
  textColor,
  sectionHeaderColor,
  white,
  borderColor,
  containerDarkColor,
  disabledHeaderColor,
  disabledColor,
  bodyFontSize,
  iconFontSize,
  globalFontRegular,
  globalFontMedium,
  globalPaddingLarge,
  globalPaddingMedium,
  globalPadding,
  globalPaddingSmall,
  globalPaddingTiny,
  globalMarginSmall,
} from '../shared/sharedStyles'
import {StyleSheet, Dimensions, Platform} from 'react-native'
const fullHeight = Dimensions.get('window').height
const fullWidth = Dimensions.get('window').width

export const whiteTransparent = 'rgba(255, 255, 255, 0.8)'

export const sectionHeaderFontSize = 24
export const bodyFontSizeSmall = 15

const DoormanStyles = {
  // TEXT STYLES
  bodyText: {
    color: sectionHeaderColor,
    fontFamily: globalFontRegular,
    fontSize: bodyFontSizeSmall,
    paddingTop: globalPaddingTiny,
  },

  // ROW STYLES
  rowContainer: {
    alignItems: 'center',
    backgroundColor: white,
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: globalPadding,
    paddingVertical: globalPaddingSmall,
    width: fullWidth,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...DoormanStyles, ...overrides})
}

export default {
  createStyles,
}