import cors from "cors";
import DockerModem from "docker-modem";
import express, { json, Router } from "express";

const app = express();
const router = Router();

router.all(`/docker/*`, (req, res) => {
  const modem = new DockerModem({
    socketPath: "/var/run/docker.sock",
  });
  modem.dial(
    {
      ...req.body.dial,
      statusCodes: {
        200: "Salve true",
      },
    },
    (err, dockerResponse) => {
      console.log("DOCKER DIAL", {
        err,
        dockerResponse,
      });
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({
          dockerResponse: true,
        });
      }
    }
  );
});

app.use(json());
app.use(cors());
app.use(router);

app.listen(3039, () => {
  console.log(`server litening at port 3039`);
});
