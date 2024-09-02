const express = require('express');
const { faker, fakerKO } = require('@faker-js/faker');
const { default: axios } = require('axios');

const app = express();
const PORT = 3000;

//JSON 타입의 데이터 처리
app.use(express.json())

app.get('/api/users', (req, res) => {
    const users = Array.from({ length: 30 }).map(() => ({
        id: fakerKO.string.uuid(),
        name: fakerKO.person.fullName(),
        email: fakerKO.internet.email(),
        address: fakerKO.location.streetAddress(),
        phone: fakerKO.phone.number(),
        avatar: fakerKO.image.avatar()
    }));
    res.json(users);
});


app.post('/api/notice', async (req, res) => {
   const notice = {
        userId: fakerKO.string.uuid(),
        title: fakerKO.commerce.productName(),
        body: fakerKO.lorem.paragraph({
            min: 3,
            max: 10,
        }),
    }

   
    const result = await axios.post('https://jsonplaceholder.typicode.com/posts', notice);

    return res.status(200).json(result.data) 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});