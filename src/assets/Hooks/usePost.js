import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Context/Auth.context/Auth.context"
import axios from "axios"

export default function usePost() {

    const {token} = useContext(AuthContext)
    const [posts, setPosts] = useState(null)

    async function getAllPosts(){

        try {
            const options = {
                url: 'https://linked-posts.routemisr.com/posts?limit=50&page=101',
                method: 'GET',
                headers: {token}
            }
            const {data}= await axios.request(options)
            // console.log(data)
            setPosts(data.posts.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllPosts()
    },[])

    return {posts, getAllPosts}
}
