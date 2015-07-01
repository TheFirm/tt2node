angular.module('tt2').directive('ttReports', function () {
    return {
        replace: true,
        templateUrl: 'js/app/reports/reports.html',
        controller: function ($http, $scope) {
            $scope.reports = [];
            $http.get('api/report').success(function (reports) {
                reports.forEach(function (report) {
                    report.create_at = moment(report.create_at).format("DD.MM.YYYY");
                    report.date_report = moment(report.date_report).format("DD.MM.YYYY");
                });
                $scope.reports = reports;
            })
        }
    }
});