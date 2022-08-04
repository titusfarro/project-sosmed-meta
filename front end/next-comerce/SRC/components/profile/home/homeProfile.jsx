import {
    Box,
    Flex, 
    Stack, 
    Avatar,
    Text,
    Grid,
    Tab, 
    Tabs, 
    TabList,
    TabPanel, 
    TabPanels,
    Divider, 
    useColorModeValue,
    HStack, 
    VStack,
    Item,
    Button,
    Link
} from "@chakra-ui/react" ; 
import Kotak from "../feedfoto/feedfoto" 
import { useSelector } from "react-redux";


export default function homeProfile(props) { 

    const { username, full_name, numberOfLikes, image_url, followers, following, id } = props;
    const userSelector = useSelector((state) => state.auth)

    return ( 
         
        <Box w={"100%"} minH={"100vh"}  id="coverLogin" >
             <Stack spacing={10} mt={"80px"} minH={"100vh"} mx={'auto'} maxW={'2xl'} py={12} px={6} bg={useColorModeValue('white', 'gray.700')}>
                <Flex minH={"10vh"} >
                    <Grid templateColumns='repeat(5, 1fr)' gap={6} alignContent={"space-evenly"}>
                        <Box display='flex'
                         align={"center"}
                         bg='white'
                            minW={0}>
                 
                            <Avatar 
                            
                            size={'xl'}
                            src={
                            ''
                            }
                            /> 
                        </Box>
                 
                        <VStack spacing={3} align="center">
                            <Text ml='0px' mt='5px' textTransform='none'>0</Text>
                        
                            <Text ml='10px' mt='5px' textTransform='none'>Posts</Text> 
                        </VStack>
                        
                        <VStack spacing={3} align='center'>
                            <Text ml='0px' mt='5px' textTransform='none'>0</Text>
                        
                            <Text ml='10px' mt='5px' textTransform='none'>Followers</Text> 
                        </VStack> 

                        <VStack spacing={3} align='center'>
                        <Text ml='0px' mt='5px' textTransform='none'>0</Text>
                        
                        <Text ml='10px' mt='5px' textTransform='none'>Following</Text> 
                        </VStack> 

                        <VStack spacing={3} align='center'>
                        <Text ml='0px' mt='5px' textTransform='none'>0</Text>
                        
                        <Text ml='10px' mt='5px' textTransform='none'>Likes</Text> 
                        </VStack>
                    </Grid>
                </Flex> 

                <Flex minH={"10vh"}>
                    <Grid templateColumns='repeat(2, 1fr)' gap={2} alignContent={"space-evenly"}>
                        
                            <Box w={""}>
                            <VStack align='stretch'>
                                <Text ml="" mt='0px' textTransform='none'>{userSelector.fullname}</Text> 
                                <Text mr="10px" mt='0px' textTransform='none'>{userSelector.username}</Text>
                            </VStack> 
                            </Box>
                            <Box w={"300px"}>
                               <Text> Bio </Text>
                            </Box>
                                           
                    </Grid>
                </Flex> 
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
                
                    <Tabs isFitted variant='enclosed'>
                        <TabList mb='1em'>
                            <Tab>Posts</Tab>
                            <Tab>Tags</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel >
                                {/* <VStack> 
                                <Kotak/>
                                <Kotak/>
                                </VStack> */}
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                
            </Stack>
        </Box>
    
    )
}