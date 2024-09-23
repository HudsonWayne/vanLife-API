import express from 'express';
import {getAllVans,updateVan,createVan,getVanById,deleteVan}from "../../src/controllers/vanController"

const router =express.Router()


router.get("/vans", getAllVans);
router.get("/vans/:id", getVanById);
router.post("/vans", createVan);
router.put("/vans/:id", updateVan);
router.delete("/vans/:id", deleteVan);

export default router