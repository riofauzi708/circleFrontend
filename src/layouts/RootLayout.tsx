import { Outlet } from 'react-router-dom'
import { Box, Text } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import { getProfileAPI } from '../libs/Api/Call/profile';
import { Login } from '../store/slice/auth';
import { useDispatch } from 'react-redux';
import ProfileCard from '../components/ProfileCard';
import { useAppSelector } from '../store';
import { useEffect } from 'react';
import SuggestionCard from '../components/SuggestionCard';
import Footer from '../components/Footer';

function RootLayout() {
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth)

  const checkToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return 
        const res = await getProfileAPI(token);
        dispatch(Login({
          user: res.data.data, token
        }))
        console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    checkToken()
  }, [])
  
  return (
    <Box style={{ 
        display: 'flex', 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#1d1d1d' 
    }}>
      <Box
      flex={0.6}
      >
        <Text 
            fontWeight="bold" 
            fontSize="50px" 
            textAlign={"center"} 
            pr={"55px"} 
            color={"#04a51e"}
            >
            Circle
            </Text>
        <Sidebar/>
      </Box>
      <Box
      flex={1.5}
      borderRight={'1px solid gray'}
      borderLeft={'1px solid gray'}
      p={'10px'}
      overflowY={'auto'}
      h={'100%'}
      style={{scrollbarWidth: 'none'}}
      >
        <Outlet/>
      </Box>
      <Box
      flex={0.9}
      >
        {
          auth.user && <ProfileCard/>
        }
        {
          auth.user && <SuggestionCard/>
        }
        <Footer/>
      </Box>
    </Box>
  )
}

export default RootLayout
