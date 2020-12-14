const path = {
    getAllComuna: {
        tipo: 'get',
        rutaRemota: '/services/comunas',
        rutaLocal: '',
    },
    getComunaByProvincia: {
        tipo: 'get',
        rutaRemota: '/comuna/provincia/25',
        rutaLocal: '',
    },
    getTiendasByUsuarios: {
        tipo: 'get',
        rutaRemota: `/direccion/usuario/:id:`,
        rutaLocal: '',
    },
    setPuntoRetiro: {
        tipo: 'post',
        rutaRemota: '/direccion/',
        rutaLocal: '',
    },
    setAllPuntoRetiro: {
        tipo: 'get',
        rutaRemota: '/direccion/',
        rutaLocal: '',
    },
    postLogin: {
        tipo: 'post',
        rutaRemota: '/auth/login',
        rutaLocal: '',
    },
    postRegistro: {
        tipo: 'post',
        rutaRemota: '/auth/registro',
        rutaLocal: '',
    },
    postTarifador: {
        tipo: 'post',
        rutaRemota: '/costo/tarifador/',
        rutaLocal: '',
    },
    postSetEncomienda: {
        tipo: 'post',
        rutaRemota: '/encomienda/',
        rutaLocal: '',
    },
    postUpdEstado: {
        tipo: 'post',
        rutaRemota: '/encomienda/:idEncomienda:',
        rutaLocal: '',
    },
    postGetAllEncomienda: {
        tipo: 'get',
        rutaRemota: '/encomienda/',
        rutaLocal: '',
    },
    postGetEncomiendaByDireccion: {
        tipo: 'get',
        rutaRemota: '/encomienda/direccion/:idDireccion:',
        rutaLocal: '',
    },
    getEncomiendabyUsuario: {
        tipo: 'get',
        rutaRemota: '/encomienda/usuario/:idUsuario:',
        rutaLocal: '',
    },
    getRepartidores: {
        tipo: 'get',
        rutaRemota: '/usuario/rol/3',
        rutaLocal: '',
    },
    getUsuarioByCorreo: {
        tipo: 'get',
        rutaRemota: '/usuario/mail/{correo}',
        rutaLocal: '',
    },
    getListUsuarios: {
        tipo: 'get',
        rutaRemota: '/usuario/',
        rutaLocal: '',
    },
    setRepartidores: {
        tipo: 'patch',
        rutaRemota: '/encomienda/:id:',
        rutaLocal: '',
    },
    setPagoRepartidor: {
        tipo: 'put',
        rutaRemota: '/encomienda/:id:',
        rutaLocal: '',
    },
    getLayOut: {
        tipo: 'get',
        rutaRemota: '/modulo/rol/:rol:',
        rutaLocal: '',
    },
    getDetalleRetartidor: {
        tipo: 'post',
        rutaRemota: '/encomienda/repartidor/',
        rutaLocal: '',
    },
    updEncomienda: {
        tipo: 'put',
        rutaRemota: '/encomienda/:id_encomienda:',
        rutaLocal: '',
    }

};

export {
    path
};
