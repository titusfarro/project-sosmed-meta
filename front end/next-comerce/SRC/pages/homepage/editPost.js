// import {Flex, VStack} from '@chakra-ui/react'
import { useEffect } from 'react';
import { useState } from 'react';
import EditingPost from '../../components/modal/editPost/editPosting';
import NavBar from '../../components/homepage/navbar'
import { axiosInstance } from '../../lib/api';

export default function homeEditPage(props) { 
  const { caption, location, image_url, id} = props
  const [editPostUser, setEditPostUser] = useState([]); 
  useEffect(() => {
    setTimeout(() => {
      axiosInstance.get("/post").then((res) => {
        setEditPostUser(res.data.results); 
      })
    }, 200);
  }, []); 

  useEffect(() => {

    console.log(editPostUser)
  }, [editPostUser])

  const renderEditPost = () => {
    return editPostUser.map((val, idx) => {
      return (
        <div key={idx}>
          <EditingPost 
          caption={val.caption}
          image_url={val.image_url}
          location={val.location} 
          id={val.id}
          />
        </div>
      )
    })
  }
 return (
  <>
    {renderEditPost()}

     {/* <ContentCard /> */}
    
  </>
 )
}