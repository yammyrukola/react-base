# Общие понятия React

**Компоненты** - элементы интерфейса, реакт позволяет удобным образом декомпозировать интерфейс на отдельные компоненты. Компоненты обычно описываются в JSX нотации в отдельных файлах в расширениями JSX.
В данном проекте все компоненты хранятся в папке components

**Функциональный компонент** - это функция возвращающая JSX

**Классовые компоненты** - это устаревший подход создания компонентов, основанный на классах и их методах. (constructor, render, this.state, постоянное использование bind)

**Двусторонне связывание** - связывание состояния со значением в инпуте (при перерисовке берется из состояния, при изменении вызывается коллбэк изменяющий состояние)
**Управляемые компонеты** - компоненты которые можно изменять изменяя связанное с ними состояние.

```jsx
<imput value={value} onChange={(e) => setValue(e.target.value)} />
```

## Особенности синтаксиса JSX

- **className** (вместо class)

```jsx
<div className="post"></div>
<div className={styles.postStyle}></div> // если используется выражение кавычки не ставятся
```

**Инлайновый импорт CSS** при использовании сборщиков активно применяют внедрение CSS прямо в код HTML инлайново, для этого необходимо просто добавить import 'path/to/css-file' например в App.jsx после чего сборщик внедрит стиль инлайново.

**Интерполяция** в JSX активно используется интерполяция. Когда в JSX разметку требуется вставить код на JS используются {} если требуется вставить объект то соответственно {{}}

**props** - пропсы это имя переменной используемое по соглашению для передачи данных в компоненты для того, чтобы сделать их динамическими.

**Создание в JSX списков компонетов из массивов**

```jsx
// подготовка данных для последующего рендеринга
const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript 1', body: 'Description' },
    { id: 2, title: 'JavaScript 2', body: 'Description' },
    { id: 3, title: 'JavaScript 3', body: 'Description' },
  ]);

  ...

// маппинг данных на компоненты. Реакт автоматически объединяет массив в единую строку с JSX (не забываем про key)
{posts.map(post => <PostItem key={post.id} post={post}></PostItem>)}
```

При создании массивов для выполения React работы по оптимизации ренедеринга он требует указывать для всех элементов создаваемых из массива свойство key содержащее уникальных идентификтор.

**Инлайновые стили в JSX**
Для вставки инлайнового стиля в JSX используется следующая конструкция:

```jsx
<h1 style={{ textAlign: "center" }}>Список постов</h1>
```

Стиль вставляется в виде объекта со свойствами соответствующими именам свойств, поэтому для имена свойств задаются в camalCase

**{props.children} пропс children, разворачивание ...props, передача полей типа disabled**

> :warning: запись {props.children}

размещенная в рендере компонента передает на рендер все вложение этого компонента заданное непосредственно при применении компонента в JSX
В параметрах функционального компонента записывают

```jsx
({ children, ...props });
```

> :warning: ...otherProps

Это позволяет выделить отдельно необходимый пропс children, а все оставшиеся переданные props свойства собрать в объект props или например можно развать его ...othersProps. Данный объект в дальнейшем можно или дестуктурировать для использования или передать в виде пропсов в другой вложенный компонент предаварительно разложив его ...spred оператором. например

```jsx
<SomeInnerComponent {...otherProps}>content</SomeInnerComponent>
```

> :warning: disabled и другие подобные поля

Это очень удобно для передачи стандартных свойств типа disabled для button, это будет выглядеть так.

```jsx
// передача параметра disabled
<MyButton disabled>Создать пост</MyButton>;

// использование параметра disabled и других стандартных
export default function MyButton({ children, ...props }) {
  return (
    <button className={classes.myBtn} {...props}>
      {children}
    </button>
  );
}
```

---

## Два подхода к обработке событий в React

1. **Через управляемые компоненты useState**
   Используя двойное связывание и useState
2. **Через неуправляемые компонеты useRef**
   Смотри описание Хука useRef
   В этом случае DOM элемент сам выполняет роль стейта
   В этом случае, если ссылка передается в кастомный компонент, то требуется использовать обертку useRef.

## Объединение нескольких стейтвов в один стейт объект и его изменение

Например заменям два стейта одним:
// const [title, setTitle] = useState('');
// const [body, setBody] = useState('');

```jsx
// инициализируем объект в случае необходимости
const [post, setPost] = useState({ title: "", body: "" });

...

// изменения в объекте стейта делаются пересборкой объекта с точечным затиранием требуемого свойства
postSet({...post, title: e.target.value})
```

## Передача колбека для изменения стейта вниз по иерарахии

Т.к. передача пропса процесс однонаправленный, то если надо изменить стейт вышестоящего компонента, то вместо передачи новых пропсов вверх, что невозможно, нужно передать в нижестоящие компоненты callback который будет вызываться этими компонентами и будет менять стейт вышестоящего компонента.

