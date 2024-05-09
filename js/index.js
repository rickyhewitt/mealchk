/*
MealChk
Ingredient Checker

Data for prohibited items is stored within data.js

Developed by Ricky Hewitt <ricky.hewitt@gmail.com>
*/

(() => {

  console.log("Loaded " + prohibitedList.length + " items");

  const urlParams = new URL(window.location.href).searchParams;
  const result = urlParams.get("result");

  /* Automatically load results if using a share link */
  if (result) {
    // Load ingredients from share url
    ingredients = decodeURIComponent(escape(window.atob(result)));

    // Load input into textarea
    document.getElementById("textarea").value = ingredients;

    // Scroll to results
    document.getElementById("results_summary").scrollIntoView();

    // Submit
    setTimeout(() => {
      analyze(ingredients);
    }, 0);
  }

/* 
  analyze()
  Perform analysis

  params: ingredients (can be a string)
*/
  const analyze = (ingredientsRaw) => {
    // Reset results HTML
    document.getElementById("failed").innerHTML = "";
    document.getElementById("passed").innerHTML = "";

    // Create variables
    const pass = true;
    const ingredientList = [];
    const detectedList = [];
    const passedList = [];
    const failedList = [];

    // Split input by comma seperation, while ignoring anything in brackets
    var regex = /,(?![^(]*\)) /;
    let ingredients = ingredientsRaw.trim().toLowerCase().split(regex);

    // Trim each ingredient further
    ingredients.forEach((i) => {
      let formattedIngredient = i.trim();
      // Append (if not duplicate)
      if (!ingredientList.includes(formattedIngredient)) {
        ingredientList.push(formattedIngredient);
      }
    });

    /* 
    Iterate through each input ingredient, and check to see if the 
    input ingredient is present in the prohibited list 
  */
    ingredientList.forEach((ingredient) => {
      prohibitedList.forEach((prohibited) => {
        if (ingredient.includes(prohibited.toLowerCase())) {
          detectedList.push(ingredient);
        }
      });
    });

    /* 
    Iterate through the input ingredient list (again)
    but this time detect which ones passed, and which ones failed
  */
    ingredientList.forEach((ingredient) => {
      if (!detectedList.includes(ingredient)) {
        passedList.push(ingredient);
      } else {
        failedList.push(ingredient);
      }
    });

    /* 
    Set results HTML
  */
    document
      .getElementById("failed")
      .append(failedList.toString().split(",").join(", "));
    document
      .getElementById("passed")
      .append(passedList.toString().split(",").join(", "));

    if (failedList.length === 0) {
      document.getElementById("results_summary").innerHTML =
        'Pass <i class="fa fa-solid fa-check" style="margin-left: 8px; color: #13e423"></i>';
      document.getElementById("failedList").style.display = "none";
    } else {
      document.getElementById("results_summary").innerHTML =
        'Fail <i class="fa-solid fa-xmark" style="margin-left: 8px; color: red"></i>';
      document.getElementById("failedList").style.display = "block";
    }

    if (passedList.length !== 0) {
      document.getElementById("passedList").style.display = "block";
    }

    document.getElementById("results").style.display = "block";
    document.getElementById("resultsShare").style.display = "block";

    // Build share URL (base64 encoded)
    document.getElementById("shareInput").value =
      window.location.href +
      "result=" +
      btoa(unescape(encodeURIComponent(ingredientsRaw)));

    // Scroll to results
    document.getElementById("results_summary").scrollIntoView();
  };

  /* Share (clipboard) event */
  document.getElementById("clipBoard").addEventListener("click", () => {
    // Get the text field
    var copyText = document.getElementById("shareInput");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    console.log(copyText.value);
  });

  // form
  var form = document.getElementById("ingredientsCheck");

  // form event listener
  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      if (event.target[1].value !== "") {
        analyze(event.target[1].value);
      }
    },
    true
  );
})();
