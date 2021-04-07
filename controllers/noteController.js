const generator = require('../utils/generator')
const memStorage =  require('../utils/memory.storage')
const model = require('../model/note.model');

exports.getAllNotes = (req, res)=>{
    const values = memStorage.getValues(memStorage.store)
    console.log(JSON.stringify(values))
    return res.status(200).send(JSON.stringify(values))
}

exports.saveNotes = (req, res)=>{
    const seqId = generator.generate()
    const createdBy ="admin"
    const createdOn = new Date()
    const title = req.body.title
    const content  = req.body.content 

    if (!title || !content){
       return  res.status(500).send({error: 'Title and content are required fields'})

    }
    const Note = model.Note
    const noteObj = new Note (seqId , title , content , createdBy, createdOn)
    memStorage.store.setItem (seqId , noteObj)
    return res.status(201).send ('successfully created note')
}


exports.updateNote = (req , res )=>{
    const createdBy = "admin"
    const createdOn = new Date()

    const noteId = req.body.noteId 
    const title = req.body.title 
    const content = req.body.content 
     if (!noteId ){
         return res.status(500).send({error : 'noteId is required '})
     }

     if(!title || !content ){
         return res.status(500).send ({error : 'title and content are required '})
     }
     const noteItem = memStorage.store.getItem(noteId)

     /* if (!noteItem){
         return res.status(500).send({error: 'noteId is not valid'})
     } */
     const Note = model.Note
     const noteObj = new Note (noteId , title, content , createdBy , createdOn)
     memStorage.store.setItem(noteId , noteObj)
     return res.status(200).send('note updated successfully ')

}

exports.deleteNote = (req, res)=>{
    const noteId = req.params.noteId

    if (!noteId){
        return res.status(500).send({error: " cant find the note"})
    }
    const noteItem  = memStorage.store.getItem(noteId)
    if(!noteItem){
        return res.status(500).send({error :"note id is invalid"})

    }
    memStorage.store.removeItem(noteId)
    return res.status(200).send("successfully deleted ")
}