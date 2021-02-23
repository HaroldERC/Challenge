//saves input's email in a session variable to be used on the next page
function handleSubmit(){
    const email = document.getElementById('email').value;
    sessionStorage.removeItem("EMAIL");
    sessionStorage.setItem("EMAIL", email);
    return;
}