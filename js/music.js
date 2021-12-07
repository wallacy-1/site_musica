//pick musics names
let musicas = localStorage.getItem('musicas') === null ? "musicateste@/$" : localStorage.getItem('musicas');
musicas = musicas.split("@/$");

musicas.pop(); // remover ultimo elemento vazio

const  audio = document.getElementById("audio");
// usaremos dps
let mscOrdem = 0; // ordem da musica baseado no array, começa do 0 
let mscTamanho = musicas.length - 1;

function proxMusica() {
    if (mscOrdem >= mscTamanho) {
        mscOrdem = 0;
    } else {
        mscOrdem = mscOrdem + 1;
    }
}

function colocarNovaMsc() {
    song.src = "audio/" + musicas[mscOrdem] + ".mp3";
    audio.load();
    audio.play();
    // mudar img
    //document.getElementById("img-musica").src= mscfoto[mscOrdem];
    // nome da musica
    document.getElementById("nome-msc").innerHTML = '<p id="titulo-msc">' + musicas[mscOrdem] + '</p>';
}

document.querySelector("#voltar-musica").addEventListener("click", () => {
    if (mscOrdem > 0) {
        mscOrdem = mscOrdem - 1;
    }
    colocarNovaMsc();
});


document.querySelector("#play-musica").addEventListener("click", () => {
    //document.getElementById("img-musica").src= musicas[mscOrdem] + ".png"; // colocar img da musica
    document.getElementById("nome-msc").innerHTML = '<p id="titulo-msc">' + musicas[mscOrdem] + '</p>'; // nome da musica
    let source = '<source id="song" src="audio/' + musicas[mscOrdem] + '.mp3" type="audio/mp3">';
    document.getElementById("audio").innerHTML = source;

    // agr rodar musica
    audio.play();

    // sair o play e aparecer o pausar
    document.getElementById("play-musica").style.display = "none";
    document.getElementById("stop-musica").style.display = "inline-block";
})

document.querySelector("#stop-musica").addEventListener("click", () => {
    audio.pause();
    document.getElementById("play-musica").style.display = "inline-block";
    document.getElementById("stop-musica").style.display = "none";
})

document.querySelector("#avancar-musica").addEventListener("click", () => {
    proxMusica();
    colocarNovaMsc();
})

//volume
document.querySelector("#volume-barra").addEventListener("input", () => {
    let volume = document.getElementById("volume-barra").value;
    volume = volume / 100;
    audio.volume = volume;
});

const start = document.querySelector('.start');
const end = document.querySelector('.end');
const progressBar = document.querySelector('.progress-bar');
const now = document.querySelector('.now');

function conversion(value) {
    let minute = Math.floor(value / 60)
    minute = minute.toString().length === 1 ? ('0' + minute) : minute
    let second = Math.round(value % 60)
    second = second.toString().length === 1 ? ('0' + second) : second
    return `${minute}:${second}`
}

audio.onloadedmetadata = function () {  // end = tempo final, duração da musica ex: 7:00
    end.innerHTML = conversion(audio.duration)
    start.innerHTML = conversion(audio.currentTime) //start = onde a musica esta na duração ex 1:02
}

progressBar.addEventListener('click', function (event) { // ao clicar no progress bar 
    let coordStart = this.getBoundingClientRect().left
    let coordEnd = event.pageX
    let p = (coordEnd - coordStart) / this.offsetWidth
    now.style.width = p.toFixed(3) * 100 + '%'

    audio.currentTime = p * audio.duration
    audio.play()
})

setInterval(() => {
    if (audio.currentTime == audio.duration){ // musica chegou no final ?
        if (document.getElementById("loop").checked) { // o loop ta ativado ? se sim inicia a mesma musica dnv
            audio.load();
            audio.play();
        } else {  // senao começar nova musica
            proxMusica();
            colocarNovaMsc();
        }
    }
    start.innerHTML = conversion(audio.currentTime)
    now.style.width = audio.currentTime / audio.duration.toFixed(3) * 100 + '%'
}, 1000)