## Изменение массивов в React

    - добавление нового элемента:
      **setPosts([posts, ...]);**
    - удаление элемента:
      **setPosts(posts.filter(p => p.id !== post.id));**
    - сортировка (немутабельная c предварительным копированием массива):
      **setPosts([...posts].sort((a, b) => a[sort].localCompare(b[sort])))**

## Условная отрисовка:

пример:

```jsx
{
  posts.length ? (
    <PostList remove={removePost} posts={posts} title="Список постов" />
  ) : (
    <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>
  );
}
```

## Сортировка

```js
const getSortedPosts = () => {
  console.log("Отработала getSortedPosts"); // для наглядности работы useMemo
  if (selectedSort) {
    return [...posts].sort((a, b) =>
      a[selectedSort].localeCompare(b[selectedSort])
    );
  }
  return posts;
};

const sortedPosts = useMemo(getSortedPosts, [selectedSort, posts]);
```

## Фильтрация

```js
const sortedAndSearchPosts = useMemo(() => {
  return sortedPosts.filter(
    (post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()),
    [searchQuery, sortedPosts]
  );
});
```

## Модальные окна в реакте

:warning: рассмотрен вариант работы с модификтором active в module css
через использование массива с классами и их объединение

```jsx
const rootClasses = [cl.myModal];
if (visible) {
  rootClasses.push(cl.active);
}

<div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
```

:warning: для модальных окон так же может быть интересен метод **event.stopPropagation()** чтобы предотвратить обработку клика по контентной области которая приводит к закрытию окна.

## React Transiton Group (устаревшая библиотека использует задепрекейчунную работу со ссылками)

