const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({
    region:'us-east-2'
});
exports.handler = async (event,context,callback) => {
    await verPedido(event).then(data => {
        callback(null,{
            statusCode:200,
            body:data.Items,
            headers:{
                'message':'Query Realizado con éxito!'
            }
        })
    }).catch((err)=>{
        console.error(err);
    })
};
function verPedido(event){
    let idPedido = event.params.querystring.idpedido;
    let idLocal = event.params.querystring.idlocal;
    const params = {
        TableName: 'Pedido',
        KeyConditionExpression: 'idPedido = :idpedido AND idLocal = :idlocal',
        ExpressionAttributeValues:{
            ':idlocal':idLocal,
            ':idpedido':idPedido,
        }
    }
    return ddb.query(params).promise();
}