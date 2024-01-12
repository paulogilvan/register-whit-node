const express = require('express');
const uuid = require('uuid');
const cors = require('cors');

const port = 3000;
const server = express();
server.use(express.json()); // for parsing application/json
server.use(cors());

const users = [];

server.get('/users', (req, res) => {    
    return res.json(users);
})
server.post('/users', (req, res) => {   
try {
    const { name, age } = req.body;

    const user = { id:uuid.v4(), name, age }

    users.push(user);
    
    return res.status(201).json(user);
} catch(err) {
    return res.status(500).json({error:err.message})
}
})
server.put('/users/:id', (req, res) => {    
    const { id } = req.params;
    const { name, age } = req.body;

    const updatedUser = { id, name, age }

    const index = users.findIndex(user => user.id === id);

    if(index < 0) {
        return res.status(404).json({ message: "User not found" });
    }
    users[index] = updatedUser;
    
    return res.json(updatedUser);
})
server.delete('/users/:id', (req, res) => {   
    const { id } = req.params;

    const index = users.findIndex(user => user.id === id);

    if(index < 0) {
        return res.status(404).json({ message: "User not found" });
    }
    users.splice(index,1);    

    return res.status(204).json();
})

server.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)    
});