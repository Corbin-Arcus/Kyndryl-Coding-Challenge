import styled from "styled-components"

export const StyledNavBar = styled.nav`
  background-color: white;
  padding: 0 40px;
  margin-top: 0;
  height:50px;
  /* position: absolute; */
  /* position: fixed; */
  border-bottom: 1px solid black;

  ul{
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    margin:0;
    padding:0;
    align-items: center;
    list-style: none;
  }

  .logo{
    display:flex;
    width: 50px;
    height: 50px;
  }

  a{
    text-decoration: none;
  }

`
