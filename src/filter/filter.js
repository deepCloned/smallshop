const formateDate = function (date) {
  if (!date) {
    return '0000-00-00 00-00-00'
  }
  return date.split('T').join(' ').slice(0, -5)
}

export {
  formateDate
}
