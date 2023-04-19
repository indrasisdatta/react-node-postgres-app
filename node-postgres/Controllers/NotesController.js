const client = require('./../db');

const findAllNotes = async (req, res) => {
    try {
        const query = await client.query(
            'SELECT * FROM notes',
        );
        if (query) {
            res.status(200)
                .json({
                    status: 1,
                    data: query.rows
                })
        }    
    } catch (e) {
        res.json({
            status: 0,
            data: null,
            err: e
        })
    }
}

const findById = async (req, res) => {
    try {
        if (!req.params.notesId) throw new Exception('Invalid params')

        const query = await client.query(
            'SELECT * FROM notes WHERE id = $1',
            [req.params.notesId]
        );
        if (query) {
            res.status(200)
                .json({
                    status: 1,
                    data: query.rows
                })
        }    
    } catch (e) {
        res.json({
            status: 0,
            data: null,
            err: e
        })
    }
}

const addNotes = async (req, res) => {
    console.log('Add notes Controller..', req.body); 
    try {
        const query = await client.query(
            'INSERT INTO NOTES (notes) VALUES ($1)', 
            [req.body.notes]
        );
        if (query) {
            res.json({
                status: 1,
                data: query
            })
        } else {
            res.json({
                status: 0,
                data: null
            })
        } 
    } catch (e) {
        res.json({
            status: 0,
            data: null,
            err: e
        })
    }       
}

const updateNotes = async (req, res) => {
    console.log('Add notes Controller..', req.body, req.params);  
    try {
        const query = await client.query(
            'UPDATE NOTES SET notes = ($1) WHERE id = ($2)', 
            [req.body.notes, req.params.notesId]
        );
        if (query) {
            res.json({
                status: 1,
                data: query
            })
        } else {
            res.json({
                status: 0,
                data: null
            })
        } 
    } catch (e) {
        res.json({
            status: 0,
            data: null,
            err: e
        })
    }       
}

module.exports = {
    findAllNotes,
    findById,
    addNotes,
    updateNotes
}