(React Transiton Group)[https://reactcommunity.org/react-transition-group/]
Позволяет легко:

- анимировать списки
- отслеживать фазы анимации

> :warning: Наверное еще одной полезной библиотекой будет **tostify**

```bash
# npm
npm install react-transition-group
```

Стилизация элементов происходит через задание особых имен классам отражающих жизненный цикл компонентов:
т.е. библиотека дает классы которые автоматически привязываются к появлению или удалению элемента
остается изменить эти классы

> :warning: item в стилях ниже заменяем на класс требуемого элемента (в нашем случае post)

**Исходный CSS**

```css
.item-enter {
  opacity: 0;
}
.item-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}
.item-exit {
  opacity: 1;
}
.item-exit-active {
  opacity: 0;
  transition: opacity 500ms ease-in;
}
```

Пример изменений

**Модифицированный CSS**

```css
.post-enter {
  transform: translate(-350px);
}
.post-enter-active {
  transform: translateX(0);
  transition: all 500ms ease-in;
}
.post-exit {
  opacity: 1;
}
.post-exit-active {
  transform: translateX(-350px);
  transition: all 500ms ease-in;
}
```

## Кастомные хуки и декомпозиция

> :warning: - кастомные хуки являются важной часть профессионального применения React
> позволяя декомпозировать код они имеют ряд особенностей при описании которые трудно формализовать в тексте
> проще использовать примеры и общие знания JS

Для кастомных хуков удобно создать отдельную папку hooks.
смотри **hooks.md**
Особенность хуков заключается в написании, они возвращают функции с замыканиями которые содержат внутри логику вызовов стандартных хуков и параметров.
А сама возвращаемая функция вызываясь возвращает различные требуемые данные значения.
**По сути это фабрики функий**

## jsonplaceholder - сервер данных для pet to-do projects

Использование сервера фейковых данных (**jsonplaceholder**) - удобно использовать для реализации пет тудушек
(jsonplaceholder)[https://jsonplaceholder.typicode.com/]

**Routes** - All HTTP methods are supported. You can use http or https for your requests.

- GET /posts
- GET /posts/1
- GET /posts/1/comments
- GET /comments?postId=1
- POST /posts
- PUT /posts/1
- PATCH /posts/1
- DELETE /posts/1

## Использование AXIOS для выполенения запросов

```bash
  pnpm i -E axios
```

Получаем список постов с сервера:

```js
async function fetchPosts() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  setPosts(response.data);
}
```

## Жизненный цикл компонента: mount -> update -> unmount

- Фаза **mount** - используется для подгрузки данных и навешивание событий.
- Фаза **update** - это основная фааз когда компонент отрабатывает свою логику и изменяется
- Фаза **unmout** - очистка (отписка от событий, очистка глобального стейта и стораджей, закрытие соединений с БД и т.п.)

реализуется с помощью **useEffect(callback, deps)**

В таком виде функция хук помещенный в App.js будет вызывать загрузку данных один раз для инициализаии списка постов.

```js
useEffect(() => {
  fetchPosts();
}, []);
```

## Спинер загрузки постов

Создаем стейт для статуса загрузки постов

```js
const [isPostLoading, setIsPostLoading] = useState(false);
```

изменяем стейт в зависимости от стадии выполнения загрузки

```js
async function fetchPosts() {
  // проведена декомпозиция запрос к серверу вынесен в отдельный класс что упрощает чтение основного кода
  setIsPostLoading(true);
  const data = await PostService.getAll();
  setPosts(data);
  setIsPostLoading(false);
}
```

ставим крутилку в разметку в зависимости от состояния загрузки

```html
<div>
  <PostFilter filter="{filter}" setFilter="{setFilter}" />
  {isPostLoading ?
  <h1>Идет загрузка постов...</h1>
  :
  <PostList
    remove="{removePost}"
    posts="{sortedAndSearchedPosts}"
    title="Список постов"
  />
  }
</div>
```

**компонент Loader**

```js
import styles from './Loader.module.css'
export default function Loader() {
  return (
    <div className={styles.loader}>
    </div>
  )
```

**слили для крутилки**

```css
.loader {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px dashed teal;
  animation: rotate 1s infinite linear;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.2);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
```

## Реализация пагинации (utils/pages.js + \_limit + \_page + x-total-count)

Добавим в запрос параметры **\_limit** и **\_page**
А так же будем считывать **x-total-count**

```js
const response = await axios.get(
  "https://jsonplaceholder.typicode.com/posts?",
  {
    params: {
      _limit: limit,
      _page: page,
    },
  }
);
```

:warning: можно и просто захаркодить параметры прямо в адрес, но так более читабильно

Пагинацию удобно вынести в отдельную функцию **utils/pages.js**

## React Router

```bash
pnpm i -E react-router-dom
```

**\pages** - будет содержать компоненты страницы
\pages\
 \posts
\about
\error

> :warning: Можно обратить внимание, что есть общий элемент для всех страниц, а именно <Navbar />

App.jsx

```jsx
...
<BrowserRouter>
  <Navbar />
  <AppRouter />
</BrowserRouter>
...
//все роуты можно вынести в отдельный компонент из App
```

**Компонент роутера с проверкой авторизации**
AppRouter.jsx

```jsx
export default function AppRouter() {
  const isAuth = false;
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<Navigate to="/posts" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
```

Routes/index.jsx

```jsx
export const privateRoutes = [
  { path: "/", element: <Posts /> },
  { path: "/about", element: <About /> },
  { path: "/posts", element: <Posts /> },
  { path: "/posts/:id", element: <PostIdPage /> },
];

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/error", element: <Error /> },
  { path: "*", element: <Navigate to="/error" /> },
];
```

> :warning: В конечной реализации в примере компонет <Routers> и его содержимое вынесены в отдельный кастомный компонент.

динамическая адресация с помощью роутере версии v6 делается с помощью хука

```jsx
import { useNavigate } from "react-router-dom";
...
navigate = useNavigate();
...
<MyButton onClick={() => navigate(`/posts/${post.id}`)}>
  Открыть
</MyButton>
...
```

### Пример комонента использующего параметры для динамической маршрутизации

```jsx
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
          {post.id} {post.title}
        </div>
      )}
      <h2>Комментарии:</h2>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {" "}
          {comments.map((comment) => (
            <div style={{ marginTop: 15 }}>
              <h4>{comment.email}</h4>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
```

## Авторизации пользователя и LocalStorage

App.jsx (инициализируем первый раз isAuth при загрузке приложения)

```js
useEffect(() => {
  if (localStorage.getItem("auth")) {
    setIsAuth(true);
  }
}, []);
```

Login.jsx (Добавим сохранение значения в LocalStorage)

```jsx
const login = (event) => {
  event.preventDefault();
  setIsAuth(true);
  localStorage.setItem("auth", "true");
};
```

Navbar.jsx (Добавим функцию для логаута)

```jsx
const logout = () => {
  setIsAuth(false);
  localStorage.removeItem("auth");
};
```

## Учитываем асинхронность загрузки состояния авторизации с сервера управление редиректом с помощью состояний

Чтобы предотвратить раннее срабатывание редиректа, еще до того как загружена информация о состоянии авторизации сервера можно использовать различные подходы. Здесь рассмотрен подход с использованием состояний.

- заводим состояние загрузки по умолчанию true.
- устанавливаем его false после инициализации isAuth в useEffect
- помещаем значение isLoading в context

```jsx
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

 <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading,
    }}>
```

В AppRouter.jsx обрабатываем состояние isLoading отображая Spinner
После первой отрисовки будет вызван useEffect который осущсвит авторизацию и изменит значение isLoading

```jsx
if (isLoading) {
  return <Loader />;
}
```
