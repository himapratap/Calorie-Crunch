var food;
$(document).ready(function() {

    $(".foodItem").click(function() {
        $("#finalCalories").val($(this).data("calories"));
        $("#calories").html($(this).data("calories"));
        $("#sodium").html($(this).data("sodium"));
        $("#protein").html($(this).data("protein"));
        $("#totalFat").html($(this).data("total-fat"));
        $("#servingSize").html($(this).data("serving-size"));
        $("#carb").html($(this).data("carb"));
        $("#fiber").html($(this).data("fiber"));

    });

    $(".selectfoodItem").change(function() {
        let food = $("select option:selected");
        $("#finalCalories").val(food.data("calories"));
        $("#selectedFood").val(food.val());

        $("#calories").html(food.data("calories"));
        $("#sodium").html(food.data("sodium"));
        $("#protein").html(food.data("protein"));
        $("#totalFat").html(food.data("total-fat"));
        $("#servingSize").html(food.data("serving-size"));
        $("#carb").html(food.data("carb"));
        $("#fiber").html(food.data("fiber"));


    });
});
