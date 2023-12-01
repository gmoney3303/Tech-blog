document.addEventListener('DOMContentLoaded', () => {
  const newForm = document.querySelector('#newPostForm');

  const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const content = document.querySelector('#postContent').value.trim();

    if (title && content) {
      try {
        const response = await fetch('/create-post', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Handle successful post creation if needed
          
        } else {
          throw new Error('Failed to create post');
        }
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post');
      }
    }
  };

  if (newForm) {
    newForm.addEventListener('submit', newFormHandler);
  } else {
    console.error('Form not found.');
  }
});

document.querySelectorAll('.deleteBtn').forEach((button) => {
  button.addEventListener('click', async (event) => {
    const postId = event.target.dataset.id;

    try {
      const response = await fetch(`/post/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion
        console.log('Post deleted successfully');
        // Remove the deleted post from the UI
        event.target.closest('.row').remove(); // Remove the entire post container
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error.message);
      // Implement appropriate error handling
    }
  });
});

const commentForm = document.querySelector('#commentForm');

if (commentForm) {
  commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Ensure that the element exists before accessing its value
    const postIdElement = document.querySelector('#postsId');
    if (postIdElement) {
      const postId = postIdElement.value;

      const commentContent = document.querySelector('#commentContent').value.trim();

      try {
        const response = await fetch(`/post/${postId}/comments`, {
          method: 'POST',
          body: JSON.stringify({ content: commentContent }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const newComment = await response.json();
          // Assuming newComment contains the newly added comment data

          // Render the new comment under the respective post
          const commentsSection = document.querySelector('.comments-section ul');
          const newCommentElement = document.createElement('li');

          // Assuming your comment model has fields like content, commenter, createdAt, etc.
          newCommentElement.innerHTML = `
            <p>${newComment.content}</p>
            <p>By: ${newComment.commenter}</p>
            <p>Date: ${newComment.createdAt}</p>
          `;

          commentsSection.appendChild(newCommentElement); // Append the new comment to the existing comments list

          // Clear the comment textarea after successful submission
          document.querySelector('#commentContent').value = '';
        } else {
          throw new Error('Failed to add comment');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        // Implement appropriate error handling
      }
    } else {
      console.error('Post ID input element not found.');
    }
  });
} else {
  console.error('Comment form not found.');
}

  
