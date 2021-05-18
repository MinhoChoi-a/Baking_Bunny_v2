const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Item = require('../models/Item')

const api = supertest(app)

const Note = require('../models/Item')

const initialItems = [

    {   a: '',
        b: '' 
    }
]

beforeEach(async () => {
    await Item.deleteMany({})

    let itemObject = new Item(initialItems[0])
    await itemObject.save()
    itemObject = new Item(initialItems[1])
    await itemObject.save()
})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/) //RegEx syntax (to match character combinations in strings)
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialItems.length)
})

test('the first note is about HHTP methods', async () => {
    const response = await api.get('/api/notes')

    expect(response.body[0].content).toBe('HTML is easy')
})

test('a specific item is within the returned items', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    expect(contents).toContain('something')
})


afterAll(() => {
    mongoose.connection.close()
})


//npm test -- -t 'asdf' : implement test that contain asdf in their name