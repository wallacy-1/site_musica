<?php
//v ar_dump($_FILES);
$mscNome = $_POST['msc-nome'];
$target_dir_imagem = "../img/";
$target_dir_audio = "../audio/";

// pegar extensao do arquivo
$imagem_ext = explode(".", $_FILES["msc-imagem"]["name"]);
$imagem_ext = end($imagem_ext);
$audio_ext = explode(".", $_FILES["msc-audio"]["name"]);
$audio_ext = end($audio_ext);
$uploadOk = 1;

//verificar se e uma imagem verdadeira ou falsa
if (isset($_POST["submit"])) {
  $check = getimagesize($_FILES["msc-imagem"]["tmp_name"]);
  if ($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}
// permitir tipos de extensoes

if (
  $imagem_ext != "jpg" && $imagem_ext != "png" && $imagem_ext != "jpeg"
  && $imagem_ext != "gif"
) {
  echo "Apenas JPG, JPEG, PNG e GIF.";
  $uploadOk = 0;
}

if ($audio_ext != "mp3") { // apenas pegar mp3 não outros tipos de audio, no futuro talvez mp4
  echo "Apenas audio mp3";
  $uploadOk = 0;
}
$msc_caminho = array(
  1 => '../img/' . $mscNome . '.' . $imagem_ext, // caminho + nome da img + extensao
  2 => '../audio/' . $mscNome . '.' . $audio_ext,
);

// enviar imagem
if ($uploadOk == 0) {
  echo "erro :(";
} else { // enviar imagem + audio para as pastas
  if (move_uploaded_file($_FILES["msc-imagem"]["tmp_name"], $msc_caminho[1]) && move_uploaded_file($_FILES["msc-audio"]["tmp_name"], $msc_caminho[2])) {
    echo "Deu tudo certo :D";
  }else{
    // mostra msg de erro da img e audio
    echo "erro imagem=" . $_FILES["msc-audio"]["error"];
    echo "erro audio=" . $_FILES["msc-audio"]["error"];
  }

}
?>
<script>
  // local storage para as funcoes do play de msc
  
  let dados_antigos = localStorage.getItem("musicas") === null ? "" : localStorage.getItem("musicas");
  dados = dados_antigos + '<?php echo $mscNome . "@/$" ?>';
  localStorage.setItem("musicas", dados.slice(0, -3)); // remove o ultimo @/$ e cria o localstorage
</script>