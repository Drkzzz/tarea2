const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({
    region:'us-east-2'
});
exports.handler = async (event,context,callback) => {
    await verInventario(event).then(data => {
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
function verInventario(event){
    let idLocal = event.params.querystring.idlocal;
    let idProducto = event.params.querystring.idproducto;
    const params = {
        TableName: 'Inventario',
        KeyConditionExpression: 'idLocal = :idlocal AND idProducto = :idproducto',
        ExpressionAttributeValues:{
            ':idlocal':idLocal,
            ':idproducto':idProducto
        }
    }
    return ddb.query(params).promise();
}