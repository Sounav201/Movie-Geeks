$(document).ready(() => {
$('#searchform').on('submit',(e) => {
   let SearchText= ($('#SearchText').val());
   getMovies(SearchText);
    e.preventDefault();  //Stops the form from actually submitting to a file
    });
});

function getMovies(SearchText) {
 //   console.log(SearchText);
 axios.get('http://www.omdbapi.com?s=' + SearchText + '&apikey=9350130e')
    .then( (response) => {
     console.log(response);
     let mistake=response.data.Error;   
     let movies=response.data.Search;
     //alert(error);
     let OP='';
     let MP='';
    
     $.each(movies, (index, movie) => {
         OP +=` 
         <div class="col-md-3">
         <div class="well text-center">
           <img src="${movie.Poster}">
           <h5>${movie.Title}</h5>
           <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
         </div>
       </div>
     `;
    
     });
     $(mistake,(e) => {
      MP +=`<h4>${e.Error}`;
     
   
   
   });

   $('#movies').html(OP);            //displays the result to the screen
   
 }) 
    .catch((err) => {
        console.log(err)
        console.log("Its wrooong");
        $('#movies').html(err);
    });
}
//IN CASE USER TYPES THE NAME OF A MOVIE WHICH IS NOT FOUND
axios.get('http://www.omdbapi.com?s=' + SearchText + '&apikey=9350130e') 
.then( (response) => {
let error=response.data.Response;
let OPE='';
$(error =>{
 
  OPE+=`<div class="well text-center">
        <h4>Oops..the movie you entered cannot be found..</h4>
        </div>`;
        
 });
 $('#movies').html(OPE);
});

//FOR MOVIE PAGE

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
  }
  
  function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
  
    axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=9350130e')
      .then((response) => {
        console.log(response);
        let movie = response.data;
  
        let output =`
          <div class="row">
            <div class="col-md-4">
              <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.Title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Plot</h3>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-default">Go Back To Search</a>
            </div>
          </div>
        `;
  
        $('#movie').html(output);
      })
      .catch((err) => {
        console.log(err);
      });
  }


