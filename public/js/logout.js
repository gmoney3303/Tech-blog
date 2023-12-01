document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.querySelector('#logout');
  
  const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };

  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  } else {
    console.error('Logout button not found.');
  }
});

document.querySelector('#logout').addEventListener('click', logout);

