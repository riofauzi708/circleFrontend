// Sidebar.tsx

import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useAppSelector } from "../../store";
import { useState } from "react";
import { 
    FaHome, FaSearch, FaUser, FaUserFriends } from "react-icons/fa";
import LoginForm from "../LoginForm";
import { useDispatch } from "react-redux";
import { Logout } from "../../store/slice/auth";
import { 
    Box, 
    Text, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Button
} from "@chakra-ui/react";



function Sidebar(props:any) {
  const {show} = props
  const dispatch = useDispatch();

  const MENU = [
    {
      title: "Home",
      icon: <FaHome style={{ 
          color: "white", width: "30px", height: "30px" }} />,
      link: "/",
      handleShow: show

    },
    {
      title: "Search",
      icon: <FaSearch style={{ 
          color: "white", width: "30px", height: "30px" }} />,
      link: "/search",
    },
    {
      title: "Follows",
      icon: <FaUserFriends style={{ 
          color: "white", width: "30px", height: "30px" }} />,
      link: "/follows",
    },
    {
      title: "Profile",
      icon: <FaUser style={{ 
          color: "white", width: "30px", height: "30px" }} />,
      link: "/profile",
      handleShow: show
    },
  ];

  const auth = useAppSelector((state) => state.auth);

  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowLoginForm(false);
  };

  return !auth.user ? 
        (
        <>
          <Text
            style={{
              width: "200px",
              height: "40px",
              backgroundColor: "#04a51e",
              borderRadius: "20px",
              color: "white",
              marginLeft: "15px",
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => setShowLoginForm(true)}
          >
            Login
          </Text>
          <Modal isOpen={showLoginForm} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalBody>
              <ModalCloseButton style={{ 
                color: "white", 
                right: "33%", 
                top: "45px", 
                position: "absolute", 
                width: "30px", 
                height: "30px",
                }} 
                />
                <LoginForm callback={handleCloseModal} />
              </ModalBody>
              <ModalFooter>
                <Text onClick={handleCloseModal} cursor="pointer">Close</Text>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Box style={{ marginTop: "-35px" }}>
          {MENU.map((menu) => (
            <Box key={menu.title}
            >
              <Link
                style={{
                    display: "flex", 
                    textDecoration: "none",  
                    paddingLeft: "20px",
                    alignItems: "center",
                    color: "white",
                }}
                to={menu.link}
                onClick={menu.handleShow}
              >
                {menu.icon}
                <Text
                  ml="15px"
                  w={"50%"}
                  style={{
                    fontSize: "20px", 
                    color: "white",
                  }}
                >
                  {menu.title}
                </Text>
              </Link>
            </Box>
          ))}
            <Button
              style={{
                width: "200px",
            height: "40px",
            backgroundColor: "#04a51e", 
            borderRadius: "20px", 
            color: "white", 
            marginTop: "20px",
            marginLeft: "15px",
              }}
            >
              Create Post
            </Button>
            <Button
              style={{
                marginTop: "25px",
                marginLeft: "15px",
                borderRadius: "20px",
                border: "none",
                height: "40px",
                cursor: "pointer",
                color: "white",
                width: "200px",
                fontSize: "15px",
                position: "fixed",
                bottom: "20px",
                left: "8px",
              }}
              onClick={() => dispatch(Logout())}
            >
              <BiLogOut
                style={{
                    color: "white", 
                    width: "30px", 
                    height: "30px",
                    marginRight: "10px", 
                }}
              />
              Logout
            </Button>
          </Box>
      );
}

export default Sidebar