import { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

export default function PostForm({ create }) {
  // заменяем множество стейтов одним сейтом объктом post
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = { ...post, id: crypto.randomUUID() };
    create(newPost);
    setPost({ title: "", body: "" });
  };

  return (
    <form>
      {/* Управляемые компоненты с двойным связыванием + особенности изменения комплексного стейта в виде объекта*/}
      <MyInput
        type="text"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder=" Название поста"
      />
      <MyInput
        type="text"
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        placeholder="Описание поста"
      />
      {/* Пример неуправляемого компонента useRef + forwardRef в самом компонента*/}
      {/* <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" /> */}
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
}
