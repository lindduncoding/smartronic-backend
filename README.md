## SMARTONIC-FT Backend

Repository for the necessary backend server of SMARTONIC-FT. The backend consists of 3 Docker containers for the Node.js webserver, MongoDB, and Mosquitto MQTT Broker.

## Setup

1. Fill in the necessary credentials and environment variables needed. Use `.env.example` for a reference
2. Run the docker daemon in the background. Example, on Fedora Linux 43:
```
sudo systemctl start docker
```
3. Build the docker compose file
```
sudo docker compose up --build -d
```
- the `--build` flag is used to force rebuild the webserver container in case a change is made
- the `-d` flag is used to run the containers in "detached" mode

## Testing

1. To see if the backend returns data correctly, visit `machine-ip:3000/speed` and expect speed data in JSON.
2. To see if the MQTT broker is doing its job, test by doing subscribing and publishing with `mosquitto_pub` and `mosquitto_sub` in the CLI to your machine's IP with port 1883. If any data is echoed to the subscriber, then the broker is working as expected.

## Credit

C03 Capstone DTETI FT UGM 2025