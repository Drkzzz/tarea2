const AWS = require('aws-sdk');
const ddb= new AWS.DynamoDB.DocumentClient({
    region:'us-east-2'
});
exports.handler = async (event,context,callback) => {
    await insertarPedido(event).then( () =>
        callback(null,{
            statusCode:201,
            body:'',
            headers:{
                'message':'Inserción realizada con éxito!' 
            }
        }).catch((err)=>
            console.err(err)
        )
    );
};
function insertarPedido(event){
    let idPedido = event.params.querystring.idpedido;
    let idLocal = event.params.querystring.idlocal;
    let estadoPedido = event.params.querystring.estadopedido;
    let montoPedido= event.params.querystring.montopedido;
    let rutCliente = event.params.querystring.rutcliente;
    const params = {
        TableName:'Pedido',
        Item:{
            'idPedido':idPedido,
            'idLocal':idLocal,
            'estadoPedido':estadoPedido,
            'montoPedido':montoPedido,
            'rutCliente':rutCliente
        }
    }
    return ddb.put(params).promise();
}