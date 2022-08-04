import {
  Box,
  Flex,
  Avatar,
  Stack,
  Button,
  SimpleGrid,
  GridItem,
  Heading,
  FormControl, 
  FormLabel,
  FormHelperText,
  Divider,
  Text, 
  Textarea,
  Icon, 
  chakra,  
  VisuallyHidden, 
  Input, 
  Select, 
  Checkbox, 
  RadioGroup,
  Radio,
  Link,
  AvatarBadge,
  IconButton,
  VStack
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons'; 
import ModalAvatar from '../../modal/modalAvatar/Avatar';
import { useSelector } from 'react-redux';



export default function personalInfo(props){ 
 
  const { username, fullname } = props 
  const userSelector = useSelector({})
  // const { isOpen, onOpen, onClose } = useDisclosure()
  
  //   const initialRef = React.useRef(null)
  //   const finalRef = React.useRef(null) 
  //   const inputFileRef = useRef(null)

  //   const postAuto = useSelector((state) => {return state.post})
  //   const dispatch = useDispatch()

  //   const [selectedFile, setSelectedFile] = useState(null) 
  //   const toast = useToast()
  
  //   const handleFile = (event) => {
  //     setSelectedFile(event.target.files[0])
  //   }

  //   const formik = useFormik({ 

  //     onSubmit: async () =>{
  //       const formData = new FormData() 
         

         
  //       formData.append("user_id", 1) 
  //       formData.append("image", selectedFile) 

  //       try{
  //         await axiosInstance.post("/post/upload", formData).then(() => {
  //           toast({
  //             title: 'Post has been added', 
  //             status: 'success', 
  //             isClosable: true,
  //           })

  //           dispatch ({
  //             type: "POST_RENDER", 
  //             payload: {
  //               value : !postAuto.value 
              
  //             }
  //           })
  //         }).then(onClose())

  //       } catch (err) {
  //         console.log(err) 

  //         toast({
  //           title: 'Error', 
  //           status: "error", 
  //           isClosable: true, 
  //         })
  //       }
  //     }
  //   })


  return(
<Box
  bg="#edf3f8"
  _dark={{
    bg: "#111",
  }}
  p={10}
>
  <Box>
    <SimpleGrid
      display={{
        base: "initial",
        md: "grid",
      }}
      columns={{
        md: 3,
      }}
      spacing={{
        md: 6,
      }}
    >
      <GridItem
        colSpan={{
          md: 1,
        }}
      >
        <Box px={[4, 0]}>
          <Heading fontSize="lg" fontWeight="md" lineHeight="6">
            Profile
          </Heading>
          <Text
            mt={1}
            fontSize="sm"
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
          >
            This information will be displayed publicly so be careful what you
            share.
          </Text>
        </Box>
      </GridItem>
      <GridItem
        mt={[5, null, 0]}
        colSpan={{
          md: 2,
        }}
      >
        <chakra.form
          method="POST"
          shadow="base"
          rounded={[null, "md"]}
          overflow={{
            sm: "hidden",
          }}
        >
          <Stack
            px={4}
            py={5}
            bg="white"
            _dark={{
              bg: "#141517",
            }}
            spacing={6}
            p={{
              sm: 6,
            }}
          >
            

            <Stack
              px={4}
              py={5}
              p={[null, 0]}
              bg="white"
             _dark={{
              bg: "#141517",
              }}
              spacing={6}
              >
              <VStack>
              
                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                    color: "gray.50",
                    }}
                    >
                    Photo
                  </FormLabel>
                  <Flex alignItems="center" mt={1}>
                    <Avatar
                      boxSize={12}
                      bg="gray.100"
                      _dark={{
                      bg: "gray.800",
                      }}>
                    
                    <AvatarBadge
                      as={IconButton}
                      size="xs"
                      mt={3}
                      rounded="full"
                      color="gray.300"
                      icon={<SmallCloseIcon/>}
                      colorScheme="red"

                      _dark={{
                        color: "gray.700", 
                      }}
                    
                   
                    />
                    </Avatar>
                  
                    {/* <Button
                      type="button"
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{
                      shadow: "none",
                      }}
                    >
                      
                    Change
                    </Button> */}

                    <Flex alignItems={'center'}>
                    <ModalAvatar/>
                    </Flex>

                  </Flex>
                </FormControl>

                
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="first_name"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: "gray.50",
                      }}
                      >
                      {fullname}
                    </FormLabel>
                    <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    />
                  </FormControl> 
                
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="first_name"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: "gray.50",
                      }}
                      >
                      {username}
                    </FormLabel>
                    <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    />
                  </FormControl> 
                      
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="first_name"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: "gray.50",
                      }}
                      >
                      Bio
                    </FormLabel>
                    <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    />
                  </FormControl> 

              </VStack>
            </Stack>            
          </Stack>
          
          <Box
            px={{
              base: 4,
              sm: 6,
            }}
            py={3}
            bg="gray.50"
            _dark={{
              bg: "#121212",
            }}
            textAlign="right"
          >
            <Button 
              bg={'green.400'} 
              color={"white"} 
              _hover={{
                bg: "green.600",
              }}
              type="submit"
              colorScheme="brand"
              _focus={{
                shadow: "",
              }}
              fontWeight="md"
              // onClick={formik.handleSubmit}
            >
              Save
            </Button>
          </Box>
        </chakra.form>
      </GridItem>
    </SimpleGrid>
  </Box>

  <Divider
    my="5"
    borderColor="gray.300"
    _dark={{
      borderColor: "whiteAlpha.300",
    }}
    visibility={{
      base: "hidden",
      sm: "visible",
    }}
  />

  

  
      
</Box> 
)
}


// export default function a() {
//   return (
// <Center>
//   AYAM
//   <Box>
//     asdas
//   </Box>
//     </Center>
//   )
// }