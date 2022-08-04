import { 
  Box, Text, Flex, Divider, Button, Icon, Tooltip, useDisclosure, Modal, ModalFooter, 
  ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, 
  useToast, Input, Stack, FormControl, FormHelperText, Link
 } from "@chakra-ui/react"; 
 import {useState, useEffect} from 'react'; 
 import moment from 'moment'; 
 import { useDispatch, useSelector } from "react-redux"; 
 import { axiosInstance } from "../../../lib/api"; 
 import { useFormik } from "formik"; 
 import qs from 'qs'; 
 import * as Yup from "yup"; 
import { RiContactsBookLine } from "react-icons/ri";

function Comment(props){
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete} = useDisclosure() 
  const { username, date, comment, Id_Post, Id_User, id, jumComments} = props 
  const userSelector = useSelector((state) => state.auth) 
  const toast = useToast(); 
  const [editInput, setEditInput] = useState(false) 

  // ----------------- Delete Comment Post ---------------------- 
  async function delComment() {
    try {
      let body = {
        number_of_comments: jumComments + 1, 
      } 
      await axiosInstance.delete("/" + Id_Post) 
      await axiosInstance.get("/comments/" + Id_Post, qs.stringify(body)) 
      toast({
        title: "success", 
        description: "success deleting comment", 
        status: "success", 
        isClosable: true, 
      })
    }catch (err) {
      console.log(err);
    }
  }

  // ------------------Edit Comment------------------ 
  const formik = useFormik({
    initialValues: {
      com_post: `${Comment}`, 
    }, 
    validationSchema: Yup.object().shape({
      com_post: Yup.string().required("Edit Comment is required") 

    }), 
    validateOnChange: false, 
    onSubmit: async () => {
      const {com_post} = formik.values 
      try {
        let body = {
          com_post, 
        }
        await axiosInstance.patch("/comments/" + id, qs.stringify(body)).then(() => {
          setEditInput(false) 
          toast({
            title: "comment has been edit", 
            status: "success", 
            isClosable: true, 
          })
        })
      }catch (err) {
        console.log(err);
      }
    }
  })

  return (
    // <Box marginY="1">
    //   <Text display="inline" fontWeight="bold" marginRight="2">
    //     {username}
    //   </Text>
    //   <Text display="inline">{content}</Text>
    // </Box>
    <>
    <Divider />
    <Box display='flex' justifyContent='space-between'>
      <Box>
        <Flex>
          {/* <Link href={'/ContentCard/' + Id_User} style={{ textDecoration: "none" }}> */}
            <Text fontWeight='bold' textColor='gray.800' fontSize='sm' className='linkModal'>
              {username}
            </Text>
          {/* </Link> */}

          &nbsp;
          <Text fontWeight='semibold' fontSize='sm' textColor='gray.800'>{moment(date).format('DD-MMMM-YYYY')}</Text>
        </Flex>
        <Text fontWeight='semibold' fontSize='xs' mt='-8px' textColor='gray.400'>{moment(date).fromNow()}</Text>

        <Box w='390px'>
          {!editInput ?
            <Text fontWeight='semibold' fontSize='sm' textColor='gray.600'>
              {comment}
            </Text> :
            <FormControl isInvalid={formik.errors.com_post}>
              {/* <Text>{formik.values.comment_post}</Text> */}
              <Input size='sm' mb='5px' type='text' maxLength='300'
                onChange={(event) =>
                  formik.setFieldValue("comment_post", event.target.value)}
                defaultValue={comment} />
              <FormHelperText color="red">
                {formik.errors.com_post}
              </FormHelperText>
            </FormControl>
          }
        </Box>
      </Box>

      <Box mt='5px'>
        {userSelector.id == Id_User ?
          !editInput ?
            <>
              <Tooltip label='Edit Comment' fontSize='sm' >
                <Button colorScheme='orange' mr='5px' my='5px' size='sm' onClick={() => setEditInput(true)}>
                  <Icon boxSize={4} as={FaEdit} />
                </Button>
              </Tooltip>
              <Tooltip label='Delete Comment' fontSize='sm' >
                <Button colorScheme='red' size='sm' onClick={onOpenDelete}>
                  <Icon boxSize={3} as={FaTrashAlt} />
                </Button>
              </Tooltip>
            </> :
            <>
              <Tooltip label='Save' fontSize='sm' >
                <Button colorScheme='green' mr='5px' my='5px' size='sm'
                  onClick=
                  {() => {
                    async function submit() {
                      await formik.handleSubmit();
                    }
                    submit()
                  }}>
                  <Icon boxSize={4} as={IoIosSave} />
                </Button>
              </Tooltip>
              <Tooltip label='Cancel' fontSize='sm' >
                <Button colorScheme='red' size='sm' onClick={() => setEditInput(false)}>
                  <Icon boxSize={3} as={IoCloseSharp} />
                </Button>
              </Tooltip>
            </>
          :
          null
        }
        <Modal isOpen={isOpenDelete} onClose={onCloseDelete} size='xs'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Comment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box justifyContent={'space-between'}>
                <Text>Are you sure want to delete this comment?</Text>
              </Box>
            </ModalBody>
            <ModalFooter pt='5px'>
              <Button colorScheme='blue' mr={3} onClick={onCloseDelete}>
                Close
              </Button>
              <Button mr={3} colorScheme='red' onClick={() => {
                async function submit() {
                  await delComment();
                  onCloseDelete();
                }
                submit()
              }}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  </>
  );
};

export default Comment;
