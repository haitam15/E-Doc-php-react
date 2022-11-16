import {React} from 'react'
import { Link } from 'react-router-dom'
import secretary from '../images/secretary.png';
import { useDispatch} from 'react-redux';
import { logout } from '../actions/secretaryActions'
import styled from 'styled-components';
import { RiFileCopyLine } from "react-icons/ri";
import {CgScreen} from "react-icons/cg"
import { BiCalendarCheck } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { VscCalendar } from "react-icons/vsc";
import {MdLogout} from "react-icons/md";
import Badge from './Badge';

const AsideBar = (userInfo) => {
  const dispatch = useDispatch();
  const logou = () => dispatch(logout())
    return (
        <Container>
            <ProfileContainer>
                <Avatar src={secretary}/>
                <Name>{userInfo?.name}</Name>
                <Badge content="Secreataire"/>
            </ProfileContainer>
            <LinksContainer>
            <Links>
            <Link to='/secretaryZone/secretaryDashbord'>
                <Lnk>
                    <CgScreen />
                    <h4>Tableau de Board</h4>
                </Lnk>
              </Link>
              <Link to='/secretaryZone/calendar'>
                <Lnk>
                    <VscCalendar />
                    <h4>Calendrier</h4>
                </Lnk>
              </Link>
              <Link to='/secretaryZone/ListRdv'>
                <Lnk>
                    <BiCalendarCheck />
                    <h4>Listes Des Rdv</h4>
                </Lnk>
              </Link>
              <Link to='/secretaryZone/listePatients'>
                <Lnk>
                    <BsPeopleFill />
                    <h4>Liste des patients</h4>
                </Lnk>
              </Link>
            </Links>
            <ContactContainer onClick={logou}>
              <span>Logout</span>
              <MdLogout/>
            </ContactContainer>
      </LinksContainer>
        </Container>
    )
}

const Container = styled.div`
    width:20%;
    height:100% !important;
    border-radius:2rem;
    background: #0fcfec;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap:3rem;
    position:fixed;

`;
const ProfileContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`;
const Avatar = styled.img`
    height:7rem;
    border-radius 6rem;
    border:5px black solid;
    margin-top:20%;
    draggable:none;
    user-drag: none;
    background-color:white;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;
const Name = styled.h1`
color:white;
font:1.5rem;
font-weight:400;
margin:0.8rem 0 0.5rem 0;

`;

const LinksContainer = styled.div`
background-image: linear-gradient(#19d3ae,#0fcfec);
  height: 100%;
  width: 100%;
  border-radius: 2rem;
`;

const Links = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  height: 60%;
  a{
    text-decoration: none;
  }
  li:hover{
    background-color: rgba(255, 255, 255);
    border-radius: 30px;
  }
`;

const Lnk = styled.li`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  color: black;
  cursor: pointer;
  h3 {
    font-weight: 300;
  }
  svg {
    font-size: 1.1rem;
    margin-top: 3%;
  }
  @media screen and (max-width: 1036px) {
    h4{
      display:none;
    }
    svg {
      font-size: 2rem;
      margin-top: 3%;
      vertical-align:middle
    }

  }
`;

const ContactContainer = styled.div`
  width: 60%;
  background-color: #091322;
  color: #c4c4c4;
  height: 15%;
  margin: auto auto;
  margin-top: 5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  cursor:pointer;
  a {
    color: white;
    text-decoration: none;
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin-bottom: 2rem;
  }
`;


export default AsideBar;
