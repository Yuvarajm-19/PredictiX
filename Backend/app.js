import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import predRouter from "./routes/prediction.routes.js";
import pdfRouter from "./routes/pdf.routes.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.indexOf("*") !== -1 ||
        allowedOrigins.indexOf(origin) !== -1
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PredictiX Backend is running",
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/predict", predRouter);
app.use("/api/pdf", pdfRouter);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export { app };