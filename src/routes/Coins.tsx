import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {fetchCoins } from '../api'
interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string
}
function Coins() {
  const {isLoading, data}= useQuery<ICoin[]>("allCoins", fetchCoins)
  // const [coins, setCoins] = useState<CoinInterface[]>([])
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   (async() => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins")
  //     const json = await response.json();
  //     setCoins(json.slice(0,100))
  //     setLoading(false)
  //   })()
  // }, [])
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? 
        <Loader>Loading...</Loader>
      : (<CoinsList>
        {data?.slice(0,100).map(item => {
          return <Coin key={item.id}>
            <Link to={{
                      pathname: `/${item.id}`,
                      state: {name: item.name}
            }}>
                <Img alt='img' src={`https://cryptoicon-api.vercel.app/api/icon/${item.symbol.toLocaleLowerCase()}`} />
                {item.name} &rarr;
            </Link>
            </Coin>
        })}
      </CoinsList>)}
    </Container>
  )
}

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0 20px;
  max-width:480px;
  margin: 0 auto;
`

const CoinsList = styled.ul``

const Coin = styled.li`
  background-color:white;
  color:${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom:10px;
  a{
    display:flex;
    align-items:center;
    padding: 20px;
  }
  &:hover{
    a{
      color:${props=>props.theme.accentColor};
    }
  }
`

const Loader = styled.span`
  text-align:center;
  font-weight:600;
  color: red;
  font-size:50px;
`
const Img = styled.img`
  width:25px;
  height:25px;
  margin-right:10px;
`;

export default Coins;