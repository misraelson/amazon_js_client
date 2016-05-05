var baseUrl = "http://localhost:3000/";
 
 $(document).ready(function(){
   $.ajax({
     method: "GET",
     url: baseUrl + "questions.json",
     success: function(questions){
       // Step 1: Fetch the Template HTML from the DOM
       var template = $('#question-summary').html();
       // Step 2: Parse the template. optional, speeds up future uses
       Mustache.parse(template);
       for(var i = 0; i < questions.length; i++) {
         // Step 3: We generate HTML using the data we get and the template we parsed
         // questions[i] -> {title: "hello world", id: 14, view_count: 10}
          var rendered = Mustache.render(template, questions[i]);
          // Step 4: Add the rendered HTML to the DOM
          $("#questions").append(rendered);
       }
     },
     error: function() {
       alert("Problem loading questions. Please retry");
     }
   });

   $("#questions").on("click", "h2 a", function(){
     $.ajax({
       method: "GET",
       url: baseUrl + "questions/" + $(this).data("id") + ".json",
       success: function(question){
         var template = $("#question-details").html();
         Mustache.parse(template);
         var rendered = Mustache.render(template, question);
         $("#single-question").append(rendered);
       $("#questions").fadeOut();
     },
       error: function(){
         alert("Error loading question. Please try again");
       }
     });
   });

   $("#single-question").on("click", "#back", function(){
     $("#single-question").fadeOut(500, function(){
       $("#questions").fadeIn(500);
     });
   });

 });
