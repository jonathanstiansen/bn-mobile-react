import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text, View, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SharedStyles from '../styles/shared/sharedStyles'
import EventCardStyles from '../styles/shared/eventCardStyles'
import {eventDateTimes} from '../time'
import {toDollars} from '../constants/money'
import {optimizeCloudinaryImage} from '../cloudinary'
import {Image} from 'react-native-expo-image-cache'

const styles = SharedStyles.createStyles()
const eventCardStyles = EventCardStyles.createStyles()

export default class EventsIndex extends Component {
  static propTypes = {
    event: PropTypes.object,
    onPress: PropTypes.func,
    onInterested: PropTypes.func,
  }

  setFavorite = () => {
    this.props.onInterested(this.props.event)
  }

  get scheduleText() {
    return eventDateTimes(
      this.props.event.localized_times
    ).event_start.toFormat('EEE, MMMM d')
  }

  get priceTag() {
    const {
      event: {min_ticket_price},
    } = this.props

    if (min_ticket_price) {
      return (
        <View style={styles.priceTagContainer}>
          <Text style={styles.priceTag}>{`$${toDollars(
            min_ticket_price,
            0
          )}`}</Text>
        </View>
      )
    } else {
      return null
    }
  }

  get location() {
    const {
      event: {
        venue: {city, state},
      },
    } = this.props

    return state ? `${city}, ${state}` : city
  }

  render() {
    const {onPress, event} = this.props

    return (
      <TouchableHighlight underlayColor="#fff" onPress={onPress}>
        <View>
          <View style={eventCardStyles.eventContainer}>
            <Image
              style={eventCardStyles.eventImage}
              source={{uri: optimizeCloudinaryImage(event.promo_image_url)}}
              defaultSource={require('../../assets/event-placeholder.png')}
            />
            <View style={eventCardStyles.detailsContainer}>
              <View style={eventCardStyles.sectionTop}>
                <TouchableHighlight
                  underlayColor="rgba(0, 0, 0, 0)"
                  onPress={this.setFavorite}
                >
                  <View
                    style={
                      event.user_is_interested ?
                        eventCardStyles.iconLinkCircleContainerSmallActive :
                        eventCardStyles.iconLinkCircleContainerSmall
                    }
                  >
                    <Icon
                      style={
                        event.user_is_interested ?
                          eventCardStyles.iconLinkCircleSmallActive :
                          eventCardStyles.iconLinkCircleSmall
                      }
                      name="star"
                    />
                  </View>
                </TouchableHighlight>
                <View style={styles.avatarContainer}>
                  {
                    null // event.avatarImages.map((source, key) => <Image style={styles.avatarSmall} source={source} key={key} />)}
                  }
                </View>
              </View>
              {this.priceTag}
            </View>
          </View>

          <View style={eventCardStyles.detailsContainerBottom}>
            <Text style={eventCardStyles.header}>{event.name}</Text>
            <Text style={eventCardStyles.details}>{this.scheduleText}</Text>
            <Text style={eventCardStyles.details}>{this.location}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
