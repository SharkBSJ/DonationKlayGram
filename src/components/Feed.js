import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Loading from 'components/Loading'
import DonationInfo from 'components/DonationInfo'
import { last } from 'utils/misc'

import * as donationActions from 'redux/actions/donations'

import './Feed.scss'

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: !props.feed,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedFeed = (nextProps.feed !== prevState.feed) && (nextProps.feed !== null)
    if (isUpdatedFeed) {
      return { isLoading: false }
    }
    return null
  }

  componentDidMount() {
    const { feed, getFeed } = this.props
    if (!feed) getFeed()
  }

  render() {
    const { feed, userAddress } = this.props

    if (this.state.isLoading) return <Loading />
    const totalAmount = feed.reduce((total, feed) => total = total + feed.amount / 1000000000000000000, 0);
    return (
      <div className="Feed">
        <span className="Feed__All">총 기부액: {totalAmount} KLAY</span>
        {feed.length !== 0
          ? feed.map(({
            id,
            owner, 
            caption, 
            amount, 
            timestamp,
          }) => {
            const issueDate = moment(timestamp * 1000).fromNow()
            return (
              <div className="FeedDonation" key={id}>
                <div className="FeedDonation__info">
                  <DonationInfo
                    id={id}
                    owner={owner}
                    amount={amount}
                    issueDate={issueDate}
                    caption={caption}
                  />
                </div>
              </div>
            )
          })
          : <span className="FeedDonation__empty">No Donation :D</span>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  feed: state.donations.feed,
  userAddress: state.auth.address,
})

const mapDispatchToProps = (dispatch) => ({
  getFeed: () => dispatch(donationActions.getFeed()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
