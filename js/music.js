//pick musics names
let musicas = localStorage.getItem('musicas');
musicas = musicas.split("@/$");

let mysong = document.getElementById("mysong");

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
    mysong.load();
    mysong.play();
    // mudar img
    //document.getElementById("img-musica").src= mscfoto[mscOrdem];
    // nome da musica
    document.getElementById("nome-msc").innerHTML = '<p id="titulo-msc">' + musicas[mscOrdem] + '</p>';
}

function tempoMusica() {
    let tempoMsc = mysong.currentTime;
    setTimeout(tempoMusica, 100);
    document.getElementById("progressBar").value = tempoMsc;
    //loop, se a opcao loop estiver ativada e a musica acabou ent
    if (document.getElementById("loop").checked == true && mysong.duration == tempoMsc) {
        mysong.load();
        mysong.play();
    } else if (document.getElementById("loop").checked == false && mysong.duration == tempoMsc) {
        proxMusica();
        colocarNovaMsc();
    }
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
    document.getElementById("mysong").innerHTML = source;

    //valo max para a barra de progresso
    mysong.onloadedmetadata = function () {
        let tempoProgressBar = mysong.duration;
        document.getElementById("progressBar").setAttribute('max', tempoProgressBar);
    }
    // agr rodar musica e o tempo para a barra de progresso
    mysong.play();
    tempoMusica();

    // sair o play e aparecer o pausar
    document.getElementById("play-musica").style.display = "none";
    document.getElementById("stop-musica").style.display = "inline-block";
})

// progress bar position click
document.getElementById('progressBar').addEventListener('click', function (e) {
    var x = e.pageX - this.offsetLeft, // or e.offsetX (less support, though)
    clickedValue = x * this.max / this.offsetWidth;
    mysong.currentTime = clickedValue;
    document.getElementById("progressBar").value = clickedValue;
});

document.querySelector("#stop-musica").addEventListener("click", () => {
    mysong.pause();
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
    mysong.volume = volume;
});
