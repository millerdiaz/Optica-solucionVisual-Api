const { type } = require("express/lib/response");
const mongoose = require("mongoose")


const CitasSchema = new mongoose.Schema({

nombreCompleto: {
    type:String,
    required: true,
},

cedula:{
    type: Number,
    required: true,
},

telefono:{
    type: Number
},

email:{
    type: String,
    required: true,
},



    ciudad: {
        type: String,
        required: true,
        enum: ['Bogotá','Medellín', 'Cali']
    },
    tienda: {
        type: String,
        required: true,
        enum: [// Bogotá
            'Chapinero',
            'CC Titan Plaza',
            'CC el retiro',
            'CC Gran Estación',
            
            // Medellín
            
            'CC Oviedo',
            'CC El Tesoro',
            'CC Viva Envigado',
            
            // Cali
            
            'Palmetto Plaza',
            'Unicentro',
            'CC Jardín Plaza',]
    },

    // ciudadesYTiendas: { 
    //     type: String, 
    //     required: true,
        
    //     enum: {Bogotá: ['Chapinero', 'CC Titan Plaza', 'CC el retiro', 'CC Gran Estación'],
    //     Medellín: ['CC Oviedo', 'CC El Tesoro', 'CC Viva Envigado'],
    //     Cali: ['Palmetto Plaza','Unicentro', 'CC Jardín Plaza']
    //   }
    // },

    tipoDeCita: {
        type: String,
        required: true,
        enum: ['Examen de vista','Consulta oftalmológica', 'Cirugía láser']
    },

    especialista:{
        type: String,
        required: true,
        enum: [ 
            // Bogotá
            'Alberto Martínez',
            'Laura Gómez',
            'Juan Pérez',
            'Sofía Rodríguez',
            
            // Medellín
            'Carlos López',
            'Ana Morales',
            'Pedro Ramírez',
            
            // Cali
            'María Fernández',
            'José Torres',
            'Lucía Castro',
        ]
        
    },

    fecha: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false  
});


module.exports = mongoose.model("Citas", CitasSchema);


/*

{
"ciudad": "Bogotá",
"tienda": "Chapinero",
"tipoDeCita": "Examen de vista",
"especialista":"Alberto Martínez",
"fecha": 21032025,
"sede": "Teusquillo"

}

*/

