const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enamble Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRss API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'c2c0736b62864886b14030ac565f10de',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch(error) {
        // Catch errors Here
        console.log('whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
