exports.createDish = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;
        const { categoryId } = req.params;

        if (!name || !description || !price || !image) {
            return res.status(400).send('Todos los campos son obligatorios: name, description, price, image');
        }

        const newDish = { name, description, price, image };

        const dishRef = await req.db
            .collection('categories')
            .doc(categoryId)
            .collection('dishes')
            .add(newDish);

        res.status(201).send({ id: dishRef.id });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getAllDishes = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const snapshot = await req.db.collection('categories')
            .doc(categoryId)
            .collection('dishes')
            .get();
        const dishes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(dishes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getDishById = async (req, res) => {
    try {
        const { categoryId, dishId } = req.params;
        const doc = await req.db.collection('categories')
            .doc(categoryId)
            .collection('dishes')
            .doc(dishId)
            .get();
        if (!doc.exists) return res.status(404).send('Plato no encontrado');
        res.send({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.updateDish = async (req, res) => {
    try {
        const { categoryId, dishId } = req.params;
        await req.db
            .collection('categories')
            .doc(categoryId)
            .collection('dishes')
            .doc(dishId)
            .update(req.body);

        res.send('Plato actualizado');
    } catch (err) {
        res.status(500).send(err.message);
    }
};


exports.deleteDish = async (req, res) => {
    try {
        const { categoryId, dishId } = req.params;
        await req.db.collection('categories')
            .doc(categoryId)
            .collection('dishes')
            .doc(dishId)
            .delete();
        res.send('Plato eliminado');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
