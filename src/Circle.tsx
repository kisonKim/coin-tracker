import { useState } from 'react'
import styled from 'styled-components'

interface CircleProps {
  bgColor: string;
  borderColor?:string;
  text?:string;
}

interface ContainerProps {
  bgColor: string;
  borderColor:string;
}
const Circle = ({bgColor, borderColor, text="default"}:CircleProps) => {
  const [counter, setCounter] = useState(1)
  return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
    {text}
    </Container>
}

const Container = styled.div<ContainerProps>`
  width:200px;
  height:200px;
  background-color: ${(props)=>props.bgColor};
  border-radius:100%;
  border:1px solid ${props=>props.borderColor}
`

export default Circle