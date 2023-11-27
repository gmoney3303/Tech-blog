async function newFormHandler(event) {
    
    event.preventDefault();

    const postTitle = document.querySelector('input[name="post-title"]').value;
    
    const postContent = document.querySelector('textarea[name="post-content"]').value.trim();

    const response = await fetch(`/api/posts`, {

        method: 'POST',

        body: JSON.stringify({ postTitle, postContent }),

        headers: {'Content-Type': 'application/json'}

    });

    if (response.ok) {

        document.location.replace('/dashboard');

    } else {

        alert(response.statusText);

    }

}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);