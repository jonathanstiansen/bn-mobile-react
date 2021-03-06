import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {createStackNavigator} from 'react-navigation'
import {Subscribe} from 'unstated'
import {MAIN_ROUTES, MODAL_ROUTES} from '../Tickets/routes'
import {TicketsContainer} from '../state/ticketStateProvider'
import {AuthContainer} from '../state/authStateProvider'
import {NetworkContainer} from '../state/networkStateProvider'

const TicketsStack = createStackNavigator(
  {
    ...MAIN_ROUTES,
  },
  {
    initialRouteName: 'MyTicketList',
    navigationOptions: {
      header: null,
    },
  }
)

const FullTicketStack = createStackNavigator(
  {
    Main: {
      screen: TicketsStack,
    },
    ...MODAL_ROUTES,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  }
)

export default class ticketStackWithStore extends Component {
  static router = FullTicketStack.router
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = ({navigation}) => {
    let tabBarVisible = true

    if (navigation.state.index > 0) {
      tabBarVisible = false
    }

    return {
      tabBarVisible,
    }
  }

  render() {
    return (
      <Subscribe to={[TicketsContainer, AuthContainer, NetworkContainer]}>
        {(ticketStore, authStore, network) => (
          <FullTicketStack
            navigation={this.props.navigation}
            screenProps={{store: ticketStore, auth: authStore, network}}
          />
        )}
      </Subscribe>
    )
  }
}
