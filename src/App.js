import { useState } from 'react';
import './styles/App.css';
import PostList from './components/PostLits';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript 1', body: 'Description' },
    { id: 2, title: 'JavaScript 2', body: 'Description' },
    { id: 3, title: 'JavaScript 3', body: 'Description' },
  ]);

  // заменяем множество стейтов одним сейтом объктом post
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');
  const [post, setPost] = useState({ title: '', body: '' });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = { id: crypto.randomUUID(), ...post };
    // добавляем посты
    setPosts([...posts, newPost]);
    // setTitle(''); - старый вариант
    // setBody(''); - старый вариант

    // обнуляем поля
    setPost({ title: '', body: '' });
  }

  return (
    <div className="App">
      <form>
        {/* Управляемые компоненты с двойным связыванием + особенности изменения комплексного стейта в виде объекта*/}
        <MyInput type="text" value={post.title} onChange={e => setPost({ ...post, title: e.target.value })} placeholder=" Название поста" />
        <MyInput type="text" value={post.body} onChange={e => setPost({ ...post, body: e.target.value })} placeholder="Описание поста" />
        {/* Пример неуправляемого компонента useRef + forwardRef в самом компонента*/}
        {/* <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" /> */}
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Список постов" />
    </div>
  );
}

export default App;
