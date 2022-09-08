var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedTheDog;
var foodObj;

//create feed and lastFed variable here
var feed, lastFeed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedTheDog=createButton("Feed The Food");
  feedTheDog.position(200,95);
  feedTheDog.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods); 

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 

  //write code to display text lastFed time here
  if(lastFeed>=12){
    text('last feed:' + hour() + " PM",350,30);
  } else if(lastFeed == 0){
    text('last feed: 12 AM',350,30);
  }else{
    text('last feed:' + hour() + " AM",350,30);
  }
 
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  feedTheDog.scale = 0.5
  //write code here to update food stock and last fed time
  database.ref('tagamoshi').set({
    'comida': tagamoshi.comida -1,
    'ultima refeicao': hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
