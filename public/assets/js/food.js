var food;
$(document).ready(function() {

    $(".foodItem").click(function() {
        $("#finalCalories").val($(this).data("calories"));
        $("#calories").html($(this).data("calories"));
        $("#sodium").html($(this).data("sodium")+"mg");
        $("#protein").html($(this).data("protein")+"g");
        $("#totalFat").html($(this).data("total-fat")+"g");
        $("#servingSize").html($(this).data("serving-size"));
        $("#carb").html($(this).data("carb")+"g");
        $("#fiber").html($(this).data("fiber")+"g");

    });

    $(".selectfoodItem").change(function() {
        let food = $("select option:selected");
        $("#finalCalories").val(food.data("calories"));
        $("#selectedFood").val(food.val());

        $("#calories").html(food.data("calories"));
        $("#sodium").html(food.data("sodium")+"mg");
        $("#protein").html(food.data("protein")+"g");
        $("#totalFat").html(food.data("total-fat")+"g");
        $("#servingSize").html(food.data("serving-size"));
        $("#carb").html(food.data("carb")+"g");
        $("#fiber").html(food.data("fiber")+"g");


    });
});
