// modulos externos
const inquirer = require('inquirer')

// modulos internos
const fs = require('fs');
const { Console } = require('console');
const { Cipher } = require('crypto');

operation()

function operation() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que deseja fazer: ',
        choices: [
            'Criar conta',
            'Depositar',
            'Consultar saldo',
            'Sacar',
            'Sair'
        ]
    }]).then((answer) => {
        const selectedAction = answer.action;

        if (selectedAction === 'Criar conta') {
            createAccount()
            buildAccount()
        } else if (selectedAction === 'Depositar') {
            deposit()
        } else if (selectedAction === 'Consultar saldo') {
            getAccountBalance()
        } else if (selectedAction === 'Sacar') {
            withdraw()
        } else if (selectedAction === 'Sair') {
            console.log('Obrigado, por usar o Accounts!')
            process.exit()
        }
    }).catch(err => console.log(err))
}

// Criar conta
function createAccount() {
    console.log('Parabéns por escolher o nosso banco!')
    console.log('Defina as opções da conta')
}

function buildAccount() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta:'
    }]).then((answer) => {
        const accountName = answer['accountName']
       
        // Verifica se a pasta "accounts" existe, se não, cria
        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        // Verifica se a conta já existe
        if (checkAccount(accountName)) {
            console.log('Esta conta já existe, escolha outro nome!')
            buildAccount()
            return //Não executa as linhas abaixo
        }

        // Cria o arquivo JSON da conta
        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function (err) { //Criando conta
            console.log(err)
        })

        console.log('Conta criada com sucesso')
        operation()

    }).catch(err => console.log(err))
}

// Depositar
async function deposit() {
    let accountName = await askAccountName(); //Para que a variavel seja acessivel fora do escopo
    
    if (checkAccount(accountName)) {
        inquirer.prompt([{
            name: 'amount',
            message: ('Quanto você deseja depositar: ')
        }]).then((answer) => {
            const amount = answer['amount']

            //Verificar se o valor de depósito é valido
            if ((!amount) || (amount <= 0)) {
                console.log('Ocorreu um erro, tente novamente');
                deposit();
                return;
            }

            // add an amount
            addAmount(accountName, amount)
            operation()

        }).catch(err => console.log(err))
            
    } else {
        console.log('Esta conta não existe')
        deposit()
        return
    }
}

function getSaldo(accountName){
    const accountData = getAccount(accountName)
    const amount = accountData.balance

    console.log(`O saldo atual é de: R$${amount} na conta ${accountName}`)
}

function addAmount(accountName ,amount) {
    const accountData = getAccount(accountName)

    // Adiciona o valor do depósito ao saldo da conta
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance) // que ?
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function (err) {
        console.log(err)
    })

    console.log(`Foi depositado o valor de R$${amount} na conta ${accountName}`)
}


// Consultar
async function getAccountBalance() {
    let accountName = await askAccountName(); // Aguarda a resolução da promessa para obter o nome da conta

    if(checkAccount(accountName)){
        getSaldo(accountName);
    }else {
        console.log('Esta conta não existe')
    }
    operation()

}


// Sacr
async function withdraw(){
    let accountName = await askAccountName();

    if(checkAccount(accountName)){
        inquirer.prompt([{
            name: 'amount',
            message: ('Qaunto você deseja sacar: ')
        }]).then((answer) => {
            const amount = answer['amount']

            if((!amount) || (amount <= 0)){
                console.log('Ocorreu um erro, tente novamente');
                sacar();
                return
            }

            // sub an amount
            subAmount(accountName, amount)
            operation()
            
            }).catch(err => console.log(err))

    }else{
        console.log('Esta conta não existe')
        withdraw()
        return
    }

}


function subAmount(accountName, amount){
    const accountData = getAccount(accountName)

    //Verificar se valor disponivel
    if(accountData.balance < amount){
        console.log('Operação não autorizada, saldo insuficiente')
        return
    }else{
        accountData.balance =  parseFloat(accountData.balance) - parseFloat(amount)
        console.log(`Saque realizado.`)
        console.log(`Saldo atual de R$${accountData.balance} na conta ${accountName}`)
    }
}
// Funções diversas 

function askAccountName() {
    return new Promise((resolve, reject) => {
        inquirer.prompt([{
            name: 'Name',
            message: 'Qual o nome da conta:'
        }]).then((answer) => {
            resolve(answer['Name']); // Resolvendo a promessa com o nome da conta
        }).catch(err => reject(err)); // Rejeitando a promessa em caso de erro
    });
}


function getAccount(accountName) {
    // Lê o arquivo JSON da conta
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })
    
    return JSON.parse(accountJSON) //O que exatamente esta fazendo ?
}

function checkAccount(accountName) {
    // Verifica se o arquivo da conta existe
    if (fs.existsSync(`accounts/${accountName}.json`)) {
        return true;
    } else {
        return false;
    }
}
