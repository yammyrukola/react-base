import axios from "axios";

export default class PostService {
  static async getAll(limit = 10, page = 0) {
    // обработка ошибок на уровне сервиса не совсем правильно, лучше делать это во внешнем контуре.
    // если сделать ее здесь, то она не будет передана выше, ну или делать throw
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
      params: {
        _limit: limit,
        _page: page,
      }
    });
    return response;
  }

  static async getById(id) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
    return response;
  }

  static async getCommentsByPostId(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/pasts/${id}/comments/`);
    return response;
  }
}
