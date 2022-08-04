import { useState } from 'react';
import {
  Box,
  Avatar, FormControl,
  Divider, InputGroup,
  Stack, InputRightElement,
  Text,
  Icon,
  Button,
  Input, 
  Image,
  Menu, 
  MenuButton, 
  MenuList,
  HStack,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,ModalBody,
  useDisclosure, ModalCloseButton,
  useToast,
  Link,
} from '@chakra-ui/react';
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc"
import { BsThreeDotsVertical } from "react-icons/bs"
import Comment from './comment';
import axios from 'axios';
import { useEffect } from 'react';
import { axiosInstance } from '../../lib/api';
import { useDispatch, useSelector } from 'react-redux';
import EditingPost from '../modal/editPost/editPosting';
import { RiRouterFill, RiSkipForwardMiniLine } from 'react-icons/ri';
import { useRouter } from "next/router"
import { useFormik } from 'formik'; 
import qs from "qs"; 


// import HomeEditPage from '../../pages/homepage/editPost';

// import { API_URL } from "../../configs/api";

function ContentCard(props){ 
  // const postAuto = useSelector((state) => {return state.post})
  const { username, comLocation, comment, comCaption, numberOfLikes, image_url, id, numberOfComments } = props;
 const [comments, setComments] = useState([]);
 const [likesPost, setLikesPost] = useState([]); 
 const [jumLikes, setJumLikes] = useState(numberOfLikes); 
 const [comInput, setComInput] = useState([])
 const [jumComments, setJumComments] = useState(numberOfComments) 
 const [tamCommentInput, setTamCommentInput] = useState(false);
 const [tamLikeInput, setTamLikeInput] = useState()
const { isOpen, onOpen, onClose } = useDisclosure() 
 const {isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure() 
 const {isOpen: isOpenLike, onOpen: onOpenLike, onClose: onCloseLike} = useDisclosure() 
 const toast = useToast()
 const userSelector = useSelector((state) => state.auth); 
 const autoRenderLikes = useSelector((state) => state.likes); 
 const autoRenderDelete = useSelector((state) => state.post); 
 const autoRenderComments = useSelector((state) => state.comment) 
 const dispatch = useDispatch()
const router = useRouter()

//  ----------- delete post content ------------ //
async function deletePost() {
  try {
    // body for decrement jumlah post di database 
    let body ={
      id: id - 1, 
    }
    console.log(id); 

    
    await axiosInstance.delete("/post/" + id, qs.stringify(body)) 
    dispatch({
      type: "fetch render", 
      payload: { value: !autoRenderDelete.value }
    }) 
    toast({
      title: "success", 
      description: "success deleting post", 
      status: "success", 
      isClosable: true,
    })
  }catch (err) {
    console.log(err); 
    toast({
      title: "error", 
      description: err.toString(), 
      status: "error", 
      isClosable: true,
    })
  }
} 
// ------------ likes post,  add and remove likes------------- 
const handleLikeInput = async () => {

  // if (!tamLikeInput) {
    alert(userSelector?.id)
    alert(id)


   if (!tamLikeInput) { setJumLikes(jumLikes + 1)
    setTamLikeInput(true) }
    else {
      setJumLikes(jumLikes - 1);
    setTamLikeInput(false) }
    try{
      let body = {
        number_Of_Likes: jumLikes + 1, 
        Id_User: userSelector.id, 
        Id_Post: id 
        
      } 
      await axiosInstance.post('/like',qs.stringify(body)) 
      dispatch({
        type: "fetch render", 
        payload: { value: !autoRenderLikes.value }
      }) 
    }catch (err) {
      console.log(err);
    }
  // } else {
  //   setJumLikes(jumLikes - 1) 
  //   setTamLikeInput(false) 
  //   try {
  //     let body = {
  //       number_Of_Likes: jumLikes - 1,
  //     }
  //     await axiosInstance.delete(`/like/user/${userSelector.id}/post/${id}`, qs.stringify(body)) 
  //     dispatch({
  //       type: "fetch render", 
  //       payload: { value: !autoRenderLikes.value }
  //     })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
} 

// ----------- Comment Post Content -------------- 
const formik = useFormik({
  initialValues: {
    com_post: comment,
  }, 
  onSubmit: async () => {
    const { com_post } = formik.values 
    try {
      let body = {
        number_of_comments: jumComments + 1,
        com_post: com_post, 
        Id_User: userSelector.id, 
        Id_Post: id
      } 
      setJumComments(jumComments + 1) 
      await axiosInstance.post('/comment/post' , qs.stringify(body)) 
      dispatch({
        type: "RENDER_COMMENT",
        payload: { value: !autoRenderComments.value }

      }) 
      toast({
        title: 'comment accept', 
        status: "success", 
        isClosable: true,
      })

    } catch (err) {
      console.log(err); 
    }
    formik.setSubmitting(false) 
    formik.resetForm('com_post', "")
  }
})

// ------------ fetchComments ---------------
// const fetchComments = () => {
//   try {
//     axiosInstance
//       .get(`/fetch`, {
//         params: {
//            id, 
//           limit: 5
//         }
//       })  
//       .then((res) => {
//         setComments(res.data.result)
//         const temp = res.data.result 
//         console.log(temp)
//       });
//   } catch (err) {
//     console.log(err)
//   }
// };

// function renComPost() {
//   return comments.map((val, idx) => {
//     return (
//       <Comment 
//       key={idx} 
//       comUsername={username} 
//       comDate={val.createdAt} 
//       comComment={val.com_post} 
//       IdUser={val.Id_User} 
//       IdPost={val.Id_Post} 
//       comId={val.id} 
//       jumComments={val.Post?.number_of_comments} 
//       />
//     )
//   })
// }
// useEffect(() => {
//   fetchComments()
// }, [autoRenderComments]) 

const handleComInput = (event) => {
  const { value } = event.target; 

  setComInput(value)
}
 
const commentNewPost = async () => {

  const formData = {
    Id_User: userSelector.id, 
    Id_Post: id, 
    content: comInput
  }; 

  try {
    await axiosInstance.post("/comment/post", formData).then(()=> {
      setComInput(""); 
      toast({
        title: 'berhasil comment', 
        status: "success", 
        isClosable: true 
      });
    });
  }catch (err) {
    console.log(err); 

    toast({
      title: "ERROR", 
      status: "error",
      isClosable: true, 
    })
  }
}

  useEffect(() => {
    async function forPostUser() {
      try {
        const res = await axiosInstance.get("/post"); 
        const data = res.data.result; 
        setPostUser(data); 
        console.log(data); 
      } catch (error) {}
    }
    forPostUser(); 
  }, []); 


  return (
    <Box borderWidth="1px"  bg='#ffffff' borderRadius="lg" maxW="lg" paddingY="2" marginX="10px"  mb='15px' mt={"50px"}> 
      {/* Card Header */}
      <Box paddingX="3" paddingBottom="2" display="flex" alignItems="center">


        <Avatar src="" size="md" />
        <Box marginLeft="2">
          <Text fontSize="md" fontWeight="bold">
            {username}
          </Text>
          <Text fontSize="sm" color="GrayText">
            {comLocation}
          </Text>
        </Box>
      </Box>

      {/* Card Media/Content */}
      <Image src={`http://${image_url}`} onClick={()=> {
        router.push('/postDetail/' + id)
      }}/>

      {/* Action Buttons */} 
      <HStack justifyContent={"space-between"}>
      <Box paddingX="3" paddingY="2" display="flex" alignItems="center">
        
        <Icon boxSize={6} as={tamLikeInput ? FcLike : FaRegHeart} onClick={() => handleLikeInput()} sx={{_hover: { cursor: "pointer"}}}> 

        </Icon>

        <Icon
          onClick={() => setTamCommentInput(true)}
          marginLeft="4"
          boxSize={6}
          as={FaRegComment}
          sx={{
            _hover: {
              cursor: "pointer",
            },
          }}
        /> 
        
      </Box> 
      <Box minW={"20"} align={"center"}>
        <Menu>
          {/*-----------edit post--------- */}
          <MenuButton><BsThreeDotsVertical/></MenuButton> 
          <MenuList>
            
            <MenuItem onClick={onOpen}>Edit Post</MenuItem> 
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditingPost  
            caption={comCaption}
            image_url={image_url}
            location={comLocation} 
            id={id}
            isClose={onClose}
            />

          </ModalBody>
          <ModalFooter>
          </ModalFooter>
          </ModalContent>
          
          </Modal>

          {/*---------save post----------*/}
            <MenuItem>Save Post</MenuItem>  

          {/*-------------delete post-----------*/}
            <MenuItem onClick={onOpenDelete}>Delete Post</MenuItem>
            <Modal isOpen={isOpenDelete} onClose={onCloseDelete} size="sm">
              <ModalOverlay /> 
              <ModalContent>
                <ModalHeader>Delete Post</ModalHeader>
                <ModalCloseButton /> 
                <ModalBody pb={6}>
                  <Box justifyContent={'space-between'}>
                    <Text>Delete This Post Now?</Text>
                  </Box>
                  <Box mt='10px' display="flex" justifyContent="flex-end">
                    <Button mr={3} 
                    colorScheme="red" onClick={() => {
                      async function submit() {
                        await deletePost(); 
                        onCloseDelete();
                      }
                      submit()
                    }}>
                      Delete
                    </Button>
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>
          </MenuList>
        </Menu> 
        </Box>
      </HStack>

      {/* Like Count */}
      <Box paddingX="3">
        <Text fontWeight="bold" textColor="gray.300">
          <Link onClick={onOpenLike} >
           {jumLikes?.toLocaleString()} likes
           </Link>
           </Text>
      </Box>

      {/* Caption */}
      <Box paddingX="3">
        <Text display="inline" fontWeight="bold" marginRight="2">
          {username}
        </Text>
        <Text display="inline">{comCaption}</Text>
      </Box>

      {/* Comment Section */}
      <Box paddingX="3" marginTop="4">

        <Text fontWeight="bold"  marginBottom="2">
          {!tamCommentInput ? 
          <Button onClick={() => setTamCommentInput(true)}>see {jumComments?.toLocalString()} Comments</Button>  
          : 
          <Button onClick={() => setTamCommentInput(false)}>close {jumComments?.localString()} Comments</Button>
        }
        </Text>

        {/* Comment Input */}
        {tamCommentInput ? (
          <Box display="flex">
            <Input
              onChange={handleComInput}
              marginBottom="2"
              type="text"
              placeholder="Input new comment"
              marginRight="4"
            />
            <Button onClick={commentNewPost} colorScheme="green">
              Post
            </Button> 
          </Box>
          )  : null
        }

        <Comment/>
        {/* {comments.length === 0 ? (
          <Button onClick={fetchComments} size="xs">
            See More
          </Button>
        ) : null}  */}

      {/* <Divider />
      <FormControl>
        <Text>{formik.values.com_post}</Text>
        <InputGroup size='sm'>
          <Input id='inputComment'
            onChange={(event) =>
              formik.setFieldValue("com_post", event.target.value)}
            focusBorderColor='none'
            border='0'
            maxLength='300'
            pr='4.5rem'
            type='text'
            value={formik.values.com_post}
            placeholder='Add Comment'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' variant='ghost'
              onClick={formik.handleSubmit}
              // disabled={formik.values.com_post.length > 0 ? false : true} 
              >
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl> */}

      </Box>
     </Box>
  );
};

export default ContentCard;
