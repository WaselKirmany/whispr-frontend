import "./posts.scss";
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await makeRequest.get("/posts");
      return res.data;
    }
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (error) {
  if (error.response?.status === 401 || error.response?.status === 403) {
    return <div>You must be logged in to see posts</div>;
  }
  return <div>Unexpected error loading posts</div>;
}
  if (!data) return <div>No posts found</div>; // ✅ NEW GUARD

  return (
    <div className="posts">
      {data.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
