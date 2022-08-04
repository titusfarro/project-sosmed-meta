import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    Center,
    useColorModeValue,
    InputGroup, 
    Icon, 
    InputRightAddon, 
    InputRightElement, 
    FormHelperText,
    flexbox,
  } from '@chakra-ui/react';
  import {FcGoogle} from "react-icons/fc"
  import {IoMdEye, IoMdEyeOff} from "react-icons/io"; 
  import {useFormik} from "formik";  
  import * as Yup from "yup";
  import { useState, useEffect } from 'react'; 
  import {useDispatch, useSelector} from "react-redux"; 
  import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";  
  import {useRouter} from "next/router";   
  import Image from 'next/image';
import { userLogin } from '../../../redux/action/userLogin';

  // import type { NextPage } from 'next';
  
  export default function MyLogin()  {
    const [passwordView, setPasswordView] = useState(false); 
    
    const userSelector = useSelector((state) => state.auth);
    const dispatch = useDispatch(); 
    // const toast = useToast(); 
    const router = useRouter(); 

    const formik = useFormik({
        initialValues: {
            email: "", 
            password: "",
        }, 
        validationSchema: Yup.object().shape({
            email: Yup.string().required("email or username harus diisi"), 
            password: Yup.string().required("password harus diisi")
            .min(8, "password harus 8 karakter"),
        }), 
        validateOnChange: false,
        onSubmit: async (values) => {
          dispatch(userLogin(values, formik.setSubmitting))
            
        },
    }); 

    useEffect(() => {
     if (userSelector?.id) {
       router.push("/homepage") 
    }
    }, [userSelector?.id])

    return ( 
        <>
        <Box h={"100vh"} id='coverLogin'>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} fontFamily={'cursive'}>Sign in to your account</Heading>
            {/* <Text fontSize={'lg'} color={'gray.600'}> */}
              {/* to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️ */}
            {/* </Text> */}
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            > 
        
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={formik.errors.email}>
                <FormLabel>Email or Username</FormLabel>
                <Input 
                required
                type="text" 
                onChange={(event) => formik.setFieldValue("email", event.target.value)}/>
                <FormHelperText >{formik.errors.email}</FormHelperText>
              </FormControl>

              <FormControl id="password" isInvalid= {formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup> 
                <Input type={passwordView ? "text" : "password"}
                onChange={(event) => formik.setFieldValue("password", event.target.value)}/> 
                
                <InputRightAddon>
                <Icon 
                fontSize="xl" 
                onClick={() => setPasswordView(!passwordView)}
                as={passwordView ? IoMdEye : IoMdEyeOff} 
                sx={{_hover: { cursor: "pointer"} }}
                />
              </InputRightAddon>
              </InputGroup>
                <FormHelperText>{formik.errors.password}</FormHelperText>
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'} onClick={() => router.push("/forgotpassword")}>Forgot password?</Link>
                </Stack>
                <Stack spacing={10}>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                     _hover={{
                    bg: 'blue.500', 
                    }}
                    mt="20px"
                    onClick={formik.handleSubmit} 
                    disabled={
                    formik.values.email.length > 4 && formik.values.password.length > 3 
                    ? false 
                    : true
                    }
                    >                 
                 
                    Sign in 
                  </Button>
                </Stack>
                <Stack >
                  <Center p={8}>
                    <Button 
                      mt={"-50px"}
                      w={'2xl'}
                      maxW={''}
                      variant={'outline'}
                      leftIcon={<FcGoogle />}>
                      <Center>
                        <Text>Sign in with Google</Text>
                      </Center>
                    </Button>
                  </Center>
                </Stack>
              </Stack>
            </Stack>
          </Box> 
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
              >
              <Text fontSize={"lg"} color="black">
                  Don't Have an account{" "}
                <Link color={"blue.400"} onClick={() => router.push("/auth/register")}>
                  Sign Up
                </Link>{" "}
        
              </Text>
            </Box>
        </Stack>
        </Box>  
      </>
    
    );
  }