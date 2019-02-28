import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Text, View, TouchableHighlight, Image, StyleSheet} from 'react-native'
import {BarCodeScanner, Permissions, BlurView} from 'expo'
import {MaterialIcons, EvilIcons} from '@expo/vector-icons'
import SharedStyles from '../styles/shared/sharedStyles'
import EventDetailsStyles from '../styles/event_details/eventDetailsStyles'
import EventScannerStyles from '../styles/account/eventScannerStyles'
import TicketWalletStyles from '../styles/tickets/ticketWalletStyles'
import * as vibe from '../vibe'
import {username} from '../string'
import {imageSourceUrl} from '../image'
import ticketScanLog from '../ticket-scan-log'
import {DateTime} from 'luxon'

const styles = SharedStyles.createStyles()
const eventDetailsStyles = EventDetailsStyles.createStyles()
const eventScannerStyles = EventScannerStyles.createStyles()
const ticketWalletStyles = TicketWalletStyles.createStyles()
const DELAY_SLOW = 3000
const DELAY_FAST = 1500
const SCAN_ALERT_CONFIG = {
  success: {
    text: 'Ticket valid!',
    icon: 'check',
    style: eventScannerStyles.messageIconSuccess,
  },
  alreadyRedeemed: {
    text: 'Already redeemed.',
    icon: 'close-o',
    style: eventScannerStyles.messageIconCancel,
  },
  error: {
    icon: 'exclamation',
    style: eventScannerStyles.messageIconError,
  },
}

// props for the StatusMessage component, based on the presence and type of error
function getStatusMessageConfig(error) {
  if (!error) {
    return SCAN_ALERT_CONFIG.success
  }

  if (error.response) {
    const text = error.response.data.error

    if (text === 'Ticket has already been redeemed.') {
      return SCAN_ALERT_CONFIG.alreadyRedeemed
    }

    return {...SCAN_ALERT_CONFIG.error, text}
  }

  if (error.name === 'SyntaxError') {
    return {...SCAN_ALERT_CONFIG.error, text: 'QR code is not valid.'}
  }

  const {message} = error

  if (message === 'missing_redeem_key') {
    return {
      ...SCAN_ALERT_CONFIG.error,
      text:
        'The guest may have pulled their tickets up before the doors were supposed to open. If the doors are open now, have them close and re-open their tickets list.',
    }
  }

  return {...SCAN_ALERT_CONFIG.error, text: error.message}
}

