function imprimirMusicas (){
    let musicas = localStorage.getItem('imgmsc');
    contador = 0;
    let htmlCod = " ";
    musicas = musicas.slice(0,-1);
    musicas = musicas.split("@");
    let ajudante = musicas.length -1;
    while(ajudante >= contador){
        nomeMsc = musicas[contador].split(".")
        htmlCod =htmlCod + '<p> <nav id="caixa-img"><img id="img-musica" src="../img-msc/' + musicas[contador] + '" alt=""></nav> <br>' + nomeMsc[0] + '</p>';
        contador = contador + 1;
    }

    document.getElementById('toda-as-musicas').innerHTML= htmlCod;
}

imprimirMusicas();