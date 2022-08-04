import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack, 
  Input,
  InputGroup, 
  InputLeftElement, 
  chakra, 
  VisuallyHidden,
  Icon,
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  Lorem, 
  ModalFooter,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'; 
import { AiFillHome, AiOutlineSearch, AiFillBell } from "react-icons/ai"; 
import { BsChatSquareDotsFill } from "react-icons/bs";  
import { IoMdConstruct } from "react-icons/io"; 
import { FiLogOut } from "react-icons/fi"; 
import { RiUserSettingsFill } from "react-icons/ri"
import { ImUsers } from "react-icons/im"; 
import { FaUser } from "react-icons/fa"; 
import jsCookie from 'js-cookie'; 
import { useRouter } from 'next/router'; 
import { useDispatch } from 'react-redux'; 
import auth_types from '../../../redux/reducers/auth/types';
import ModalPost from '../../modal/addpost/modalpost';
// import Postig from '../../../pages/ig';
// import logout from '../../logout'; 
// import NextNodeServer from 'next/dist/server/next-server';

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children } = {children : ReactNode}) => (
<Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function withAction() {
  const { isOpen, onOpen, onClose } = useDisclosure(); 

  const dispatch = useDispatch() 
  const router = useRouter()

  const logoutHandler  = () => {
    jsCookie.remove('user_data') 

    dispatch({
        type: auth_types.USER_LOGOUT
    }) 

    router.push("/auth/login")
} 

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} width="full" zIndex={4} position="fixed">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {/* <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
          <HStack spacing={8} alignItems={'center'}>
            <Box fontFamily= {"caveat"} fontSize= {"5xl"}>Rieslogram</Box>
            {/* <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack> */} 
            <HStack>
               
                <a href="../../../homeProfile">
                <FaUser size={"30"}/> 
                </a> 
              
            </HStack>
            <HStack > 
              
                <a href="../../../homepage">
                <AiFillHome size={"25"} /> 
                </a>
              
            </HStack>
            <HStack >
              <Link>
                <ImUsers size={"25"}/> 
              </Link>
            </HStack>
            <HStack >
              <BsChatSquareDotsFill size={"25"}/>
            </HStack> 
            
          </HStack>

          <HStack
            spacing={3}
            // display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >
            <InputGroup size={'lg'} minW={"2xl"}>
              <InputLeftElement pointerEvents="none">
                <AiOutlineSearch />
              </InputLeftElement>
              <Input type="tel" placeholder="Search..." />
            </InputGroup>

           
          </HStack>

          <Flex alignItems={'center'}> 

          <ModalPost/>
          
            <HStack>
            <chakra.a
              p={6} 
              color="gray.800"
              _dark={{
                color: "inherit",
              }}
              rounded="sm"
              _hover={{
                color: "gray.800",
                _dark: {
                  color: "gray.600",
                },
              }}
            >
              <AiFillBell size={"30"}/>
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a>
            </HStack>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'md'}
                  src={
                    ''
                  }
                />
              </MenuButton>
              <MenuList> 
                <a href="../../auth/profile">
                <MenuItem>{<RiUserSettingsFill/>} | Edit Profile</MenuItem>
                </a>
                <MenuItem>{<IoMdConstruct/>} | Setting</MenuItem> 
                
                <MenuDivider />
                <MenuItem onClick={() => logoutHandler()}>{<FiLogOut/>} | Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>
        
            <Postig/>
           
      </Box> */}
    </>
  );
}