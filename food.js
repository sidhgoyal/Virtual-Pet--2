class Food {
    constructor(){
    this.foodStock=database.ref('Food')
    this.image=loadImage('Milk.png');
    }
  
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }
  
   
  
    getFoodStock(){
      return this.foodStock;
    }
  
    display(){
      var x=80,y=170;
      
      imageMode(CENTER);
   
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%5===0){
            x=80;
            y=y+50;
          }
          
          if(this.foodStock >= 10){
            gameState = 2;
            textSize(20)
            fill(0)
            text("Food Limit Finished",45,100)
          }
          
          
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
      
    }
    
  }