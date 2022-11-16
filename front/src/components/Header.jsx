import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import {MdComputer} from 'react-icons/md'; 
const Header = () => {
  return (
      <Component>
        <Div>
          <Title>
            <h1>E-Doc</h1>
          </Title>
          <Nav>
            <Reg><MdComputer/><Link to='/secretaryZone/secretaryDashbord'>Home</Link></Reg>
          </Nav>
        </Div>
      </Component>
  )
}


const Component = styled.div`
    z-index: 1050;
    top:0;
    position:relative;
    background-color:#3FEEE6;
}
`;
const Div = styled.div`
    padding-right: 15px;
    padding-left: 15px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
`;
const Title = styled.div`
h1{
  color:white;
  font-family: monospace;
}
`;
const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 600px){
    display: none;
}
}
`;
const Log = styled.div`
    margin-right:10px;
    display: flex;
    flex-direction: row;
    svg{
      padding-top: 5px;
      width:25px;
      height:25px;
    }
  a{
    text-decoration: none;
    color:white;
    background-color: initial;
  }
  a:hover{
    color:blue;
    font-weight: bold;
  }
`;
const Reg = styled.div`
margin-right:10px;
display: flex;
    flex-direction: row;
    svg{
      padding-top: 5px;
      width:25px;
      height:25px;
    }
a{
  text-decoration: none;
  color:white;
    background-color: initial;
}
a:hover{
  color:blue;
  font-weight: bold;
}
`;

export default Header
