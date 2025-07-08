import { useParams } from "react-router-dom";
import "./profile.scss";
import Post from "../../components/post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Profile = () => {
  const { username } = useParams();

  // Fetch user details
  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      const res = await makeRequest.get(`/users/${username}`);
      return res.data;
    },
  });

  // Fetch posts by user
  const { data: userPosts, isLoading: postLoading, error: postError } = useQuery({
    queryKey: ["userPosts", username],
    queryFn: async () => {
      const res = await makeRequest.get(`/posts/user/${username}`);
      return res.data;
    },
  });

  if (userLoading || postLoading) return <p>Loading profile...</p>;
  if (userError || postError) return <p>Error loading profile.</p>;

  return (
    <div className="profile">
      <div className="container">
        <div className="profileDetails">
          <div className="image">
            <img
              src={`https://api.dicebear.com/9.x/bottts/svg?seed=${username}`}
              alt="profile"
            />
          </div>
          <div className="details">
            <h2>{user.username}</h2>
            {/* <p>{user.bio || "This user hasn't written a bio yet."}</p> */}
          </div>
          <div className="btn">
            <button>Follow</button>
            <button>Chat</button>
          </div>
          <hr />
        </div>

        <div className="postsContainer">
          {userPosts.length === 0 ? (
            <p>This user hasn’t posted anything yet.</p>
          ) : (
            userPosts.map((post) => <Post post={post} key={post.id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;