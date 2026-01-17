// import usePost from "../../assets/Hooks/usePost";
import PostCard from "../PostCard/PostCard";
import PostCardSkeleton from "../Skeleton/PostCardSkeleton";

export default function Feed({posts}) {

    // const {posts} = usePost()
    
    return (
        <>
        
            <section className="py-10 px-5">
                <div className="container mx-auto max-w-2xl">
                    <h2 className="text-2xl font-semibold text-gray-600">Latest Posts</h2>
                    <div className="all-posts py-5 space-y-8">
                        {posts? <div className="space-y-8">
                            {
                                posts.map((post)=> <PostCard key={post.id} postInfo={post}/>)
                            }
                        </div>: 
                            <div className="loading space-y-6">
                                {[...Array(5)].map((_,index)=><PostCardSkeleton key={index}/>)}
                            </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
