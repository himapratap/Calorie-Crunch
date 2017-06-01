var food;
$(document).ready(function() {

    $(".foodItem").click(function() {
         $("#calories").html($(this).data("calories"));
         $("#sodium").html($(this).data("sodium"));
         $("#protein").html($(this).data("protein"));
         $("#totalFat").html($(this).data("total-fat"));
         $("#servingSize").html($(this).data("serving-size"));
          $("#carb").html($(this).data("carb"));
          $("#fiber").html($(this).data("fiber"));

    });
});
