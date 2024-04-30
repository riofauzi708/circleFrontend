import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Text, Avatar, Divider } from '@chakra-ui/react';
import { getUsersAPI } from '../../libs/Api/Call/user';
import { useAppSelector } from '../../store';
import { IProfile } from '../../types/app';
import FollowButton from '../../components/FollowButton';

interface User {
  id: string;
  fullname: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
  profile: IProfile;
}

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [showResults, setShowResults] = useState(false);
  useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsersAPI(searchTerm);
        const filteredUsers = response.data.data.filter((user: User) =>
          user.fullname.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        const sortedUsers = filteredUsers.sort((a: User, b: User) =>
          a.fullname.localeCompare(b.fullname)
        );
        setUsers(sortedUsers);
        setShowResults(true);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchUsers();
    } else {
      setShowResults(false);
    }
  }, [searchTerm]);

  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box p={8}>
      <Flex justifyContent="center" width={'100%'} mb={8}>
        <Input
          placeholder="Search for users"
          value={searchTerm}
          onChange={handleSearch}
          width="80%"
          height="30px"
          borderColor="gray.400"
          borderWidth={2}
          borderRadius={20}
          py={4}
          px={6}
          fontSize="lg"
        />
      </Flex>

      {showResults && users.length > 0 && (
        <Box>
          {users.map((user) => (
            <Box key={user.id}>
              <Flex borderBottom={"1px solid gray"} justifyContent={"space-between"} alignItems="center" py={4}>
                <Avatar
                  style={{ cursor: 'pointer' 
                    , width: "60px", height: "60px", marginRight: "20px"
                  }}
                  borderRadius={"100%"}
                 src={"http://localhost:5000/uploads/" + user.profile?.avatar } mr={4} />
                <Box flex="1">
                  <Text fontWeight="bold" fontSize="xl">
                    {user.fullname}
                  </Text>
                  <Text style={{marginTop: "-5px"}} color="gray.500">@{user.username}</Text>
                </Box>
                <FollowButton userId={parseInt(user.id)}/>
              </Flex>
              <Divider />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;