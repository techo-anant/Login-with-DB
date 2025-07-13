const express = require('express')
const cors = require('cors')

const app = express();
const PORT = 5000;

//Middleware
app.use(cors());
app.use(express.json());


//Routes
app.get('/', (req, res) => {
    res.send('This is the backend.')
})

//Setup server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
