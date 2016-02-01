var mysql = require('mysql');
var prompt = require('prompt');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zoo_db'
});


prompt.start();
var prompt.message = "";
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };
        //console.log('connected as id ' + connection.threadId);
});

var zoo = {
  welcome : function(){
    console.log("Welcome to the Zoo and Friends App!")
  },
  menu :function(){
    console.log("Pressing 'A' will : Add a new animal to the Zoo!\n")
    console.log("Pressing 'U' will : Update info on an animal to the Zoo!\n")
    console.log("Pressing 'V' will : Visit the animals in the Zoo!\n")
    console.log("Pressing 'D' will : Adopt an animal from the Zoo!\n")
    console.log("Pressing 'Q' will : Quit and exit the Zoo!\n")
  },

  add : function(input_scope){
    var currentScope = input_scope
    console.log("To add an animal to the zoo please fill out the following form for us!")
    prompt.get(["->", "name", "type", "age"], function(err, result){
     var query = 'INSERT INTO animals (name, type, age) VALUES (?,?,?)';
     var addThis = [result.name, result.type, result.age];

     connection.query(query, addThis, function(err, result){
      if (err) throw err;

      console.log("Added" + result.name + "to the zoo.");
     });
    });

    currentScope.menu();
    currentScope.promptUser();
  },

  visit : function(){
    console.log(" Enter (I): ------> do you know the animal by it's id? We will visit that animal!\n")
    console.log(" Enter (N): ------> do you know the animal by it's name? We will visit that animal!\n")
    console.log(" Enter (A): ------> here's the count for all animals in all locations!\n")
    console.log(" Enter (C): ------> here's the count for all animals in this one city!\n")    
    console.log(" Enter (O): ------> here's the count for all the animals in all locations by the type you specified!\n")
    console.log(" Enter (Q): ------> Quits to the main menu!\n")
    currentScope.visit();
    currentScope.view(currentScope);
  },

  view : function(){
    var currentScope = input_scope
    console.log ("Please choose what you'd like to visit!")
    prompt.get(["->", "visit"], function(err, result){
      if(result.vist == "Q"){
        currentScope.menu();
      };
      else if( result.visit =="O"){
        currentScope.type(input_scope);
      };
      else if( result.visit =="I" ){
        currentScope.type(input_scope);
      };
      else if( result.visit == "N" ){
        currentScope.name(input_scope;)
      };
      else if( result.visit == "A" ){
        currentScope.all(input_scope);
      };
      else if( result.visit == "C"){
        currentScope.care(input_scope);
      };
      else{
        console.log("Sorry, didn't get that.  Come again?")
          currentScope.visit();
          currentScope.view(currentScope);
      };
    })
  },

  type : function(input_scope){
    var currentScope = input_scope;
    console.log("Enter animal type to find out how man animals we have of that type!")
    prompt.get(["->", "animal_type"], function(err, result){
      var query = "SELECT COUNT(type) FROM animals WHERE type =?"
      var addThis = result.animal_type;
     connection.query(query, addThis, function(err, result){
      if (err) throw err;
      console.log(result)
      currentScope.menu();
      currentScope.promptUser();
     })
    }); 
  },

  care : function(input_scope){
    var currentScope = input_scope;
    console.log("Enter city name: NY/SF?")
    prompt.get(["->", "city_name"], function(err, result){
      var query = "SELECT COUNT(*) FROM animals, caretakers WHERE caretakers.city=? AND caretakers.id=animals.caretaker_id"
      var addThis = result.city_name;
      connection.query(query, addThis, function(err, result){
        if (err) throw err;
        console.log(result);
        currentScope.visit();
      }):
    }):
  },

  animID : function(input_scope){
    var currentScope = input_scope;
    prompt.get(["->", "animal_id"], function(err, result){
      var query = "SELECT * FROM animals WHERE id=?"
      var addThis = result.animal_id;
      connection.query(query, addThis, function(err, result){
        if (err) throw err;
        console.log(result);
        currentScope.visit();
      });
    });
  },

  name : function(input_scope){
    var currentScope = input_scope;
    prompt.get(["->", "name"], function(err, result){
      var query = "SELECT * FROM animals WHERE name =?"
      var addThis = result.animal_name;
      connection.query(query, addThis, function(err, result){
        if (err) throw err;
        console.log(result);
        currentScope.visit(;
      })
    })
  },

  all : function(input_scope){
    var currentScope = input_scope;
    var query = "SELECT COUNT(*) FROM animals"
      connection.query(query, function(err, result){
        if (err) throw err;
        console.log(result);
        currentScope.visit();
      })
    })
  },

  update : function(input_scope){
    var currentScope = input_scope;
    prompt.get(['->', 'id', 'new_name', 'new_age', 'new_type', 'new_caretaker_id'], function(err, result){
      var query = "UPDATE animals SET name=?, type=?, caretaker_id=?, age=?, WHERE id=?"
      var addThis = [result.new_name, result.new_type, result.new_caretaker_id, result.new_age, result.id];
      connection.query(query, addThis, function(err, result){
        if(err) throw err;
        currentScope.menu();
        currentScope.promptUser();
      });
    });
  },

  adopt : function(input_scope){
    var currentScope = input_scope;
    prompt.get(['->', 'animal_id'], function(err, result){
      var query = "DELETE FROM animals WHERE id=?"
      var addThis = result.animal_id;
      connection.query(query, addThis, function(err, result){
        if (err) throw err;
        console.log(result);
        currentScope.visit();
        currentScope.view(currentScope);
      });
    });
  },
  promptUser : function(){
    var self = this;
    prompt.get("input", function(err, result){
      if(result.input == "Q"){
        self.exit();
      }
      else if(result.input == "A"){
        self.add(self);
      }
      else if(result.input == "V"){
        self.visit();
        self.view(self);
      }
      else if(result.input == "D"){
        self.adopt(self);
      }
      else{
        console.log("Sorry, didn't get that.  Come again?")
      }
    });
  },

  exit : function(){
    console.log("Thanks for visiting us.  Good Bye!")
    process.exit();
  },

  open : function(){
    this.welcome();
    this.menu();
    this.promptUser();
  }
};

zoo.open();