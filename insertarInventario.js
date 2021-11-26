const AWS = require('aws-sdk');
const ddb= new AWS.DynamoDB.DocumentClient({
    region:'us-east-2'
});
exports.handler = async (event,context,callback) => {
    await insertarInventario(event).then( () =>
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
function insertarInventario(event){
    let idLocal = event.params.querystring.idlocal;
    let idProducto = event.params.querystring.idproducto;
    let nombreProducto = event.params.querystring.nombreproducto;
    let cantidadProducto = event.params.querystring.cantidadproducto;
    const params = {
        TableName:'Inventario',
        Item:{
            'idLocal':idLocal,
            'idProducto':idProducto,
            'nombreProducto':nombreProducto,
            'cantidadProducto':cantidadProducto
        }
    }
    return ddb.put(params).promise();
}