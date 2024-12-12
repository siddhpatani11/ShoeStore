import express from 'express';
import mongoose from 'mongoose';
import { Shoe } from '../models/shoeModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    if (!request.body.name || !request.body.brand || !request.body.year) {
      return response.status(400).send({
        message: 'Send all required fields: name, brand, year',
      });
    }
    const newShoe = {
      name: request.body.name,
      brand: request.body.brand,
      year: request.body.year,
    };

    const shoe = await Shoe.create(newShoe);
    return response.status(201).send(shoe);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { year } = req.query;
    let shoes;

    if (year) {
      shoes = await Shoe.find({ year });
    } else {
      shoes = await Shoe.find();
    }

    return res.status(200).json({ data: shoes });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get('/years', async (req, res) => {
  try {
    const years = await Shoe.distinct('year');
    return res.status(200).json({ data: years });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ID' });
  }

  try {
    const shoe = await Shoe.findById(id);
    if (!shoe) {
      return res.status(404).send({ message: 'Shoe not found' });
    }
    return res.status(200).json(shoe);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put('/:id', async (request, response) => {
  try {
    if (!request.body.name || !request.body.brand || !request.body.year) {
      return response.status(400).send({
        message: 'Send all required fields: name, brand, year',
      });
    }

    const { id } = request.params;
    const result = await Shoe.findByIdAndUpdate(id, request.body, { new: true });

    if (!result) {
      return response.status(404).json({ message: 'Shoe not found' });
    }

    return response.status(200).send({ message: 'Shoe updated successfully', data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Shoe.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Shoe not found' });
    }

    return response.status(200).send({ message: 'Shoe deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
