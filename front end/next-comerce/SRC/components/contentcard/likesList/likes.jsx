import { Box, Avatar, Text, Divider, Link } from '@chakra-ui/react';

export default function WhoLike(props) {
 const { username, full_name, img_Url, user_id } = props
 return (
  <Box >
   <Box display='flex'>
    <Avatar
     size='md'
     name='Prosper Otemuyiwa'
     src={`http://${img_Url}`}
    />
    <Box ml='20px' >
     <Link href={'/user/' + user_id} style={{ textDecoration: "none" }}>
      <Text _hover={{ color: "teal.500", }} fontWeight='bold'>{username}</Text>
     </Link>
     <Text fontWeight='semibold'>{full_name}</Text>
    </Box>
   </Box>
   <Divider my='10px' />
  </Box>
 )
}