import { useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostLits';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';

function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'ло JavaScript 1', body: 'уа Description' },
    { id: 2, title: 'ав JavaScript 2', body: 'юя Description' },
    { id: 3, title: 'ть JavaScript 3', body: 'ав Description' },
  ]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);

  const getSortedPosts = () => {
    console.log('Отработала getSortedPosts'); // для наглядности работы useMemo
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }

  const sortedPosts = useMemo(getSortedPosts, [filter.sort, posts]);
  const sortedAndSearchPosts = useMemo(
    () => {
      return sortedPosts.filter((post) => post.title.toLowerCase().includes(filter.query.toLowerCase()));
    }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  return (

    <div className="App">
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      {/* <PostForm create={createPost} /> */}
      <hr style={{ margin: '15px 0' }} />
      <div>
        <PostFilter filter={filter} setFilter={setFilter} />
        <PostList remove={removePost} posts={sortedAndSearchPosts} title="Список постов" />
      </div>
    </div >
  );
}

export default App;
