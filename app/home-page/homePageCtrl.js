angular.module('app').controller('app.home-page.homePageCtrl', ['$scope', '$document', function ($scope, $document) {
    $scope.title = "Hello word";
    var valueNoneClass = "text-5-char value-none", tempPoints = 0;
    function getClassByValue(val) {
        var temp = valueNoneClass;
        if (val === 0) {
            return temp;
        }
        temp = val > 4095 ? "value-max" : "value-" + val;
        if (val / 10 < 1) {
            return temp + " text-1-char";
        }
        if (val / 100 < 1) {
            return temp + " text-2-char";
        }
        if (val / 1000 < 1) {
            return temp + " text-3-char";
        }
        if (val / 10000 < 1) {
            return temp + " text-4-char";
        }
        return temp + " text-5-char";
    }
    function checkExistPointForRandom() {
        var i, points = $scope.points, length = points.length;
        for (i = 0; i < length; i++) {
            if (points[i].value === 0) {
                return true;
            }
        }
        return false;
    }
    function newRandom() {
        if (!checkExistPointForRandom()) {
            return;
        }
        var points = $scope.points, length = points.length, number = Math.floor((Math.random() * 2) + 1) * 2, randomIndex = Math.floor((Math.random() * length));
        while (points[randomIndex].value !== 0) {
            randomIndex = Math.floor((Math.random() * length));
        }
        points[randomIndex].value = number;
    }
    function reCheckClassValues() {
        var i, points = $scope.points, length = points.length;
        for (i = 0; i < length; i++) {
            points[i].classes = getClassByValue(points[i].value);
        }
    }
    function arrowLeft() {
        var i, points = $scope.points, length = points.length;
        for (i = 1; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                //case equal
                if (points[i - 4].value === points[i].value) {
                    points[i - 4].value = points[i].value * 2;
                    tempPoints += points[i - 4].value * 2;
                    points[i - 4].calculated = true;
                } else {
                    if (points[i - 4].value === 0) {
                        points[i - 4].value = points[i].value;
                        points[i].value = 0;
                    }
                }
            }


        }
    }
    function canArrowUp() {
        var i, points = angular.copy($scope.points), length = points.length;
        for (i = 4; i < length; i++) {
            //case equal and not calculated yet
            if (points[i - 4].value === points[i].value && points[i].value !== 0 && !points[i - 4].calculated) {
                return true;
            } else {
                if (points[i - 4].value === 0 && points[i].value !== 0) {
                    return true;
                }
            }
        }
        return false;
    }
    //flow
    // get all points have value
    //each point
    //// check it's possiable for move or merge  follow direct
    // merge if same value follow direct
    //move up when possiable follow direct
    function getAllPointsHaveValue() {
        var i, points = $scope.points, length = points.length;
        for (i = 0; i < length; i++) {
            if (points[i].value !== 0) {
                
            }
        }
    }

    function checkPossiableForMoveOrMerge(direct) {
        
    }
    function mergeValue(direct) {
        
    }
    function move() {
        //
    }
    function arrowUp() {
        var i, points = $scope.points, length = points.length,tempPosition;
        for (i = 4; i < length; i++) {
            tempPosition = undefined;
            for (var t = i; t > 0; t = t - 4) {
                if (points[t].value === 0) {
                    tempPosition = t;
                }
                if (points[t].value !== 0 && tempPosition !== undefined) {
                    break;
                }
            }
            if (points[i - 4].value === points[i].value && !points[i - 4].calculated) {
                points[i - 4].value = points[i].value * 2;
                points[i - 4].calculated = true;
                tempPoints += points[i - 4].value;
                points[i].value = 0;
            }
            for (var j = i; j > 0; j = j - 4) {
                if (points[j].value === 0) {
                    tempPosition = j;
                }
                if (points[j].value !== 0 && tempPosition !== undefined) {
                    break;
                }
            }
            if (tempPosition) {
                points[tempPosition].value = points[i].value;
                points[i].value = 0;
            }
            //case equal and not calculated yet
           

        }
    }

    function createNewPoints() {
        $scope.points = [];
        var length = 16;
        for (var i = 0; i < length; i++) {
            $scope.points.push({
                position: i,
                value: 0,
                classes: valueNoneClass,
                calculated: false
            });
        }
    }
    function clearCalculatedPoint() {

        var i, points = $scope.points, length = points.length;
        for (i = 0; i < length; i++) {
            points[i].calculated = false;
        }
    }
    $scope.newGame = function () {
        $scope.score = 0;
        tempPoints = 0;
        createNewPoints();
        newRandom();
        newRandom();
        reCheckClassValues();
    }
    $document.on('keydown', function (event) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 37:
                arrowLeft();
                break;
            case 38:
                if (!canArrowUp()) {
                    return;
                }
                arrowUp();
                break;
            case 39: arrowRight();
                break;
            case 40: arrowDown();
                break;
            default:
        }
        $scope.score += tempPoints;
        tempPoints = 0;
        newRandom();
        reCheckClassValues();
        clearCalculatedPoint();
        $scope.$digest();
    });



}
]);
