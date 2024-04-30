import { Box, Button, Input, Text, CloseButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { getLoginAPI, getRegisterAPI } from '../../libs/Api/Call/user';
import { getProfileAPI } from '../../libs/Api/Call/profile';
import { useDispatch } from 'react-redux';
import { Login } from '../../store/slice/auth';

interface ILoginFormProps {
  callback: () => void;
}


const LoginForm: React.FC<ILoginFormProps> = ({callback}) => {
  const dispatch = useDispatch();
  const [formInput, setFormInput] = useState<{ email: string; username: string; password: string }>({
    email: "",
    username: "",
    password: "",
  });
  const [inputRegister, setInputRegister] = useState<{ fullname: string, username: string, email: string, password: string }>({ 
    fullname: "", 
    username: "", 
    email: "", 
    password: "" 
  })

  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await getLoginAPI(formInput);
      console.log(res);

      const token = res.data.data;

      const resProfile = await getProfileAPI(token);
      console.log(resProfile);

      localStorage.setItem("token", token);

      dispatch(Login({
        user: resProfile.data.data,
        token: ''
      }))
      callback();
      
    } catch (error) {
      console.log(error);
      alert('Username or password is incorrect');
      
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRegister({
      ...inputRegister,
      [e.target.name]: e.target.value
    })
  }
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await getRegisterAPI(inputRegister);
      console.log(res);
      setShowRegisterModal(false);
      alert ("Register Success");
    } catch (error: any) {
      console.log(error);
      alert('Username or email already exists');
    }
  }


  const handleRegisterModal = () => {
    setShowRegisterModal(true);
  }

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  }

  return (
    <Box height={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box width={"30%"} height={"70%"} bgColor={"#1d1d1d"} borderRadius={"5px"} padding={"50px 30px"}>
        <Text color={"#04a51e"} fontWeight="bold" mt={2} fontSize={"30px"}
        style={{ marginBottom: "-15px" }}
        >
          circle
        </Text>
        <Text mb={2} fontSize={"2xl"} fontWeight={"semibold"}>
          Login to Circle
        </Text>
        <form>
          <Box display={'flex'} flexDirection={'column'} gap={"4"}>
            <label style={{ marginTop: "10px" }} htmlFor="email">
              Email or Username
            </label>
            <Input
              type="email"
              name="email"
              py={6}
              placeholder="Email/Username"
              onChange={(e) => setFormInput({...formInput, username: e.target.value})}
            />
            <label style={{ marginTop: "10px" }} htmlFor='password'>
              Password
            </label>
            <Input
              style={{ marginBottom: "10px" }}
              type="password"
              name="password"
              py={6}
              placeholder="Password"
              onChange={(e) => setFormInput({...formInput, password: e.target.value})}
            />
          </Box>
        </form>
        <Text textAlign={"right"} my={"10px"}>
          Forgot Password?
        </Text>
        <Button
          bgColor="green"
          borderRadius="24px"
          px={"44%"}
          py={"5px"}
          colorScheme="green"
          fontSize="lg"
          variant="ghost"
          color="white"
          onClick={handleLogin}
        >
          Log In
        </Button>

        <Text textAlign={"center"}>
          Don't have an account?{" "}
          <a href="#" onClick={handleRegisterModal}>
            Register
          </a>
        </Text>
      </Box>

      {showRegisterModal && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="rgba(0, 0, 0, 0.5)"
        >
          <Box
            width={"30%"}
            height={"70%"}
            bgColor={"#1d1d1d"}
            borderRadius={"5px"}
            padding={"50px 30px"}
            position="relative"
          >
            <CloseButton
              position="absolute"
              top={1}
              right={4}
              onClick={handleCloseRegisterModal}
              h={25}
            />
            <Text color={"#04a51e"} fontWeight="bold" mt={2} fontSize={"30px"}
            style={{ marginBottom: "-15px" }}
            >
              circle
            </Text>
            <Text mb={2} fontSize={"2xl"} fontWeight={"semibold"}>
              Register to Circle
            </Text>
            <form onSubmit={handleRegister}>
              <Box display={'flex'} flexDirection={'column'} gap={"4"}>
                <label style={{ marginTop: "10px" }} htmlFor="fullname">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="fullname"
                  py={6}
                  placeholder="Full Name"
                  onChange={handleChange}
                />
                <label style={{ marginTop: "10px" }} htmlFor="username">
                  Username
                </label>
                <Input
                  type="text"
                  name="username"
                  py={6}
                  placeholder="Username"
                  onChange={handleChange}
                />
                <label style={{ marginTop: "10px" }} htmlFor="email">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  py={6}
                  placeholder="Email"
                  onChange={handleChange}
                />
                <label style={{ marginTop: "10px" }} htmlFor='password'>
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  py={6}
                  placeholder="Password"
                  onChange={handleChange}
                />
              </Box>
            
            <Button
            type='submit'
              bgColor="green"
              borderRadius="24px"
              mt={"30px"}
              px={"44%"}
              py={"5px"}
              colorScheme="green"
              fontSize="lg"
              variant="ghost"
              color="white"
              w={"100%"}
            >
              Register
            </Button>
            </form>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default LoginForm;