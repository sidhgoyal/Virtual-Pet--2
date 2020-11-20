var database ,dog,dog1,dog2;
var position;
//var form;
var feed,add;
var foodobject;
var Feedtime;
var Lastfeed;
var back;
var dogName;
var form;
var gameState = 1;
//Create variables here

function preload()

{
  dogimg1 = loadImage("dog1.png");
  dogimg2 = loadImage("HappyDog.png");
  
  back = loadImage("back.jpg");
  
}

function setup() {
	createCanvas(700, 400);
  database = firebase.database();
  console.log(database);
  
  foodobject=new Food();
  dog = createSprite(600,300,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2

  
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED MAC MILK")
  feed.position(580,400)
  feed.mousePressed(FeedDog)
  feed.mouseReleased(function(){
    dog.addImage(dogimg1);
    
  })
  add = createButton("ADD FOOD")
  add.position(730,400)
  add.mousePressed(AddFood)


} 

function draw(){
 background(back);

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);


 fedtime=database.ref('FeedTime')
 fedtime.on("value",function(data){ Lastfeed=data.val(); });

textSize(20)

 if(Lastfeed>=12)
 {
   text("Last Fed : " + Lastfeed%12 + " pm", 20,50);

 }else if(Lastfeed ===0 ){
   
   text("Last Fed : 12 am" , 20,50)

 }else{

   text("Last Fed :" + Lastfeed + "am", 20,50);

 }

  

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(position){
  if(position>0){
    position=position-1
  }
  else{
    position=0
  }
  database.ref('/').set({
    'Food': position
  })

}
function AddFood(){
  if(gameState ===1 ){
  position++
  database.ref('/').update({
  Food:position
}

)
}
}
function FeedDog(){
if(gameState ===1){
dog.addImage(dogimg2)

foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
 
}
}