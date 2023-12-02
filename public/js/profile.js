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
      const post_id = postIdElement.value;

      const content = document.querySelector('#commentContent').value.trim();

      
        await fetch(`/post/${post_id}/comments`, {
          method: 'POST',
          body: JSON.stringify({ post_id, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
      console.log(post_id, content);
    } else {
      console.error('Post ID input element not found.');
    }
  });
} else {
  console.error('Comment form not found.');
}

  
