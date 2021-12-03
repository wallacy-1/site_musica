<?php 
$id = $_GET['id'];
$nome_msc = $_GET['nomemsc'];
$comando = $_GET['comando']; // subi musica ou descer ela/ 1 subir 2 descer

include 'conexao.php';
if($comando == 1){  // subir a ordem
    $query1 = "SELECT ordem FROM musicas WHERE ordem < $id ORDER BY ordem DESC;";
} else{
    $query1 = "SELECT ordem FROM musicas WHERE ordem > $id;";
}   
    // pegar alvo
    $linha = mysqli_query($conn, $query1);
    $linha = mysqli_fetch_array($linha);
    $alvo = $linha[0];

    // mudar 
    $mysqlq = "UPDATE musicas SET ordem = $id WHERE ordem = $alvo;";
    $mysqlq2 = "UPDATE musicas SET ordem = $alvo WHERE nome_msc = '$nome_msc';";
    
    if(mysqli_query($conn, $mysqlq) AND mysqli_query($conn, $mysqlq2)){
        mysqli_close($conn);
        //echo("alvo: ".$alvo. " id:".$id." linha:".$linha[0]);
        echo('<script>window.location.href="musicas.php" </script>');
    }else{
        echo "erro mysql: " . mysqli_error($conn);
    }
?>