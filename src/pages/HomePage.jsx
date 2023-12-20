import { useEffect, useState } from "react";
import databaseService from "../appwrite/conf";
import { Container, PostCard } from "../components/index";

function HomePage() {
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    databaseService.getAllPost().then((posts) => {
      if (posts) {
        setAllPost(posts.documents);
      }
    });
  }, []);

  
  if (allPost.length === 0) {

    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts!!
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {allPost.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...allPost} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
