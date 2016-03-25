'use strict';

app.controller('DassQuestionsControllers', function($scope, DassQuestions, $log){

    $scope.count = 1;
    $scope.ratings = [];
    $scope.shouldCalculate = false;
    $scope.questions = DassQuestions.questions;
    $scope.setQuestion = function(id){
        if(id == null || id < 0){
            id = 1;
        }
        else if(id >= $scope.questions.length-1){
            id = 43;
            $scope.shouldCalculate = true;
            $scope.count = 'DONE';
        }
        $scope.selectedQuestion = $scope.questions[id].question;

    };

    $scope.nextQuestion = function(answer){
        if($scope.ratings.length < 42){
            $scope.ratings.push(answer);
            $scope.setQuestion(++$scope.count);
        }
    };

    $scope.depression = function(){
        /* 3 5 10 13 16 17 21 24 26 31 34 37 38 42 42*/
        var list = [3,5,10,13,16,17,21,24,26,31,34,37,38,42,42];

        var sum = 0;
        if($scope.shouldCalculate){
            sum = $scope.getSum(list);
            console.log("depression: " + sum);
        }

        if(sum>=0 && sum<=9){
            return "NORMAL";
        }
        else if(sum>=10 && sum<=13){
            return "MILD";
        }
        else if(sum>=14 && sum<=20){
            return "MODERATE";
        }
        else if(sum>=21 && sum<=27){
            return "SEVERE";
        }
        else if(sum>=28){
            return "EXTREMELY SEVERE";
        }
    };

    $scope.anxiety = function(){

        var list = [2, 4, 7, 9, 15, 19, 20, 23, 25, 28, 30, 36, 40, 41];

        var sum = 0;

        if($scope.shouldCalculate){
            sum = $scope.getSum(list);
            console.log("anxiety: " + sum);
        }

        if(sum>=0 && sum<=7){
            return "NORMAL";
        }
        else if(sum>=8 && sum<=9){
            return "MILD";
        }
        else if(sum>=10 && sum<=14){
            return "MODERATE";
        }
        else if(sum>=15 && sum<=19){
            return "SEVERE";
        }
        else if(sum>=20){
            return "EXTREMELY SEVERE";
        }
    };

    $scope.stress = function(){
        var sum = 0;

        var list = [1, 6, 8, 11, 12, 14, 18, 22, 27, 29, 32, 33, 35, 39];

        if($scope.shouldCalculate){
            sum = $scope.getSum(list);
            console.log("stress: " + sum);
        }

        if(sum>=0 && sum<=14){
            return "NORMAL";
        }
        else if(sum>=15 && sum<=18){
            return "MILD";
        }
        else if(sum>=19 && sum<=25){
            return "MODERATE";
        }
        else if(sum>=26 && sum<=33){
            return "SEVERE";
        }
        else if(sum>=34){
            return "EXTREMELY SEVERE";
        }
    };

    $scope.getSum = function(list){
        var sum = 0;
        var sum1 = 0;
        list.forEach(function(val){
            sum1 += $scope.ratings[ val-1 ];
        });


        for(var i = 0; i < list.length; i++){
            sum += $scope.ratings[ list[i]-1 ];
        }

        console.log("Outer sum: " + sum + " : " + sum1);
        return sum;
    }

});
