import "./rightbar.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const Rightbar = () => {
  const { currentUser } = useContext(AuthContext);

  const { data: topPosts, isLoading, error } = useQuery({
    queryKey: ["topLikedPosts"],
    queryFn: async () => {
      const res = await makeRequest.get("/posts/top-liked");
      return res.data;
    },
  });

  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>🔥 Trending Now</span>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error fetching top posts.</p>
          ) : (
            topPosts?.slice(0, 5).map((post) => (
              <div className="user" key={post.id}>
                <hr />
                <div className="userInfo">
                  <img
                    src={`https://api.dicebear.com/9.x/bottts/svg?seed=${post.username}`}
                    alt="user"
                  />
                  <Link
                    to={`/profile/${post.username}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span>{post.username}</span>
                  </Link>
                </div>
                <div className="userPost">
                  <Link
                    to={`/post/${post.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p>{post.description.slice(0, 100)}</p>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Rightbar;

// import "./rightbar.scss";
// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";

// const Rightbar=()=>{

//     const { currentUser } = useContext(AuthContext);

//     return(
//         <div className="rightbar">
//             <div className="container">
//                 <div className="item">
//                     <span>Recent Posts</span>
//                     <div className="user">
//                     <hr/>
//                         <div className="userInfo">
//                         <img src="https://i.pravatar.cc/30" alt="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"/>
//                         <span>Random User</span>
//                         </div>
//                         <div className="userPost">
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nesciunt tempora sint id ipsa mollitia, laborum repudiandae atque impedit vitae.</p>
//                         </div>
//                     </div>
//                     <div className="user">
//                     <hr/>
//                         <div className="userInfo">
//                         <img src="https://i.pravatar.cc/30" alt="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"/>
//                         <span>Random User</span>
//                         </div>
//                         <div className="userPost">
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nesciunt tempora sint id ipsa mollitia, laborum repudiandae atque impedit vitae.</p>
//                         </div>
//                     </div>
//                     <div className="user">
//                     <hr/>
//                         <div className="userInfo">
//                         <img src="https://i.pravatar.cc/30" alt="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"/>
//                         <span>Random User</span>
//                         </div>
//                         <div className="userPost">
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nesciunt tempora sint id ipsa mollitia, laborum repudiandae atque impedit vitae.</p>
//                         </div>
//                     </div>
//                     <div className="user">
//                     <hr/>
//                         <div className="userInfo">
//                         <img src="https://i.pravatar.cc/30" alt="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"/>
//                         <span>Random User</span>
//                         </div>
//                         <div className="userPost">
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nesciunt tempora sint id ipsa mollitia, laborum repudiandae atque impedit vitae.</p>
//                         </div>
//                     </div>
//                     <div className="user">
//                     <hr/>
//                         <div className="userInfo">
//                         <img src="https://i.pravatar.cc/30" alt="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"/>
//                         <span>Random User</span>
//                         </div>
//                         <div className="userPost">
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nesciunt tempora sint id ipsa mollitia, laborum repudiandae atque impedit vitae.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Rightbar;