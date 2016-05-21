'use strict';

app.controller('DassQuestionsControllers', function($scope, DassQuestions){

    $scope.count = 1;
    $scope.ratings = [];
    $scope.shouldCalculate = false;
    $scope.questions = DassQuestions.questions;

    $scope.setQuestion = function(id){
        if(id == null || id < 0){
            id = 0;
        }
        else if(id > $scope.questions.length -1){
            id = 41;
            $scope.shouldCalculate = true;
            $scope.count = 'DONE';
            $scope.selectedQuestion = "The END";
            return;
        }
        $scope.selectedQuestion = $scope.questions[id].question;
    };

    $scope.nextQuestion = function(answer){
        if($scope.ratings.length < 42){
            $scope.ratings.push(answer);
            $scope.setQuestion($scope.count++);
        }
    };

    $scope.depression = function(value){
        /* 3 5 10 13 16 17 21 24 26 31 34 37 38 42 42 */
        var list = [3,5,10,13,16,17,21,24,26,31,34,37,38,42,42];

        var sum = 0;
        if($scope.shouldCalculate){
            sum = $scope.getSum(list);
            console.log("depression: " + sum);
        }

        if(sum>=0 && sum<=9){
            return (value == null) ? $scope.getResponse(0): 'Normal';
        }
        else if(sum>=10 && sum<=13){
            return (value == null) ? $scope.getResponse(1): 'Mild';
        }
        else if(sum>=14 && sum<=20){
            return (value == null) ? $scope.getResponse(2): 'Moderate';
        }
        else if(sum>=21 && sum<=27){
            return (value == null) ? $scope.getResponse(3): 'Severe';
        }
        else if(sum>=28){
            return (value == null) ? $scope.getResponse(4): 'Extremely Severe';
        }
    };

    $scope.anxiety = function(value){

        var list = [2, 4, 7, 9, 15, 19, 20, 23, 25, 28, 30, 36, 40, 41];

        var sum = 0;

        if($scope.shouldCalculate){
            sum = $scope.getSum(list);
            console.log("anxiety: " + sum);
        }

        if(sum>=0 && sum<=7){
            return (value == null) ? $scope.getResponse(0): 'Normal';
        }
        else if(sum>=8 && sum<=9){
            return (value == null) ? $scope.getResponse(1): 'Mild';
        }
        else if(sum>=10 && sum<=14){
            return (value == null) ? $scope.getResponse(2): 'Moderate';
        }
        else if(sum>=15 && sum<=19){
            return (value == null) ? $scope.getResponse(3): 'Severe';
        }
        else if(sum>=20){
            return (value == null) ? $scope.getResponse(4): 'Extremely Severe';
        }
    };

    $scope.stress = function(value){
        var sum = 0;
        var list = [1, 6, 8, 11, 12, 14, 18, 22, 27, 29, 32, 33, 35, 39];
        if($scope.shouldCalculate){
            sum = $scope.getSum(list);
            console.log("stress: " + sum);
        }

        if(sum>=0 && sum<=14){
            return (value == null) ? $scope.getResponse(0): 'Normal';
        }
        else if(sum>=15 && sum<=18){
            return (value == null) ? $scope.getResponse(1): 'Mild';
        }
        else if(sum>=19 && sum<=25){
            return (value == null) ? $scope.getResponse(2): 'Moderate';
        }
        else if(sum>=26 && sum<=33){
            return (value == null) ? $scope.getResponse(3): 'Severe';
        }
        else if(sum>=34){
            return (value == null) ? $scope.getResponse(4): 'Extremely Severe';
        }
    };

    $scope.getSum = function(list){
        var sum = 0;
        list.forEach(function(val){
            sum += $scope.ratings[ val-1 ];
        });
        return sum;
    };

    $scope.getResponse = function(id){
        var responses =
            [
                '<p class="text-success"><strong>NORMAL</strong></p>',
                '<p class="text-info"><strong>MILD</strong></p>',
                '<p class="text-primary"><strong>MODERATE</strong></p>',
                '<p class="text-warning"><strong>SEVERE</strong></p>',
                '<p class="text-danger"><strong>EXTREMELY SEVERE</strong></p>'
            ];

        if(id>=0 && id<responses.length){
            return responses[id];
        }
        return responses[0];
    };

});
