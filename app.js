
var app=angular.module("myApp", []);

app.controller("MasterCtrl", function($scope,$timeout)  
{  

var data=["ganesh", "suresh","ramesh","sunil","ganesh1", "suresh1","ramesh1","sunil1","ganesh2", "suresh2","ramesh2","sunil2"];

        
    var employees = [];  

    $scope.employees = employees;  

    var listItems ;

    const totalSize= data.length;

    var initialload = 3;

    $scope.allDone=false;



 $scope.addDrag= function(){

         $timeout(function () {
                         listItems = document.querySelectorAll('.namelist');
        console.log( listItems.length)

        for (i = 0; i < listItems.length; i++) {
          listItem = listItems[i];

          listItem.setAttribute("order-id", i);
          listItem.addEventListener('dragstart', handleDragStart, false)
          listItem.addEventListener('dragenter', handleDragEnter, false)
          listItem.addEventListener('dragover', handleDragOver, false)
          listItem.addEventListener('dragleave', handleDragLeave, false)
          listItem.addEventListener('drop', handleDrop, false)
          listItem.addEventListener('dragend', handleDragEnd, false)
                        }

        },10);
 
}
 $scope.loadMoreRecords = function() {
         
            var emp;
            var i = 0;
            if(initialload < totalSize ){
                if(initialload>3)
                {
                    i=initialload-1;
                }
            while (i < initialload ) {
                    emp = {
                        name: data[i]
                    }

                    $scope.employees.push(emp);
                    $scope.addDrag();
                     console.log(initialload+"  "+i+"  "+ JSON.stringify($scope.employees))
                    i++;
                    if(i>=3)
                    {
                        initialload++;
                        break;
                        
                    }     
             }
            }
            else{
                    $scope.allDone=true;
            }

          
   };
 

        $scope.loadMoreRecords();


    $scope.search = function(item) {  
        if ($scope.SearchText == undefined) {  
            return true;  
        } else {  
            if (item.name.toLoweCase().indexOf($scope.SearchText.toLoweCase()) != -1 || item.Address.toLoweCase().indexOf($scope.SearchText.toLoweCase()) != -1) {  
                return true;  
            }  
        }  
        return false;  
    }  


 var dragSrcEl = null;

function handleDragStart(e) {
    this.className += " dragStartClass";

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
  //e.dataTransfer.setDragClass("dataTransferClass");

}

function handleDragOver(e) {
  e.preventDefault();
  // }
  e.dataTransfer.dropEffect = 'move';  
  return false;

}

function handleDragEnter(e) {
 
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  
}

function handleDrop(e) {

  var listItems = document.querySelectorAll('.namelist');
  e.stopPropagation(); 
  dragSrcOrderId = parseInt(dragSrcEl.getAttribute("order-id"));
  dragTargetOrderId = parseInt(this.getAttribute("order-id"));
  var tempThis = this;

  if (dragSrcEl != this) {

    var tempThis = this;

    function makeNewOrderIds(tempThis) {

      dragSrcEl.setAttribute("order-id", dragTargetOrderId);
      tempThis.setAttribute("order-id", dragTargetOrderId);

      if (dragSrcOrderId < dragTargetOrderId) {
        for (i = dragSrcOrderId + 1; i < dragTargetOrderId; i++) {
          listItems[i].setAttribute("order-id", i - 1);

          dragSrcEl.setAttribute("order-id", dragTargetOrderId - 1);
        }
      } else {
        for (i = dragTargetOrderId; i < dragSrcOrderId; i++) {
          listItems[i].setAttribute("order-id", i + 1);
          dragSrcEl.setAttribute("order-id", dragTargetOrderId);

        }
      }

    };
    makeNewOrderIds(tempThis);


    dragSrcEl.classList.remove("dragStartClass");

    reOrder(listItems);
 
  } else {

    dragSrcEl.classList.remove("dragStartClass");
    return false;

  }

};

function handleDragEnd(e) {

  for (i = 0; i < listItems.length; i++) {
    listItem = listItems[i];
    listItem.classList.remove('over');
  }
  dragSrcEl.classList.remove("dragStartClass");


}


function reOrder(listItems) {


  var tempListItems = listItems;
  console.log(tempListItems +" before")
  tempListItems = Array.prototype.slice.call(tempListItems, 0);
    console.log(tempListItems+" after")

  tempListItems.sort(function(a, b) {

    return a.getAttribute("order-id") - b.getAttribute("order-id");
  });

 var parent = document.getElementById('list');
  parent.innerHTML = "";

  for (var i = 0, l = tempListItems.length; i < l; i++) {
    console.log(tempListItems[i])
    parent.appendChild(tempListItems[i]);
  }
 // $scope.$apply();
}
 
  $scope.$watch('employees', function (newValue, oldValue){
     console.log(newValue, oldValue)
    if ( newValue ) {
        console.log(newValue)
    }
  });
 
});  


