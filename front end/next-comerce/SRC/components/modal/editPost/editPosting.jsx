import { 
    FormControl, 
    FormLabel, 
    Input, 
    Image, 
    useDisclosure,
    useToast, 
    Button, 
    ModalFooter,
 } from "@chakra-ui/react"; 
import { useState } from "react"; 
import { useFormik } from "formik"; 
import qs from 'qs'; 
import { axiosInstance } from "../../../lib/api";


export default function EditingPost (props) { 
    const { caption, location, image_url, id, isClose} = props; 
    const { isOpen, onOpen, onClose } = useDisclosure(); 

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

        try{
            let body = { 
                id,
                caption, 
                location
            }
          await axiosInstance.patch("/post/" + id, qs.stringify(body)).then(() => {
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
              <Image src={`http://${image_url}`} w='auto' h="350px" objectFit={"cover"} rounded={5} />

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
            
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => {async function submit(){
              await formik.handleSubmit(); 
              isClose()
            }
            submit()
            }}>
              Submit
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button> 
            </ModalFooter>
        </>
    )
}