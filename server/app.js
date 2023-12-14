const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const Sequelize=require('sequelize')

const {sequelize,meeting}=require('./model/meeting')
// const dataRouter=require('./router/data')

const app=express()

app.use(cors())
app.use(bodyparser.json())

sequelize.sync()
.then(res=>{
    // console.log(res)
    console.log("Connected Successfully")
    app.listen(4000)
})
.catch(err=>{
    console.log(err)
})


// Routes
app.get('/meetings', async (req, res) => {
    try {
      const meetings = await meeting.findAll();
      res.send(meetings)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.put('/:id', async (req, res) => {
    try {
        const id=req.params.id
        const time=req.body.time
        const user=req.body.user
      const availableSlots = req.body.availableSlots // Assuming each meeting has one available slot
      const newMeeting = await meeting.findAll({where:{id:id}});
      newMeeting[0]=time
      newMeeting[0]=availableSlots-1
      newMeeting[0]=user
      console.log(newMeeting[0])
      await newMeeting[0].save()
      // res.send(newMeeting[0])
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.delete('/meetings/:id', async (req, res) => {
    try {  
      const id=req.params.id
        const time=req.body.time
        const user=req.body.user
      const availableSlots = req.body.availableSlots // Assuming each meeting has one available slot
      const newMeeting = await meeting.findAll({where:{id:id}});
      newMeeting[0]=time
      newMeeting[0]=availableSlots+1
      newMeeting[0]=user
      await newMeeting[0].save()
  
      res.json({ message: 'Meeting canceled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// app.get('/', (req, res) => {
//     const userId = req.query.id;
//     console.log(userId)
//   });

// app.use('/',dataRouter)



// app.listen(3000)