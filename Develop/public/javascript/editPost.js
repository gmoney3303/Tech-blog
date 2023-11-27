async function editFormHandler(event) {

    event.preventDefault();

    const postTitle = document.querySelector('input[name="post-title"]').value;

    const postContent = document.querySelector('textarea[name="post-content"]').value.trim();

    const postId = window.location.toString().split('/')[

        window.location.toString().split('/').length - 1

    ];

    const response = await fetch (`/api/posts/${postId}`, {

        method: 'PUT',

        body: JSON.stringify({ postTitle, postContent }),

        headers: { 'Content-Type': 'application/json'}

    });

    if (response.ok) {
 
        document.location.replace('/dashboard');

    } else {

        alert(response.statusText);

    }

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);