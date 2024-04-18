import PostItem from "./PostItem";

export default function PostList({ remove, posts, title }) {
  if (posts.length === 0) {
    return <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {posts.map((post, index) => (
        <PostItem
          key={post.id}
          remove={remove}
          post={post}
          number={index + 1}
        ></PostItem>
      ))}
    </div>
  );
}
