# Стандартные хуки React

Это специальные функции предоставляемые React.

> :warning: Хуки можно использовать только на верхнем уровне вложенности и нельзя помещать в циклы и условные ветки, т.к. хуки должен быть обязательно вызван причем каждый раз в одной и той же последовательности.

## useState - состояние компонента

**Самый базовый хук React** useState используется для хранения состояний компонента между перерисовками, а так же при изменении состояний вызываются процедуры перерисовки компонент React;
Само состояние это массив из двух компонентов: переменной и callback для ее изменения.

> :warning: если установить стейт и сразу его считать, то его значение не изменится, это произойдет только в следующем цикле отрисовки компонентов.

ПРИМЕР:

```js
const [value, setValueCallback] = useState(initalValue);
const [count, setCount] = useState(INIT_COUNT_VALUE);

<input value={value} onChange={(e) => setValue(e.target.value)} />;
```

> :warning: измеенние состояний - это асинхронный процесс и это очень важно учитывать.

Пример:

```js
changePage(page) {
  setPage(page);  // например здесь мы поменяли значение стейта page
  fetchPosts();   // а тут мы подтягиваем посты опираясь внутри реализации на значение стейта page (но он не успел измениться и мы получим в ответе посты со старым значением стейта page, а обновится он только на следующей итерации рендера компонента)
}

// чтобы решить эту проблему можно наримет удалить вызов fetchPosts() из changePage(page) и добавить зависимость page в useEffect делающий fetchPosts()
```

Такой подход сдела для того чтобы сначала накопить все изменения, а потом сделать пересчет иначе выполнение программы содержало бы в себе массу сайд эффектов и множество изменений DOM инициирующих друг друга, накопление же изменений позволяет избежать ненужных вычислений и ускорить отрисовку. Но это является одновременно особенностью и ограничением которое надо учитывать в работе.

## useRef - ссылки на DOM элементы

Позволяет работать не с управляемыми компонентами, а напрямую с DOM элементами. Для этого:

1. С помощью хука cоздается ссылка const newRef = useRef();
2. Ссылка привязывается к компоненту с помощью специального свойства React ref (\<input ref={newRef}\>)
3. Теперь в коде мы можем ссылаться на элемент через ссылку используя свойство current (пр: console.log(newRef.current.value))

> :warning: Встроенные компоненты позволяю использовать ссылку напрямую, т.к. они непосредственно поддерживают свойство ref.
> Если же компонент кастомный, то используется обертка React.forwardRef(...) для передачи ссылки.

```jsx
import { forwardRef } from "react";

export default forwardRef(function MyInput(props, ref) {
  return <input ref={ref} className={classes.myInput} {...props}></input>;
});
```

> :warning: манипуляции напрямую с DOM элементами в React не рекомендуются без особой необходимости.

## useMemo (аналог computed свойств во Vue)

**useMemo(callback, deps)**

- _callback_ - мемоизируемая функция возвращающая результаты вычислений,
- _deps_ - массив зависимостей, при изменении которых делается ревалидация кеша мемоизированного callback.

Рассмотрен на примере отключения сортировки массива постов при каждом изменении строки поиска. В данном случае мемоизация используется, чтобы не изменять sortedPosts при каждом вводе символа в querySearch инпуте.

```js
const sortedPosts = useMemo(() => {
  return [...posts].sort((a, b) => a[sort].localCompare(b[sort]));
}, [selectedSort, posts]);
```

## useEffect - хук для реализации стадий жизненного цикла компонента

**Первичная инициализация (Mount)**

```js
useEffect(callback, []); // т.к. deps = [], то хук отработает только один раз в фазе Mount
```

Пример:

```js
useEffect(() => {
  fetchPosts, [];
}); // т.к. deps = [], то хук отработает только один раз в фазе Mount
```

**Отслеживание изменений в зависимостях (Update)**

```js
useEffect(callback, [deps]); // т.к. deps = [], то хук отработает только один раз в фазе Mount
```

Пример:

```js
useEffect(() => {
  fetchPosts, [filter];
}); // т.к. deps = [], то хук отработает только один раз в фазе Mount
```

**Финальная очистка (Unmount) - производится в возвращаемой функции**

```js
useEffect(() => {
  return () => {
    ... делаем очистку
  }
}, [deps]); // т.к. deps = [], то хук отработает только один раз в фазе Mount
```

Пример:

```js
useEffect(() => {
  () => {
    fetchPosts();

    return () => {
      ... здесь делаем очистку если бы она требовалась
  }, [filter];
}); // т.к. deps = [], то хук отработает только один раз в фазе Mount
```

## useContext(context) - для передачи значения isAuth в различные места программы

1. Создаем контекст
   contex/index.js

```js
import { createContext } from "react";
export const AuthContext = createContext(null);
```

2. Оборачиваем App в провайдер контекста и передаем туда значения

```jsx
const [isAuth, setIsAuth] = useState(false);
return (
  <AuthContext.Provider
    value={{
      isAuth,
      setIsAuth,
    }}
  >
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  </AuthContext.Provider>
);
```

3. Используем контекст с помощью хука
   const { isAuth, setIsAuth } = useContext(AuthContext);

   > :warning: скобки не квадратные, а фигурные (диструктуризация объекта)

4. ...

# Кастомные хуки:

Это хуки которые внутри себя используется стандартные хуки react и так же именуются начиная с use

помещаем в папку hooks
Примеры:

## Хук для реализации фильтрации

принимает - массив сообщений и парметры для сортировки и фильтрации
возвращает - массив с отсортированными и отфильтрованными результатами

**Использование в App.js**

```js
const [filter, setFilter] = useState({ sort: "", query: "" });
const [modal, setModal] = useState(false);
// вставка кастомного хука убирает несколько строчек кода и значительно увеличивает читаемость
const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
```

**hooks/usePosts.js**

```js
import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
};
```

## Хук useFetching

Вызывает асинхронный колбек и пока он выполняется отрисовывает спиннер (лоадер)

```js
export default function useFetching(callback) {
  const [isLoading, setIsLoading] = useState(false);
  // базовый случай обработка ошибки при фетчинге
  const [error, setError] = useState("");

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
}
```

**использование хука**

```js
const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
  const posts = await PostService.getAll();
  setPosts(posts);
});
```

Обработка ошибки возникашей при выполнении хука

```jsx
{
  postError && <h1>Произошла ошибка {postError}</h1>;
}
```

## useObserver - наблюдает за пересечением элемента (для создания бесконечных полос прокрутки)

**реализаия хука**

> :warning: реализация не очевидна сразу

```jsx
export default function useObserver(ref, canLoad, isLoading, callback) {
  const observer = useRef();
  useEffect(() => {
    console.log("use observer");
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    let options = {
      root: null, // по умолчанию (можно и не указывать)
    };
    const cb = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(cb, options);
    observer.current.observe(ref.current);
  }, [isLoading]);
}
```

**Использование хука**

```js
useObserver(lastElement, page < totalPages, isPostsLoading, () => {
  setPage(page + 1);
});
```
