$(document).ready(function(){
    $('#searchYouTube').autocomplete({source:JSON.parse(localStorage.getItem('searchYouTube')), minLength:1, delay:0});
});