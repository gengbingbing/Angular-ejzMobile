<script>
function personController($scope) {
    $scope.person = {
        firstName: "John",
        lastName: "Doe",
     };
     $scope.fullName = function() {
         var x;
         x = $scope.person; 
         return x.firstName + " " + x.lastName;
     };
}
</script>