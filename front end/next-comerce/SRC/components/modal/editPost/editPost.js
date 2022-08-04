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
    Image,
    Stack, 
    Flex, 
    Box, 
    useToast,
  } from '@chakra-ui/react' ; 
import { useRef, useState } from "react"; 
import { useFormik } from 'formik';
import { axiosInstance } from '../../../lib/api';
import React from 'react';
import qs from "qs"

  export default function EditPost(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { caption, location, image_url, id} = props;
    // const initialRef = React.useRef(null)
    // const finalRef = React.useRef(null) 
    // // const inputFileRef = useRef(null)

    const [selectedFile, setSelectedFile] = useState(null) 
    const toast = useToast()
  
    const handleFile = (event) => {
      setSelectedFile(event.target.files[0])
    }

    const formik = useFormik({
      initialValues:{
        caption:`${caption}`, 
        location:`${location}`
      },
      onSubmit: async () =>{
        const formData = new FormData() 
        const { caption, location } = formik.values 

        // formData.append("caption", caption) 
        // formData.append("location", location) 
        // formData.append("image", selectedFile) 

        try{
            let body = {
                caption, 
                location
            }
          await axiosInstance.post("/post/" + id, qs.stringify(body)).then(() => {
            toast({
              title: 'Post has been edit', 
              status: 'success', 
              isClosable: true,
            })
          })
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

              <FormControl>
              <FormLabel>Image</FormLabel>
              {/* <Input type={'file'} display={''} onChange={handleFile}
              accept={"image/png, image/jpg, image/jpeg, image/gif"}
              ref={inputFileRef}></Input>
              <Button colorScheme={"blue"}
              onClick={() => inputFileRef.current.click()}>Upload Image</Button> */} 

              <Image src={`http://${image_url}`} w='400px' h="350px" objectFit={"cover"} rounded={5} />

              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Caption</FormLabel>
                <Input placeholder='Caption' 
                 onChange={(e)=>{
                  formik.setFieldValue('caption', e.target.value)
              }} defaultValue={caption}/>
              </FormControl> 

              <FormControl mt={4}>
                <FormLabel>location</FormLabel>
                <Input placeholder='Location'  
                onChange={(e) => {
                  formik.setFieldValue("location", e.target.value)
                }} defaultValue={location}/>
              </FormControl>
  
        
      </>
    )
  }