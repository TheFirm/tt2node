angular.module('tt2').directive('ttReportEdit', function () {
    return {
        replace: true,
        templateUrl: 'js/app/reportEdit/reportEdit.html',
        controller: function ($http, $scope) {
            $scope.projects = [];
            $scope.project = {};
            $http.get('/api/project/list').success(function (projects) {
                $scope.projects = projects;
                console.log($scope.projects)
            });
            $scope.addReport = function () {
                $http.post('/api/report', {
                    project_id : $scope.project.id,
                    date_report : $scope.date_report,
                    time_start: $scope.time_start && moment.utc($scope.date_report + ' ' + $scope.time_start),
                    time_end: $scope.time_end && moment.utc($scope.date_report + ' ' + $scope.time_end),
                    comment: $scope.comment
                }).success(function (resp) {
                    console.log(resp)
                });
            }
        }
    }
});