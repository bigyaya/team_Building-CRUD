// /pages/api/activites/ajouter.js

import dbConnect from '../../../utils/dbConnect';
import Activite from '../../../modeles/Activite';

dbConnect();

const ajouterActivite = async (req, res) => {
    const { nom, description } = req.body;

    try {
        const activite = new Activite({ nom, description });
        await activite.save();
        res.status(201).json({ success: true, activite });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

export default ajouterActivite;
