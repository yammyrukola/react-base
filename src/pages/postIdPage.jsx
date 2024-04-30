import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../hooks/useFetching";
import PostService from "../components/API/PostService";
import Loader from "../components/UI/loader/Loader";

export default function PostIdPage() {
  const params = useParams();
  console.log({ params });
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  console.log(params);
  return (
    <>
      <h1>Вы открыли страницу поста {params.id}</h1>;
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h3>
            {post.id} {post.title}
          </h3>
          <div style={{ marginBottom: 20 }}>{post.body}</div>
        </div>
      )}
      <h2>Комментарии:</h2>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {" "}
          {comments.map((comment) => (
            <div key={comment.id} style={{ marginTop: 15 }}>
              <h4>{comment.email}</h4>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
