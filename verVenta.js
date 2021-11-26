const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({
    region:'us-east-2'
});
exports.handler = async (event,context,callback) => {
    await verVenta(event).then(data => {
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
function verVenta(event){
    let idVenta = event.params.querystring.idventa;
    let idPedido = event.params.querystring.idpedido;
    const params = {
        TableName: 'Ventas',
        KeyConditionExpression: 'idVenta = :idventa AND idPedido= :idpedido ',
        ExpressionAttributeValues:{
            ':idventa':idVenta,
            ':idpedido':idPedido
        }
    }
    return ddb.query(params).promise();
}