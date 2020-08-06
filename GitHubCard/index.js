import axios from 'axios';

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/b000rg')
  .then(response => {
    console.log(response);
  });

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

axios.get('https://api.github.com/users/b000rg')
  .then(response => {
    document.querySelector('.cards').appendChild(githubCard(response.data));
  });

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

followersArray.forEach(user => {
  axios.get(`https://api.github.com/users/${user}`)
    .then(response => {
      document.querySelector('.cards').appendChild(githubCard(response.data));
    });
});

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function githubCard(data) {
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.setAttribute('src', data.avatar_url);
  card.appendChild(image);

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
  card.appendChild(cardInfo);

  let name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = data.name;
  cardInfo.appendChild(name);

  let username = document.createElement('p');
  username.classList.add('username');
  username.textContent = data.login;
  cardInfo.appendChild(username);
  
  let location = document.createElement('p');
  location.textContent = `Location: ${data.location}`;
  cardInfo.appendChild(location);

  let profile = document.createElement('p');
  profile.textContent = 'Profile: ';
  
  let profileLink = document.createElement('a');
  profileLink.textContent = data.html_url;
  profileLink.setAttribute('href', data.html_url);
  profile.appendChild(profileLink);
  cardInfo.appendChild(profile);

  let followers = document.createElement('p');
  followers.textContent = `Followers: ${data.followers}`;
  cardInfo.appendChild(followers);

  let following = document.createElement('p');
  following.textContent = `Following: ${data.following}`;
  cardInfo.appendChild(following);

  let bio = document.createElement('p');
  bio.textContent = `Bio: ${data.bio}`;
  cardInfo.appendChild(bio);

  return card;
};

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
