import { Link } from "react-router-dom";
import "./post.scss";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext"; // assuming this
import { useContext } from "react";
import { useEffect, useState } from "react"; // add useEffect, useState

const Post=({post})=>{

    const { data: likeCountData } = useQuery({
        queryKey: ["likeCount", post.id],
        queryFn: async () => {
            const res = await makeRequest.get(`/likes/count/${post.id}`);
            return res.data;
        }
    });
    const queryClient = useQueryClient();
    const { currentUser } = useContext(AuthContext); // needed for userId check

    const { data: hasLiked, refetch: refetchHasLiked } = useQuery({
        queryKey: ["hasLiked", post.id],
        queryFn: async () => {
            const res = await makeRequest.get(`/likes?postId=${post.id}`);
            return res.data;
        }
    });

    const likeMutation = useMutation({
    mutationFn: () => makeRequest.post("/likes", { postId: post.id }),
    onSuccess: () => {
        queryClient.invalidateQueries(["likeCount", post.id]);
        refetchHasLiked();
    },
    });

    const unlikeMutation = useMutation({
    mutationFn: () => makeRequest.delete(`/likes/${post.id}`),
    onSuccess: () => {
        queryClient.invalidateQueries(["likeCount", post.id]);
        refetchHasLiked();
    },
    });

    const [isLiked, setIsLiked] = useState(false);

        useEffect(() => {
        if (typeof hasLiked === "boolean") {
            setIsLiked(hasLiked);
        }
        }, [hasLiked]);

        const handleLike = () => {
        if (isLiked) {
            unlikeMutation.mutate();
        } else {
            likeMutation.mutate();
        }
        setIsLiked(prev => !prev); // Toggle UI instantly
        };

    return(
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                    
                        <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${post.username}`} alt=""/>
                        <Link
                            to={`/profile/${post.username}`} style={{textDecoration:"none", color:"inherit"}}>
                            <span>{post.username}</span>
                        </Link>
                    </div>
                </div>
                <div className="content">
                    <span>{post.title}</span>
                    <p>{post.description}</p>
                </div>
                <div className="info">
                    <div className="likes">
                         <ThumbUpIcon
                            onClick={handleLike}
                            style={{
                                cursor: "pointer",
                                color: isLiked ? "rgb(255, 85, 113)" : "black"
                            }}
                         />
                            <span>{likeCountData?.count || 0}</span>
                         {/* <ThumbDownIcon /> */}
                    </div>
                    <div className="comments">
                        <CommentIcon/> 
                        <Link
                            to={`/post/${post.id}`} style={{textDecoration:"none", color:"inherit"}}>
                            <span>Comment</span>
                        </Link>
                    </div>
                    <div className="share">
                        <ShareIcon/>
                        <span>Share</span>
                    </div>
                </div>
            </div>
            <hr/>
            
        </div>
    )
}

export default Post;
