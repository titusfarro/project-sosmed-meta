import Head from "next/head";

function MetaHead(props) { 
    const { children, url="", type="", title="", description="", image="" } = props;


    return ( 
        <>
        <Head>
            
            <title>AroriesDeli</title> 
                    <meta property="og:url" content={url}/>
                    <meta property="og:type" content={type}/>
                    <meta property="og:title" content={title}/>
                    <meta property="og:description" content={description}/>
                    <meta property="og:image" content={image}/>

        </Head> 
        {children} 
        </>
    )
} 

export default MetaHead