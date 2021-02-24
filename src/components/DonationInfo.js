import React, { Fragment } from 'react'

import './DonationInfo.scss'

const DonationInfo = ({ id, owner, amount, caption, issueDate }) => (
  <Fragment>
    <p className="DonationInfo__id">{id}번째 기부</p>
    <p className="DonationInfo__owner">사용자: {owner}</p>
    <h2 className="DonationInfo__amount">기부금: {amount / 1000000000000000000} KLAY</h2>
    <p className="DonationInfo__caption">{caption}</p>
    <span className="DonationInfo__issueDate">{issueDate}</span>
  </Fragment>
)

export default DonationInfo
