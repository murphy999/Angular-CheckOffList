/*(function (){
  'use strict';

angular.module('myFirstApp', [])

.controller('DIcontroller', DIcontroller);

DIcontroller.$inject = ['$scope','$filter'];
   function DIcontroller($scope,$filter){
   $scope.name = "Mufaddal";

   $scope.upper = function(){
   	var upCase = $filter('uppercase');
   	$scope.name = upCase($scope.name);
   };

   $scope.sayMsg = function(){
       return "good man";
   };
};


} )();*/

/* (function() {
    'use strict';

    angular.module('Assignment1', [])
    .controller("Controller", Controller);

    Controller.inject = ['$scope'];
    function Controller($scope) {
        $scope.value = "Please enter data.";
        $scope.food = "";
        $scope.colour = "#000000"

        var splitInput = function (separator) {
            return separator.split(',');
        }

        // Finds split length excluding whitespaces and empty strings
        var splitLength = function (array) {
            var length = array.length;
            var x =0;
            for (x in array) {
                if (array[x].trim() == "") {
                    length-= 1;
                }
            }
            return length;
        }

        $scope.checkItem = function() {
            var array = splitInput($scope.food);
            var length = splitLength(array);
            if (length == 0){
                $scope.value = "Please enter data first.";
                $scope.colour = "red";
            }
            else if (length <= 3) {
                $scope.value = "Enjoy!";
                $scope.colour = "green";
            }
            else {
                $scope.value = "Too much!";
                $scope.colour = "green";
            }
        }
    };

})(); */

(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShopBuy', ShopBuy)
.controller('ShopBought',ShopBought)
.provider('ShoppingListService', ShoppingListServiceProvider)
.config(Config);

Config.$inject = ['ShoppingListServiceProvider'];
function Config(ShoppingListServiceProvider) {
  // Save Yaakov from himself
  ShoppingListServiceProvider.defaults.maxItems = 4;
}


ShopBuy.$inject = ['ShoppingListService'];
function ShopBuy(ShoppingListService) {
  var buy = this;
  buy.items = ShoppingListService.getItems();

  buy.removeFrmList = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}

ShopBought.$inject = ['ShoppingListService'];
function ShopBought(ShoppingListService) {
 var bought = this;
 bought.items = ShoppingListService.addItem();
 }

// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;
  service.arr = [];
  // List of shopping items
  var items = [
    {
      name : "Milk",
      quantity : "2 litres"
    },
    {
      name : "Toast",
      quantity : "1 packet"
    },
    {
      name : "Bread",
      quantity : "1 packet"
    },
    {
      name : "Fruits",
      quantity : "1 dozen"
    },
     {
      name : "Tea",
      quantity : "2 packets"
    },
     {
      name : "Cookie",
      quantity : "7 packets"
    }
  ];

 service.addItem = function() {
    return service.arr;
 };

  service.getItems = function () {
   return items;
 };

  service.removeItem = function (itemIndex) {
    var i = items[itemIndex];
    items.splice(itemIndex, 1);
    service.arr.push(i);
  };
}


function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 10
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);

    return shoppingList;
  };
}

})();
