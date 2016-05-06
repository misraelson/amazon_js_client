var baseUrl = "http://localhost:3000/";

 $(document).ready(function(){
   $.ajax({
     method: "GET",
     url: baseUrl + "products.json",
     success: function(products){
       // Step 1: Fetch the Template HTML from the DOM
       var template = $('#products-summary').html();
       // Step 2: Parse the template. optional, speeds up future uses
       Mustache.parse(template);
       for(var i = 0; i < products.length; i++) {
         // Step 3: We generate HTML using the data we get and the template we parsed
         // questions[i] -> {title: "hello world", id: 14, view_count: 10}
          var rendered = Mustache.render(template, products[i]);
          // Step 4: Add the rendered HTML to the DOM
          $("#products").append(rendered);
       }
     },
     error: function() {
       alert("Problem loading products. Please retry!");
     }
   });

   $("#products").on("click", "h2 a", function(){
     $.ajax({
       method: "GET",
       url: baseUrl + "products/" + $(this).data("id") + ".json",
       success: function(product){
         console.log("product" + product);
         var template = $("#product-details").html();
         Mustache.parse(template);
         var rendered = Mustache.render(template, product);
         $("#single-product").html(rendered);
       $("#products").fadeOut(500, function(){
         $("#single-product").fadeIn(500);
       });
     },
       error: function(){
         alert("Error loading product. Please try again");
       }
     });
   });

   $("#single-product").on("click", "#back", function(){
     $("#single-product").fadeOut(500, function(){
       $("#products").fadeIn(500);
     });
   });

 });
