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

// eu preciso somar as entradas
// depois eu preciso somar as saídas
// remover das entradas as saídas
// assim, eu terei o total

const Transaction = {
    all: [
        {
            description: 'Luz',
            amount: -50001,
            date: '23/01/2021',
        }, 
        {
            description: 'Website',
            amount: 500000,
            date: '23/01/2021',
        }, 
        {
            description: 'Internet',
            amount: -20012,
            date: '23/01/2021',
        }, 
        {
            description: 'App',
            amount: 200000,
            date: '23/01/2021',
        }
    ],

    add(transaction){
        Transaction.all.push(transaction)
        //console.log(Transaction.all)
        App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes(){
        let income = 0;
        // pegar todas as Transações

        // para cada transação,
        Transaction.all.forEach(transaction => {
            //se ela for menor que zero
            if( transaction.amount > 0){
                //somar a varial e retornar a variavel
                income += transaction.amount;
            }
        })
        //soma a uma variavel e retornar a variavel
        return income;
    }, 

    expenses(){
        let expense = 0;
        // pegar todas as Transações

        // para cada transação,
        Transaction.all.forEach(transaction => {
            //se ela for maior que zero
            if( transaction.amount < 0){
                //somar a varial e retornar a variavel
                expense += transaction.amount;
            }
        })
         
        //soma a uma variavel e retornar a variavel
        return expense;
    },

    total(){
        return Transaction.incomes() + Transaction.expenses();
    }
}

// subtituir os dados do HTML COM OS DADOS DO JS

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount =  Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação" srcset="">
            </td>
        `
        return html
    },

    updateBalance() { // entrada, saida e total
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount (value) {
        value = Number(value) * 100 //Number(value.replace(/\,\./g, ""))*100
        
        return value
    },
    formatDate(date){
        const splitteDate = date.split("-")
        
        return `${splitteDate[2]}/${splitteDate[1]}/${splitteDate[0]}`
    },
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        
        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),///
    amount: document.querySelector('input#amount'),///
    date: document.querySelector('input#date'),///

    getValues(){
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields(){
        const {description, amount, date} = Form.getValues()

        if(
            description.trim() === "" || // verficand se está vazio
            amount.trim() === "" ||
            date.trim() === ""){
                throw new Error("Por favor, prencha todos os campos!")
        }
    },

    formatValues(){
        let {description, amount, date} = Form.getValues()
        
        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }

    },

    //saveTransaction(transaction){
    //    Transaction.add(transaction)
    //},

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event){
        event.preventDefault()

        try{
            //verificar se todas as informações foram preenchidas
            Form.validateFields()
            //formatar os dados para salvar
            const transaction = Form.formatValues()
            // salvar 
            Transaction.add(transaction)
            // apagar os dados do formularios
            Form.clearFields()
            // modal feche
            Modal.close()
            // atualizar a aplicação
            //App.reload()  ja temos um App.reload no Transaction.add
        } catch(error){
            alert(error.message)
        }
        
    }
}

const App = {
    init() {
        /* forEach
        for(let i=0; i<3; i++){
        console.log(i)
        }*/
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance() //chamando a funcação

    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()






