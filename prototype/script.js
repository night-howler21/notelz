document.getElementById('loginBtn')?.addEventListener('click', () => {
  console.log('Log In clicked — auth flow not wired up yet.');
});

document.getElementById('signupBtn')?.addEventListener('click', () => {
  console.log('Sign Up clicked — auth flow not wired up yet.');
});

document.querySelectorAll('.nav-tabs a').forEach((tab) => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.nav-tabs a').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
