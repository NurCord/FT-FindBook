import fusion from '../../../assets/fusion.png'
import styled from 'styled-components'

export const DivAnimation = styled.div`
background-image: url(${fusion});
background-repeat: no-repeat;
display: flex;
align-self: center;
width: 145px;
height: 100px;
margin: 20px 47%;
animation: sprite 1.5s steps(5)
infinite;
@keyframes sprite {
    0%{
        background-position-x: 0;
    }
    100%{
        background-position-x: -765px;
    }
}
`