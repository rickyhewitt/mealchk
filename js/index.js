/*
MealChk
Ingredient Checker

Developed by Ricky Hewitt <ricky.hewitt@gmail.com>
*/
(() => {
  const prohibitedList = [
    "agave nectar",
    "aspartame",
    "brown rice syrup",
    "corn syrup",
    "dextrose",
    "fructose",
    "high fructose corn syrup",
    "lactose",
    "malt syrup",
    "maltodextrin",
    "maple syrup",
    "molasses",
    "monk fruit sweetener",
    "rice syrup",
    "saccharin",
    "sorghum syrup",
    "sucralose",
    "sugar",
    "xylitol",
    "yeast extract",
    "alcohol",
    "beer",
    "cider",
    "liqueur",
    "sake",
    "sherry",
    "wine",
    "amino acids",
    "carrageenan",
    "hydrolyzed vegetable protein (hvp)",
    "monosodium glutamate (msg)",
    "soy sauce",
    "sulfite",
    "tapioca maltodextrin",
    "benzoates",
    "BHA",
    "BHT",
    "butylated hydroxyanisole",
    "butylated hydroxytoluene",
    "calcium benzoate",
    "calcium propionate",
    "calcium saccharin",
    "chlorine dioxide",
    "diacetyl",
    "disodium inosinate",
    "disodium guanylate",
    "ethylene oxide",
    "sucrose",
    "lactitol",
    "methyl silicon",
    "nitrites",
    "parabens",
    "polysorbates",
    "potassium benzoate",
    "potassium bromate",
    "potassium sorbate",
    "propionates",
    "propylene oxide",
    "sodium benzoate",
    "sodium bisulfite",
    "sodium diacetate",
    "sodium glutamate",
    "sodium nitrite",
    "sodium propionate",
    "sodium saccharin",
    "sorbic acid",
    "sucroglycerides",
    "sucrose octaacetate",
    "tagatose",
    "tertiary butylhydroquinone (TBHQ)",
    "transglutaminase",
    "vanillin",
    "artificial color",
    "artificial flavor",
    "artificial preservative",
    "blue 1",
    "blue 2",
    "green 3",
    "red 3",
    "red 40",
    "yellow 5",
    "yellow 6",
    "canola oil",
    "corn oil",
    "cottonseed oil",
    "grapeseed oil",
    "hydrogenated oils",
    "margarine",
    "partially hydrogenated oil",
    "peanut oil",
    "soybean oil",
    "vegetable oil",
    "wheat",
    "disodium diphosphate",
    "dairy",
    "rice",
    "quinoa",
    "gluten",
    "dijon mustard",
    "legumes",
    "peanuts",
    "soy",
    "MSG",
    "acesulfame-K",
    "arabitol",
    "(evaporated) cane",
    "coconut nectar",
    "date syrup",
    "disaccharide",
    "dulcitol",
    "erythritol",
    "galactose",
    "glucose",
    "glycerin (glycerol)",
    "glycol",
    "high fructose corn",
    "HSH",
    "iditol",
    "isomalt",
    "maltitol",
    "maltose",
    "mannitol",
    "monk fruit extract",
    "monosaccharide",
    "Nutra-Sweet",
    "polyglycitol",
    "polysaccharide",
    "refiner's syrup",
    "ribitol",
    "ribose",
    "rice malt (extract)",
    "saccharose",
    "sorbitol",
    "Splenda",
    "stevia",
    "Sweetleaf",
    "Sweet-n-Low",
    "(sweet) sorghum",
    "threitol",
    "treacle",
    "Truvia",
    "corn starch",
    "potassium metabisulfite",
    "soy lecithin",
    "sulfur dioxide",
    "rice bran oil",
    "milk",
    "ice cream",
    "gum",
    "barley",
    "E420",
    "Sorbitol",
    "E421",
    "Mannitol",
    "E422",
    "Glycerol",
    "E950",
    "Acesulfame K",
    "E951",
    "Aspartame",
    "E952",
    "Cyclamate",
    "E953",
    "Isomalt",
    "E954",
    "Saccharin",
    "E955",
    "Sucralose",
    "E956",
    "Alitame",
    "E957",
    "Thaumatin",
    "E958",
    "Glycyrrhizin",
    "E959",
    "Neohesperidin DC",
    "E960",
    "Stevioside",
    "E961",
    "Neotame",
    "E962",
    "Aspartame-acesulfame Salt",
    "E965",
    "Maltitol",
    "E966",
    "Lactitol",
    "E967",
    "Xylitol",
    "E968",
    "Erythritol",
    "E150b",
    "Caustic sulphite caramel",
    "E150d",
    "Sulphite ammonia caramel",
    "E220",
    "Sulphur dioxide",
    "E221",
    "Sodium sulphite",
    "E222",
    "Sodium hydrogen sulphite",
    "E223",
    "Sodium metabisulphite",
    "E224",
    "Potassium metabisulphite",
    "E226",
    "Calcium sulphite",
    "E227",
    "Calcium hydrogen sulphite",
    "E228",
    "Potassium hydrogen sulphite",
    "E407",
    "Carrageenan",
    "E620",
    "Glutamic acid",
    "E621",
    "Monosodium glutamate",
    "E622",
    "Monopotassium glutamate",
    "E623",
    "Calcium diglutamate",
    "E624",
    "Monoammonium glutamate",
    "E625",
    "Magnesium diglutamate",
    "e471",
    "mono- and diglycerides",
    "mono- and di-glycerides",
    "dextrin",
    "caramel",
    "whey",
    "ham",
    "corn",
    "maize",
    "bean",
    "sulphite",
    "oats",
    "pasta",
    "bread",
    "glacé cherries",
    "carboxymethyl cellulose",
    "polysorbate",
  ];

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

  /* analyze()

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
