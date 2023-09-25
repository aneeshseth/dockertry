const express = require('express')
const app = express();
const port = 3001
const Docker = require('dockerode')




app.get('/', async (req, res) => {
  try {
    const docker = new Docker({ socketPath: '/var/run/docker.sock' })
    //const filePathInsideContainer = '/home/node/app/myfile.txt'
    const container = await docker.getContainer('aneeshseth/simp');
    console.log(container)
   console.log("check one")
    const exec = await container.exec({Cmd: ['shasum', '-'], AttachStdin: true, AttachStdout: true})
    console.log("check 2" + exec) 
    const stream = await exec.start()
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).send('Failed to add course');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



    /*
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
    */