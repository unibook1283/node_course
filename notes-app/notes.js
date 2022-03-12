const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    debugger
    fs.writeFileSync('notes.json', dataJsON)
    debugger
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const modifiedNotes = notes.filter((note) => note.title !== title)
    if (modifiedNotes.length !== notes.length) {
        saveNotes(modifiedNotes)
        console.log(chalk.green.inverse(`${title} title note has removed`))
    } else {
        console.log(chalk.red.inverse('There is no note with the title'))
    }
}

const listNotes = () => {
    console.log(chalk.blue.inverse('Your notes'))
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(chalk.blue(note.title))
        console.log(note.body)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => {
        return note.title === title
    })
    if (note) {
        console.log(chalk.blue.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('no such note'))
    }
}

module.exports = {
    'addNote': addNote,
    'removeNote': removeNote,
    'listNotes': listNotes,
    'readNote': readNote
}