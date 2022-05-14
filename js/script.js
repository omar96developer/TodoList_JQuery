$(document).ready(function (){
   

    $('.add-todo .btn').click(function (event){
        event.preventDefault();
        const todo = $('.template--todo').children().clone();
        $('.todos').prepend(todo);
        
        createInput(todo.children('.text'));
        saveTodo();
        deleteTodo();
        dropdown();
        doneTodo();
        updateTodo();
        searchTodo();

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

  function deleteTodo() {
    $(document).on('click', '.button-todo--delete', function (){
      $(this).parents('.todos__item').remove();
    });
  }

  function dropdown() {
    //traversing
    $(document).on('click','.other-items', function () {
      $(this).parent('.todo__item__menu').toggleClass('active');
      $(this).next('.todo__item__menu__dropdown').toggleClass('active');
    });
  
    /* ARE WE IN DROPDOWN AREA??? */

    $(document).on('mouseup', function(event){
      const isOnDropDown = $(event.target).parents('.todo__item__menu').hasClass('active') || $(event.target).parents('.todo__item__menu__dropdown').hasClass('active')

      if(!isOnDropDown) {
        $('.todo__item__menu').removeClass('active');
        $('.todo__item__menu__dropdown').removeClass('active');
      }
    });
  }
  
  function doneTodo() {
    $(document).on('click', '.button--done', function (){
      const parent = $(this).parents('.todos__item');
      const todosContainer = $(this).parents('.todos');

      if(parent.hasClass('todo--done')) {
        parent.removeClass('todo--done');
        todosContainer.prepend(parent);
      }else {
        parent.addClass('todo--done');
        todosContainer.append(parent);
      }
    });
  }
  
  function updateTodo() {
    $(document).on('dblclick', '.todos__item .text', function () {
      const todoText = $(this);
      if(!todoText.parents('.todos__item').hasClass('.todo--done')){
        createInput(todoText);
      }
    });

    $(document).on('click', '.button-todo--modify', function (){
      const todoText = $(this).parents('.todos__item').children('.text');
      createInput(todoText);
      $(this).parents('.todo__item__menu__dropdown').removeClass('active');
      $(this).parents('.todo__item__menu').removeClass('active');
      
    });
  }

  function searchTodo() {
    const search = $('.header__search');

    search.on({
      'click' : function() {
        $(this).addClass('active').children('.search').focus();
      },
      'focusout' : function() {
        $(this).removeClass('active');
      }
    });

    search.children('.search').on('keyup', function (){
      const text = $(this).val().toLowerCase();
      const todos = $('.todos .todos__item');

      todos.each(function (index) {
        const textTodo = $(this).find('.todo__text');
        const textTodoValue = textTodo.text();
        const position = textTodoValue.toLowerCase().indexOf(text);
        

        if(position !== -1){
          $(this).removeClass('hidden');
          const before = textTodoValue.slice(0, position);
          const after = textTodoValue.slice(position + text.length );
          const textToHighlight = textTodoValue.slice(position, position + text.length);
          console.log(before);
          console.log(after);
          console.log(textToHighlight);

          const newText = `${before}<span class='highlights'>${textToHighlight}</span>${after}`; 

          textTodo.html(newText);
        } else {
          $(this).addClass('hidden');
        }

      });
    });
  }
  
 
  