$(document).ready(function (){
    /* CRUD for todo list */

    /* 1 create */

    $('.add-todo .btn').click(function (event){
        event.preventDefault();
        const todo = $('.template--todo').children().clone();
        $('.todos').prepend(todo);

        createInput(todo.children('.text'));
        saveTodo();

    });

    
  });



  function createInput(todo){
      const textTodo = $(todo).children('.todo__text').text();
      const input = $('.template--text').children().clone();

      todo.children('.todo__text').html(input);
      
     
      input.val(textTodo).focus().focusout(function () {
        const input = $(this);

        if(textTodo.trim().length > 0){
          input.parent('.todo__text').html(textTodo);
        } else {
          input.parents('.todos__item').remove();
        }
      })
      
     .keyup(function (event) {
          const input = $(this);
  
          if(event.keyCode === 27 && textTodo.trim().length > 0) {
            input.parent('.todo__text').html(textTodo);
          } else if (event.keyCode === 27 && textTodo.trim().length === 0){
            input.parents('.todos__item').remove();
          }
        }); 
  }
  
  function saveTodo() {
    //save on enter
    $(document).on( 'keypress', '.todo__text__input', function (event) {
      if(event.keyCode === 13) {
        const input = $(this);
        if(input.val().trim().length > 0) {
          input.parent('.todo__text').html(input.val());
        } else {
          input.parents('.todos__item').remove();
        }
      }
    });
  }
  
 
  /* 2 read */
  /* 3 update */
  /* 4 delete */