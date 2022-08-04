import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text, 
    Link,
    useColorModeValue,
    FormHelperText,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'; 
  import { useFormik } from 'formik'; 
  import * as Yup from "yup"; 
  import YupPassword from "yup-password"; 
  import { useDispatch, useSelector } from 'react-redux'; 
  import { UserRegister } from '../../../redux/action/userRegister'; 
  import { useToast } from '@chakra-ui/react'; 
  import { useRouter } from 'next/router'; 
  import { useEffect } from 'react';
  // import Link from 'next/link';
  
  export default function SignupCard() { 
    YupPassword(Yup);
    const [showPassword, setShowPassword] = useState(false); 
    const dispatch = useDispatch() 
    const toast = useToast() 
    const router = useRouter() 

    const userSelector = useSelector((state) => {
      return state.auth
    })

    // const handleClick = (e, path) => {
    //   if (path === "/homepage") {
    //     console.log("I clicked on the About Page");
    //   }
    // };

    const formik = useFormik({
      initialValues: {
        full_name: "", 
        username: "", 
        email: "", 
        password: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().email("harus email").required("tolong isi emailnya"), 
        full_name: Yup.string().required("isi nama anda"), 
        username: Yup.string().required("isi username anda"), 
        password: Yup.string().required("isi password anda") 
        .minLowercase(1, "harus ada 1 huruf kecil") 
        .minUppercase(1, "harus ada 1 huruf besar") 
        .minSymbols(1, "harus ada 1 symbol") 
        .min(8, "minimal 8 karakter")
      }),
      validateOnChange: false, 
      onSubmit: async (values) => {
        //alert ("assasd") 
        await dispatch(UserRegister(values, formik.setSubmitting)) 
        
        }
      }) 
      async function Submit() {
        await formik.handleSubmit()
      
      toast({
        title: "new acc has created", 
        description: "new acc", 
        status: "success", 
        isClosable: true 
      }) 
    }  
    useEffect(() => {
      if (userSelector?.id) {
        router.push("/auth/login") 
     }
     }, [userSelector?.id])
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'2xl'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'} fontFamily={"cursive"}>
              Create Your Account Now !
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={10}>
            <Stack>
              <HStack>
                <Box>
                  <FormControl id="firstName" isInvalid={formik.errors.full_name}>
                    <FormLabel minW={"lg"}>Full Name</FormLabel>
                    <Input type="text" onChange={(event) => formik.setFieldValue("full_name", event.target.value)}/>
                    <FormHelperText>{formik.errors.full_name}</FormHelperText>
                  </FormControl>
                </Box>
                
              </HStack>
              <FormControl id="email" isInvalid={formik.errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" 
                onChange={(event) => formik.setFieldValue("email", event.target.value)}
                /> 
                <FormHelperText>{formik.errors.email}</FormHelperText>
              </FormControl>

              <FormControl id="username" isInvalid={formik.errors.email}>
                <FormLabel>Username</FormLabel>
                <Input 
                type="text" 
                onChange={(event) => formik.setFieldValue("username", event.target.value)}
                />
                <FormHelperText>{formik.errors.username}</FormHelperText>

              </FormControl>

              <FormControl id="password" isInvalid={formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} 
                  onChange={(event) => formik.setFieldValue("password", event.target.value)}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="password" isInvalid={formik.errors.password}>
                <FormLabel>Repeat Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} 
                  />
                  <InputRightElement h={'full'}>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>{formik.errors.password}</FormHelperText>
              </FormControl>
              <Stack spacing={10} pt={2}> 
              {/* <Link href="/"> */}
                {/* <a onClick={(e) => handleClick(e, "/homepage")}> */}
      
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick = {Submit}>
                  Sign up
                </Button>
                {/* </a> */}
                {/* </Link>{" "} */}
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} onClick={() => router.push("/auth/login")}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }