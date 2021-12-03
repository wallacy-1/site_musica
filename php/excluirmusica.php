<?php
$id = $_GET['id'];
$nome = $_GET['nomemsc'];

$query1 ="DELETE FROM musicas WHERE ordem = $id AND nome_msc = '$nome';";

include 'conexao.php';
if(mysqli_query($conn, $query1)){
    mysqli_close($conn);
    echo('<script>window.location.href="musicas.php" </script>');
}else{
    echo "erro mysql: " . mysqli_error($conn);
}
?>