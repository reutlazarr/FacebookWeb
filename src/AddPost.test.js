import { addPost } from './utils/Utils';

describe('addPost', () => {
    it('should add a new post to the posts array', () => {
      const posts = [{ id: 1, content: 'I was here first' }];
      const newPost = { id: 2, content: 'Nice to meet you' };
      const updatedPosts = addPost(posts, newPost);
  
      expect(updatedPosts).toEqual([
        { id: 2, content: 'Nice to meet you' },
        { id: 1, content: 'I was here first' }
      ]);
    });
  });
  