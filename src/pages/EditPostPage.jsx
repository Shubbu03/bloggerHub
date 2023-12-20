import { useState, useEffect } from "react";
import { Container, PostForm } from "../components/index";
import databaseService from "../appwrite/conf";
import { useNavigate, useParams } from "react-router-dom";

function EditPostPage() {
  const [edited, setEdited] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((editPost) => {
        if (editPost) {
          setEdited(editPost);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);
  return edited ? (
    <div className="py-8">
      <Container>
        <PostForm post={edited} />
      </Container>
    </div>
  ) : null;
}

export default EditPostPage;
