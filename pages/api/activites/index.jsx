// // /pages/api/activites/index.js

// import dbConnect from '../../../utils/dbConnect';
// import Activite from '../../../modeles/Activite';

// dbConnect();

// const obtenirActivites = async (req, res) => {
//     try {
//         const activites = await Activite.find({});
//         res.status(200).json({ success: true, activites });
//     } catch (error) {
//         res.status(400).json({ success: false, error });
//     }
// };

// export default obtenirActivites;

import dbConnect from '../../../utils/dbConnect';
import Activite from '../../../modeles/Activite';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const activites = await Activite.find({});
        res.status(200).json({ success: true, data: activites });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'POST':
      try {
        const activite = await Activite.create(req.body);
        res.status(201).json({ success: true, data: activite });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
