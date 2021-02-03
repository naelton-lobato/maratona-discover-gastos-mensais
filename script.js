const Modal = {
    open(){
      // abrir modal
      // adicionar class active ao modal
      document.querySelector('.modal-overlay').classList.add('active');
    }, 
    close(){
      // fecha modal
      // remove a class active do modal
      document.querySelector('.modal-overlay').classList.remove('active');
    }
}