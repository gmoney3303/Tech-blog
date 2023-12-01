document.addEventListener('DOMContentLoaded', () => {
    const deleteForms = document.querySelectorAll('.delete-form');
  
    deleteForms.forEach(form => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const postId = form.getAttribute('action').split('/').pop();
  
        try {
          const response = await fetch(`/api/posts/${postId}/delete`, {
            method: 'POST',
            // Additional configurations (headers, body, etc.) if required
          });
  
          if (response.ok) {
            // Handle successful deletion (remove post from UI, show success message, etc.)
            console.log('Post deleted successfully');
            // Optional: You may want to remove the deleted post from the UI
            form.parentElement.remove(); // Remove the post element from the DOM
          } else {
            throw new Error('Failed to delete post');
          }
        } catch (error) {
          console.error('Error deleting post:', error.message);
          // Implement appropriate error handling (display error message, retry logic, etc.)
        }
      });
    });
  });
  