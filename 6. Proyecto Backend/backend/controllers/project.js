'use strict';

const Project = require('../models/project');
const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises'); // fs con promesas

const controller = {
	// ----------------------------
	// Básicos
	// ----------------------------
	home(req, res) {
		return res.status(200).send({ message: 'Soy la home' });
	},

	test(req, res) {
		return res
			.status(200)
			.send({ message: 'Soy el metodo o accion test del controlador de project' });
	},

	// ----------------------------
	// CREATE
	// ----------------------------
	saveProject: async function (req, res) {
		try {
			const params = req.body ?? {};
			const required = ['name', 'description', 'category', 'year', 'langs'];
			for (const f of required) {
				if (params[f] === undefined || params[f] === null || params[f] === '') {
					return res.status(400).send({ message: `Campo requerido faltante: ${f}` });
				}
			}

			// Si langs es un string, dividir por coma y limpiar espacios
			let langsValue = params.langs;
			if (typeof langsValue === 'string') {
				langsValue = langsValue
					.split(',')
					.map(l => l.trim())
					.filter(l => l.length > 0);
			}

			const project = new Project({
				name: params.name,
				description: params.description,
				category: params.category,
				year: params.year,
				langs: langsValue,
				image: null
			});


			const projectStored = await project.save(); // v7: promesa
			return res.status(201).send({ project: projectStored });
		} catch (err) {
			console.error('saveProject error:', err);
			return res
				.status(500)
				.send({ message: 'Error al guardar el documento', error: err.message });
		}
	},

	// ----------------------------
	// READ: uno
	// ----------------------------
	getProject: async function (req, res) {
		try {
			const projectId = req.params.id;
			if (!projectId) return res.status(400).send({ message: 'ID requerido.' });

			const project = await Project.findById(projectId).exec();
			if (!project) return res.status(404).send({ message: 'El proyecto no existe.' });

			return res.status(200).send({ project });
		} catch (err) {
			console.error('getProject error:', err);
			return res
				.status(500)
				.send({ message: 'Error al devolver los datos.', error: err.message });
		}
	},

	// ----------------------------
	// READ: listado
	// ----------------------------
	getProjects: async function (req, res) {
		try {
			const projects = await Project.find({}).sort({ year: -1 }).exec();
			if (!projects || projects.length === 0) {
				return res.status(404).send({ message: 'No hay proyectos que mostrar.' });
			}
			return res.status(200).send({ projects });
		} catch (err) {
			console.error('getProjects error:', err);
			return res
				.status(500)
				.send({ message: 'Error al devolver los datos.', error: err.message });
		}
	},

	// ----------------------------
	// UPDATE
	// ----------------------------
	updateProject: async function (req, res) {
		try {
			const projectId = req.params.id;
			if (!projectId) return res.status(400).send({ message: 'ID requerido.' });

			const update = req.body ?? {};
			const projectUpdated = await Project.findByIdAndUpdate(projectId, update, {
				new: true,
				runValidators: true
			}).exec();

			if (!projectUpdated) {
				return res
					.status(404)
					.send({ message: 'No existe el proyecto para actualizar' });
			}

			return res.status(200).send({ project: projectUpdated });
		} catch (err) {
			console.error('updateProject error:', err);
			return res
				.status(500)
				.send({ message: 'Error al actualizar', error: err.message });
		}
	},

	// ----------------------------
	// DELETE
	// ----------------------------
	deleteProject: async function (req, res) {
		try {
			const projectId = req.params.id;
			if (!projectId) return res.status(400).send({ message: 'ID requerido.' });

			// v7: usa findByIdAndDelete (findByIdAndRemove está deprecado)
			const projectRemoved = await Project.findByIdAndDelete(projectId).exec();
			if (!projectRemoved) {
				return res
					.status(404)
					.send({ message: 'No se puede eliminar ese proyecto.' });
			}

			return res.status(200).send({ project: projectRemoved });
		} catch (err) {
			console.error('deleteProject error:', err);
			return res
				.status(500)
				.send({ message: 'No se ha podido borrar el proyecto', error: err.message });
		}
	},

	// ----------------------------
	// Subir imagen (connect-multiparty)
	// ----------------------------
	uploadImage: async function (req, res) {
		try {
			const projectId = req.params.id;
			if (!projectId) return res.status(400).send({ message: 'ID requerido.' });

			if (!req.files || !req.files.image) {
				return res.status(400).send({ message: 'Imagen no subida.' });
			}

			// Ruta temporal del archivo que deja connect-multiparty
			const filePath = req.files.image.path; // p. ej. 'uploads\\filename.jpg' en Windows
			// Obtén el nombre de archivo de manera cross-platform
			const fileName = path.basename(filePath);
			// Extensión en minúsculas
			const fileExt = path.extname(fileName).replace('.', '').toLowerCase();

			const allowed = new Set(['png', 'jpg', 'jpeg', 'gif']);
			if (!allowed.has(fileExt)) {
				// Borra el archivo temporal si la extensión no es válida
				try {
					await fsp.unlink(filePath);
				} catch (_) { }
				return res.status(400).send({ message: 'La extensión no es válida' });
			}

			const projectUpdated = await Project.findByIdAndUpdate(
				projectId,
				{ image: fileName },
				{ new: true }
			).exec();

			if (!projectUpdated) {
				// Borra el archivo si el project no existe
				try {
					await fsp.unlink(filePath);
				} catch (_) { }
				return res
					.status(404)
					.send({ message: 'El proyecto no existe y no se ha asignado la imagen' });
			}

			return res.status(200).send({ project: projectUpdated });
		} catch (err) {
			console.error('uploadImage error:', err);
			return res
				.status(500)
				.send({ message: 'La imagen no se ha subido', error: err.message });
		}
	},

	// ----------------------------
	// Servir imagen
	// ----------------------------
	getImageFile: async function (req, res) {
		try {
			const file = req.params.image;
			const path_file = path.join(__dirname, '..', 'uploads', file);

			await fsp.access(path_file); // lanza si no existe
			return res.sendFile(path.resolve(path_file));
		} catch (_) {
			return res.status(404).send({ message: 'No existe la imagen...' });
		}
	}
};

module.exports = controller;
