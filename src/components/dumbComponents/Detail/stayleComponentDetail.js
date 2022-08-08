import styled from "styled-components";
import {themesC} from '../../../styles/styleComponents'

export const ButtonDetail = styled.button`
    background-color: ${themesC.cream};
    border-radius: 0.6rem;
    width: 90%;
    margin: 5px;
    padding: 10px 0px;
`

export const H1Detail = styled.h1`
    font-weight: bold;
    color: ${themesC.grey_Dark};
    border-bottom: 2px solid ${themesC.grey_Dark};
`
export const H1DetailSwiper = styled.div`
    font-weight: bold;
    color: ${themesC.grey_Dark};
    border-bottom: 2px solid ${themesC.grey_Dark};
    margin-bottom: 18rem;
`

export const DivDetail = styled.div`
    display: grid;
    justify-items: center;
    border-bottom: 2px solid ${themesC.grey_Ligth_100};
    width: 64%;
    padding-bottom: 1.7rem;
`


export const TextDetail = styled.div`
    padding-top: 20px;
    text-align: justify;
    column-count: 2; 
    column-gap: 20px; 
`

export const DivTableDetail = styled.div`
    border-bottom: 2px solid ${themesC.grey_Ligth_100};
    margin-bottom: 8px;
`
export const DivTableColDetail = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: start;
`


