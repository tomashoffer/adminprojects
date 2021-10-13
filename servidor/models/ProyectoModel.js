const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


// trim quita los espacios

module.exports = mongoose.model('Proyecto', ProyectoSchema)