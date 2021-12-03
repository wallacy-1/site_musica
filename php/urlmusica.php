<?php

$vid = "FUtW4dDXKDM"; //the youtube video ID
$vformat = "mp4"; //the MIME type of the video. e.g. video/mp4, video/webm, etc.
parse_str(file_get_contents("http://youtube.com/get_video_info?video_id=".$vid),$info); //decode the data
$streams = $info['url_encoded_fmt_stream_map']; //the video's location info
$streams = explode(',',$streams);
foreach($streams as $stream){
parse_str($stream,$data); //decode the stream
if(stripos($data['type'],$vformat) !== false){ //We've found the right stream with the correct format
$video = fopen($data['url'].'&signature='.$data['sig'],'r'); //the video
$file = fopen('video.'.str_replace($vformat,'video/',''),'w');
stream_copy_to_stream($video,$file); //copy it to the file
fclose($video);
fclose($file);
echo 'Youtube Video Download finished! Now check the file.';
break;
}
}

?>