export const displayVNMoney = (price = 0, showFree = false) =>
    showFree && price === 0
      ? 'Miễn phí'
      : `${price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')} ₫`;