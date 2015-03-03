/**
 * commonPage
 */

seajs.config({
  base:"./spm_modules",
  alias:{
    "jquery":"jquery/1.8.3/jquery"
  }
});

seajs.use(['jquery'],function($){

  $(document).ready(function(){
    alert('Hello World!');
  });

});