app.controller("EventsCtrl", function($scope, Events) {

	$scope.currentEvent = 'clicks';

    $scope.chartObject = {};

    $scope.chartObject.type = "BarChart";

    $scope.chartObject.data = {
        "cols": [
            { id: "t", label: "Page", type: "string" },
            { id: "s", label: "Clicks", type: "number" }
        ],
        "rows": []
    };

    Events.getClicks().then(function(data) {
        $scope.chartObject.data.rows = [];
        data.data.forEach(function(clickData) {
            var obj = {
                c: [{
                    v: clickData.page
                }, {
                    v: clickData.clicks
                }]
            }
            $scope.chartObject.data.rows.push(obj);
        })
    });

    $scope.onEventSelect = function(event) {
    	$scope.currentEvent = event;
    	$scope.chartObject.data = {};
        switch (event) {
            case 'unloads':
                Events.getUnloads().then(function(data) {
                    $scope.chartObject.data.rows = [];
                    data.data.forEach(function(unloadData) {
                        var obj = {
                            c: [{
                                v: unloadData.page
                            }, {
                                v: unloadData.exits
                            }]
                        }
                        $scope.chartObject.data.rows.push(obj);
                    });
                    $scope.chartObject.data.cols = [
                        { id: "t", label: "Page", type: "string" },
                        { id: "u", label: "Unloads", type: "number" }
                    ]
                });
                break;

            case 'clicks':
                Events.getClicks().then(function(data) {
                    $scope.chartObject.data.rows = [];
                    data.data.forEach(function(clickData) {
                        var obj = {
                            c: [{
                                v: clickData.page
                            }, {
                                v: clickData.clicks
                            }]
                        }
                        $scope.chartObject.data.rows.push(obj);
                    });
                    $scope.chartObject.data.cols = [
                        { id: "t", label: "Page", type: "string" },
                        { id: "c", label: "Clicks", type: "number" }
                    ]
                });
                break;

            case 'purchase':
                Events.getPurchases().then(function(data) {
                    $scope.chartObject.data.rows = [];
                    data.data.forEach(function(purchaseData) {
                        var obj = {
                            c: [{
                                v: purchaseData.page
                            }, {
                                v: purchaseData.purchase
                            }]
                        }
                        $scope.chartObject.data.rows.push(obj);
                    });
                    $scope.chartObject.data.cols = [
                        { id: "t", label: "Page", type: "string" },
                        { id: "p", label: "Purchases", type: "number" }
                    ]
                });
                break;
        }

    }
});