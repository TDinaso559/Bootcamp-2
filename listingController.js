angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;
    $scope.searchValue = undefined;
    $scope.newCodeValue = undefined;
    $scope.newNameValue = undefined;
    $scope.newAddressValue = undefined;
    $scope.newLatitudeValue = undefined;
    $scope.newLongitudeValue = undefined;


    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */
     
      $scope.addListing = function() {
      var newCoordinates = {
        latitude:$scope.newLatitudeValue,
        longitude:$scope.newLongitudeValue
      }
      var newListing = {
        code:$scope.newCodeValue.toUpperCase(),
        name:$scope.newNameValue,
        address:$scope.newAddressValue,
        coordinates:newCoordinates
      };

      var originalList = Array.from(Listings);
      var filteredList = Array.from($scope.listings);

      var didPlaceInOrig = false;
      for (var i = 0; i < originalList.length; i++) {
        if (originalList[i].code.toLowerCase() > newListing.code.toLowerCase()) {
          originalList.splice(i, 0, newListing);
          didPlaceInOrig = true;
          break;
        }
      }
      if (!didPlaceInOrig) {
        // we reached the end of original
        originalList.push(newListing);
      }
      if ($scope.searchValue == null || $scope.searchValue === "") {
        filteredList = originalList;
      }
      else {
        if (newListing.name.toLowerCase().includes($scope.searchValue.toLowerCase())) {
          var didPlaceInFiltered = false;
          for (var i = 0; i < filteredList.length; i++) {
            if (filteredList[i].code.toLowerCase() > newListing.code.toLowerCase()) {
              filteredList.splice(i, 0, newListing);
              didPlaceInFiltered = true;
              break;
            }
          }
          if (!didPlaceInFiltered) {
            // we reached the end of filtered
            filteredList.push(newListing);
          }
        }
        else if (newListing.code.toLowerCase().includes($scope.searchValue.toLowerCase())) {
          var didPlaceInFiltered = false;
          for (var i = 0; i < filteredList.length; i++) {
            if (filteredList[i].code.toLowerCase() > newListing.code.toLowerCase()) {
              filteredList.splice(i, 0, newListing);
              didPlaceInFiltered = true;
              break;
            }
          }
          if (!didPlaceInFiltered) {
            // we reached the end of filtered
            filteredList.push(newListing);
          }
        }
      }

      // set lists
      Listings = originalList;
      $scope.listings = filteredList;
      
      // clear variables
      $scope.newCodeValue = undefined;
      $scope.newNameValue = undefined;
      $scope.newAddressValue = undefined;
      $scope.newLatitudeValue = undefined;
      $scope.newLongitudeValue = undefined;
    }

    // delete a listing
    $scope.deleteListing = function(index) {
      var originalList = Array.from(Listings);
      var filteredList = Array.from($scope.listings);
      var listing = filteredList[index];
      for (var i = 0; i < originalList.length; i++) {
        if (originalList[i].name.toLowerCase() === listing.name.toLowerCase()) {
          originalList.splice(i, 1);
          break;
        }
      }
      filteredList.splice(index, 1);
      Listings = originalList;
      $scope.listings = filteredList;
    };

    // show the details of a particular listing
    $scope.showDetails = function(index) {
      $scope.indexSelected = index;
      $scope.detailedInfo = $scope.listings[index];
    };

    // filter the current list
    $scope.filterData = function() {
      var originalList = Array.from(Listings);
      var filteredList = [];
      if ($scope.searchValue == null || $scope.searchValue === "") {
        $scope.listings = originalList;
      }
      else {
        for (var i = 0; i < originalList.length; i++) {
          if (originalList[i].name.toLowerCase().includes($scope.searchValue.toLowerCase())) {
            filteredList.push(originalList[i]);
          }
          else if (originalList[i].code.toLowerCase().includes($scope.searchValue.toLowerCase())) {
            filteredList.push(originalList[i]);
          }
        }
        $scope.listings = filteredList;
      }
    };
  }
]);