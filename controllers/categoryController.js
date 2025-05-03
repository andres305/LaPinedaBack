exports.createCategory = async (req, res) => {
    try {
        const docRef = await req.db.collection('categories').add(req.body);
        res.status(201).send({ id: docRef.id });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const snapshot = await req.db.collection('categories').get();
        const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(categories);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const doc = await req.db.collection('categories').doc(req.params.id).get();
        if (!doc.exists) return res.status(404).send('Categoría no encontrada');
        res.send({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.updateCategory = async (req, res) => {
    try {
        await req.db.collection('categories').doc(req.params.id).update(req.body);
        res.send('Categoría actualizada');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await req.db.collection('categories').doc(req.params.id).delete();
        res.send('Categoría eliminada');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
