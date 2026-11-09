require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }
});

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ROOM AI Backend ishlayapti!"
    });
});

app.post("/api/design", upload.single("roomImage"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Xona rasmini yuklang!"
        });
    }

    res.json({
        success: true,
        message: "Rasm qabul qilindi!",
        fileName: req.file.originalname,
        style: req.body.style,
        roomType: req.body.roomType,
        color: req.body.color
    });
});

app.listen(3000, () => {
    console.log("ROOM AI: http://localhost:3000");
});
// ROOM AI BACKEND CONNECTION

async function sendRoomToServer(imageFile, style, roomType, color) {
    const formData = new FormData();

    formData.append("roomImage", imageFile);
    formData.append("style", style);
    formData.append("roomType", roomType);
    formData.append("color", color);

    try {
        const response = await fetch("http://localhost:3000/api/design", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Xatolik yuz berdi");
        }

        console.log("ROOM AI SERVER:", result);

        return result;

    } catch (error) {
        console.error("SERVER ERROR:", error);
        alert("Server bilan bog‘lanib bo‘lmadi!");
        return null;
    }
}