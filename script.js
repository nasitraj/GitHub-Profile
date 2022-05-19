const APIURL = 'https://api.github.com/users/';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


getUser("nasitraj");

async function getUser(user){
    const resp = await fetch(APIURL + user);
    const respData = await resp.json();

    
    createUserCard(respData);

    getRepos(user);
}  

async function getRepos(user){
    const resp = await fetch(APIURL + user + '/repos');
    const respData = await resp.json();

    addRepos(respData);
}

function createUserCard(user){
    if(!user.bio){
        user.bio = 'No Data';
    }
    const cardHTML = `
    <div class="card">
        <div>
            <img class = "avatar" src="${user.avatar_url}" alt="${user.name}" />
        </div>
        <div class = "user_info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <div class ="repos" id="repos"></div>
           
            <h4>Repos:</h4>
            <div class="repos" id="repo"></div>
        </div>
      
        </div>
    `;

    main.innerHTML = cardHTML;
}


    form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const user = search.value;
    if(user){
        getUser(user);

        search.value = "";  
    }
    })

async function addRepos(repos){
     const reposDiv = document.getElementById('repo');
     console.log(repos);
     repos.forEach(repo => {
         const repoa = document.createElement('a');
         repoa.classList.add('repo');

         repoa.href = repo.html_url;
         repoa.innerText = repo.name;
         repoa.target = "_blank";
         console.log(`Add ${repoa}`);
         reposDiv.appendChild(repoa);
         
     });

}