import PostItem from "./PostItem";

export default function PostList({ posts, title }) {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {posts.map((post, index) => (
        <PostItem key={post.id} post={post} number={index + 1}></PostItem>
      ))}
    </div>
  );
}
