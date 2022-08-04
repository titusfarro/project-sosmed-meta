import HomeProfile from "../../components/profile/home/homeProfile"; 
import Navbar from "../../components/homepage/navbar"; 
import { Flex } from "@chakra-ui/react";

export default function homeprofilePage(val, idx) {
    return (
        <>
        <Navbar/> 
        <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        >
        
        <HomeProfile 
        fullname={val.full_name}
        username={val.User?.username}
        image_url={val.image_url}
        location={val.location} 
        numberOfLikes={val.number_of_likes} 
        id={val.id}
        />
        </Flex>
        </>
    )

}