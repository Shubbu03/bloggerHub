import { useState, useEffect } from "react";
import databaseService from "../appwrite/conf";
import { Container, PostCard } from "../components/index";

function AllPostPage() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    databaseService.getAllPost().then((posts) => {
      if (posts) {
        setPost(post.documents);
      }
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {post.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPostPage;
