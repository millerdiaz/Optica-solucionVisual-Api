const Citas = require("../Models/citas.models");

exports.createCitas = async (req, res) => {
  try {
    const dataUser = req.body;
    console.log(dataUser);
    
    await Citas.create(dataUser);
    return res.json({ ok: true, msg: "Cita creada correctamente" });
  } catch (error) {
    console.log(error.message);
    
    res.send("Error al crear Cita");
  }
};

// Obtener todas las citas
exports.getCitas = async (req, res) => {
  try {
    const citas = await Citas.find();
    res.status(200).json(citas);
  } catch (error) {
    console.error("Error al obtener citas:", error.message);
    res.status(500).json({ error: "Se ha generado un error" });
  }
};

// Obtener una cita específica por ID
exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;

    if (id.length === 24) {
      // Longitud válida para un ObjectId
      const cita = await Citas.findById(id);

      if (cita) {
        res.status(200).json(cita);
      } else {
        res.status(404).json({ error: "No se encontró una cita con ese ID" });
      }
    } else {
      res.status(400).json({ error: "El ID no tiene la longitud requerida" });
    }
  } catch (error) {
    console.error("Error al obtener la cita:", error.message);
    res.status(500).json({ error: "Se ha generado un error" });
  }
};

// Crear una nueva cita
exports.addCitas = async (req, res) => {
  try {
    const cita = req.body;
    const idUsuario = cita.documentoIdentidad;

    // Verificar si ya existe una cita con el mismo documento
    const buscarCita = await Citas.findOne({ documentoIdentidad: idUsuario });

    if (!buscarCita) {
      const citaNueva = new Citas(cita);
      await citaNueva.save();
      res.status(201).json(citaNueva);
    } else {
      res
        .status(409)
        .json({ error: "Ya existe una cita creada con esa identificación" });
    }
  } catch (error) {
    console.error("Error al crear la cita:", error.message);
    res.status(500).json({ error: "Se ha generado un error" });
  }
};

// Eliminar una cita
exports.deleteCitas = async (req, res) => {
  try {
    const id = req.params.id;

    if (id.length === 24) {
      const cita = await Citas.findById(id);

      if (cita) {
        await Citas.findByIdAndDelete(id);
        res.status(200).json({ message: "Cita eliminada exitosamente" });
      } else {
        res.status(404).json({ error: "No se encontró una cita con ese ID" });
      }
    } else {
      res.status(400).json({ error: "El ID no tiene la longitud requerida" });
    }
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
    res.status(500).json({ error: "Se ha generado un error" });
  }
};

// Modificar una cita
exports.modificarCitas = async (req, res) => {
  try {
    const id = req.params.id;
    const modificaciones = req.body;

    if (id.length === 24) {
      // Verificar longitud del ID
      const cita = await Citas.findById(id);

      if (cita) {
        Object.assign(cita, modificaciones);
        const citaActualizada = await cita.save();
        res.status(200).json(citaActualizada);
      } else {
        res.status(404).json({ error: "No se encontró una cita con ese ID" });
      }
    } else {
      res.status(400).json({ error: "El ID no tiene la longitud requerida" });
    }
  } catch (error) {
    console.error("Error al modificar la cita:", error.message);
    res.status(500).json({ error: "Se ha generado un error" });
  }
};

