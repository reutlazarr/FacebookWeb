import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Post from '../src/feed_components/Post'; // Adjust the import path as necessary

describe('Post Component', () => {
    it('allows the Like button to be clicked', () => {
      // Mock props including a minimal user object to avoid reading from undefined
      const mockProps = {
        id: '1',
        content: 'Test post content',
        onDelete: jest.fn(),
        userName: 'Test User',
        postDate: '2023-01-01',
        userProfilePicture: '',
        postImage: '',
        user: { name: 'Test User', image: '' },
        isNewPost: true,
        onUpdate: jest.fn(),
      };
  
      const { getByText } = render(<Post {...mockProps} />);
      const likeButton = getByText(/like/i);
      fireEvent.click(likeButton);
  
      // Since this test doesn't check state changes, it's only verifying that clicking doesn't produce errors.
      expect(likeButton).toBeInTheDocument();
    });
  });
