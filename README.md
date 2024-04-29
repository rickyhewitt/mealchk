[![Netlify Status](https://api.netlify.com/api/v1/badges/519e9e6b-06e0-4f1c-963a-998bc57d5f5f/deploy-status)](https://app.netlify.com/sites/mealchk/deploys)

# Overview
MealChk is a personal project I made for detecting potential artificial or processed ingredients, and can be used to help aid following a paleo, whole30, or clean-eating lifestyle.

Please note that due to the way manufacturers label food, in some cases some ingredients may not always be detected.

This tool should not be used alone, but rather to supplement other checks.

# How to use
To analyze an item, you can paste your ingredients list. Searching by photograph, android & iOS apps, and selecting between Paleo/Mediterranean diets is being considered in the future.

A hosted version of the app can be found at:
https://mealchk.app.rickyhewitt.me/

## Screenshots

### 1. Junk food
![Example - Fail](https://imgur.com/Ma55zvD.png "Example - Fail")

### 2. Healthy (compliant) food
![Example - Pass](https://imgur.com/za9BDOn.png "Example - Pass")

## Sharing results
MealChk includes the ability to share your results, even without installation.

## Installation (optional)
If you wish to run your own version of MealChk, you can just clone this repository and load index.html in your web browser locally. No installation required!

# Modifying
MealChk is built using vanilla HTML, CSS & Javascript.

If you wish to add or remove ingredients, you can do so by modifying prohibitedList within js/index.js.