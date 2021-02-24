// import Compressor from 'compressorjs'

const isArray = (obj) => obj instanceof Array

const renameKeys = (obj, newKeys) => Object
  .keys(obj)
  .reduce((acc, key) => ({
    ...acc,
    ...{ [newKeys[key] || key]: obj[key] },
  }), {})

export const last = (array) => {
  const length = array == null ? 0 : array.length
  return length ? array[length - 1] : undefined
}

export const feedParser = (feed) => {
  const donationsKeys = {
    0: 'id',
    1: 'owner',
    2: 'caption', 
    3: 'amount',
    4: 'timestamp',
  }

  /**
   * 1. If feed is one object of donation,
   * rename just one donation object's keys
   */
  if (!isArray(feed)) {
    return renameKeys(feed, donationsKeys)
  }
  /**
   * 2. If feed is array of donations,
   * Iterate feed array to rename all of donation objects' keys
   */
  const parsedFeed = feed.map((donation) => renameKeys(donation, donationsKeys))

  return parsedFeed
}