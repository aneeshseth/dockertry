const express = require('express')
const app = express();
const port = 3001
const Docker = require('dockerode')




app.get('/', async (req, res) => {
  try {
    const docker = new Docker({ socketPath: '/var/lib/docker.sock' })
    //const filePathInsideContainer = '/home/node/app/myfile.txt'
    const container = await docker.getContainer('d09c38fff662');
    console.log(container)
    await container.exec(
        (err, exec) => {
            console.log("EXEC")
          if (err) {
            console.log("ERROR")
            console.error('Error creating exec instance:', err);
            return;
          }
          console.log(exec)
    })
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send('Failed to add course');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


