import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
    useDisclosure,
    Button,
    FormControl, 
    FormLabel, 
    Input, 
    Stack, 
    Flex, 
    Box, 
    useToast,
  } from '@chakra-ui/react' ; 
import { useRef, useState } from "react"; 
import { useFormik } from 'formik';
import { axiosInstance } from '../../../lib/api';
import React from 'react';
import {BiCloudUpload} from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';


  export default function modalPost() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null) 
    const inputFileRef = useRef(null)

    const postAuto = useSelector((state) => {return state.post})
    const dispatch = useDispatch()

    const [selectedFile, setSelectedFile] = useState(null) 
    const toast = useToast()
  
    const handleFile = (event) => {
      setSelectedFile(event.target.files[0])
    }

    const formik = useFormik({
      initialValues:{
        caption:"", 
        location:""
      },
      onSubmit: async () =>{
        const formData = new FormData() 
        const { caption, location } = formik.values 

        formData.append("caption", caption) 
        formData.append("location", location) 
        formData.append("user_id", 1) 
        formData.append("image", selectedFile) 

        try{
          await axiosInstance.post("/posts", formData).then(() => {
            toast({
              title: 'Post has been added', 
              status: 'success', 
              isClosable: true,
            })

            dispatch ({
              type: "POST_RENDER", 
              payload: {
                value : !postAuto.value
              }
            })
          }).then(onClose())

        } catch (err) {
          console.log(err) 

          toast({
            title: 'Error', 
            status: "error", 
            isClosable: true, 
          })
        }
      }
    })

    return (
      <>
        <Button onClick={onOpen} 
        variant={'solid'}
        colorScheme={'teal'}
        size={'sm'}
        mr={4}
        leftIcon={<BiCloudUpload />}
        >
              POST</Button>
        
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>

            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

              <FormControl>
              <FormLabel>Image</FormLabel>
              <Input type={'file'} display={''} onChange={handleFile}
              accept={"image/png, image/jpg, image/jpeg, image/gif"}
              ref={inputFileRef}></Input>
              <Button colorScheme={"blue"}
              onClick={() => inputFileRef.current.click()}>Upload Image</Button>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Caption</FormLabel>
                <Input placeholder='Caption' 
                 onChange={(e)=>{
                  formik.setFieldValue('caption', e.target.value)
              }}/>
              </FormControl> 

              <FormControl mt={4}>
                <FormLabel>location</FormLabel>
                <Input placeholder='Location'  
                onChange={(e) => {
                  formik.setFieldValue("location", e.target.value)
                }}/>
              </FormControl>

            </ModalBody> 
  
            <ModalFooter>
              <Button colorScheme='green' mr={3} onClick={formik.handleSubmit}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }