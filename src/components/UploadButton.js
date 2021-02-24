import React from 'react'
import ui from 'utils/ui'
import MakeDonation from 'components/MakeDonation'

import './UploadButton.scss'

const UploadButton = () => (
  <button
    className="UploadButton"
    onClick={() => ui.showModal({
      header: 'Make Donation',
      content: <MakeDonation />,
    })}
  >
    Make Donation
  </button>
)

export default UploadButton
