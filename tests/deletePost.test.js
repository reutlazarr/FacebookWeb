import { deletePost } from '../utils/Utils';
import '@testing-library/jest-dom';


describe('deletePost', () => {
  it('should remove a post by its ID', () => {
    // Setup - create an array of mock posts
    const posts = [
      { id: 1, content: "Hello World" },
      { id: 2, content: "Second post" },
      { id: 3, content: "Third post" }
    ];
    const postIdToDelete = 2;

    // Exercise - call deletePost
    const updatedPosts = deletePost(posts, postIdToDelete);

    // Verify - make sure the post with id 2 is removed
    expect(updatedPosts).toHaveLength(2);
    expect(updatedPosts.find(post => post.id === postIdToDelete)).toBeUndefined();
  });
});
