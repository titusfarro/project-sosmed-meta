import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import ContentCard from "../../components/contentcard/ContentCard"
import { Box, Center } from "@chakra-ui/react";
import Head from "next/head"
import Page from "../../components/contentcard/Page"

// function post(){
function PostD({postData}){ 
    
    const router = useRouter()
    // const [postData,setPostData] = useState({})

    // async function fetchData() {
    //     const { id } = router.query;
    //     const res = await axios.get(`http://localhost:2000/posts/${id}`)

    //     setPostData(res.data)
    //     console.log(res.data)
        
    // }       

     //is ready untuk client-side-rendering untuk menandakan bahwa router terupdate/siap digunakan
  // berfungsi juga untuk mendeteksi router yg berada di browser kita, supaya tidak ambil dari server
  // csr akan digunakan seperti untuk searching data, filtering. data2 yg bersifat filtering
  // ssr digunakan untuk menampilkan profile, detil produk 

    // useEffect(()=> {
    //     if(router.isReady)
    //     {
    //         fetchData();
    //     }
    // }, [router.isReady])
const url = "http://localhost:3000/" + router.pathname;

return (
    <Page title="Instagram Post " description="tempat ngumpul anak ig" image={postData?.image_url}
     url={url} type="website">
    <Box>
      <Center>
    <ContentCard
    username={postData.User?.username}
    caption={postData?.caption}
    image_url={postData?.image_url}
    location={postData?.location}
    numberOfLikes={postData?.number_of_likes} 
    id={postData?.id}
  />
       </Center>
       </Box>
       </Page>

       
)    
}

// contoh SSR
export async function getServerSideProps(context) {
    const {id } = context.params;
  
    const res = await axios.get("http://localhost:2711/post/detail/" + id);
    return {
      props: {
        postData: res.data.result,
          },
    };
  }


  
// //menggunakan nama function getStaticPaths untuk dynamic path
// export async function getStaticPaths() {
//     const posts = await axios.get("http://localhost:2000/posts" );
   
//     const paths = posts.data.map((post) => ({
//         params: { id: String(post.id) },
//       }))
  
//     return {
//      paths,
//        fallback: false,
//        //jika false param selain angka 1 akan dianggap not found
//     };
//   }
  
//   //get static path  getStaticPaths untuk menggunakan SSG pada dynamic page
//   export async function getStaticProps({ params }) {
//     const id = params.id
  
//     const res = await axios.get("http://localhost:2000/posts/" + id);
  
//     return {
//       props: {
//         postData: res.data,
//       },
//     };
//   }

export default PostD