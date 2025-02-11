const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Autorise toutes les connexions (à restreindre en prod)
    },
});

app.use(cors());

// Stockage des parties en mémoire
const games = {};

io.on("connection", (socket) => {
    console.log("Un joueur s'est connecté :", socket.id);

    // Rejoindre une partie
    socket.on("joinGame", ({ gameId, playerName }) => {
        if (!games[gameId]) {
            games[gameId] = { players: [], rolls: [] };
        }

        if (games[gameId].players.length < 10) {
            games[gameId].players.push({ id: socket.id, name: playerName });

            socket.join(gameId);
            io.to(gameId).emit("updatePlayers", games[gameId].players);
        } else {
            socket.emit("gameFull", "La partie est pleine !");
        }
    });

    // Lancer un dé
    socket.on("rollDice", (gameId) => {
        const roll = Math.floor(Math.random() * 6) + 1; // Dé à 6 faces
        games[gameId].rolls.push(roll);

        io.to(gameId).emit("newRoll", { player: socket.id, roll });
    });

    // Déconnexion d’un joueur
    socket.on("disconnect", () => {
        Object.keys(games).forEach((gameId) => {
            games[gameId].players = games[gameId].players.filter((p) => p.id !== socket.id);
            io.to(gameId).emit("updatePlayers", games[gameId].players);
        });
    });
});

server.listen(3000, () => {
    console.log("Serveur en écoute sur http://localhost:3000");
});