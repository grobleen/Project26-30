//crear la variable song1 y song2 como cadenas vacias
var song1="";
var song2="";
song1_status = "";
song2_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload()
{
	//cargar a la variabel song1 y song2 sus respectivas canciones 
	var song1=loadSound("music.mp3");
	var song2=loadSound("music2.mp3");
}

function setup() {
	//crear y establecer el tamaño del canvas
	canvas = createCanvas(600,500)
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
	//imprimir en consola el mensaje de PoseNet esta inicializado
console.log("poseNet")  
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	//agregar a image la variable video y las coordenadas iniciales
	image(video, 0, 0, 600, 500);
	
	song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

	fill("#FF0000");
	//establecer stroke con algun color
	stroke("#8700FF");

	if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);
			//detener la cancion 2
			song2.stop();

		if(song1_status == false)
		{
			song1.play();
			document.getElementById("song").innerHTML = "Reproduciendo: Canción I Aint Worried"
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song1.stop();

		if(song2_status == false)
		{
			//iniciar la cancion 2
		song2.play();	
			document.getElementById("song").innerHTML = "Reproduciendo: Canción Perfect"
		}
	}

}

function play()
{
	song.play();
	song.setVolume(1);
	//establecer la cancion 1 con velocidad de 1
	song.play();
	song.setVolume(1);
	song.rate(1);
}