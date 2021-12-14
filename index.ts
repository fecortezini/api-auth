import App from './src/app';

(async ()=> {
    try {
        await App.seq.sync();
        await App.server.listen(3000, () => {
        console.log('O servidor está operante.');
        console.log('Banco de dados conectado.');
    })
    } catch (error) {
        console.log(error)
    }    
})();