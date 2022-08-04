import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text, 
    Icon,
    useColorModeValue, 
    Spinner,
  } from '@chakra-ui/react';
import { FaCheck } from "react-icons/fa" 
import { axiosInstance } from '../../../lib/api';
import {useRouter} from "next/router"
import { useState, useEffect } from 'react';
import { BiError} from "react-icons/bi"
  
  
  export default function verifyAccount() { 

    const [verified, setVerified ] = useState(false)
    const router = useRouter()
    const { vertoken } = router.query
    
    useEffect(()=>{
    async function updateVer(){
        const res = await axiosInstance.patch("/user/verify/" + vertoken) 
        console.log(res)
        if (res){
            const success = res.data.success 
            setVerified(success) 
        }
    } 

    if(vertoken)
    {
      updateVer()    

    }
}, [router.isReady])

    // setVerified(res.data.result);

    return ( 
        <>
        {router.isReady ?
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>

            {verified?
            <>
            Your Account Has Been Verified 
            <Icon paddingLeft={2} boxSize={9} as={FaCheck}/>
            </> 
            : 
            <>
            Invalid Token
            <Icon paddingLeft={2} boxSize={7} as={BiError}/>
            </>
            }
          </Heading>
          {/* <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Request Reset
            </Button>
          </Stack> */}
        </Stack>
      </Flex> 
       : <Spinner></Spinner> } 
       </>
    );
  }