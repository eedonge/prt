	var thisground = angular.module('thisground', ['ngAnimate']).run(function($rootScope) {
        $rootScope.title = 'Featured';
    });

    thisground.controller('tg-prt', function($scope, $rootScope) {
        var matrix = [];

        function getLinked(idx, name) {
            /*
             1 2 3
             8 * 4
             7 6 5
             */
            var arr = [];

            (matrix[(idx - 11)] !== name) && (idx > 10) && (idx % 10 !== 1) && arr.push(idx - 11);   // 1
            (matrix[(idx - 11)] !== name) && (idx > 10) && arr.push(idx-10);                         // 2
            (matrix[(idx - 11)] !== name) && (idx > 10) && (idx % 10 !== 0) && arr.push(idx - 9);    // 3
            (matrix[(idx - 11)] !== name) && (idx % 10 !== 0) && arr.push(idx + 1);                  // 4
            (matrix[(idx - 11)] !== name) && (idx < 31) && (idx % 10 !== 0) && arr.push(idx + 11);   // 5
            (matrix[(idx - 11)] !== name) && (idx < 31) && arr.push(idx + 10);                       // 6
            (matrix[(idx - 11)] !== name) && (idx < 31) && (idx % 10 !== 1) && arr.push(idx + 9);    // 7
            (matrix[(idx - 11)] !== name) && (idx % 10 !== 1) && arr.push(idx - 1);                  // 8

            return arr;
        }

        $scope.prtCards = [];

        for (var i = 0; i < 40; i++) {
            $scope.prtCards.push({
                'index': i+1,
                'name': 'friend' + (i + 1),
                'filename': myFriends[Math.floor(Math.random()*101)].filename,
                'opener': 'eedonge',
                'link': getLinked(i+1, 'friend' + (i + 1)),
                'openLinkCnt': 0,
                'showClass': 'checked'

            });
            matrix.push('friend' + (i + 1));
        };

        $scope.getFriends = function (prtCard) {
            var num = [];
            for (var i = 0; i < 8; i++) {
                num.push(Math.floor(Math.random()*101));
            }

            for(var idx = 0; idx < prtCard.link.length; idx++) {
                var friend = $scope.prtCards.filter(function (obj) {
                   return obj.index == prtCard.link[idx];
                })[0];

                var filename = myFriends[num[idx]].filename?myFriends[num[idx]].filename:'';
                fileChaneg($('#prt' + friend.index), filename);
            };

            $rootScope.title = prtCard.name;
        };

        function fileChaneg(obj, filename){
            obj.fadeOut(300, function(){
                $(this).attr('src','image/' + filename).bind('onreadystatechange load', function(){
                    if (this.complete) $(this).fadeIn(300);
                });
            });
        }
    });
