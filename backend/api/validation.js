module.exports = app => {    
    function existsOrError(value, msg) {// só passa se já existir
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
    }

    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch(msg) {
            return
        }
        throw msg
    }

    function equalsOrError(valueA, valueB, msg) {
        if(valueA != valueB) throw msg
    }

    function validID(id, msg) {
        if(!id) throw msg
        if(id < 1) throw msg
    }


    return { existsOrError, notExistsOrError, equalsOrError, validID }
}