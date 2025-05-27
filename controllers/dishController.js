exports.createDish = async (req, res) => {
    try {
        const { name, description, price, visible } = req.body;
        const { categoryId } = req.params;

        if (!name || price === undefined || price === null) {
            return res.status(400).send('Todos los campos son obligatorios: name, price');
        }

        const newDish = {
            name,
            description,
            price,
            visible: visible ?? true
        };

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
        const snapshot = await req.db.collectionGroup('dishes').get();
        const dishes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            categoryId: doc.ref.parent.parent.id
        }));
        res.status(200).json(dishes);
    } catch (error) {
        console.error('Error al obtener los platos:', error);
        res.status(500).json({ error: 'Error al obtener los platos' });
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
