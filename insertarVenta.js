const AWS = require('aws-sdk');
const ddb= new AWS.DynamoDB.DocumentClient({
    region:'us-east-2'
});
exports.handler = async (event,context,callback) => {
    await insertarVenta(event).then( () =>
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
function insertarVenta(event){
    let idVenta = event.params.querystring.idventa
    let idLocal = event.params.querystring.idlocal;
    let idPedido = event.params.querystring.idpedido;
    const params = {
        TableName:'Ventas',
        Item:{
            'idVenta':idVenta,
            'idLocal':idLocal,
            'idPedido':idPedido,
        }
    }
    return ddb.put(params).promise();
}