/**
 * commonPage
 */

seajs.config({
  base:"./spm_modules",
  alias:{
    "jquery":"jquery/1.7.2/jquery-debug"
  }
});

seajs.use(['jquery'],function($){

  $(function(){
      //console.log('Hello World!');
  });

});