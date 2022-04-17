import cors from "cors";
import DockerModem from "docker-modem";
import express, { json, Router } from "express";

const app = express();
const router = Router();

router.all(`/docker/*`, (req, res) => {
  const request = {
    method: req.method,
    path: req.url.replace("/docker", "*"),
    dial: req.body.dial,
  };

  const modem = new DockerModem({
    socketPath: "/var/run/docker.sock",
  });
  modem.dial(
    {
      ...request.dial,
    },
    (err, dockerResponse) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send(dockerResponse);
    }
  );
});

app.use(json());
app.use(cors());
app.use(router);

app.listen(3039, () => {
  console.log(`server litening at port 3039`);
});
