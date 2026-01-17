import { faThumbsUp as faThumbUpRegular } from "@fortawesome/free-regular-svg-icons";
import {
    faComment,
    faEllipsisVertical,
    faHeart,
    faShare,
    faThumbsUp,
    } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import CommentCard from "../CommentCard/CommentCard";
    import { Link } from "react-router";
    import { useRef, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../assets/Context/Auth.context/Auth.context";
import DropDown from "../DropDown/DropDown";
import { UserContext } from "../../assets/Context/User.context/User.context";


    export default function  PostCard({ postInfo, commentsLimit = 3 }) {


        const [newComment, setNewComment] = useState("");
        const [comments , setComments] = useState(postInfo.comments || [])
        const {token}= useContext(AuthContext);
        const commentInputRef = useRef(null);
        const {user} = useContext(UserContext);

        async function addComment(e) {
        try {
            e.preventDefault();
            const options = {
                url: 'https://linked-posts.routemisr.com/comments',
                method: 'POST',
                headers: {token},
                data: {
                    content: newComment,
                    post: postInfo.id
                }

            }
            const {data} = await axios.request(options);
            console.log(data);
            if(data.message == 'success'){
                setComments(data.comments);
                setNewComment("");
                
            }
        } catch (error) {
            console.log(error);
        }
            
        }

    return (
        <>
        <div className="post-card space-y-5 bg-white p-7 rounded-2xl shadow-xl">
            <header className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
                <img
                src={postInfo.user.photo}
                alt="user"
                className="size-12 rounded-full"
                />
                <div className="">
                <h3 className="font-semibold">{postInfo.user.name}</h3>
                <time className="block text-sm text-gray-600 -m-1 cursor-pointer">
                    <Link to={`/post/${postInfo.id}`}>
                    {new Date(postInfo.createdAt).toLocaleString()}
                    </Link>
                </time>
                </div>
            </div>
                <DropDown option1={"Edit Post"} option2={"Delete Post"} />
            </header>

            <figure className="post-info">
            <figcaption className="mb-4 text-gray-700">
                {postInfo.body}
            </figcaption>
            {postInfo.image && (
                <div className="-mx-7">
                <img
                    src={postInfo.image}
                    alt="post"
                    className="w-full h-120 object-cover object-center"
                />
                </div>
            )}
            </figure>

            <div className="reactions flex justify-between items-center text-gray-600">
            <div className="flex items-center gap-2">
                <div className="icons space-x-1 *:cursor-pointer *:hover:scale-110 *:transition-transform *:duration-200 flex items-center *:size-6 *:flex *:justify-center *:items-center *:rounded-full">
                <div className="icon bg-blue-500 text-white text-sm">
                    <FontAwesomeIcon icon={faThumbsUp} />
                </div>
                <div className="icon  bg-red-500 text-white text-sm">
                    <FontAwesomeIcon icon={faHeart} />
                </div>
                </div>
                <span>0 likes</span>
            </div>
            <span>{comments.length} comments</span>
            </div>

            <div className="action-btns -mx-7 flex items-center *:grow text-lg text-gray-700 *:cursor-pointer border-y border-gray-400/30 py-3">
            <button className="hover:text-blue-500 transition-colors duration-200 hover:scale-105 ">
                <FontAwesomeIcon icon={faThumbUpRegular} />
                <span>Like</span>
            </button>
            <button
                onClick={() => {
                    commentInputRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    });
                    commentInputRef.current?.focus();
                }}
                className="hover:text-green-700 transition-colors duration-200 hover:scale-105 ">
                <FontAwesomeIcon icon={faComment} />
                <span>Comment</span>
            </button>
            <button className="hover:text-red-600 transition-colors duration-200 hover:scale-105 ">
                <FontAwesomeIcon icon={faShare} />
                <span>Share</span>
            </button>
            </div>

            {/* ADD COMMENT */}
            <div className="flex items-start gap-1 pt-4">
            <img
                src={postInfo.user.photo}
                alt="user"
                className="size-10 rounded-full mt-1"
            />
            <form className="w-full" onSubmit={addComment}>
            <div className="grow relative">
                <input
                type="text"
                ref={commentInputRef}
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-gray-100 rounded-full px-5 pr-15 py-3 outline-none focus:bg-gray-200 transition"
                />

                {newComment && (
                <button
                    type="submit"
                    className=" cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 font-semibold hover:scale-105 transition"
                >
                    Post
                </button>
                )}
            </div>
            </form>
            </div>


            <div className="comments ">
            {comments.length > 0 ? (
                <>
                <div className="all-comments space-y-3">
                    {comments.slice(0, commentsLimit).map((comment) => (
                    <CommentCard key={comment._id} commentInfo={comment} />
                    ))}
                </div>
                {comments.length > commentsLimit && (
                    <Link
                    to={`/post/${postInfo.id}`}
                    className=" text-gray-600 cursor-pointer border-b-2 border-transparent hover:border-gray-500 transition-colors duration-200  mt-7"
                >
                    Show all comments ({comments.length - commentsLimit})
                </Link>
                )}
                </>
            ) : (
                <div>
                <p className="text-center py-2 text-gray-700">
                    No comments yet. Be the first to comment!
                </p>
                </div>
            )}
            </div>
        </div>
        </>
    );
}