// The little UI bit that toggles between scan modes
function ModeControl({mode, toggle}) {
  return (
    <TouchableHighlight
      style={eventScannerStyles.pillContainer}
      onPress={toggle}
    >
      <View style={styles.flexRowCenter}>
        <Text
          style={[eventScannerStyles.pillTextWhite, styles.marginRightTiny]}
        >
          Check-in Mode:
        </Text>
        <Text style={eventScannerStyles.pillTextPrimary}>
          {mode.toUpperCase()}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

function BottomTab({children}) {
  return <View style={eventScannerStyles.mainBody}>{children}</View>
}

// The default bottom tab that lets you bounce over to the guest list
function GuestListTab({navigate}) {
  return (
    <View style={eventDetailsStyles.fixedFooter}>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigate('GuestList')}
        >
          <Text style={styles.buttonText}>Guest List</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

// The alternative bottom tab that displays your scanned ticket details when you've done a manual mode scan
function TicketDetailsTab({isBusy, cancel, checkIn}) {
  return (
    <View
      style={[eventDetailsStyles.mainBodyContent, styles.paddingBottomLarge]}
    >
      <View style={styles.flexRowSpaceBetween}>
        {isBusy ? (
          <Text>Checking in...</Text>
        ) : (
          <Fragment>
            <TouchableHighlight
              style={[eventDetailsStyles.buttonRounded, styles.marginRightTiny]}
            >
              <Text
                style={eventDetailsStyles.buttonRoundedText}
                onPress={cancel}
              >
                Cancel
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                eventDetailsStyles.buttonRoundedActive,
                styles.marginLeftTiny,
              ]}
            >
              <Text
                style={eventDetailsStyles.buttonRoundedActiveText}
                onPress={checkIn}
              >
                Check In
              </Text>
            </TouchableHighlight>
          </Fragment>
        )}
      </View>
    </View>
  )
}

function TicketDetailsPill({user, ticket, redeemedAt, onPress}) {
  let redeemedText = ''

  if (ticket.status === 'Redeemed') {
    redeemedText = redeemedAt ?
      `You checked them in ${DateTime.fromJSDate(redeemedAt).toRelative()}` :
      'Redeemed'
  }

  const redeemedContent = redeemedText ? (
    <Text style={eventScannerStyles.pillTextSubheader}>{redeemedText}</Text>
  ) : null

  return (
    <TouchableHighlight
      style={eventScannerStyles.headerActionsWrapper}
      onPress={onPress}
    >
      <View style={[eventScannerStyles.pillContainer, styles.marginBottom]}>
        <View style={styles.flexRowFlexStartCenter}>
          <View style={ticketWalletStyles.avatarContainer}>
            <Image
              style={ticketWalletStyles.avatar}
              loadingIndicatorSource={require('../../assets/avatar-female.png')}
              source={imageSourceUrl(user.profile_pic_url)}
            />
          </View>
          <View>
            <Text style={eventScannerStyles.pillTextWhite}>
              {username(user)}
            </Text>
            <Text style={eventScannerStyles.pillTextSubheader}>
              {ticket.ticket_type_name}
            </Text>
            {redeemedContent}
          </View>
          {/* <MaterialIcons style={eventScannerStyles.checkIcon} name="check-circle" /> */}
        </View>
      </View>
    </TouchableHighlight>
  )
}

// Displays error and success
function StatusMessage({text, icon, style}) {
  return (
    <View style={eventScannerStyles.messageContainer}>
      <EvilIcons style={style} name={icon} />
      <Text style={eventScannerStyles.messageText}>{text}</Text>
    </View>
  )
}

// Throw this after another absolute fill view to darken/blur it
// Might only darken and not blur on Android?
function BlurOverlay() {
  return <BlurView tint="dark" intensity={90} style={StyleSheet.absoluteFill} />
}

const RESET_STATE = {
  showStatusMessage: false,
  error: null,
  scannedCode: null,
  isWaitingToConfirmManualCheckIn: false,
  isCommittingManualCheckIn: false,
}

// TODO: this should probably use eventToScan state (see eventManager and
// eventManagerStateProvider) to validate tickets against currently selected event
export default class EventScanner extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired,
  }

  state = {
    hasCameraPermission: null,
    checkInMode: 'manual',
    ticketDetails: null,
    ...RESET_STATE,
  }

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)

    this.setState({hasCameraPermission: status === 'granted'})
  }

  onBarCodeRead = async(scanResult) => {
    // don't scan while we're mid-checkin
    if (this.isScanningDisabled) {
      return
    }
    // this gets re-enabled by _reset()
    this.isScanningDisabled = true

    try {
      const code = this.props.screenProps.eventManager.readCode(scanResult)

      switch (this.state.checkInMode) {
      case 'automatic':
        return await this._redeem(code)
      case 'manual':
        return await this._startManual(code)
      }
    } catch (error) {
      this._finishCheckIn(error)
    }
  }

  // take us back to the beginning of the "let's scan a ticket" process
  _reset() {
    // unlock so we can scan again
    this.isScanningDisabled = false
    this.setState(RESET_STATE)
  }

  // trigger the final check-in success or failure feedback, wait a little bit, then reset
  _finishCheckIn(error = null) {
    let delay

    if (error) {
      this.setState({error})
      vibe.sad()
      delay = DELAY_SLOW
    } else {
      vibe.happy()
      delay = this.state.checkInMode === 'automatic' ? DELAY_SLOW : DELAY_FAST
    }

    this.setState({showStatusMessage: true})
    setTimeout(() => this._reset(), delay)
  }

  // actually redeem the ticket
  async _redeem(code) {
    await this.props.screenProps.eventManager.redeem(code)
    ticketScanLog.logRedeemedAt(code)
    this._finishCheckIn()
  }

  // fetch ticket details and save in state
  async _getTicketDetails(scannedCode) {
    const ticketDetails = await this.props.screenProps.eventManager.getTicketDetails(
      scannedCode
    )

    // decorate with info from our scan log
    ticketDetails.redeemedAt = ticketScanLog.getRedeemedAt(ticketDetails.ticket)

    this.setState({ticketDetails})
    return ticketDetails
  }

  // fetch ticket details and redeem the code simultaneously
  async _startAutomatic(scannedCode) {
    this.setState({scannedCode, ticketDetails: null}) // previous ticketDetails should get cleared out while we're waiting to reduce confusion
    await Promise.all([
      this._getTicketDetails(scannedCode),
      this._redeem(scannedCode),
    ])
  }

  // pull up the ticket info and the UI for letting the door person confirm check-in
  async _startManual(scannedCode) {
    await this._getTicketDetails(scannedCode)
    this.setState({scannedCode, isWaitingToConfirmManualCheckIn: true})
    vibe.happy()
  }

  // clear out the current manual-mode-scanned ticket and start over
  cancelManual = () => {
    this._reset()
  }

  // take the current manual-mode-scanned ticket and redeem it
  commitManual = async() => {
    try {
      this.setState({isCommittingManualCheckIn: true})
      await this._redeem(this.state.scannedCode)
    } catch (error) {
      this._finishCheckIn(error)
    }
  }

  get statusMessage() {
    const {showStatusMessage, error} = this.state

    return showStatusMessage ? (
      <StatusMessage {...getStatusMessageConfig(error)} />
    ) : null
  }

  get event() {
    return this.props.screenProps.eventManager.state.eventToScan
  }

  setCheckInMode = (checkInMode) => {
    this._reset() // don't forget to reset everything when doing a mode switch
    this.setState({checkInMode})
  }

  toggleCheckInMode = () => {
    this._reset()
    this.setCheckInMode(
      this.state.checkInMode === 'automatic' ? 'manual' : 'automatic'
    )
  }

  // if we have the details of ticket to show, we do that; otherwise we link to the guest list
  get bottomTabContent() {
    const {
      isWaitingToConfirmManualCheckIn,
      isCommittingManualCheckIn,
    } = this.state

    return isWaitingToConfirmManualCheckIn ? (
      <TicketDetailsTab
        isBusy={isCommittingManualCheckIn}
        cancel={this.cancelManual}
        checkIn={this.commitManual}
      />
    ) : (
      <GuestListTab navigate={this.props.navigation.navigate} />
    )
  }

  get ticketDetailsPill() {
    const {ticketDetails} = this.state

    return ticketDetails ? <TicketDetailsPill {...ticketDetails} /> : null
  }

  render() {
    const {statusMessage} = this
    const {
      hasCameraPermission,
      checkInMode,
      isCommittingManualCheckIn,
    } = this.state

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    }

    return (
      <View>
        <BarCodeScanner
          onBarCodeRead={this.onBarCodeRead}
          style={StyleSheet.absoluteFill}
        />

        {/* When there's a status message, throw an overlay on the camera to make things readable */}
        {statusMessage && <BlurOverlay />}

        <View style={eventScannerStyles.eventScannerContainer}>
          <View
            style={[
              eventScannerStyles.headerActionsWrapper,
              styles.flexRowSpaceBetween,
            ]}
          >
            <View style={eventDetailsStyles.backArrowCircleContainer}>
              <MaterialIcons
                style={eventDetailsStyles.backArrow}
                name="close"
                onPress={() => {
                  this.props.navigation.navigate('EventView')
                }}
              />
            </View>

            {/* Don't let the user change mode while manual check-in is finishing */}
            {isCommittingManualCheckIn ? null : (
              <ModeControl mode={checkInMode} toggle={this.toggleCheckInMode} />
            )}

            {/* TODO: remove whitespace style workaround */}
            <Text>&nbsp; &nbsp; &nbsp;</Text>
          </View>

          {statusMessage}

          <BottomTab>
            {this.ticketDetailsPill}

            {/* TODO: remove whitespace style workaround */}
            <Text>&nbsp; &nbsp; &nbsp;</Text>

            {this.bottomTabContent}
          </BottomTab>
        </View>
      </View>
    )
  }
}
