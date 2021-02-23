window.addEventListener('load', () => {

    //starts loading animation
    const loadinAnimation = document.querySelector('.loading-animation');

    //email from session to a variable || API link + email in a variable
    const emailRequest = sessionStorage.getItem('EMAIL');
    const api_url = `https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${emailRequest}`;
    
    async function getData() {
        const response = await fetch(api_url)
        .then((resp)=> resp.json())
        .then(function(data){

            function isEmpty(data) {
                for(var key in data) {
                    if(data.hasOwnProperty(key))
                        return false;
                    }
                    return true;
                }

                //if no results show the no result message on html || if result show the requested info
            if(isEmpty(data)){
                setTimeout(() => { 
                    loadinAnimation.parentElement.removeChild(loadinAnimation);
                    document.getElementById('no-result').style.display="flex";
                    document.getElementById('search-again').style.display="block";
                }, 3000);
            } else {
                setTimeout(() => { 
                    loadinAnimation.parentElement.removeChild(loadinAnimation);
                    document.getElementById('main-result').style.display="block";
                    document.getElementById('contact-card').style.display="block";
                    document.getElementById('search-again').style.display="block";
                }, 3000);
                const { email, first_name, last_name,
                description, address,
                phone_numbers, relatives } = data;

                //gets the requested info into the respective places in the html
                document.getElementById('email-person').textContent = email;
                document.getElementById('name').textContent = `${first_name} ${last_name}`;
                document.getElementById('description').textContent = description;
                document.getElementById('address').textContent = address;
                document.getElementById('numbers').textContent = phone_numbers;
                document.getElementById('relatives').textContent = relatives;
            }

            
        })
        .catch(function (error) {
                console.log(error);
            });
    }
    getData();
});