interface IPrice {
  coinId: string
}
function Price({coinId}:IPrice) {
  return <h1>{coinId}</h1>;
}

export default Price;