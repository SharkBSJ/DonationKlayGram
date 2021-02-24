import React, { Component } from 'react'
import { connect } from 'react-redux'
import ui from 'utils/ui'
import Textarea from 'components/Textarea'
import NumberArea from 'components/NumberArea'
import Button from 'components/Button'

import * as donationActions from 'redux/actions/donations'

import './MakeDonation.scss'

class MakeDonation extends Component {
  state = {
    amount: '',
    caption: '',
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { amount, caption } = this.state
    this.props.makeDonation(amount, caption)
    ui.hideModal()
  }

  render() {
    const { amount, caption } = this.state
    return (
      <form className="MakeDonation" onSubmit={this.handleSubmit}>
        <NumberArea
          className="MakeDonation__amount"
          name="amount"
          value={amount}
          label="Amount"
          onChange={this.handleInputChange}
          placeholder="Input your donation amoount (>=0.1 KLAY)"
          required
        />
        <Textarea
          className="MakeDonation__caption"
          name="caption"
          value={caption}
          label="Caption"
          onChange={this.handleInputChange}
          placeholder="Input you want to say"
          required
        />
        <Button
          className="MakeDonation__upload"
          type="submit"
          title="Make Donation"
        />
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  makeDonation: (amount, caption) =>
    dispatch(donationActions.makeDonation(amount, caption)),
})

export default connect(null, mapDispatchToProps)(MakeDonation)
