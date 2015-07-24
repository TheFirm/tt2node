angular.module('tt2').directive('ttReportEdit', function () {
    return {
        replace: true,
        templateUrl: 'js/app/reportEdit/reportEdit.html',
        controller: function ($http, $scope) {
            $scope.projects = [];
            $scope.project = {};
            $http.get('/api/project/list').success(function (projects) {
                $scope.projects = projects;
            });
            $scope.addReport = function () {
                $http.post('/api/report', {
                    project_id : $scope.project.id,
                    date_report : $scope.date_report,
                    time_start: $scope.time_start && moment.utc($scope.date_report + ' ' + $scope.time_start),
                    time_end: $scope.time_end && moment.utc($scope.date_report + ' ' + $scope.time_end),
                    period: $scope.period,
                    comment: $scope.comment
                }).success(function (resp) {
                    console.log(resp)
                });
            };
            
            $scope.parsePeriod = function () {
                $scope.period = 0;
                var splitedPeriodString = $scope.periodString.match(/(\d*) ?([hmsd])/g);
                splitedPeriodString.forEach(function (val) {
                    $scope.period += moment.duration(parseInt(val), val.match(/[hmsd]/)[0])
                });
            }
        }
    }
});