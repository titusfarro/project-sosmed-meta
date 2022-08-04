import {Flex, VStack} from '@chakra-ui/react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ContentCard from '../../components/contentcard/ContentCard'
import NavBar from '../../components/homepage/navbar'
import { axiosInstance } from '../../lib/api';

export default function homePage() { 

  const postAuto = useSelector((state) => {return state.post})
  
  const [postUser, setPostUser] = useState([]); 
  useEffect(() => {
    setTimeout(() => {
      axiosInstance.get("/post").then((res) => {
        setPostUser(res.data.results); 
      })
    }, 200);
  }, [postAuto]); 

  useEffect(() => {

    console.log(postUser)
  }, [postUser])

  const renderPost = () => {
    return postUser.map((val, idx) => {
      return (
        <div key={idx}>
          <ContentCard 
          username={val.User?.username}
          comCaption={val.caption}
          image_url={val.image_url}
          comLocation={val.location} 
          numberOfLikes={val.number_of_likes} 
          numberOfComment={val.number_of_comments} 
          content={val.content}
          id={val.id}
          />
        </div>
      )
    })
  } 

  // useEffect(() => {
  //   ()
  // }, [postAuto])

 return (
  <>
  <NavBar />
  <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      >
      <VStack>
        {renderPost()}

     {/* <ContentCard /> */}
     </VStack>
    </Flex>
  </>
 )
}