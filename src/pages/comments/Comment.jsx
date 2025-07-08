import "./comment.scss";
import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext"; // for currentUser if needed later 


const Comment = () => {
  const { id } = useParams();
  const [showButton, setShowButton] = useState(false);
  const commentRef = useRef(null);
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const { currentUser } = useContext(AuthContext); // if needed for like toggle in future

  // Fetch the post
  const { isLoading: postLoading, data: post, error: postError } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await makeRequest.get(`/posts/${id}`);
      return res.data;
    }
  });

  // Fetch comments
  const { isLoading: commentLoading, data: comments, error: commentError } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await makeRequest.get(`/comments/${id}`);
      return res.data;
    }
  });

  // Add comment mutation
  const mutation = useMutation({
    mutationFn: (newComment) => makeRequest.post("/comments", newComment),
    onSuccess: () => queryClient.invalidateQueries(["comments", id])
  });
  //Fetch like count
    const { data: likeCountData } = useQuery({
    queryKey: ["likeCount", id],
    queryFn: async () => {
      const res = await makeRequest.get(`/likes/count/${id}`);
      return res.data;
    },
  });

  const [isLiked, setIsLiked] = useState(false);
  
const { data: liked, refetch: refetchLiked } = useQuery({
  queryKey: ["liked", id, currentUser?.id],
  queryFn: async () => {
    const res = await makeRequest.get(`/likes/check?postId=${id}`);
    return res.data;
  },
  enabled: !!currentUser,
});

  useEffect(() => {
    if (typeof liked === "boolean") {
      setIsLiked(liked);
    }
  }, [liked]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (commentRef.current && !commentRef.current.contains(e.target)) {
        setShowButton(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

const likeMutation = useMutation({
  mutationFn: async () => {
    if (isLiked) {
      return makeRequest.delete(`/likes/${id}`);
    } else {
      return makeRequest.post(`/likes`, { postId: id });
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["likeCount", id]);
    refetchLiked(); // optional, can be removed
    setIsLiked((prev) => !prev); // toggle immediately
  },
});

  const handleSubmit = () => {
    if (newComment.trim()) {
      mutation.mutate({ postId: id, comment: newComment });
      setNewComment("");
    }
  };

  if (postLoading) return <p>Loading post...</p>;
  if (postError) return <p>Error loading post.</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="comment">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${post.username}`} alt="" />
            <Link to={`/profile/${post.username}`} style={{ textDecoration: "none", color: "inherit" }}>
              <span>{post.username}</span>
            </Link>
          </div>
        </div>
        <div className="content">
          <span>{post.title}</span>
          <p>{post.description}</p>
        </div>
        <div className="info">
          <div className="likes" onClick={() => likeMutation.mutate()} style={{ cursor: "pointer" }}>
            <ThumbUpIcon style={{ color: isLiked ? "rgb(255, 85, 113)" : "black"  }} />
            <span>{likeCountData?.count || 0}</span>
          </div>
          <div className="share">
            <ShareIcon />
            <span>Share</span>
          </div>
        </div>
      </div>
      <hr />

      <div className="addComment" ref={commentRef} onClick={() => setShowButton(true)}>
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        {showButton && (
          <button className="submitBtn" onClick={handleSubmit}>Submit</button>
        )}
      </div>

      <div className="comments">
        {commentLoading ? (
          <p>Loading comments...</p>
        ) : commentError ? (
          <p>Error loading comments.</p>
        ) : comments?.length === 0 ? (
          <p></p>
        ) : (
          comments.map((c, i) => (
            <div className="comment" key={i}>
              <div className="userInfo">
                <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${c.username}`} alt="user dp" />
                <p>{c.username}</p>
              </div>
              <div className="text">
                <span>{c.description}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;
