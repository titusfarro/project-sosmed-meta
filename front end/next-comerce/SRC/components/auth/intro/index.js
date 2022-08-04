import { Flex, Box, chakra, Link, Button, VStack, Stack, Center, Text } from "@chakra-ui/react"; 
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image'
import gambar from '../../gambar/imggerak.gif' 
import gambar2 from "../../../assets/90233-social-media-content-creator.gif"


export default function intropage() {
return (

<Flex
  bg="#edf3f8"
  _dark={{
    bg: "#3e3e3e",
  }}
  p={100}
  w="full"
  alignItems="center"
  justifyContent="center"
>
  <Box
    bg="white"
    _dark={{
      bg: "gray.800",
    }}
    mx={{
      lg: 8,
    }}
    display={{
      lg: "flex",
    }}
    maxW={{
      lg: "5xl",
    }}
    shadow={{
      lg: "lg",
    }}
    rounded={{
      lg: "lg",
    }}
  >
    <Box
      w={{
        lg: "50%",
      }}
    >
      <Box
        h={{
          base: 64,
          lg: "full",
        }}
        rounded={{
          lg: "lg",
        }}
        bgSize="cover"
        
      >
        <Image src={gambar2} />
      </Box>
    </Box>

    <Box 
      bgColor={"green.200"}
      py={20}
      px={10}
      maxW={{
        base: "xl",
        lg: "5xl",
      }}
      w={{
        lg: "50%",
      }} 
      mt={'-80px'}
    > 
    <VStack>
      <Box 
      mt={"-70px"}
      fontFamily={"caveat"} 
      fontSize={"8xl"} >
        Rieslogram
      </Box>
      <chakra.h2
        fontSize={{
          base: "2xl",
          md: "3xl",
        }}
        color="gray.800"
        _dark={{
          color: "white",
        }}
        fontWeight="bold"
      >
        Let's Connect With Your{" "}
        <chakra.span
          color="brand.600"
          _dark={{
            color: "brand.400",
          }}
        >
          Friends
        </chakra.span>
      </chakra.h2> 
      </VStack>

      <chakra.p 
         mt={8}
         color="gray.600"
         _dark={{
      color: "gray.400",
       }} 
      
      justifyContent={'center'}
      >
       </chakra.p> 

      <VStack spacing={7}>
      <a
          href="/auth/register"
          px={5}
          py={3}
          fontWeight="semibold"
          rounded="lg"      
        >
          <Button onClick={""} 
          bg="green.600"
          color="grey.100"
          _hover={{
            bg: "green.800",
          }} 
          alignContent= "center"
          >
          
            Register Now
        </Button>
        </a>

      <Box mt={8}>
      <a href= "/auth/login">
      <Button 
          // onClick="submit" 
          bg="blue.500" _hover={{
            bg: "blue.800", 
          }} 
          color="grey.100"
          px={5}
          py={3}
          fontWeight="semibold"
          rounded="lg" 
          alignContent={"center"}
        
          >
               
          Log in Now
         
        </Button> 
        </a>
      </Box> 
      </VStack>
      <Stack>
        <Center p={8}>
          <Button
            w={'full'}
            maxW={'md'}
            variant={'outline'}
            leftIcon={<FcGoogle />}>
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        </Center>
      </Stack>
    </Box>
  </Box>
</Flex> 

)
}