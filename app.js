// подключение
const express = require('express');
const mongoose = require('mongoose');
const cards = require('./routes/cards');
const users = require('./routes/users');
const bodyParser = require('body-parser');
// создаем объект приложения
const app = express();
// начинаем прослушивать подключения на 3000 порту
const { PORT = 3000 } = process.env;
// подключаем парсер
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//подключимся к серверу MongoDB
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


app.use((req, res, next) => {
  req.user = {
    _id: '5f579905eb31450144252953',
  };

  next();
});

app.use('/users', users);
app.use('/cards', cards);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
