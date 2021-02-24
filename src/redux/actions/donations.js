import DonationKlaygramContract from 'klaytn/DonationKlaygramContract'
import { getWallet } from 'utils/crypto'
import ui from 'utils/ui'
import { feedParser } from 'utils/misc'
import { SET_FEED } from './actionTypes'
import caver from "../../klaytn/caver"


// Action creators

const setFeed = (feed) => ({
  type: SET_FEED,
  payload: { feed },
})

const updateFeed = (tokenId) => (dispatch, getState) => {
  DonationKlaygramContract.methods.getDonation(tokenId).call()
    .then((newDonation) => {
      const { donations: { feed } } = getState()
      const newFeed = [feedParser(newDonation), ...feed]
      dispatch(setFeed(newFeed))
    })
}

// API functions

export const getFeed = () => (dispatch) => {
  DonationKlaygramContract.methods.getCount().call()
    .then((totalCount) => {
      if (!totalCount) return []
      const feed = []
      for (let i = totalCount; i > 0; i--) {
        const donation = DonationKlaygramContract.methods.getDonation(i).call()
        feed.push(donation)
      }
      return Promise.all(feed)
    })
    .then((feed) => dispatch(setFeed(feedParser(feed))))
}

export const makeDonation = (
  amount, 
  caption
) => (dispatch) => {
  const amountNumber = Number(amount);
  if (amountNumber < 0.1) {
    ui.showToast({
      status: 'error',
      message: '기부금은 0.1 KLAY 이상입니다.',
    })
    return;
  }
  DonationKlaygramContract.methods.makeDonation(caption).send({
    from: getWallet().address,
    gas: '3000000',
    value: caver.utils.toPeb(amount), 
  })
  .once('transactionHash', (txHash) => {
    ui.showToast({
      status: 'pending',
      message: `Sending a transaction... (makeDonation)`,
      txHash,
    })
  })
  .once('receipt', (receipt) => {
    ui.showToast({
      status: receipt.status ? 'success' : 'fail',
      message: `Received receipt! It means your transaction is
      in klaytn block (#${receipt.blockNumber}) (makeDonation)`,
      link: receipt.transactionHash,
    })
    const tokenId = receipt.events.Donated.returnValues[0]
    dispatch(updateFeed(tokenId))
  })
  .once('error', (error) => {
    ui.showToast({
      status: 'error',
      message: error.toString(),
    })
  })
}
