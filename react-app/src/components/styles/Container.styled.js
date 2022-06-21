import styled from 'styled-components'

export const Container = styled.div`
  /* background-image: url('https://s7d1.scene7.com/is/image/kyndryl/ls_orangeflower_16x9?qlt=85&wid=1600&dpr=off');
  background-repeat:no-repeat;
  background-size: cover; */
  background-color: lightgray;
  width: 100vw;
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  height: auto;
  display: flex;
  justify-content:center;
  align-items: center;
  flex-direction:column;

  /* td{
    padding-left: 25px;
  }

  tr{
    padding: 10px;
    border: 1px solid black;
    border-collapse: collapse;
  } */

  th, td {
  border: 1px solid black;
}
`
