var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var isMushroom = function(item) { return item === "mushrooms" };
      productsICanEat = products.filter(function(item) {
        return !item.containsNuts && !_(item.ingredients).any(isMushroom);
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _(_.range(1, 1000)).chain()
        .filter(function(x) { return x % 3 === 0 || x % 5 === 0 })
        .reduce(function(sum, x) { return sum + x })
        .value();    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    var mushroomCount = _(products).chain()
        .map(function(item) { return item.ingredients })
        .flatten()
        .reduce(function(sum, ingredient) { return sum + (ingredient === 'mushrooms') }, 0)
        .value();

    expect(mushroomCount).toBe(2);
    // expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    function findLargestPrimeFactor(n) {
      var maxPrime = -1;
      while(n % 2 === 0) {
        maxPrime = 2;
        n /= 2;
      }

      for(var i=3; i<=n; i+=2) {
        while(n % i === 0) {
          maxPrime = i;
          n /= i;
        }
      }

      if(n > 2) maxPrime = n;
      return maxPrime;
    }

    expect(findLargestPrimeFactor(20)).toBe(5);
    expect(findLargestPrimeFactor(21)).toBe(7);
    expect(findLargestPrimeFactor(22)).toBe(11);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function largestPalindrome(num1, num2) {
      var resString = (num1 * num2).toString();
      var isPalindrome = function(item) {
        return item.split('').reverse().join('') === item;
      }
      // brute force
      var res = '';
      for(var i=0; i<resString.length; i++) {
        for(var j=i; j<resString.length; j++) {
          var sub = resString.substring(i, j+1);
          if(isPalindrome(sub) && sub.length > res.length) {
            res = sub;
          }
        }
      }
      return res.length > 1 ? res : "No Palindrome";
    }

    expect(largestPalindrome(111, 111)).toBe("12321");
    expect(largestPalindrome(123, 321)).toBe("No Palindrome");
    expect(largestPalindrome(110, 112)).toBe("232");
  });

  // it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

  // });

  // it("should find the difference between the sum of the squares and the square of the sums", function () {

  // });

  // it("should find the 10001st prime", function () {

  // });

});
